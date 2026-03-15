import { StyleSheet } from "react-native";

export default StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop:35,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  heading:{
    fontSize: 19,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 15,
    color: "#2e7d32",
    textAlign:'center',
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  doneButton: {
 width: "85%",
  height: 50,
  backgroundColor: "#56AE57",
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  marginBottom:25,
  position: "absolute",   // fixed position
  bottom: 20,             // distance from bottom
  left: "10%",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
