import { View, Text, TouchableOpacity, Image} from "react-native";
import styles from "../Styles/Onboarding5";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";


export default function Onboarding5({ navigation }) 
{
        const { t } = useTranslation();

  const [experienceLevel, setexperienceLevel] = useState("");

    const selectOption = (option) => {
    setexperienceLevel(option);
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: "absolute",top: 40, left: 20, zIndex: 10, backgroundColor: "rgba(255,255,255,0.9)",padding: 6,borderRadius: 20,}} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" onPress={() => navigation.goBack()}/>
      </TouchableOpacity>
      <View style={styles.bodyContainer}>
        <Text style={styles.mainHeadingText}>{t("plantExperience")}</Text>

        <View style={styles.language_selection_container}>

          <TouchableOpacity style={[styles.card, experienceLevel.includes("beginner") && { borderColor: "green", borderWidth: 2 },]} onPress={() => selectOption("beginner")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/experience option 1.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                <View style={{ flexDirection: "column", flex:1, flexShrink:1 }}>
                    <Text style={styles.cardText}>{t("beginner")}</Text>
                    <Text style={[styles.optionsubText]}>
                    {t("beginnerDesc")}
                    </Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, experienceLevel.includes("experienced") && { borderColor: "green", borderWidth: 2 },]} onPress={() => selectOption("experienced")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/experience option 2.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                <View style={{ flexDirection: "column", flex:1, flexShrink:1 }}>
                    <Text style={styles.cardText}>{t("experienced")}</Text>
                    <Text style={[styles.optionsubText]}>
                    {t("experiencedDesc")}
                    </Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, experienceLevel.includes("skilled") && { borderColor: "green", borderWidth: 2 },]} onPress={() => selectOption("skilled")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/experience option 3.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                <View style={{ flexDirection: "column", flex:1, flexShrink:1 }}>
                    <Text style={styles.cardText}> {t("skilled")}</Text>
                    <Text style={[styles.optionsubText]}>
                    {t("skilledDesc")}
                    </Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={[styles.button,!experienceLevel && { backgroundColor: "#ccc" },]} disabled={!experienceLevel} onPress={() => navigation.navigate("Onboarding6")}>
        <Text style={styles.buttonText}>{t("next")}</Text>
      </TouchableOpacity>
    </View>
  );
}
