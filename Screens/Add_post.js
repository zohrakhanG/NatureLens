import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";

export default function Add_post({ navigation }) 
{
    const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (images.length >= 4) {
      Alert.alert(t("limitReached"), t("maxImages"));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const replaceImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const updated = [...images];
      updated[index] = result.assets[0].uri;
      setImages(updated);
    }
  };

  const deleteImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

 const submitPost = async () => {
  try {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      Alert.alert(t("error"), t("titleContentRequired"));
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", trimmedTitle);
    formData.append("content", trimmedContent);

    images.forEach((uri, index) => {
      formData.append(`image_${index + 1}`, {
        uri,
        type: "image/jpeg",
        name: `photo_${index + 1}.jpg`,
      });
    });

    await apiFetch({
      endpoint: "/posts/create/",
      method: "POST",
      bodyData: formData,
      auth: true,
      isFormData: true,
    });

    navigation.goBack();
  } catch (error) {
    Alert.alert(t("error"), error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("addPost")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TextInput
          placeholder={t("title")}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          maxLength={250}
          required
        />

        <TextInput
          placeholder={t("content")}
          value={content}
          onChangeText={setContent}
          multiline
          style={[styles.input, { height: 100 }]}
          maxLength={1000}
        />

        {/* IMAGE PREVIEW */}
        {images.length > 0 && (
          <View style={{ marginVertical: 10 }}>
            {images.map((uri, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  justifyContent:"center",
                  gap:45,
                }}
              >
                <Image
                  source={{ uri }}
                  style={{ width: 60, height: 60, borderRadius: 10 }}
                />

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity onPress={() => replaceImage(index)}>
                    <Ionicons name="refresh-outline" size={22} color="#4CAF50" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteImage(index)}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* PICK IMAGE BUTTON */}
        <TouchableOpacity
          style={[
            styles.pickImageButton,
            images.length >= 4 && { opacity: 0.5 },
          ]}
          onPress={pickImage}
          disabled={images.length >= 4}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>{t("addPhoto")}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* POST BUTTON */}
      <TouchableOpacity style={styles.button} onPress={submitPost}>
        <Text style={styles.buttonText}>{t("post")}</Text>
      </TouchableOpacity>

      {loading && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: "#fff", marginTop: 10 }}>{t("posting")}</Text>
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
    paddingHorizontal: 15,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  pickImageButton: {
    backgroundColor: "#388e3c",
    height: 45,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#388e3c",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: "5%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
