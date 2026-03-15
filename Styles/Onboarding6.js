import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainHeadingText: {
    fontSize: 35,
    fontWeight: "800",
    color: "#000000",
    textAlign:'center',
  },
  subText: {
    marginTop:40,
    fontSize: 18,
    fontWeight: "600",
    color: "#808080",
    textAlign:'center',
  },
  backgroundImage: {
  flex: 1,
  width: "100%",
  height: "100%",
  justifyContent: "center", 
  alignItems: "center",    
},
container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

bodyContainer: {
  backgroundColor: "rgba(0,0,0,0)", // transparent
  alignItems: "center",
  paddingHorizontal: 20,
},
progressBarBackground: {
  width: "60%",
  height: 10,
  backgroundColor: "#d9d9d9",
  borderRadius: 10,
  alignSelf: "center",
  overflow: "hidden",
  position: "absolute",
  bottom: 250,
},
progressBarFill: {
  height: "100%",
  backgroundColor: "green",
  borderRadius: 10,
},
});
export default styles;
