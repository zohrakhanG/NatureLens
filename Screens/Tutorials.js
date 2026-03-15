import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Video } from 'expo-av';
import styles from "../Styles/Tutorials";

// Videos array
const videoData = [
  { id: "1", title: "How to Plant a Seed", video: require("../assets/planting_vid.mp4") },
  { id: "2", title: "Tips to Water a Plant", video: require("../assets/plant_watering_vid.mp4") },
  { id: "3", title: "Weather Condition Precautions", video: require("../assets/weather_precautions_vid.mp4") },
  { id: "4", title: "5 Common Plant Care Mistakes to Avoid", video: require("../assets/common_mistakes_vid.mp4") },
];

export default function Tutorials({ navigation }) {


 const renderVideoCard = ({ item }) => (
  <TouchableOpacity
    style={styles.videoCard}
    onPress={() =>
      navigation.navigate("VideoPlayer", {
        video: item.video,
        title: item.title,
      })
    }
  >
    <Video
      source={item.video}
      style={styles.videoThumbnail}
      useNativeControls={false} // show thumbnail only
      resizeMode="cover"
      shouldPlay={false}        // paused
    />
    <Text style={styles.videoTitle}>{item.title}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant Care Tutorials</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#8aa78a" style={{ marginRight: 5 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tutorials"
          placeholderTextColor="#8aa78a"
        />
      </View>

      {/* Video list */}
      <FlatList
        data={videoData}
        renderItem={renderVideoCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}
