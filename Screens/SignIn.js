import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { apiFetch } from "../Screens/fetchToken";
import styles from "../Styles/SignIn_Up";
import { Ionicons } from "@expo/vector-icons";



export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


const handleSignIn = async () => {
  try {
    const data = await apiFetch({
      endpoint: "/login/",
      method: "POST",
      bodyData: { username, password },
      auth: false,
      storeToken: true,  // store the token from login
    });

    navigation.replace("Onboarding6");
  } catch (error) {
    Alert.alert("Login Failed", error.message);
  }
};

  return (
    <ImageBackground
      source={require("../assets/sign_frame.jpg")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subText}>Welcome back</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#8aa78a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#8aa78a"
            onChangeText={setUsername}
            value={username}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#8aa78a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#8aa78a"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={25} color="#8aa78a" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.Textfont}>
          Don't have an account?{" "}
          <Text
            style={[styles.linkfont, { fontWeight: "bold" }]}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}