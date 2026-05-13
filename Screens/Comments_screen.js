import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";

export default function Comments_screen({ route, navigation }) 
{
      const { t } = useTranslation();

  const { postId } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await apiFetch({
        endpoint: `/posts/`,
        auth: true,
      });
      const post = res.find(p => p.id === postId);
      setComments(post ? post.comments : []);
    } catch (err) {
      console.log("Fetch comments error:", err);
    }
  };

 const postComment = async () => {
  const trimmed = newComment.trim();

  if (!trimmed) {
    Alert.alert(t("error"), t("commentEmpty"));
    return;
  }

  try {
    await apiFetch({
      endpoint: "/comment/",
      method: "POST",
      bodyData: { post_id: postId, text: trimmed },
      auth: true,
    });
    setNewComment("");
    fetchComments();   // refresh after posting
  } catch (err) {
    console.log("Comment error:", err);
  }
};


  // Date formatting helper
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

    return `${formattedTime}, ${day}/${month}/${year}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.user}>{item.user}</Text>
      <Text>{item.text}</Text>
      <Text style={styles.date}>
        {formatDateTime(item.created_at)} 
      </Text>
    </View>
  );

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={20}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {t("comments")}
          </Text>
        </View>

        {/* Input */}
<View style={styles.inputRow}>
  <TextInput
    style={styles.input}
    placeholder={t("writeComment")}
    value={newComment}
    onChangeText={setNewComment}
    maxLength={150}
    multiline
  />

  <TouchableOpacity onPress={postComment}>
    <Ionicons
      name="arrow-forward-circle"
      size={32}
      color="green"
    />
  </TouchableOpacity>
</View>

{/* Comments */}
{comments.length === 0 ? (
  <Text style={styles.noComments}>
    {t("noCommentsYet")}
  </Text>
) : (
  <FlatList
    data={comments}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderItem}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: 30,
    }}
  />
)}

       

      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
},
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginTop: 35,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  commentCard: {
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderBottomWidth: 1,
  borderBottomColor: "#e5e5e5",
},
  user: { fontWeight: "bold" },
  date: { fontSize: 10, color: "gray" },
  noComments: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
inputRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 12,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderTopColor: "#e5e5e5",
  borderBottomColor: "#e5e5e5",
  backgroundColor: "#fff",
},

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
});
