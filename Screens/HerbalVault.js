import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/Discover"; 
import FooterTab from "../Screens/FooterTab";
import { apiFetch } from "../Screens/fetchToken";

export default function HerbalVault({ navigation }) {
  const [flowerData, setFlowerData] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHerbs = async () => {
      try {
        // Fetch all herbs
        const allHerbs = await apiFetch({ endpoint: "/herbalVault/", auth: true });

        const formattedData = allHerbs.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          image_url: item.image_url,
          about: item.about,
        }));
        setFlowerData(formattedData);

        // Fetch daily featured herb
        const featuredData = await apiFetch({ endpoint: "/daily-featured-herb/", auth: true });
        setFeatured(featuredData);

      } catch (error) {
        console.log("Error fetching herbs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHerbs();
  }, []);

  // Filter data based on search
  const filteredData = flowerData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const gridData = searchQuery ? filteredData : filteredData.filter(item => item.id !== (featured?.id?.toString()));

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4a6a3b" />
        <Text style={{ marginTop: 10, color: "#4a6a3b" }}>Loading herbs...</Text>
      </View>
    );
  }

  // Featured Herb Card as a component
  const FeaturedHerbCard = () => (
    featured && !searchQuery ? (
      <TouchableOpacity
        onPress={() => navigation.navigate("HerbalSingle", { herbId: featured.id })}
        style={{
          width: "100%",
          backgroundColor: "#f5faf4",
          borderRadius: 15,
          padding: 15,
          marginVertical: 10,
          borderWidth: 2,
          borderColor: "#ccc",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 23, color: "#997C70", marginBottom: 10, textAlign: "center", fontWeight: "bold" }}>
          Featured Herb of the Day
        </Text>
        <Image source={{ uri: featured.image_url }} style={{ width: "100%", height: 200, borderRadius: 10 }} resizeMode="cover" />
        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#997C70", marginTop: 10 }}>{featured.name}</Text>
        {featured.about && (
          <Text style={{ fontSize: 15, color: "#000", marginTop: 5 }} numberOfLines={2} ellipsizeMode="tail">
            {featured.about}
          </Text>
        )}
      </TouchableOpacity>
    ) : null
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Herbal Vault</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8aa78a" style={{ marginRight: 5 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for herbs"
            placeholderTextColor="#8aa78a"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Scrollable Content */}
        <FlatList
          ListHeaderComponent={<FeaturedHerbCard />}
          data={gridData}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.flowerCard}
              onPress={() => navigation.navigate("HerbalSingle", { herbId: item.id })}
            >
              <Image source={{ uri: item.image_url }} style={styles.flowerImage} />
              <Text style={styles.flowerName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            gridData.length === 0 && (
              <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: "grey", fontSize: 16 }}>No results found</Text>
              </View>
            )
          }
        />
      </View>

      <FooterTab activeTab="" />
    </View>
  );
}