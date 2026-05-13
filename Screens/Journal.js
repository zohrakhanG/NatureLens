import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "../Styles/Journal";
import { apiFetch } from "../Services/fetchToken";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";


export default function Journal({ navigation }) {
  const { t } = useTranslation();
  const [plantName, setPlantName] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [images, setImages] = useState([]);

  useFocusEffect(
    useCallback(() => {
      checkJournal();
    }, [])
  );

  const checkJournal = async () => {
    try {
      await apiFetch({
        endpoint: "/journal/",
        method: "GET",
        auth: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- IMAGE PICKER ---------------- */

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(t("permissionRequired"));
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.log(error);
Alert.alert(t("error"), t("failedOpenGallery"));
    }
  };

  const replaceImage = async (index) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(t("permissionRequired"));
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const updated = [...images];
        updated[index] = result.assets[0].uri;
        setImages(updated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- DONE ---------------- */

const uploadImageToCloudinary = async (imageUri) => {

  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "plant.jpg",
  });

  formData.append(
    "upload_preset",
    "naturelens_upload"
  );

  try {

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dftrzkt5s/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log(
      "CLOUDINARY RESPONSE:",
      data
    );

    return data.secure_url;

  } catch (error) {

    console.log(
      "CLOUDINARY ERROR:",
      error
    );

    return null;
  }
};

const handleDone = async () => {

  if (!plantName.trim()) {

    Alert.alert(
      t("error"),
      t("plantNameRequired")
    );

    return;
  }

  try {

    const uploadedImages = [];

    // Upload all images to Cloudinary
    for (const imageUri of images) {

      const uploadedUrl =
        await uploadImageToCloudinary(
          imageUri
        );

      if (uploadedUrl) {

        uploadedImages.push(
          uploadedUrl
        );
      }
    }

    // Save journal in backend
    await apiFetch({

      endpoint: "/journal/add/",

      method: "POST",

      bodyData: {

        plant_name:
          plantName.trim(),

        notes: notes,

        images:
          uploadedImages.length > 0
            ? uploadedImages
            : null,
      },

      auth: true,
    });

    navigation.replace(
      "JournalList"
    );

  } catch (error) {

    console.log(error);

    Alert.alert(
      t("error"),
      error.message
    );
  }
};

  /* ---------------- UI ---------------- */

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{t("plantGrowthJournal")}</Text>
      </View>

      {/* PLANT NAME */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("plantName")}</Text>

        <TextInput
          style={styles.inputBar}
placeholder={t("enterPlantName")}
          value={plantName}
          onChangeText={setPlantName}
          maxLength={100}
        />
      </View>

      {/* NOTES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("notes")}</Text>

        <TextInput
          style={styles.inputBar}
placeholder={t("enterNote")}
          value={noteInput}
          onChangeText={setNoteInput}
          maxLength={200}
        />

        {notes.map((note, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ flex: 1, marginRight: 10 }}>
              • {note}
            </Text>

            <TouchableOpacity
              onPress={() => {
                const updated = notes.filter((_, i) => i !== index);
                setNotes(updated);
              }}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.greenButton,
            noteInput.trim() === "" && { opacity: 0.5 },
          ]}
          onPress={() => {
            const trimmed = noteInput.trim();
            if (!trimmed) return;

            if (notes.includes(trimmed)) {
              Alert.alert(t("duplicateNote"), t("noteExists"));
              return;
            }

            if (notes.length >= 10) {
              Alert.alert(t("limitReached"), t("maxNotes"));
              return;
            }

            setNotes([...notes, trimmed]);
            setNoteInput("");
          }}
          disabled={noteInput.trim() === ""}
        >
          <Text style={styles.buttonText}>{t("addNote")}</Text>
        </TouchableOpacity>
      </View>

      {/* IMAGES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("plantPhotos")}</Text>

        {/* PREVIEW */}
        {images.length > 0 && (
          <View style={{ marginVertical: 10 }}>
            {images.map((uri, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                  }}
                />

                <View style={{ flexDirection: "row", gap: 15 }}>
                  <TouchableOpacity
                    onPress={() => replaceImage(index)}
                  >
                    <Ionicons
                      name="refresh-outline"
                      size={22}
                      color="#4CAF50"
                      marginLeft="14"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      const updated = images.filter(
                        (_, i) => i !== index
                      );
                      setImages(updated);
                    }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* BUTTON BELOW */}
        <TouchableOpacity
          style={[
            styles.greenButton,
            images.length >= 4 && { opacity: 0.5 },
          ]}
          onPress={() => {
            if (images.length >= 4) {
              Alert.alert(
  t("limitReached"),
  t("maxImages")
);
              return;
            }
            pickImage();
          }}
          disabled={images.length >= 4}
        >
          <Text style={styles.buttonText}>{t("addPhoto")}</Text>
        </TouchableOpacity>
      </View>

      {/* DONE */}
      <TouchableOpacity
        style={[
          styles.greenButton,
          { opacity: plantName.trim() ? 1 : 0.5 },
        ]}
        onPress={handleDone}
        disabled={!plantName.trim()}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={20}
          color="#fff"
        />
        <Text style={styles.buttonText}>{t("done")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}