import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { apiFetch } from "../Services/fetchToken";
import { Ionicons } from "@expo/vector-icons";
import FooterTab from "../Screens/FooterTab";
import { useTranslation } from "react-i18next";


export default function Community({ navigation }) 
{
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);

 const fetchPosts = async () => {
    try {
      setLoading(true); // start loading
      const res = await apiFetch({
        endpoint: "/posts/",
        auth: true,
      });
      setPosts(res);
    } catch (err) {
      console.log("Fetch posts error:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useFocusEffect(
  React.useCallback(() => {
    fetchPosts();   
  }, [])
);

  // FORMAT DATE + TIME
const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

  // Now time first, then date
  return `${formattedTime}, ${day}/${month}/${year}`;
};


  const likePost = async (postId) => {
  try {
    await apiFetch({
      endpoint: "/like/",
      method: "POST",
      bodyData: { post_id: postId },
      auth: true,
    });
    fetchPosts();
  } catch (err) {
    console.log("Like error:", err);
  }
};

const renderImages = (images) => {
  if (!images || images.length === 0) return null;

  const openImage = (imgs, index) => {
    setSelectedImage(imgs[index]); // show selected image in modal
  };

  if (images.length === 1) {
    return (
      <TouchableOpacity onPress={() => openImage(images, 0)}>
        <Image source={{ uri: images[0] }} style={styles.imageFull} />
      </TouchableOpacity>
    );
  }

  if (images.length === 2) {
    return (
      <View style={styles.row}>
        {images.map((uri, i) => (
          <TouchableOpacity key={i} style={{ flex: 1 }} onPress={() => openImage(images, i)}>
            <Image source={{ uri }} style={styles.imageHalf} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (images.length === 3) {
    return (
      <View>
        <TouchableOpacity onPress={() => openImage(images, 0)}>
          <Image source={{ uri: images[0] }} style={styles.imageFull} />
        </TouchableOpacity>
        <View style={styles.row}>
          {images.slice(1).map((uri, i) => (
            <TouchableOpacity key={i} style={{ flex: 1 }} onPress={() => openImage(images, i + 1)}>
              <Image source={{ uri }} style={styles.imageHalf} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // 4 or more → show 2x2 grid
  return (
    <View>
      <View style={styles.row}>
        {images.slice(0, 2).map((uri, i) => (
          <TouchableOpacity key={i} style={{ flex: 1 }} onPress={() => openImage(images, i)}>
            <Image source={{ uri }} style={styles.imageHalf} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {images.slice(2, 4).map((uri, i) => (
          <TouchableOpacity key={i} style={{ flex: 1 }} onPress={() => openImage(images, i + 2)}>
            <Image source={{ uri }} style={styles.imageHalf} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


 const renderPost = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.date}>{formatDateTime(item.created_at)}</Text>
    <Text style={styles.title}>{item.title}</Text>

    {/*show dynamic images */}
    {renderImages(item.images)}

    <Text>{item.content}</Text>

    <View style={styles.actions}>
      <TouchableOpacity onPress={() => likePost(item.id)} style={styles.likeButton}>
        <Ionicons
          name={likedPosts[item.id] || item.has_liked ? "heart" : "heart-outline"}
          size={24}
          color={likedPosts[item.id] || item.has_liked ? "red" : "gray"}
        />
        <Text style={styles.likeCount}>{item.likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Comments_screen", {
            comments: item.comments,
            postId: item.id,
          })
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="chatbox-outline" size={22} color="gray" />
          <Text style={{ marginLeft: 4 }}>{item.comments_count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);



return (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("community")}</Text>
      </View>

      {/*Show loading first, then posts or empty */}
      {loading ? null : posts.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 280 }}>
          <Text style={{ fontSize: 16, color: "gray" }}>{t("noPostsYet")}</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPost}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Add Post Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add_post")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>

    <FooterTab activeTab="Community" navigation={navigation} />

    {/* Image Modal */}
    <Modal visible={!!selectedImage} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setSelectedImage(null)}
        >
          <Ionicons name="close-outline" size={30} color="#fff" />
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        )}
      </View>
    </Modal>

    {/* Loading Overlay */}
    {loading && (
      <Modal transparent={true} animationType="fade">
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>{t("loadingPosts")}</Text>
        </View>
      </Modal>
    )}
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 35,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
    loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
 card: {
    backgroundColor: "#F1F3E0",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,    
    marginHorizontal: 12,    
    shadowColor: "#000",     
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,            
  },
  title: { fontSize: 18, fontWeight: "bold" },
  image: { height: 200, marginTop: 10, borderRadius: 10 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 6,
    fontSize: 16,
    color: "black",
  },
  date: { fontSize: 12, color: "gray" },
addButton: {
  position: "absolute",
  bottom: 20,
  right: 20,
  backgroundColor: "green",
  width: 50,          
  height: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,   
},

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  imageFull: {
  width: "100%",
  height: 200,
  borderRadius: 10,
  marginTop: 10,
},
imageHalf: {
  width: "100%",
  height: 120,
  borderRadius: 10,
  margin: 4,
},
row: {
  flexDirection: "row",
  gap: 4,
},

});
