import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../Styles/ThankYou";

export default function DeleteAccount({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Account Removed</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
            <Text style={styles.heading}>Thank you for using our app!</Text>
            <Text style={styles.infoText}>
            We're sorry to see you go, but we respect your decision to delete your account. Your account deletion request has been successfully processed, and your account is now permanently deactivated.
            </Text>
            <Text style={[styles.infoText, { marginTop: 10 }]}>
            If you ever decide to return, we'll be here with new updates and features to make your experience even better.
            </Text>
        </ScrollView>
        {/* Done Button at Bottom */}
        <View style={{ padding: 15, position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.navigate("SignUp")}
            >
            <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
