import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/Notifications";

export default function Notifications({ navigation }) {
  const [selectedRadio, setSelectedRadio] = useState("all");
  const [newsEnabled, setNewsEnabled] = useState(true);
  const [promotionsEnabled, setPromotionsEnabled] = useState(true);

  const radioOptions = [
    { label: "All new messages", value: "all" },
    { label: "Mention only", value: "mention" },
    { label: "Watering reminders", value: "watering" },
    { label: "None", value: "none" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {/* Message Notifications */}
        <Text style={styles.sectionTitle}>Message Notifications</Text>

        <View style={styles.box}>
            <Text style={styles.sectionSubTitle}>Notify me about:</Text>
            {radioOptions.map((option) => (
                <TouchableOpacity
                key={option.value}
                style={styles.radioRow}
                onPress={() => setSelectedRadio(option.value)}>
                <Text style={styles.radioLabel}>{option.label}</Text>
                <View style={styles.radioOuter}>
                    {selectedRadio === option.value && <View style={styles.radioInner} />}
                </View>
                </TouchableOpacity>
            ))}
        </View>

        {/* App Updates */}
        <Text style={styles.sectionTitle}>App Updates</Text>
        <View style={styles.box}>
              <View style={styles.toggleRow}>
                <Text style={styles.sliderLabel}>News & Feature Updates</Text>
                <Switch
                  value={newsEnabled}
                  onValueChange={setNewsEnabled}
                  trackColor={{ false: "#ccc", true: "#388e3c" }}
                  thumbColor="#fff"/>
              </View>

              <View style={styles.toggleRow}>
                <Text style={styles.sliderLabel}>Promotions</Text>
                <Switch
                  value={promotionsEnabled}
                  onValueChange={setPromotionsEnabled}
                  trackColor={{ false: "#ccc", true: "#388e3c" }}
                  thumbColor="#fff"
                />
              </View>
        </View>
      </ScrollView>
    </View>
  );
}
