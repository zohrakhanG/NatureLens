import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/Discover";
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";


export default function DiscoverUsage({ navigation }) {
              const { t, i18n } = useTranslation();

              const currentLanguage = i18n.language;

  const [flowerData, setFlowerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const fetchPlants = async () => {

    try {

      const data = await apiFetch({
        endpoint: `/discover/?lang=${currentLanguage}`,
        auth: true,
      });

      const formattedData = data.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        image: item.image_url,
      }));

      setFlowerData(formattedData);

    } catch (error) {

      console.log("Error fetching plants:", error.message);

    } finally {

      setLoading(false);

    }
  };

  fetchPlants();

}, [currentLanguage]);

  const filteredData = flowerData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop: 10, color: "#4a6a3b" }}>
          {t("loadingPlants")}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      {/* FIXED HEADER */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("discoverUsage")}</Text>
        </View>

        {/* FIXED SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#8aa78a"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={t("searchPlants")}
            placeholderTextColor="#8aa78a"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* SCROLLABLE CONTENT */}
        <FlatList
          data={filteredData}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}

          ListHeaderComponent={() => (
            <View style={styles.greenCard}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="leaf-outline"
                  size={24}
                  color="#8bb29f"
                  style={{ marginRight: 18 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.greenCardTitle}>
                   {t("plantsWithPurpose")}
                  </Text>
                  <Text style={styles.greenCardText}>
                    {t("plantsPurposeText")}
                  </Text>
                </View>
              </View>
            </View>
          )}

          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.flowerCard}
              onPress={() =>
                navigation.navigate("DiscoverSinglePlant", {
                  plantId: item.id,
                })
              }
            >
<Image
  source={{ uri: item.image }}
  style={styles.flowerImage}
/>
              <Text style={styles.flowerName}>{item.name}</Text>
            </TouchableOpacity>
          )}

          ListEmptyComponent={
            filteredData.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: "grey", fontSize: 16 }}>
                  {t("noResultsFound")}
                </Text>
              </View>
            ) : null
          }
        />
      </View>

      <FooterTab activeTab="" />
    </View>
  );
}