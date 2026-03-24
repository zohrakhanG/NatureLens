import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';


export default function Identify({ navigation }) {
  const permissionHook = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [flashMode, setFlashMode] = useState('off');

  if (!permissionHook) return <View />;
  const [permission, requestPermission] = permissionHook;
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Photo clicked:", photo.uri);
      setPhotoUri(photo.uri);
    }
  };

  const resetPhoto = () => setPhotoUri(null);

const confirmPhoto = async () => {
  try {
    console.log("Photo URI:", photoUri);

    let formData = new FormData();

    formData.append("file", {
      uri: photoUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    const response = await fetch("http://192.168.100.57:8000/api/predict/", {
      method: "POST",
      body: formData,
    });


    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (err) {
      console.error("JSON parse failed:", err);
      return;
    }

    navigation.navigate("Result", { 
      plant: data,
      photoUri: photoUri 
    });

  } catch (error) {
    console.error("Error sending image:", error);
  }
};



  const toggleFlash = () => {
    setFlashMode((prev) => (prev === 'off' ? 'on' : 'off'));
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.camera} />
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} flash={flashMode} />
      )}

      {/* Top bar with back on left and flash on right */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFlash}>
          {flashMode === 'off' && <Ionicons name="flash-off-outline" size={26} color="#ffffff" />}
          {flashMode === 'on' && <Ionicons name="flash-outline" size={26} color="#ffd700" />}
        </TouchableOpacity>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        {photoUri ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.circleButton} onPress={resetPhoto}>
              <Ionicons name="refresh-outline" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={confirmPhoto}>
              <Ionicons name="checkmark-outline" size={28} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
            <View style={styles.shutterInner}>
              <Ionicons name="aperture-outline" size={28} color="black" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    borderWidth: 0,
  },
});
