import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "#8bb29f",
    padding: 15,
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: "#E64700",
    padding: 15,
    borderRadius: 50,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});