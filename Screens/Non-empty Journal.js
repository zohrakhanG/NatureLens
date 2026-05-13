import { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import defaultPlant from "../assets/journal image.jpeg";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";


export default function JournalList() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchJournals();
    }, [])
  );

  const fetchJournals = async () => {
    try {
      const data = await apiFetch({
        endpoint: "/journal/",
        method: "GET",
        auth: true,
      });

      setJournals(data || []);
    } catch (error) {
      console.log(error);
    }
  };

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

    return `${day}/${month}/${year}, ${formattedTime}`;
  };

  // FILTER JOURNALS BASED ON PLANT NAME
  const filteredJournals = useMemo(() => {
    return journals.filter((item) =>
      item.plant_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [journals, searchQuery]);

  /* IMAGE LAYOUT + CLICK HANDLER */
  const renderImages = (images) => {
    if (!images || images.length === 0) {
      return <Image source={defaultPlant} style={styles.imageFull} />;
    }

    const openImage = (imgs, index) => {
      setSelectedImages(imgs);
      setSelectedIndex(index);
      setModalVisible(true);
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
            <TouchableOpacity
              key={i}
              style={{ flex: 1 }}
              onPress={() => openImage(images, i)}
            >
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
              <TouchableOpacity
                key={i}
                style={{ flex: 1 }}
                onPress={() => openImage(images, i + 1)}
              >
                <Image source={{ uri }} style={styles.imageHalf} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.row}>
          {images.slice(0, 2).map((uri, i) => (
            <TouchableOpacity
              key={i}
              style={{ flex: 1 }}
              onPress={() => openImage(images, i)}
            >
              <Image source={{ uri }} style={styles.imageHalf} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          {images.slice(2, 4).map((uri, i) => (
            <TouchableOpacity
              key={i}
              style={{ flex: 1 }}
              onPress={() => openImage(images, i + 2)}
            >
              <Image source={{ uri }} style={styles.imageHalf} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
onPress={() => navigation.navigate("Home1")}
          />
          <Text style={styles.headerTitle}>
            {t("plantGrowthJournal")}
          </Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#6E7C7C"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.searchInput}
placeholder={t("searchByPlantName")}
            placeholderTextColor="#6E7C7C"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredJournals.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {t("noJournalEntries")}
            </Text>
          </View>
        ) : (
          filteredJournals.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.dateText}>
                {formatDateTime(item.created_at)}
              </Text>

              {renderImages(item.images)}

              <Text style={styles.plantName}>
                {item.plant_name}
              </Text>

              {item.notes &&
                item.notes.map((note, index) => (
                  <Text key={index} style={styles.noteText}>
                    • {note}
                  </Text>
                ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* ➕ BUTTON */}
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate("Journal")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>

          {selectedImages.length > 0 && (
            <Image
              source={{ uri: selectedImages[selectedIndex] }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#2e7d32",
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,
  },

searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#C7C8CC",
  borderRadius: 10,
  paddingHorizontal: 10,
  height: 40,
  marginBottom: 15,
},

searchInput: {
  flex: 1,
  fontSize: 16,
  color: "#6E7C7C",
},

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    fontSize: 16,
    color: "#888",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },

  dateText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },

  imageFull: {
    width: "100%",
    height: 210,
    borderRadius: 12,
    marginTop: 10,
  },

  imageHalf: {
    flex: 1,
    height: 110,
    borderRadius: 12,
  },

  plantName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },

  noteText: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "100%",
    height: "80%",
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 6,
    borderRadius: 20,
  },
});