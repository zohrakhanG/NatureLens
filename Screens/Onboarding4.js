import { View, Text, TouchableOpacity, Image} from "react-native";
import styles from "../Styles/Onboarding4";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Onboarding4({ navigation }) 
{
  const [interestLevel, setinterestLevel] = useState("");

    const selectOption = (option) => {
    setinterestLevel(option);
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: "absolute",top: 40, left: 20, zIndex: 10, backgroundColor: "rgba(255,255,255,0.9)",padding: 6,borderRadius: 20,}} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" onPress={() => navigation.goBack()}/>
      </TouchableOpacity>
      <View style={styles.bodyContainer}>
        <Text style={styles.mainHeadingText}>How interested are you in plant care?</Text>

        <View style={styles.language_selection_container}>

          <TouchableOpacity style={[styles.card, interestLevel.includes("low") && { borderColor: "green", borderWidth: 2 },]} onPress={() => selectOption("low")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/interest option 1.jpeg")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                <View style={{ flexDirection: "column", flex:1, flexShrink:1 }}>
                    <Text style={styles.cardText}>Low</Text>
                    <Text style={[styles.optionsubText]}>
                    I just want to keep my plants alive
                    </Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, interestLevel.includes("medium") && { borderColor: "green", borderWidth: 2 },]} onPress={() => selectOption("medium")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/interest option 2.jpeg")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                <View style={{ flexDirection: "column", flex:1, flexShrink:1 }}>
                    <Text style={styles.cardText}>Medium</Text>
                    <Text style={[styles.optionsubText]}>
                    I like plant care and I'm alright with spending time on my plants
                    </Text>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, interestLevel.includes("high") && { borderColor: "green", borderWidth: 2 },]} onPress={() => selectOption("high")}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("../assets/interest option 3.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} />
                <View style={{ flexDirection: "column", flex:1, flexShrink:1 }}>
                    <Text style={styles.cardText}>High</Text>
                    <Text style={[styles.optionsubText]}>
                    I live for plants. I want to spend every waking hour on them
                    </Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
            {/* Skip Button */}
            <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={() => navigation.navigate("Onboarding6")}>
                <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
            </TouchableOpacity>

            {/* Next Button */}
            <TouchableOpacity style={[styles.button, styles.nextButton, !interestLevel && { backgroundColor: "#ccc" } ]} disabled={!interestLevel} onPress={() => navigation.navigate("Onboarding5")}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}
