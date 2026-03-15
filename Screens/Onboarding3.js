import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Styles/Onboarding3";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function Onboarding3({ navigation }) 
{
  const [helpUwith, sethelpUwith] = useState([]);

    const toggleSelection = (option) => {
        if (helpUwith.includes(option)) 
        {
            {/* removing the option that has been unselected */}
            sethelpUwith(helpUwith.filter((item) => item !== option));
        } 
        else
        {    
            {/* if a new option is selected, keep the original list of selected options and add the new one also */}
            sethelpUwith([...helpUwith, option]);
        }
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: "absolute",top: 40, left: 20, zIndex: 10, backgroundColor: "rgba(255,255,255,0.9)",padding: 6,borderRadius: 20,}} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" onPress={() => navigation.goBack()} />
      </TouchableOpacity>

      <View style={styles.bodyContainer}>
        <Text style={styles.mainHeadingText}>What can we help you with?</Text>
        <Text style={styles.subText}>You can pick multiple options.</Text>

        <View style={styles.language_selection_container}>

          <TouchableOpacity style={[styles.card, helpUwith.includes("sick") && { borderColor: "green", borderWidth: 2 },]} onPress={() => toggleSelection("sick")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="stethoscope" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Get help with a sick plant</Text>
            </View>
            <View style={styles.radioOuter}>
              {helpUwith.includes("sick") && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, helpUwith.includes("reminders") && { borderColor: "green", borderWidth: 2 },]} onPress={() => toggleSelection("reminders")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="watering-can-outline" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Get water & care reminders</Text>
            </View>
            <View style={styles.radioOuter}>
              {helpUwith.includes("reminders") && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, helpUwith.includes("identify") && { borderColor: "green", borderWidth: 2 },]} onPress={() => toggleSelection("identify")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="line-scan" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Identify a plant</Text>
            </View>
            <View style={styles.radioOuter}>
              {helpUwith.includes("identify") && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, helpUwith.includes("journal") && { borderColor: "green", borderWidth: 2 },]} onPress={() => toggleSelection("journal")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="notebook-outline" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Plant organization & journal</Text>
            </View>
            <View style={styles.radioOuter}>
              {helpUwith.includes("journal") && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, helpUwith.includes("else") && { borderColor: "green", borderWidth: 2 },]} onPress={() => toggleSelection("else")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="dots-horizontal" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Something else</Text>
            </View>
            <View style={styles.radioOuter}>
              {helpUwith.includes("else") && <View style={styles.radioInner} />}
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
            <TouchableOpacity style={[styles.button, styles.nextButton, helpUwith.length === 0 && { backgroundColor: "#ccc" }]} disabled={helpUwith.length === 0} onPress={() => navigation.navigate("Onboarding4")}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}
