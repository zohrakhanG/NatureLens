import { useEffect, useRef } from "react";
import { AppState, Alert, PanResponder, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NO_INACTIVITY_SCREENS = [
  "SignIn",
  "SignUp",
  "Onboarding1",
  "Onboarding2",
  "Onboarding3",
  "Onboarding4",
  "Onboarding5",
  "Onboarding6",
  "VideoPlayer",
];

export default function InactivityHandler({ children, currentRoute }) {
  const INACTIVITY_TIME = 5* 60 * 1000;     //5 mins
  const timerRef = useRef(null);
  const navigation = useNavigation();

  const resetTimer = () => {
    if (NO_INACTIVITY_SCREENS.includes(currentRoute)) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, INACTIVITY_TIME);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logged Out",
      "You were inactive for too long.",
      [
        { text: "OK", onPress: () => navigation.navigate("SignIn") }
      ]
    );
  };

  useEffect(() => {
    if (!NO_INACTIVITY_SCREENS.includes(currentRoute)) {
      resetTimer();
    }

    // App background / foreground
    const appStateSub = AppState.addEventListener("change", (state) => {
      if (state === "active") resetTimer();
    });

    // Navigation changes
    const navSub = navigation.addListener("state", resetTimer);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      appStateSub.remove();
      navSub();
    };
  }, [currentRoute]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      resetTimer();
      return false;
    },
    onMoveShouldSetPanResponder: () => {
      resetTimer();
      return false;
    },
  });

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {children}
    </View>
  );
}
