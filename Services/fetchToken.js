import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.100.58:8000/api";

/**
 * Generic API fetch helper
 * 
 * @param {string} endpoint - API endpoint (e.g., '/login/')
 * @param {string} method - HTTP method, defaults to 'GET'
 * @param {object|null} bodyData - Request body, for POST/PUT/PATCH
 * @param {boolean} auth - whether this request requires token
 * @param {boolean} storeToken - whether to store returned token in AsyncStorage
 */
export const apiFetch = async ({
  endpoint,
  method = "GET",
  bodyData = null,
  auth = false,
  storeToken = false,
  isFormData = false, 
}) => {
const headers = {};
if (!isFormData) {
  headers["Content-Type"] = "application/json"; 
}

  if (auth) {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found for authenticated request");
    headers["Authorization"] = `Token ${token}`;
  }

  const options = { method, headers };
if (bodyData) {
  options.body = isFormData ? bodyData : JSON.stringify(bodyData);
}

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const text = await response.text();
console.log("RAW RESPONSE:", text);

let data;
try {
  data = JSON.parse(text);
} catch {
  throw new Error("Non-JSON response: " + text);
}

if (!response.ok) {
  console.log(" BACKEND ERROR:", data);
  throw new Error(JSON.stringify(data));
}

  if (storeToken && data.token) {
    await AsyncStorage.setItem("token", data.token);
  }

  return data;
};