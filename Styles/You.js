import { StyleSheet,Dimensions } from "react-native";


const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop:35,
    backgroundColor: "#fff",
  },
button: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
},
buttonText: {
  fontSize: 15,
},
profileImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginLeft:3,
},
box: {
  backgroundColor: "#f0f0f0",
  borderRadius: 10,
  padding: 10,
  marginBottom: 15,
},
boxLabel: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
},
logoutText: {
  color: "red",
  fontWeight: "bold",
  fontSize: 16,
  marginBottom:10,
  marginLeft:15,
},
deleteText: {
  color: "black",
  fontWeight: "bold",
  fontSize: 16,
  marginLeft:15,
},
});
export default styles;