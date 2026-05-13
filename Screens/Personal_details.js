import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { apiFetch } from "../Services/fetchToken";
import { useTranslation } from "react-i18next";


export default function PersonalDetails({ navigation }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const data = await apiFetch({
        endpoint: "/user/",
        method: "GET",
        auth: true,
      });

      setUsername(data.username);
      setEmail(data.email);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Save changes
  const handleSave = async () => {
  try {
    //Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
Alert.alert(t("error"), t("validEmail"));
      return;
    }

    //Password validation only if user is changing it
    if (password) {
      if (password.length < 8) {
        Alert.alert(t("error"), t("passwordMin"));
        return;
      }

      if (/\s/.test(password)) {
        Alert.alert(t("error"), t("passwordSpaces"));
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert(t("error"), t("passwordsNoMatch"));
        return;
      }
    }

   await apiFetch({
        endpoint: "/user/update/",
        method: "PUT",
        auth: true,
        bodyData: {
            username,
            email,
            password: password ? password : undefined,
        },
        });

    Alert.alert(t("success"), t("profileUpdated"));
    setEditing(false);
    setPassword("");
    setConfirmPassword("");
    navigation.navigate("Home1")
  } catch (error) {
    console.log(error);
    Alert.alert(t("error"), t("profileUpdateFailed"));
  }
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("personalDetails")}</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {/* Username */}
        <Text style={styles.label}>{t("username")}</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          editable={editing}
        />

        {/* Email */}
        <Text style={styles.label}>{t("email")}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={editing}
        />

        {/* Password */}
        <Text style={styles.label}>{t("password")}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder={t("enterNewPassword")}
            editable={editing}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password (only if password entered) */}
        {editing && password.length > 0 && (
          <>
            <Text style={styles.label}>{t("confirmPassword")}</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              placeholder={t("confirmPassword")}
            />
          </>
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        {!editing ? (
          <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}>{t("edit")}</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{t("saveChanges")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#999" }]}
              onPress={() => {
                setEditing(false);
                fetchUser();
                setPassword("");
                setConfirmPassword("");
              }}
            >
              <Text style={styles.buttonText}>{t("cancel")}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    marginTop: 35,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 45,
    left: 15,
    right: 15,
  },

  button: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});