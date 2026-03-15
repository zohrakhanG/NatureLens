import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import styles from "../Styles/SignIn_Up";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { apiFetch } from "../Screens/fetchToken";


export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);


  
  const handleTermsPress = () => {
    navigation.navigate("TermsAndPolicy");
  };

  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmpassword.trim();

    // -------------------------
    // FRONTEND VALIDATION
    // -------------------------
    if (!trimmedUsername) { alert("Please enter a username"); return; }
    if (trimmedUsername.length > 20) { alert("Username cannot exceed 20 characters"); return; }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) { alert("Please enter a valid email address"); return; }

    if (trimmedPassword.length < 8) { alert("Password must be at least 8 characters"); return; }
    if (/\s/.test(trimmedPassword)) { alert("Password cannot contain spaces"); return; }

    if (trimmedPassword !== trimmedConfirm) { alert("Passwords do not match"); return; }

    if (!isChecked) { alert("You must agree to the terms and policy"); return; }

    // -------------------------
    // BACKEND API CALL
    // -------------------------
      try {
        const data = await apiFetch({
          endpoint: "/signup/",
          method: "POST",
          bodyData: { username, email, password },
          auth: false,
          storeToken: true,  // store token after signup
        });

        navigation.navigate("Onboarding1");
      } catch (error) {
        Alert.alert("Signup Failed", error.message);
      }
    };

  return (
    <ImageBackground
      source={require("../assets/sign_frame.jpg")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subText}>Create an Account</Text>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#8aa78a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#8aa78a"
            onChangeText={setUsername}
            value={username}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#8aa78a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8aa78a"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password */}
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
            <Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={25} color="#8aa78a"/>
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#8aa78a" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!confirmpasswordVisible}
            placeholderTextColor="#8aa78a"
            onChangeText={setconfirmPassword}
            value={confirmpassword}
          />
          <TouchableOpacity onPress={() => setconfirmPasswordVisible(!confirmpasswordVisible)}>
            <Ionicons name={confirmpasswordVisible ? "eye-outline" : "eye-off-outline"} size={25} color="#8aa78a"/>
          </TouchableOpacity>
        </View>

        {/* Terms Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#388e3c" : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.Textfont}>
            I agree with the{' '}
            <Text style={styles.linkfont} onPress={handleTermsPress}>Terms and Policy</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Navigate to Sign In */}
        <Text style={styles.Textfont}>
          Already have an account?{' '}
          <Text style={[styles.linkfont, { fontWeight: "bold" }]} onPress={() => navigation.navigate("SignIn")}>
            Sign In
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}