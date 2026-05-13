import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function TermsAndPolicy({ navigation }) {
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

        <Text style={styles.title}>{t("termsPolicy")}</Text>
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView style={styles.scroll}>

        {/* Introduction */}
        <Text style={styles.heading}>{t("termsIntroHeading")}</Text>

        <Text style={styles.text}>
          {t("termsIntroText")}
        </Text>

        <View style={styles.line} />

        {/* Acceptance */}
        <Text style={styles.heading}>
          {t("termsAcceptanceHeading")}
        </Text>

        <Text style={styles.text}>
          {t("termsAcceptanceText1")}
        </Text>

        <Text style={styles.text}>
          {t("termsAcceptanceText2")}
        </Text>

        <View style={styles.line} />

        {/* Accounts */}
        <Text style={styles.heading}>
          {t("termsAccountsHeading")}
        </Text>

        <Text style={styles.text}>
          {t("termsAccountsText1")}
        </Text>

        <Text style={styles.text}>
          {t("termsAccountsText2")}
        </Text>

        <Text style={styles.text}>
          {t("termsAccountsText3")}
        </Text>

        <View style={styles.line} />

        {/* Property */}
        <Text style={styles.heading}>
          {t("termsPropertyHeading")}
        </Text>

        <Text style={styles.text}>
          {t("termsPropertyText1")}
        </Text>

        <Text style={styles.text}>
          {t("termsPropertyText2")}
        </Text>

        <View style={styles.line} />

        {/* Service */}
        <Text style={styles.heading}>
          {t("termsServiceHeading")}
        </Text>

        <Text style={styles.text}>
          {t("termsServiceText1")}
        </Text>

        <Text style={styles.text}>
          {t("termsServiceText2")}
        </Text>

        <View style={styles.line} />

        {/* Termination */}
        <Text style={styles.heading}>
          {t("termsTerminationHeading")}
        </Text>

        <Text style={styles.text}>
          {t("termsTerminationText1")}
        </Text>

        <Text style={styles.text}>
          {t("termsTerminationText2")}
        </Text>

        <Text style={styles.text}>
          {t("termsTerminationText3")}
        </Text>

        <View style={styles.line} />

        {/* Governing Law */}
        <Text style={styles.heading}>
          {t("termsLawHeading")}
        </Text>

        <Text style={styles.text}>
          {t("termsLawText1")}
        </Text>

        <Text style={styles.text}>
          {t("termsLawText2")}
        </Text>

        <View style={styles.line} />

        {/* Contact */}
        <Text style={styles.heading}>
          {t("contactUs")}
        </Text>

        <Text style={styles.text}>
          {t("termsContactText")}
          {"\n"}

          <TouchableOpacity onPress={handleEmailPress}>
            <Text
              style={[
                styles.text,
                {
                  color: "#2e7d32",
                  textDecorationLine: "underline",
                },
              ]}
            >
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
    textAlign: "center",
  },

  text: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 8,
        textAlign: "center",

  },

  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
});