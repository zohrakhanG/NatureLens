import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Pressable, Dimensions } from "react-native";
import { useState, useRef, useContext } from "react";
import styles from "../Styles/Home1";
import Weather from "../Screens/Weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FooterTab from "../Screens/FooterTab";
import { WeatherContext } from "./WeatherContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home1({ navigation }) {
  const { weatherData, locationName, latitude, longitude } = useContext(WeatherContext);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

const openPanel = () => {
  setIsPanelOpen(true);
  Animated.timing(slideAnim, {
    toValue: 0, // fully visible
    duration: 300,
    useNativeDriver: true,
  }).start();
};

const closePanel = () => {
  Animated.timing(slideAnim, {
    toValue: SCREEN_WIDTH,
    duration: 300,
    useNativeDriver: true,
  }).start(() => setIsPanelOpen(false));
};

  // Dummy user info
  const username = "Meerub Khan";
  const profileImage = require("../assets/profile_pic.png");

const AccountButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {icon}
      <Text style={styles.buttonText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#808080" />
  </TouchableOpacity>
);

  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <TouchableOpacity onPress={openPanel}>
            <Ionicons name="cog-outline" color="black" size={27} />
          </TouchableOpacity>
        </View>

      {/* full width cards on home screen */}
      <View style={styles.fullCardContainer}>

      <Weather preloadedData={weatherData} locationName={locationName} />
      
        <View style={[styles.fullCard, { backgroundColor: "#cfb8a8", borderWidth: 0 }]}>
          <View style={{ flexDirection: "row", alignItems: "center",paddingTop:10 }}>
            <MaterialCommunityIcons name="flower-tulip-outline" size={24} color="#5C4742" style={{ marginRight: 8, marginLeft:8 }} />
            <Text style={[styles.cardText, {fontSize:20, color:'#5C4742'}]}>Fun Fact!</Text>
          </View>
            <Text style={[{fontSize:15, paddingLeft:20,paddingRight:20,paddingTop:6,color:'#5C4742'}]}>Sunflowers can clean up toxic soil by absorbing heavy metals, they’re nature’s vacuum cleaners!</Text>
        </View>

        <TouchableOpacity style={styles.fullCard} onPress={() => navigation.navigate("Identify")}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, flex: 1,}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="camera-outline" size={24} color="#8bb29f" style={{ marginRight:18 }}/>
              <View style={{ justifyContent: "center" }}> 
                <Text style={styles.cardText}>Identify</Text>
                <Text style={{ fontSize: 16, color: "#808080" }}>Plant</Text>
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
                <Text style={styles.cardText}>Diagnose</Text>
                <Text style={{ fontSize: 16, color: "#808080" }}>Disease</Text>
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
                <Text style={styles.cardText}>Discover</Text>
                <Text style={{ fontSize: 16, color: "#808080" }}>Usage</Text>
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
            <Text style={{ fontSize: 17, fontWeight: "700" }}>Plant Care Tutorials</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>


        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("HerbalVault")}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <MaterialCommunityIcons name="treasure-chest-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>Herbal Vault</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>


        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("Weather_Water_alerts", {latitude,longitude})}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <MaterialCommunityIcons name="water-alert-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>Weather & Water Alerts</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.halfCard} onPress={() => navigation.navigate("Journal")}>
          <View style={{ flexDirection: "column", alignItems: "flex-start", padding: 10 }}>
            <Ionicons name="journal-outline" size={26} color="#8bb29f" style={{ marginBottom: 5 }}/>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>Plant Growth Journal</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#808080" style={{position: "absolute",bottom: 10,right: 10,}}/>
        </TouchableOpacity>
      </View>
    </ScrollView>

    {/* Right-side panel */}
    {isPanelOpen && (
      <>
        {/* Blurry overlay */}
        <Pressable style={styles.overlay} onPress={closePanel} />

        {/* Sliding panel */}
        <Animated.View style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}>
          {/* Profile */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginTop: 20,
            }} >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color="#000"
              onPress={closePanel}
              style={{ alignSelf: 'flex-start', marginLeft:-15 }}
            />
            <Image source={profileImage} style={styles.profileImage} />
            <Text style={{fontSize: 18,fontWeight: 'bold', textAlign: 'center',flexWrap: 'wrap', marginBottom:15,}}>
              {username}
            </Text>
          </View>

          {/* Account Box */}
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Account</Text>
            <AccountButton
              icon={<MaterialCommunityIcons name="account-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
              label="Personal Details"/>
            <AccountButton
              icon={<MaterialCommunityIcons name="shield-outline" size={22} color="#5C4742" style={{ marginRight: 10 }}/>}
              label="Privacy Policy"
              onPress={() => navigation.navigate("PrivacyPolicy")}/>
            <AccountButton
              icon={<MaterialCommunityIcons name="file-document-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
              label="Terms of Use"
              onPress={() => navigation.navigate("TOU")}/>
          </View>

          {/* Settings Box */}
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Settings</Text>
            <AccountButton
              icon={<Ionicons name="settings-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
              label="Account Preferences"
            />
            <AccountButton
              icon={<MaterialCommunityIcons name="shield-account-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
              label="Account Privacy"
            />
            <AccountButton
              icon={<Ionicons name="notifications-outline" size={22} color="#5C4742" style={{ marginRight: 10 }} />}
              label="Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />
            <AccountButton
              icon={<MaterialCommunityIcons name="headset" size={21} color="#5C4742" style={{ marginRight: 10 }} />}
              label="Help & Support"
            />
          </View>

          {/* Logout/Delete */}
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.replace("SignIn")}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate("DeleteAccount")}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </>
    )}

    <FooterTab activeTab="Home1" navigation={navigation} /> 
    </View>
  );
}
