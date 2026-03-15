import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
  videoCard: {
  marginBottom: 15,
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#f8f8f8",
},
videoThumbnail: {
  width: "100%",
  height: 200,
},
videoTitle: {
  padding: 10,
  fontSize: 16,
  fontWeight: "bold",
},

});