import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/DeleteAccount";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";



export default function DeleteAccount({ navigation }) 
{
        const { t } = useTranslation();
  
  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{t("deleteAccount")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
            <Text style={styles.heading}>{t("deleteAccountHeading")}</Text>
            <Text style={styles.infoText}>
            {t("deleteAccountText1")}
            </Text>
            <Text style={[styles.infoText, { marginTop: 10 }]}>
            {t("deleteAccountText2")}
            </Text>
        </ScrollView>
        {/* Delete Button at Bottom */}
        <View style={{ padding: 15, position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={async () => {
                try {
                  await apiFetch({
                    endpoint: "/delete-account/",
                    method: "DELETE",
                    auth: true,
                  });

                  navigation.navigate("ThankYou");

                } catch (error) {
                  console.log("Delete account error:", error);
                }
              }}
            >
              <Text style={styles.deleteButtonText}>{t("deleteAccount")}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
