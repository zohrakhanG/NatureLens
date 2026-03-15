import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/DiscoverSinglePlant";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Screens/fetchToken";

export default function HerbalSingle({ route, navigation }) {
  const { herbId } = route.params;

  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHerb = async () => {
      try {
        const data = await apiFetch({
          endpoint: `/herbalVault/${herbId}/`,
          auth: true,
        });

        setHerb(data);
      } catch (error) {
        console.log("Error fetching herb:", error.message);
        Alert.alert("Error", "Failed to load herb details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHerb();
  }, [herbId]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop:10 }}>Loading herb details...</Text>
      </View>
    );
  }

  if (!herb) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Herb not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, backgroundColor:"#fff" }}>

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="#000"/>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{herb.name}</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom:20 }}>

          {/* Herb Image */}
          <Image source={{ uri: herb.image_url }} style={styles.plantImage} />


          <View style={{ paddingBottom: 10 }}>
            <Text style={[styles.infoLabel, { fontSize: 20, paddingBottom:5 }]}>Scientific Name:</Text>
            <Text style={[styles.infoValue, { fontSize: 16 }]}>{herb.scientific_name}</Text>
          </View>

          <View style={{ paddingBottom: 10 }}>
            <Text style={[styles.infoLabel, { fontSize: 20, paddingBottom:5 }]}>About:</Text>
            <Text style={[styles.infoValue, { fontSize: 16 }]}>{herb.about}</Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>Herb Information</Text>

            <View style={styles.infoRow}>

              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Family:</Text>
                <Text style={styles.infoValue}>{herb.family}</Text>

                <Text style={styles.infoLabel}>Origin:</Text>
                <Text style={styles.infoValue}>{herb.origin}</Text>

                <Text style={styles.infoLabel}>Height:</Text>
                <Text style={styles.infoValue}>{herb.height}</Text>

                <Text style={styles.infoLabel}>Type:</Text>
                <Text style={styles.infoValue}>{herb.type}</Text>

              </View>

              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Light:</Text>
                <Text style={styles.infoValue}>{herb.light}</Text>

                <Text style={styles.infoLabel}>Watering:</Text>
                <Text style={styles.infoValue}>{herb.watering}</Text>

                <Text style={styles.infoLabel}>Toxicity:</Text>
                <Text style={styles.infoValue}>{herb.toxicity}</Text>

                <Text style={styles.infoLabel}>USDA Zone:</Text>
                <Text style={styles.infoValue}>{herb.usda_zone}</Text>
              </View>

            </View>
          </View>


          {/* Key Benefits */}
        <View style={[styles.boxOutline,{marginTop:15}]}>              

            <Text style={styles.sectionTitle}>Key Benefits</Text>
          {herb.key_benefits?.map((benefit, index) => (
            <Text key={index} style={styles.sectionText}>
              • {benefit}
            </Text>
          ))}
        </View>

          {/* Usage */}
        <View style={[styles.boxOutline,{marginTop:15}]}>              
        <Text style={styles.sectionTitle}>Usage</Text>
          {herb.usage_data?.map((item, index) => (
            <View key={index} style={{ marginBottom:10 }}>
              <Text style={{ fontWeight:"bold", fontSize:16 }}>
                {item.usage}
              </Text>

              <Text style={styles.sectionText}>
                {item.how_to_use}
              </Text>
            </View>
          ))}
        </View>

        </ScrollView>

      </View>

      <FooterTab activeTab="" />

    </View>
  );
}