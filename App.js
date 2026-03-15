import { useEffect,useState } from "react";
import { BackHandler } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InactivityHandler from "./Screens/InactivityHandler";


import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import Onboarding1 from "./Screens/Onboarding1";
import Onboarding2 from "./Screens/Onboarding2";
import Onboarding3 from "./Screens/Onboarding3";
import Onboarding4 from "./Screens/Onboarding4";
import Onboarding5 from "./Screens/Onboarding5";
import Onboarding6 from "./Screens/Onboarding6";
import Home1 from "./Screens/Home1";
import Identify from "./Screens/Identify";
import Diagnose from "./Screens/Diagnose";
import Discover from "./Screens/Discover";
import DiscoverSinglePlant from "./Screens/DiscoverSinglePlant";
import Journal from "./Screens/Journal";
import Weather_Water_alerts from "./Screens/Weather_Water_alerts";
import TermsAndPolicy from "./Screens/T&P";
import PrivacyPolicy from "./Screens/PrivacyPolicy";
import TOU from "./Screens/TOU";
import Notifications from "./Screens/Notifications";
import DeleteAccount from "./Screens/DeleteAccount";
import ThankYou from "./Screens/ThankYou";
import HerbalVault from "./Screens/HerbalVault";
import HerbalSingle from "./Screens/HerbalSingle";
import Tutorials from "./Screens/Tutorials";
import VideoPlayer from "./Screens/VideoPlayer";
import You from "./Screens/You";
import { WeatherProvider } from "./Screens/WeatherContext";


const Stack = createNativeStackNavigator();

export default function App() 
{
  const [currentRoute, setCurrentRoute] = useState("SignIn");

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const backAction = () => {
      const routeName = navigationRef.getCurrentRoute()?.name;

      if ([
        "Onboarding1","Onboarding2","Onboarding3","Onboarding4","Onboarding5","Onboarding6",
        "Home1","SignIn","SignUp"
      ].includes(routeName)) 
      {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [navigationRef]);

  return (
    <WeatherProvider> 
      <NavigationContainer ref={navigationRef}
        onStateChange={() => {
          const current = navigationRef.getCurrentRoute()?.name;
          setCurrentRoute(current);
        }}
      >    
        <InactivityHandler currentRoute={currentRoute}>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Onboarding1" component={Onboarding1} />
            <Stack.Screen name="Onboarding2" component={Onboarding2} />
            <Stack.Screen name="Onboarding3" component={Onboarding3} />
            <Stack.Screen name="Onboarding4" component={Onboarding4} />
            <Stack.Screen name="Onboarding5" component={Onboarding5} />
            <Stack.Screen name="Onboarding6" component={Onboarding6} />
            <Stack.Screen name="Home1" component={Home1} />
            <Stack.Screen name="Identify" component={Identify} />
            <Stack.Screen name="Diagnose" component={Diagnose} />
            <Stack.Screen name="Discover" component={Discover} />
            <Stack.Screen name="DiscoverSinglePlant" component={DiscoverSinglePlant} />
            <Stack.Screen name="Journal" component={Journal} />
            <Stack.Screen name="Weather_Water_alerts" component={Weather_Water_alerts} />
            <Stack.Screen name="TermsAndPolicy" component={TermsAndPolicy} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TOU" component={TOU} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
            <Stack.Screen name="ThankYou" component={ThankYou} />
            <Stack.Screen name="HerbalVault" component={HerbalVault} />
            <Stack.Screen name="HerbalSingle" component={HerbalSingle} />
            <Stack.Screen name="Tutorials" component={Tutorials} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
            <Stack.Screen name="You" component={You} />

          </Stack.Navigator>
        </InactivityHandler>
        
      </NavigationContainer>
    </WeatherProvider>
  );
}
