import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Result({ route, navigation }) {
  const { plant, photoUri } = route.params;

  return (
    <ScrollView style={styles.container}>
      
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoUri }} style={styles.image} />
        
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        
        {/* Plant Name */}
        <Text style={styles.title}>{plant.name || "Unknown Plant"}</Text>

        {/* Confidence */}
        <Text style={styles.confidence}>
          Confidence: {(plant.confidence * 100).toFixed(2)}%
        </Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>
          {plant.description || "No description available."}
        </Text>

        {/* Extra Info (if exists in JSON) */}
        {plant.uses && (
          <>
            <Text style={styles.sectionTitle}>Uses</Text>
            <Text style={styles.text}>{plant.uses}</Text>
          </>
        )}

        {plant.habitat && (
          <>
            <Text style={styles.sectionTitle}>Habitat</Text>
            <Text style={styles.text}>{plant.habitat}</Text>
          </>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 300,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },

  confidence: {
    fontSize: 16,
    color: "green",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
});