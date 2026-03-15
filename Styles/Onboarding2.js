import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop:45,
  },
  textContainer: {
    position: "absolute",
    top: 60,             
    alignItems: "center",  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontFamily: "Georgia",
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeadingText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
  },
  subText: {
    fontSize: 17,
    color: "#808080",
    marginBottom:60,
    marginTop:40,
  },
language_selection_container: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
},
  card: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  radioOuter: {   // for the radio button outer circle
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: { //for the radio button inside (appears when selected)
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#555555",
  },
  button: {
  width: "47%",
  height: 50,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
},
buttonText: {
  color: "#ffffff",
  fontSize: 18,
},
buttonContainer: {
  width: "100%",
  backgroundColor: "#E0E0E0",
  paddingVertical: 13,
  alignItems: "center",
  marginTop: 20,
},

buttonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
  marginBottom:25,
  width: "100%",
},
  skipButton: {
  backgroundColor: "#ffffff",
  borderWidth: 1,
  borderColor: "#cccccc",
  marginLeft:7,
},
skipButtonText: {
  color: "#000000",
},
nextButton: {
  backgroundColor: "#388e3c",
  marginRight:7,
},
});
export default styles;
