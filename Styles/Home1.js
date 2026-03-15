import { StyleSheet,Dimensions } from "react-native";


const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop:15,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  profileContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
  marginTop:25,
},
profileImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 10,
},
username: {
  fontSize: 18,
  fontWeight: "bold",
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

buttonText: {
  fontSize: 15,
},
logoutText: {
  color: "red",
  fontWeight: "bold",
  fontSize: 16,
  marginBottom:10,
},
deleteText: {
  color: "black",
  fontWeight: "bold",
  fontSize: 16,
},

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    width: SCREEN_WIDTH * 0.7,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  panelTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  panelItem: { fontSize: 16, marginVertical: 10 },

  // FULL CARDS
  fullCardContainer: {
    marginTop: 10,
  },
  fullCard: {
  width: "100%",
  height: 120,
  backgroundColor: "#f5faf4",
  borderRadius: 15,
  marginTop: 10,
  marginBottom: 10,
  // iOS shadow
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  // Android shadow
  elevation: 5,
},

  // HALF CARDS (2 per row)
  halfCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 40,
  },
  halfCard: {
  width: "48%",
  height: 120,
  backgroundColor: "#E6F0E2",
  borderRadius: 15,
  marginBottom: 15,
  paddingTop: 5,
  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  // Android shadow
  elevation: 5,
},
  cardText: {
    fontSize: 25,
    fontWeight: "500",
  },
  leftImage: {
  width: 80,
  height: 85,
  borderRadius: 15,
}
});
export default styles;