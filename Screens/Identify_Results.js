import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FooterTab from "../Screens/FooterTab";
import { useTranslation } from "react-i18next";


export default function Identify_Results({ route, navigation }) {
   const { t } = useTranslation();
  const { plant, photoUri } = route.params;

const topPredictions =
  plant.top5_predictions && plant.top5_predictions.length > 0
    ? plant.top5_predictions
    : plant.prediction
    ? [
        {
          plant: plant.prediction,
          confidence: plant.confidence || 0,
        },
      ]
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home1")}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t("identifyResults")}</Text>

      </View>

      <Image source={{ uri: photoUri }} style={styles.image} />

      <View style={styles.yellowCard}>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    
    <Ionicons
      name="alert-circle-outline"
      size={26}
      color="#D32F2F"
      style={{ marginRight: 18 }}
    />

    <View style={{ flex: 1 }}>

      <Text style={styles.yellowCardText}>
{t("identifyWarning")}
      </Text>
    </View>

  </View>
</View>

      <Text style={styles.title}>
      {topPredictions.length > 0
        ? topPredictions[0].plant:
        t("unknownPlant")}
    </Text>


      {plant.info && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("plantInformation")}</Text>

          <Text style={styles.text}>
            <Text style={styles.label}>{t("scientificName")}: </Text>
{plant.info.scientific_name || t("na")}
          </Text>

          <Text style={styles.text}>
<Text style={styles.label}>{t("family")}: </Text>
            {plant.info.family || "N/A"}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>{t("genus")}: </Text>
            {plant.info.genus || t("na")}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>{t("commonNames")}:</Text>
            {plant.info.common_names?.length > 0
              ? plant.info.common_names.join(", ")
              : t("na")}
          </Text>
        </View>
      )}

      {plant.top5_predictions && (
  <View style={styles.lastCard}>
    <Text style={styles.cardTitle}>{t("topPredictions")}</Text>

    {plant.top5_predictions.map((item, index) => (
      <Text key={index} style={styles.text}>
        {index + 1}. {item.plant}
      </Text>
    ))}
  </View>
)}

{/*Button to Diagnose Again */}
      <TouchableOpacity
        style={styles.diagnoseButton}
        onPress={() => navigation.navigate("Identify")}
      >
        <Text style={styles.diagnoseButtonText}>{t("identifyAgain")}</Text>
      </TouchableOpacity>

{/* Button to Go Back Home */}
<TouchableOpacity
  style={styles.HomeButton}
  onPress={() => navigation.navigate("Home1")}
>
  <Text style={styles.HomeButtonText}>{t("backToHome")}</Text>
</TouchableOpacity>

    </ScrollView>
      <FooterTab activeTab="" />

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop:35,
    backgroundColor: "#fff",
  },
lastCard: {
  backgroundColor: "#ffffff",
  marginHorizontal: 15,
  marginBottom: 55,
  padding: 15,
  borderRadius: 12,
  elevation: 3,
  marginTop: 15,
},
 header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },

  yellowCard: {
    backgroundColor: "#FFF3C4",
    marginTop: 15,
    padding: 12,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 10,
    width:"100%",
  },

  yellowCardText: {
    color: "#6B5E2E",
    fontSize: 14,
    lineHeight:22,
    textAlign:"center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    color: "#2e7d32",
  },

  confidence: {
    textAlign: "center",
    fontSize: 16,
    color: "#388e3c",
    marginTop: 5,
  },

  source: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 15,
    marginBottom: 5,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    marginTop:15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1b5e20",
  },

  text: {
    fontSize: 15,
    marginBottom: 6,
    color: "#333",
  },

  label: {
    fontWeight: "bold",
    color: "#000",
  },
  diagnoseButton: {
  marginTop: 20,
  backgroundColor: "#2e7d32",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",

  // iOS Shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,

  // Android Shadow
  elevation: 5,
},

diagnoseButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

HomeButton: {
  marginTop: 20,
  marginBottom: 30,
  backgroundColor: "#2e7d32",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",

  // iOS Shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,

  // Android Shadow
  elevation: 5,
},

HomeButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
});