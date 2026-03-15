import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/DiscoverSinglePlant";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Screens/fetchToken";

export default function DiscoverSinglePlant({ route, navigation }) {
  const { plantId } = route.params;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const data = await apiFetch({
          endpoint: `/discover/${plantId}/`,
          auth: true, // use token from AsyncStorage
        });
        setPlant(data);
      } catch (error) {
        console.log("Error fetching plant:", error.message);
        Alert.alert("Error", "Failed to load plant details. Make sure you're logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop: 10, color: "#4a6a3b" }}>Loading plant details...</Text>
      </View>
    );
  }

  if (!plant) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "grey", fontSize: 16 }}>Plant details not found</Text>
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
            <Text style={styles.infoBoxTitle}>Detailed Information</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Family:</Text>
                <Text style={styles.infoValue}>{plant.family}</Text>

                <Text style={styles.infoLabel}>Origin:</Text>
                <Text style={styles.infoValue}>{plant.origin}</Text>

                <Text style={styles.infoLabel}>Height:</Text>
                <Text style={styles.infoValue}>{plant.height}</Text>
              </View>

              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Light:</Text>
                <Text style={styles.infoValue}>{plant.light}</Text>

                <Text style={styles.infoLabel}>Watering:</Text>
                <Text style={styles.infoValue}>{plant.watering}</Text>

                <Text style={styles.infoLabel}>Toxicity:</Text>
                <Text style={styles.infoValue}>{plant.toxicity}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Uses</Text>
          <Text style={styles.sectionText}>{plant.uses}</Text>

          <Text style={styles.sectionTitle}>Interesting Facts</Text>
          <Text style={styles.sectionText}>{plant.interesting_facts}</Text>
        </ScrollView>
      </View>

      <FooterTab activeTab="" />
    </View>
  );
}