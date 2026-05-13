import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator,Alert } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styles from "../Styles/You";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";

export default function You({ navigation }) 
{
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const profileImage = require("../assets/profile_pic.png");

  // Fetch user info using apiFetch
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await apiFetch({
        endpoint: "/user/",
        auth: true,
      });

      setUsername(data.username);
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
              <Text style={{ marginTop: 10, color: "#4a6a3b" }}>
                {t("loadingDetails")}
              </Text>
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
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>{t("you")}</Text>
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
          <Text style={styles.boxLabel}>{t("account")}</Text>
          <AccountButton
            icon={
              <MaterialCommunityIcons
                name="account-outline"
                size={22}
                color="#5C4742"
                style={{ marginRight: 10 }}
              />
            }
            label={t("personalDetails")}
            onPress={() => navigation.navigate("Personal_details")}
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="shield-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label={t("privacyPolicy")}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="file-document-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
            label={t("termsOfUse")}
            onPress={() => navigation.navigate("TOU")}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.box}>
          <Text style={styles.boxLabel}>{t("settings")}</Text>
          <AccountButton
            icon={
              <Ionicons
                name="language-outline"
                size={22}
                color="#5C4742"
                style={{ marginRight: 10 }}
              />
            }
            label={t("changeLanguage")}
            onPress={() => navigation.navigate("ChangeLanguage")}
          />
          <AccountButton
            icon={<MaterialCommunityIcons name="headset" size={21} color="#5C4742" style={{ marginRight: 10 }} />}
            label={t("helpSupport")}
            onPress={() => navigation.navigate("HelpSupport")}
          />
        </View>

        {/* Logout / Delete Account */}
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.replace("SignIn")}>
          
          <Text style={styles.logoutText}>{t("logout")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("DeleteAccount")}>
          <Text style={styles.deleteText}>{t("deleteAccount")}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Tab */}
      <FooterTab activeTab="You" navigation={navigation} />
    </View>
  );
}