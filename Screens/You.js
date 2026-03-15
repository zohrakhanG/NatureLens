import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "../Styles/You";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Screens/fetchToken";

export default function You({ navigation }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const profileImage = require("../assets/profile_pic.png");

  // Fetch user info using apiFetch
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await apiFetch({
        endpoint: "/user/",
        auth: true, // uses the stored token
      });

      setUsername(data.username); // or data.name if you want
    } catch (err) {
      console.log("Error fetching user info:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  const AccountButton = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        <Text style={styles.buttonText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#808080" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop: 10, color: "#4a6a3b" }}>Loading user info...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingTop: 15, marginTop: 35 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Yours</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Profile Header */}
        <View style={{ flexDirection: "column", alignItems: "center", paddingHorizontal: 15, marginTop: 20 }}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", flexWrap: "wrap", marginBottom: 15 }}>
            {username}
          </Text>
        </View>

        {/* Account Section */}
        <View style={styles.box}>
          <Text style={styles.boxLabel}>Account</Text>
          <AccountButton
            icon={<MaterialCommunityIcons name="account-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Personal Details"
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="shield-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="file-document-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Terms of Use"
            onPress={() => navigation.navigate("TOU")}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.box}>
          <Text style={styles.boxLabel}>Settings</Text>
          <AccountButton
            icon={<Ionicons name="settings-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Account Preferences"
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="shield-account-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Account Privacy"
          />
          <AccountButton
            icon={<Ionicons name="notifications-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Notifications"
            onPress={() => navigation.navigate("Notifications")}
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="headset" size={21} color="#5C4742" style={{ marginRight: 10 }} />}
            label="Help & Support"
          />
        </View>

        {/* Logout / Delete Account */}
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.replace("SignIn")}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("DeleteAccount")}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Tab */}
      <FooterTab activeTab="You" navigation={navigation} />
    </View>
  );
}