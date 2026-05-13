import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Pressable,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";


export default function VideoPlayer({
  route,
  navigation
}) {

  const { video, title } = route.params;

  const [showControls, setShowControls] =
    useState(true);

  const [isBuffering, setIsBuffering] =
    useState(false);


  // Expo Video Player
  const player = useVideoPlayer(
    video,
    (playerInstance) => {

      playerInstance.play();

      playerInstance.loop = false;
    }
  );


  // Track loading status
  player.addListener(
    "statusChange",
    (status) => {

      setIsBuffering(
        status.status === "loading"
      );
    }
  );


  return (

    <Pressable
      style={styles.container}
      onPress={() =>
        setShowControls(
          !showControls
        )
      }
    >

      <StatusBar hidden />


      {/* Video */}
      <VideoView
        player={player}
        style={styles.video}
        fullscreenOptions={{
          enable: true,
        }}
        allowsPictureInPicture
        contentFit="contain"
        nativeControls
      />


      {/* Buffer Loader */}
      {isBuffering && (

        <View style={styles.loaderContainer}>

          <ActivityIndicator
            size="large"
            color="#4CAF50"
          />

        </View>
      )}


      {/* Top Overlay */}
      {showControls && (

        <View style={styles.topOverlay}>

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="chevron-back-outline"
              size={34}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.videoTitle}>
            {title}
          </Text>

        </View>
      )}

    </Pressable>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  video: {
    flex: 1,
  },

  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: "center",
    alignItems: "center",

    zIndex: 20,
  },

  topOverlay: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    zIndex: 30,

    flexDirection: "row",
    alignItems: "center",

    paddingTop: 50,
    paddingHorizontal: 15,

    backgroundColor:
      "rgba(0,0,0,0.4)",
  },

  videoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",

    marginLeft: 10,

    flex: 1,
  },
});