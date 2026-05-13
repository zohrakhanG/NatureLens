import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/DiscoverSinglePlant";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";


export default function DiscoverSinglePlant({ route, navigation }) {
  const { t, i18n } = useTranslation();

const currentLanguage = i18n.language;
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const data = await apiFetch({
          endpoint: `/discover/${plantId}/?lang=${currentLanguage}`,
          auth: true,
        });
        setPlant(data);
      } catch (error) {
        console.log("Error fetching plant:", error.message);
        Alert.alert(t("error"), t("failedToLoadPlantDetails"));
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId, currentLanguage]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop: 10, color: "#4a6a3b" }}>{t("loadingPlantDetails")}</Text>
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "grey", fontSize: 16 }}>{t("plantDetailsNotFound")}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{plant.name}</Text>
        </View>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Image source={{ uri: plant.photo_url }} style={styles.plantImage} />

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>{t("detailedInformation")}</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t("family")}:</Text>
                <Text style={styles.infoValue}>{plant.family}</Text>

                <Text style={styles.infoLabel}>{t("origin")}:</Text>
                <Text style={styles.infoValue}>{plant.origin}</Text>

                <Text style={styles.infoLabel}>{t("height")}:</Text>
                <Text style={styles.infoValue}>{plant.height}</Text>
              </View>

              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t("light")}:</Text>
                <Text style={styles.infoValue}>{plant.light}</Text>

                <Text style={styles.infoLabel}>{t("watering")}:</Text>
                <Text style={styles.infoValue}>{plant.watering}</Text>

                <Text style={styles.infoLabel}>{t("toxicity")}:</Text>
                <Text style={styles.infoValue}>{plant.toxicity}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t("uses")}</Text>
          <Text style={styles.sectionText}>{plant.uses}</Text>

          <Text style={styles.sectionTitle}>{t("interestingFacts")}</Text>
          <Text style={styles.sectionText}>{plant.interesting_facts}</Text>
        </ScrollView>
      </View>

      <FooterTab activeTab="" />
    </View>
  );
}