import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/DiscoverSinglePlant";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";


export default function HerbalSingle({ route, navigation }) {
const { t, i18n } = useTranslation();

const currentLanguage = i18n.language;  const { herbId } = route.params;

const isUrdu = currentLanguage === "ur";

  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {

  const fetchHerb = async () => {

    try {

      const data = await apiFetch({
        endpoint: `/herbalVault/${herbId}/?lang=${currentLanguage}`,
        auth: true,
      });

      setHerb(data);

    } catch (error) {

      console.log(
        "Error fetching herb:",
        error.message
      );

      Alert.alert(
        t("error"),
        t("failedToLoadHerbDetails")
      );

    } finally {

      setLoading(false);

    }
  };

  fetchHerb();

}, [herbId, currentLanguage]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop:10 }}>{t("loadingHerbDetails")}</Text>
      </View>
    );
  }

  if (!herb) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>{t("herbNotFound")}</Text>
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
            <Text style={[styles.infoLabel, { fontSize: 20, paddingBottom:5 }]}>{t("scientificName")}:</Text>
            <Text style={[styles.infoValue, { fontSize: 16 }]}>{herb.scientific_name}</Text>
          </View>

          <View style={{ paddingBottom: 10 }}>
            <Text style={[styles.infoLabel, { fontSize: 20, paddingBottom:5 }]}>{t("about")}:</Text>
            <Text style={[styles.infoValue, { fontSize: 16 }]}>{herb.about}</Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>{t("herbInformation")}</Text>

            <View style={styles.infoRow}>

              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t("family")}:</Text>
                <Text style={styles.infoValue}>{herb.family}</Text>

                <Text style={styles.infoLabel}>{t("origin")}:</Text>
                <Text style={styles.infoValue}>{herb.origin}</Text>

                <Text style={styles.infoLabel}>{t("height")}:</Text>
                <Text style={styles.infoValue}>{herb.height}</Text>

                <Text style={styles.infoLabel}>{t("type")}:</Text>
                <Text style={styles.infoValue}>{herb.type}</Text>

              </View>

              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>{t("light")}:</Text>
                <Text style={styles.infoValue}>{herb.light}</Text>

                <Text style={styles.infoLabel}>{t("watering")}:</Text>
                <Text style={styles.infoValue}>{herb.watering}</Text>

                <Text style={styles.infoLabel}>{t("toxicity")}:</Text>
                <Text style={styles.infoValue}>{herb.toxicity}</Text>

                <Text style={styles.infoLabel}>{t("usdaZone")}:</Text>
                <Text style={styles.infoValue}>{herb.usda_zone}</Text>
              </View>

            </View>
          </View>


        {/* Key Benefits */}
<View style={[styles.boxOutline,{marginTop:15}]}>              

  <Text
    style={[
      styles.sectionTitle,
      {
        textAlign: isUrdu ? "right" : "left",
      }
    ]}
  >
    {t("keyBenefits")}
  </Text>

  {herb.key_benefits?.map((benefit, index) => (

    <Text
      key={index}
      style={[
        styles.sectionText,
        {
          textAlign: isUrdu ? "right" : "left",
          writingDirection: isUrdu ? "rtl" : "ltr",
        }
      ]}
    >
      {isUrdu ? ` •••   ${benefit} ` : `•••   ${benefit}`}
    </Text>

  ))}
</View>

        {/* Usage */}
<View style={[styles.boxOutline,{marginTop:15}]}>              

  <Text
    style={[
      styles.sectionTitle,
      {
        textAlign: isUrdu ? "right" : "left",
      }
    ]}
  >
    {t("usage")}
  </Text>

  {herb.usage_data?.map((item, index) => (

    <View key={index} style={{ marginBottom:10 }}>

      <Text
        style={{
          fontWeight:"bold",
          fontSize:16,
          textAlign: isUrdu ? "right" : "left",
          writingDirection: isUrdu ? "rtl" : "ltr",
        }}
      >
        {item.usage}
      </Text>

      <Text
        style={[
          styles.sectionText,
          {
            textAlign: isUrdu ? "right" : "left",
            writingDirection: isUrdu ? "rtl" : "ltr",
          }
        ]}
      >
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