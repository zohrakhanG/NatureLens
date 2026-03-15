import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import styles from "../Styles/Onboarding1";
import { useState } from "react";

const { height: screenHeight } = Dimensions.get("window");

export default function Onboarding1({ navigation }) 
{
  const [selectedLang, setSelectedLang] = useState(null);

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
            <Text style={styles.mainHeadingText}>Select your language</Text>
            <Text style={styles.subText}>Choose your preferred language for a personalized experience.</Text>

          {/* for english language selection card */}
            <View style={styles.language_selection_container}>
              <TouchableOpacity style={[styles.card, selectedLang === "english" && { borderColor: "green", borderWidth: 2 }]} onPress={() => setSelectedLang("english")}>
                <Text style={styles.cardText}>English</Text>
                <View style={styles.radioOuter}>
                  {selectedLang === "english" && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
          {/* for urdu language selection card */}
              <TouchableOpacity style={[styles.card, selectedLang === "urdu" && { borderColor: "green", borderWidth: 2 }]} onPress={() => setSelectedLang("urdu")}>
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
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      </View>
  );
}
