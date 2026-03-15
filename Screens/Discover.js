import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/Discover"; 
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Screens/fetchToken";

export default function DiscoverUsage({ navigation }) {
  const [flowerData, setFlowerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchPlants = async () => {
    try {
      const data = await apiFetch({
        endpoint: "/discover/",
        auth: true,  // require token
      });

      const formattedData = data.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        image: { uri: item.image_url },
      }));

      setFlowerData(formattedData);
    } catch (error) {
      console.log("Error fetching plants:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchPlants();
}, []);


  // Filter based on search query
  const filteredData = flowerData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop: 10, color: "#4a6a3b" }}>Loading plants...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Padded content wrapper */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discover usage</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8aa78a" style={{ marginRight: 5 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for plants"
            placeholderTextColor="#8aa78a"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {/* Green Card */}
        <View style={styles.greenCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="leaf-outline" size={24} color="#8bb29f" style={{ marginRight: 18 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.greenCardTitle}>Plants with Purpose</Text>
              <Text style={styles.greenCardText}>
                Explore how plants are used in food, medicine and daily life
              </Text>
            </View>
          </View>
        </View>

        {/* Flower Cards Grid */}
        <FlatList
          data={filteredData}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.flowerCard} 
              onPress={() => navigation.navigate("DiscoverSinglePlant", { plantId: item.id })}
            >
              <Image source={item.image} style={styles.flowerImage} />
              <Text style={styles.flowerName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            filteredData.length === 0 ? (
              <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: "grey", fontSize: 16 }}>No results found</Text>
              </View>
            ) : null
          }
        />
      </View>

      {/* Footer spans full width */}
      <FooterTab activeTab="" />
    </View>
  );
}
