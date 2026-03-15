import { StyleSheet } from "react-native";

export default StyleSheet.create
({
  footerContainer: 
  {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tab: 
  {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: 
  {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
});
