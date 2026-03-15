import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/DeleteAccount";

export default function DeleteAccount({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Delete Account</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
            <Text style={styles.heading}>Are you sure you want to delete your account?</Text>
            <Text style={styles.infoText}>
            Once you delete your account, it cannot be undone. All your data will be permanently erased from this app, including your profile information, preferences, saved content, and any activity history.
            </Text>
            <Text style={[styles.infoText, { marginTop: 10 }]}>
            We're sad to see you go, but we understand that sometimes it's necessary. Please take a moment to consider the consequences before proceeding.
            </Text>
        </ScrollView>
        {/* Delete Button at Bottom */}
        <View style={{ padding: 15, position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => navigation.navigate("ThankYou")}
            >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
