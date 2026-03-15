import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
  flex: 1,
  width: "100%",
  height: "100%",
},

overlayContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
},

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "black",
    marginBottom: 35,
  },
  inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#ffffff",
  borderRadius: 10,
  borderWidth: 1.5,
  borderColor: "#228B22",
  paddingHorizontal: 15,
  marginBottom: 15,
  width: "100%",
  height: 50,
},
icon: {       //on the left of the input fields
  marginRight: 14,
},
input: {
  flex: 1,
  height: "100%",
  color: "black",
},
button: {
    width: "80%",
    height: 50,
    backgroundColor: "#388e3c",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
 Textfont: {
  fontSize: 14,
  color: "black",
  marginTop:20,
},
linkfont: {
  color: "#228B22",
},
checkboxContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop:-20,
  marginBottom:30,
},
checkbox: {
  marginRight: 8,
  marginTop:23,
},

});

export default styles;