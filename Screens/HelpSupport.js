import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function HelpSupport({ navigation }) {
  const { t } = useTranslation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f6f8" }}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("helpSupport")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>

        {/* INTRO CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>{t("helpTitle")}</Text>
          <Text style={[styles.subtitle, { textAlign: "center" }]}>  {t("helpSubtitle")}</Text>
        </View>

        {/* CONTACT SECTION */}
        <Text style={styles.sectionTitle}>{t("contactUs")}</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => openLink("tel:+923330332141")}>
            <Ionicons name="call-outline" size={22} color="#2e7d32" />
            <Text style={styles.rowText}>+92 333 0332141</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => openLink("mailto:support@naturelens.com")}>
            <Ionicons name="mail-outline" size={22} color="#2e7d32" />
            <Text style={styles.rowText}>support@naturelens.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => openLink("https://wa.me/923330332141")}>
            <FontAwesome name="whatsapp" size={22} color="#25D366" />
            <Text style={styles.rowText}>{t("chatOnWhatsapp")}</Text>
          </TouchableOpacity>
        </View>

        {/* SOCIAL MEDIA */}
        <Text style={styles.sectionTitle}>{t("followUs")}</Text>

        <View style={styles.card}>

          <TouchableOpacity
            style={styles.row}
            onPress={() => openLink("https://instagram.com")}
          >
            <Ionicons name="logo-instagram" size={22} color="#E1306C" />
            <Text style={styles.rowText}>{t("instagram")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => openLink("https://facebook.com")}
          >
            <Ionicons name="logo-facebook" size={22} color="#1877F2" />
            <Text style={styles.rowText}>{t("facebook")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => openLink("https://youtube.com")}
          >
            <Ionicons name="logo-youtube" size={22} color="#FF0000" />
            <Text style={styles.rowText}>{t("youtube")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => openLink("https://linkedin.com")}
          >
            <Ionicons name="logo-linkedin" size={22} color="#0A66C2" />
            <Text style={styles.rowText}>{t("linkedin")}</Text>
          </TouchableOpacity>

        </View>

        {/* EXTRA HELP */}
        <Text style={styles.sectionTitle}>{t("more")}</Text>

        <View style={styles.card}>

          <TouchableOpacity 
            style={styles.row}
            onPress={() => navigation.navigate("TermsAndPolicy")}
            >
            <MaterialCommunityIcons 
                name="file-document-outline" 
                size={22} 
                color="#4a6a3b" 
            />
            <Text style={styles.rowText}>{t("termsConditions")}</Text>
            </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("PrivacyPolicy")}>
            <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#4a6a3b" />
            <Text style={styles.rowText}>{t("privacyPolicy")}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 5,
    color: "#333",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  rowText: {
    fontSize: 15,
    marginLeft: 12,
    color: "#333",
  },
});