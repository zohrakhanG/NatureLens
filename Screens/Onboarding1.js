import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import styles from "../Styles/Onboarding1";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../src/i18n/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

export default function Onboarding1({ navigation }) 
{
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(null);

  const changeLanguage = async (lang) => {

  console.log("FUNCTION STARTED");

  const languageCode =
    lang === "english"
      ? "en"
      : "ur";

  console.log(
    "LANGUAGE CODE:",
    languageCode
  );

  try {

    await i18n.changeLanguage(
      languageCode
    );

    setSelectedLang(lang);

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    console.log(
      "TOKEN:",
      token
    );

    if (token) {

      console.log(
        "CALLING API..."
      );

      const response = await fetch(
        "http://192.168.100.58:8000/api/update-language/",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Token ${token}`,
          },

          body: JSON.stringify({
            preferred_language:
              languageCode,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "API RESPONSE:",
        data
      );

    } else {

      console.log(
        "TOKEN NOT FOUND"
      );
    }

  } catch (error) {

    console.log(
      "Language error:",
      error
    );
  }
};

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{minHeight: screenHeight * 1.2, flexGrow: 1,}}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}>

        <View style={styles.container}>
          <ImageBackground source={require("../assets/onboarding1.jpg")} style={styles.image} >
            <View style={styles.textContainer}>
              <Text style={[styles.title, { marginBottom: 10 }]}>Plant Kerein Detect,</Text>
              <Text style={styles.title}>Garden ho Perfect</Text>
            </View>
          </ImageBackground>

          <View style={styles.bodyContainer}>
            <Text style={styles.mainHeadingText}>{t("selectLanguage")}</Text>
            <Text style={styles.subText}>{t("chooseLanguage")}</Text>

          {/* for english language selection card */}
            <View style={styles.language_selection_container}>
              <TouchableOpacity style={[styles.card, selectedLang === "english" && { borderColor: "green", borderWidth: 2 }]} onPress={() => changeLanguage("english")}>
                <Text style={styles.cardText}>English</Text>
                <View style={styles.radioOuter}>
                  {selectedLang === "english" && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
          {/* for urdu language selection card */}
              <TouchableOpacity style={[styles.card, selectedLang === "urdu" && { borderColor: "green", borderWidth: 2 }]} onPress={() => changeLanguage("urdu")}>
                <Text style={styles.cardText}>اُردو</Text>
                <View style={styles.radioOuter}>
                  {selectedLang === "urdu" && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={[styles.button,!selectedLang && { backgroundColor: "#ccc" },]} disabled={!selectedLang} onPress={() => navigation.navigate("Onboarding2")}>
        <Text style={styles.buttonText}> {t("next")}</Text>
      </TouchableOpacity>
      </View>
  );
}
