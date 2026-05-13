import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function TOU({ navigation }) {
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

        <Text style={styles.title}>
          {t("termsOfUse")}
        </Text>
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView style={styles.scroll}>
        
        {/* Introduction */}
        <Text style={styles.heading}>
          {t("touIntroductionHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touIntroductionText")}
        </Text>

        <View style={styles.line} />

        {/* 1. Acceptance of Terms */}
        <Text style={styles.heading}>
          {t("touAcceptanceHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touAcceptanceText1")}
        </Text>

        <Text style={styles.text}>
          {t("touAcceptanceText2")}
        </Text>

        <View style={styles.line} />

        {/* 2. User Accounts */}
        <Text style={styles.heading}>
          {t("touAccountsHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touAccountsText1")}
        </Text>

        <Text style={styles.text}>
          {t("touAccountsText2")}
        </Text>

        <Text style={styles.text}>
          {t("touAccountsText3")}
        </Text>

        <View style={styles.line} />

        {/* 3. Intellectual Property */}
        <Text style={styles.heading}>
          {t("touPropertyHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touPropertyText1")}
        </Text>

        <Text style={styles.text}>
          {t("touPropertyText2")}
        </Text>

        <View style={styles.line} />

        {/* 4. Use of Service */}
        <Text style={styles.heading}>
          {t("touServiceHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touServiceText1")}
        </Text>

        <Text style={styles.text}>
          {t("touServiceText2")}
        </Text>

        <View style={styles.line} />

        {/* 5. Termination */}
        <Text style={styles.heading}>
          {t("touTerminationHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touTerminationText1")}
        </Text>

        <Text style={styles.text}>
          {t("touTerminationText2")}
        </Text>

        <Text style={styles.text}>
          {t("touTerminationText3")}
        </Text>

        <View style={styles.line} />

        {/* 6. Governing Law */}
        <Text style={styles.heading}>
          {t("touLawHeading")}
        </Text>

        <Text style={styles.text}>
          {t("touLawText1")}
        </Text>

        <Text style={styles.text}>
          {t("touLawText2")}
        </Text>

        <View style={styles.line} />

        {/* Contact */}
        <Text style={styles.heading}>
          {t("contactUs")}
        </Text>

        <Text style={styles.text}>
          {t("touContactText")}
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
    textAlign:"center",
  },

  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
});