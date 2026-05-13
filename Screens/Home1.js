import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Pressable, Dimensions } from "react-native";
import { useState, useContext, useEffect } from "react";
import styles from "../Styles/Home1";
import Weather from "../Screens/Weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FooterTab from "../Screens/FooterTab";
import { WeatherContext } from "./WeatherContext";
import { useTranslation } from "react-i18next";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home1({ navigation }) 
{
  const { t } = useTranslation();
  const { weatherData, locationName, latitude, longitude } = useContext(WeatherContext);
  const [funFact, setFunFact] = useState(null);
  
  const { i18n } = useTranslation();

const currentLanguage = i18n.language;
const isUrdu = currentLanguage === "ur";

useEffect(() => {

  const fetchFunFact = async () => {

    try {

      const response = await fetch(
        `http://192.168.100.58:8000/api/daily-fun-fact/?lang=${currentLanguage}`
      );

      const data = await response.json();

      setFunFact(data);

    } catch (error) {

      console.log(
        "Error fetching fun fact:",
        error
      );

    }
  };

  fetchFunFact();

}, [currentLanguage]);

  
  return (
    <View style={{ flex: 1 }}>

    
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>

        <View style={styles.topBar}>
  <Image
    source={require("../assets/logo.png")}
    style={styles.logo}
  />
</View>

      {/* full width cards on home screen */}
      <View style={styles.fullCardContainer}>

      <Weather preloadedData={weatherData} locationName={locationName} />
      
      <View style={[styles.fullCard,
          { 
            backgroundColor: "#BEB3AE",
            borderWidth: 0,
            height: "auto",       
            paddingVertical: 10    
          }]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "98%", paddingTop: 10 }}>
              <Ionicons name="leaf-outline" size={20} color="#352D2D" style={{ marginRight: 8, marginLeft: 8 }} />

              <Text style={[styles.cardText, { fontSize: 20, color: '#352D2D' }]}>
                {t("funFact")}
              </Text>

              <Ionicons name="leaf-outline" size={20} color="#352D2D" style={{ marginLeft: 8,transform: [{ scaleX: -1 }] }} />
            </View>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 20,
                paddingHorizontal: 20,
                paddingTop: 6,
                paddingBottom: 10,
                color: '#4A4040',

                textAlign: isUrdu ? "right" : "left",

                writingDirection: isUrdu ? "rtl" : "ltr",
              }}
            >
              {funFact ? funFact.text : t("loadingFunFact")}
            </Text>
        </View>

        <TouchableOpacity style={styles.fullCard} onPress={() => navigation.navigate("Identify")}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, flex: 1,}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="camera-outline" size={24} color="#8bb29f" style={{ marginRight:18 }}/>
              <View style={{ justifyContent: "center" }}> 
                <Text style={styles.cardText}>{t("identify")}</Text>
                <Text style={{ fontSize: 16, color: "#808080" }}>{t("plant")}</Text>
              </View>
            </View>
            <Image source={require("../assets/identify home.jpeg")} style={styles.leftImage}/>
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={styles.fullCard} onPress={() => navigation.navigate("Diagnose")}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, flex: 1,}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="stethoscope" size={24} color="#8bb29f" style={{ marginRight:18 }}/>
              <View style={{ justifyContent: "center" }}> 
                <Text style={styles.cardText}>{t("diagnose")}</Text>
                <Text style={{ fontSize: 16, color: "#808080" }}>{t("disease")}</Text>
              </View>
            </View>
            <Image source={require("../assets/diagnose home.jpg")} style={styles.leftImage}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fullCard} onPress={() => navigation.navigate("Discover")}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, flex: 1,}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="leaf" size={24} color="#8bb29f" style={{ marginRight:18 }}/>
              <View style={{ justifyContent: "center" }}> 
                <Text style={styles.cardText}>{t("discover")}</Text>
                <Text style={{ fontSize: 16, color: "#808080" }}>{t("usage")}</Text>
              </View>
            </View>
            <Image source={require("../assets/discover home.jpeg")} style={styles.leftImage}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.halfCardContainer}>

        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("Tutorials")}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <Ionicons name="videocam-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>{t("plantCareTutorials")}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>


        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("HerbalVault")}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <MaterialCommunityIcons name="treasure-chest-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>{t("herbalVault")}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>


        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("Weather_Water_alerts", {latitude,longitude})}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <MaterialCommunityIcons name="water-alert-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>{t("weatherWaterAlerts")}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("JournalList")}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <Ionicons name="journal-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>{t("plantGrowthJournal")}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>
      </View>
    </ScrollView>

    <FooterTab activeTab="Home1" navigation={navigation} /> 
    
    </View>
  );
}
