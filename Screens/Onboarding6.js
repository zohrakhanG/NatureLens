import { View, Text, ImageBackground, Animated, Easing } from "react-native";
import styles from "../Styles/Onboarding6";
import { useEffect, useRef, useContext } from "react";
import * as Location from "expo-location";
import { WeatherContext } from "./WeatherContext";

export default function Onboarding6({ navigation }) {
  const progress = useRef(new Animated.Value(0)).current;

  // ✅ Access context setters
  const { setWeatherData, setLocationName, setLatitude, setLongitude } =
    useContext(WeatherContext);

  useEffect(() => {
    startLoadingSequence();
  }, []);

  const getCityCountry = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const response = await fetch(url, {
        headers: {
          "User-Agent": "NatureLens/1.0 (zohrakha20@gmail.com)",
          "Accept-Language": "en",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch geocoding data");

      const data = await response.json();

      const city =
        data.address.suburb ||
        data.address.neighbourhood ||
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.district ||
        data.address.state ||
        "";

      const country = data.address.country || "";
      return { city, country };
    } catch (err) {
      console.log("Geocoding API error:", err);
      return { city: "", country: "" };
    }
  };

  const startLoadingSequence = async () => {
    const firstAnimation = new Promise((resolve) => {
      Animated.timing(progress, {
        toValue: 0.85,
        duration: 3000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start(() => resolve());
    });

    let weatherData = null;
    let latitude = 43.651070;
    let longitude = -79.347015;
    let locationName = { city: "", country: "" };

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        try {
          const loc = await Location.getCurrentPositionAsync({});
          latitude = loc.coords.latitude;
          longitude = loc.coords.longitude;
        } catch (err) {
          console.log("Failed to get location:", err);
        }
      }

      const [weatherRes, geoRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        ).then((r) => r.json()),
        getCityCountry(latitude, longitude),
      ]);

      weatherData = weatherRes;
      locationName = geoRes;

      // ✅ Save data to central store
      setWeatherData(weatherData);
      setLocationName(locationName);
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (err) {
      console.log("Weather/Geo fetch error:", err);
    }

    await firstAnimation;

    await new Promise((resolve) => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(() => resolve());
    });

    // ✅ Navigate without passing params
    navigation.replace("Home1");
  };

  const widthAnimation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <ImageBackground
      source={require("../assets/onboarding6.jpeg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <Text style={[styles.mainHeadingText, { color: "green" }]}>
            Welcome to{" "}
          </Text>
          <Text style={styles.mainHeadingText}>NatureLens!</Text>
          <Text style={styles.subText}>
            Recognize plants, spot diseases and discover their benefits - all
            with AI
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[styles.progressBarFill, { width: widthAnimation }]}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
