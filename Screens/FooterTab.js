import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../Styles/FooterTab";

export default function FooterTabs({ activeTab = "" }) {
  const navigation = useNavigation();

  const tabs = [
    { label: "Home", screen: "Home1", icon: "home-outline", activeIcon: "home" },
    { label: "Community", screen: "Community", icon: "people-outline", activeIcon: "people" },
    { label: "You", screen: "You", icon: "person-outline", activeIcon: "person" },
  ];

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: "#fff" }}>
      <View style={styles.footerContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.screen;
          return (
            <TouchableOpacity
              key={tab.screen}
              style={styles.tab}
              onPress={() => navigation.navigate(tab.screen)}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? "#4a6a3b" : "gray"}
              />
              <Text style={[styles.tabText, isActive && { color: "#4a6a3b" }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
