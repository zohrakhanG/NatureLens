import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import i18n from "../src/i18n/i18n";

export default function ChangeLanguage({ navigation }) {
  const { t } = useTranslation();

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    await i18n.changeLanguage(lang);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {t("changeLanguage")}
        </Text>
      </View>

      {/* English */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => changeLanguage("en")}
      >
        <Text style={styles.languageText}>
          English
        </Text>

        <Ionicons
          name="chevron-forward-outline"
          size={22}
          color="#808080"
        />
      </TouchableOpacity>

      {/* Urdu */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => changeLanguage("ur")}
      >
        <Text style={styles.languageText}>
          اُردو
        </Text>

        <Ionicons
          name="chevron-forward-outline"
          size={22}
          color="#808080"
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 35,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#F5FAF4",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  languageText: {
    fontSize: 18,
    fontWeight: "600",
  },
});