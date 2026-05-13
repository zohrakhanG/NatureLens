import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Video } from "expo-av";

import {
  useState,
  useEffect,
} from "react";

import styles from "../Styles/Tutorials";

import { useTranslation } from "react-i18next";

import { apiFetch } from "../Services/fetchToken";


export default function Tutorials({ navigation }) {

  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");

  const [videoData, setVideoData] = useState([]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchTutorials();
  }, []);


  const fetchTutorials = async () => {

    try {

      setLoading(true);

      const response = await apiFetch({
        endpoint: "/tutorials/",
        method: "GET",
        auth: false,
      });

      console.log("TUTORIALS:", response);

      setVideoData(response || []);

    } catch (error) {

      console.log(
        "FETCH TUTORIALS ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  // Filter tutorials
  const filteredVideos = videoData.filter((item) =>
    item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


  const renderVideoCard = ({ item }) => (

    <TouchableOpacity
      style={styles.videoCard}

      onPress={() =>
        navigation.navigate(
          "VideoPlayer",
          {
            video: item.video_url,
            title: item.title,
          }
        )
      }
    >

      <Video
  source={{
    uri: item.video_url
  }}

  style={styles.videoThumbnail}

  useNativeControls={false}

  resizeMode="cover"

  shouldPlay={false}

  isLooping={false}
/>

      <Text style={styles.videoTitle}>
        {item.title}
      </Text>

    </TouchableOpacity>
  );


  return (

    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {t("plantCareTutorials")}
        </Text>

      </View>


      {/* Search */}
      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={20}
          color="#8aa78a"
          style={{ marginRight: 5 }}
        />

        <TextInput
          style={styles.searchInput}

          placeholder={t("searchTutorials")}

          placeholderTextColor="#8aa78a"

          value={searchQuery}

          onChangeText={setSearchQuery}
        />

      </View>


      {/* Tutorials List */}
      <FlatList

        data={filteredVideos}

        renderItem={renderVideoCard}

        keyExtractor={(item) =>
          item.id.toString()
        }

        contentContainerStyle={{
          padding: 15,
          flexGrow: 1,
        }}

        showsVerticalScrollIndicator={false}

        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyText}>

              {loading
                ? t("loading")
                : t("noTutorials")}

            </Text>

          </View>
        }
      />

    </View>
  );
}