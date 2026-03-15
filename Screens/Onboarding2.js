import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Styles/Onboarding2";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


export default function Onboarding2({ navigation }) 
{
  const [plantLocation, setplantLocation] = useState([]);

    const toggleSelection = (option) => {
        if (plantLocation.includes(option)) 
        {
            {/* removing the option that has been unselected */}
            setplantLocation(plantLocation.filter((item) => item !== option));
        } 
        else
        {    
            {/* if a new option is selected, keep the original list of selected options and add the new one also */}
            setplantLocation([...plantLocation, option]);
        }
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{position: "absolute",top: 40, left: 20, zIndex: 10, backgroundColor: "rgba(255,255,255,0.9)",padding: 6,borderRadius: 20,}} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" onPress={() => navigation.goBack()} />
      </TouchableOpacity>

      <View style={styles.bodyContainer}>
        <Text style={styles.mainHeadingText}>Where are your plants?</Text>
        <Text style={styles.subText}>You can pick multiple options.</Text>

        <View style={styles.language_selection_container}>

          <TouchableOpacity style={[styles.card, plantLocation.includes("indoor") && { borderColor: "green", borderWidth: 2 },]} onPress={() => toggleSelection("indoor")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="home-outline" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Potted plants indoor</Text>
            </View>
              <View style={styles.radioOuter}>
                {plantLocation.includes("indoor") && <View style={styles.radioInner} />}
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, plantLocation.includes("outdoor") && { borderColor: "green", borderWidth: 2 }]} onPress={() => toggleSelection("outdoor")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="cactus" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Potted plants outdoor</Text>
            </View>
            <View style={styles.radioOuter}>
              {plantLocation.includes("outdoor") && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, plantLocation.includes("ground") && { borderColor: "green", borderWidth: 2 }]} onPress={() => toggleSelection("ground")}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <MaterialCommunityIcons name="pine-tree-variant-outline" size={25} color="#808080" style={{ marginRight: 10 }} />
              <Text style={styles.cardText}>Garden plants in ground</Text>
            </View>
            <View style={styles.radioOuter}>
              {plantLocation.includes("ground") && <View style={styles.radioInner} />}
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
            <TouchableOpacity style={[styles.button, styles.nextButton, plantLocation.length === 0 && { backgroundColor: "#ccc" }]}  disabled={plantLocation.length === 0} onPress={() => navigation.navigate("Onboarding3")}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}
