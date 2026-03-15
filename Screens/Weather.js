import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Weather({ preloadedData, locationName}) 
{
  const weatherData = preloadedData;

  const weatherIcons = {
    0: "sunny-outline",
    1: "partly-sunny-outline",
    2: "cloud-outline",
    3: "rainy-outline",
    45: "cloud-outline",
    61: "rainy-outline",
    63: "rainy-outline",
    80: "rainy-outline",
    95: "thunderstorm-outline",
  };

  const weatherColors = {
    0: "#FFD700",
    1: "#B0C4DE",
    2: "#A9A9A9",
    3: "#528AAE",
    45: "#A9A9A9",
    61: "#528AAE",
    63: "#528AAE",
    80: "#528AAE",
    95: "#1F3B4D",
  };

  const weatherDescriptions = {
    0: "Clear",
    1: "Partly Cloudy",
    2: "Cloudy",
    3: "Rainy",
    45: "Fog",
    61: "Showers",
    63: "Rain",
    80: "Heavy Rain",
    95: "Thunderstorm",
  };


  // Safe destructuring with correct Open-Meteo keys
  const weatherCode = weatherData?.current_weather?.weathercode ?? 0;
  const temp = weatherData?.current_weather?.temperature ?? "--";
  const dailyMax = weatherData?.daily?.temperature_2m_max?.[0] ?? "--";
  const dailyMin = weatherData?.daily?.temperature_2m_min?.[0] ?? "--";
  const description = weatherDescriptions[weatherCode] || "Clear";
  const iconColor = weatherColors[weatherCode] || "#528AAE";

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  return (
    <View style={[styles.card, { borderColor: iconColor }]}>
      <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.leftText}>Today,</Text>
          <Text style={styles.leftSubText}>{dateStr}</Text>
          <Text style={styles.leftSubText}>{locationName.city} {locationName.country ? `, ${locationName.country}` : ""}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.tempText}>{temp}°C</Text>
            <Ionicons name={weatherIcons[weatherCode] || "sunny-outline"} size={40} color={iconColor} style={{ marginLeft: 8 }}/>
          </View>
          <Text style={styles.descriptionText}>{description}</Text>
          <Text style={styles.minMaxText}>
            {dailyMax}°C / {dailyMin}°C
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  leftText: { fontSize: 18, fontWeight: "600" },
  leftSubText: { fontSize: 14, color: "#808080" },
  tempText: { fontSize: 24, fontWeight: "bold" },
  descriptionText: { fontSize: 14, color: "#808080" },
  minMaxText: { fontSize: 14, color: "#808080" },
});