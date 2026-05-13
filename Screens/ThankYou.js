import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../Styles/ThankYou";
import { useTranslation } from "react-i18next";

export default function DeleteAccount({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>
          {t("accountRemoved")}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        
        <Text style={styles.heading}>
          {t("thankYouUsing")}
        </Text>

        <Text style={styles.infoText}>
          {t("deleteAccountText1")}
        </Text>

        <Text style={[styles.infoText, { marginTop: 10 }]}>
          {t("deleteAccountText2")}
        </Text>

      </ScrollView>

      {/* Done Button */}
      <View
        style={{
          padding: 15,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.doneButtonText}>
            {t("done")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}