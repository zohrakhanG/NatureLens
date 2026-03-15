import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 10,
  },
  plantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  plantImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: "#f5faf4",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // shadow for Android
    elevation: 5,
  },
  boxOutline: {
  backgroundColor: '#fff',  
  borderRadius: 15,               
  padding: 15,              
  marginBottom: 15,              
  borderWidth: 1,               
  borderColor: 'grey', 
  // shadow for iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  // shadow for Android
  elevation: 5,
},
  infoBoxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#527D5F",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4a6a3b",
    marginTop: 5,
  },
  infoValue: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#527D5F",
  },
  sectionText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
    lineHeight: 20,
  },
});
