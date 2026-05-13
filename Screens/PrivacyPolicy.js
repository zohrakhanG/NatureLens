import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";


export default function PrivacyPolicy({ navigation }) {
  const { t } = useTranslation();
    const handleEmailPress = () => {
        Linking.openURL("mailto:l226617@lhr.nu.edu.pk");
    };

  return (
    <View style={styles.container}>
      
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>{t("privacyPolicy")}</Text>
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView style={styles.scroll}>
        
        {/* Introduction */}
        <Text style={styles.heading}>{t("privacyIntroHeading")}</Text>
        <Text style={styles.text}>
          {t("privacyIntroText")}
        </Text>
        <View style={styles.line} />

        {/* 1. Acceptance of Terms */}
        <Text style={styles.heading}>{t("privacyAcceptanceHeading")}</Text>
        <Text style={styles.text}>
          {t("privacyAcceptanceText1")}
        </Text>
        <Text style={styles.text}>
            {t("privacyAcceptanceText2")}
        </Text>
        <View style={styles.line} />

        {/* 2. User Accounts */}
        <Text style={styles.heading}>{t("privacyAccountsHeading")}</Text>
        <Text style={styles.text}>
            {t("privacyAccountsText1")}
        </Text>
        <Text style={styles.text}>
            {t("privacyAccountsText2")}
        </Text>
        <Text style={styles.text}>
            {t("privacyAccountsText3")}
        </Text>
        <View style={styles.line} />

        {/* 3. Intellectual Property */}
        <Text style={styles.heading}>{t("privacyPropertyHeading")}</Text>
        <Text style={styles.text}>
            {t("privacyPropertyText1")}
        </Text>
        <Text style={styles.text}>
           {t("privacyPropertyText2")}
        </Text>
        <View style={styles.line} />

        {/* 4. Use of Service */}
        <Text style={styles.heading}>{t("privacyServiceHeading")}</Text>
        <Text style={styles.text}>
            {t("privacyServiceText1")}
        </Text>
        <Text style={styles.text}>
            {t("privacyServiceText2")}
        </Text>
        <View style={styles.line} />

        {/* 5. Termination */}
        <Text style={styles.heading}>{t("privacyTerminationHeading")}</Text>
        <Text style={styles.text}>
           {t("privacyTerminationText1")}
        </Text>
        <Text style={styles.text}>
          {t("privacyTerminationText2")}
        </Text>
        <Text style={styles.text}>
          {t("privacyTerminationText3")}
        </Text>
        <View style={styles.line} />

        {/* 6. Governing Law */}
        <Text style={styles.heading}>{t("privacyLawHeading")}</Text>
        <Text style={styles.text}>
          {t("privacyLawText1")}
        </Text>
        <Text style={styles.text}>
           {t("privacyLawText2")}
        </Text>
        <View style={styles.line} />

        {/* Contact */}
        <Text style={styles.heading}>{t("contactUs")}</Text>
        <Text style={styles.text}>
          {t("privacyContactText")}{"\n"}
            <TouchableOpacity onPress={handleEmailPress}>
                <Text style={[styles.text, { color: "#2e7d32", textDecorationLine: "underline" }]}>
                    l226617@lhr.nu.edu.pk
                </Text>
            </TouchableOpacity>
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 15,
    color: "#2e7d32",
    textAlign:"center",
  },
  text: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 8,
    textAlign:"center",
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
});