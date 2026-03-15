// VideoPlayer.js
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

export default function VideoPlayer({ route, navigation }) {
  const { video } = route.params;

  return (
    <View style={styles.container}>
      {/* Back Button Overlay */}
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Video */}
      <Video
        source={video}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        isLooping={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2, // ensures overlay is above the video
    height: 100, // space for button
    paddingTop: 40, // for status bar / notch
    paddingLeft: 20,
  },
  backButton: {
    // TouchableOpacity wrapper
  },
  video: {
    flex: 1,
  },
});
