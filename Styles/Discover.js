import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop:35,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5faf4",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  greenCard: {
    backgroundColor: "#d4edc6",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // shadow
  },
  greenCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color:'#527D5F',
  },
  greenCardText: {
    fontSize: 14,
    color: "#4a6a3b",
    paddingRight:20,
  },
  flowerCard: {
    backgroundColor: "#f5faf4",
    borderRadius: 15,
    width: "48%",
    marginBottom: 15,
    padding: 10,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // shadow
  },
  flowerImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  flowerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft:10,
    marginTop:3,
  },
});