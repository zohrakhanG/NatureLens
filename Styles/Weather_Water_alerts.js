import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 35,
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },

  noAlertText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },

  alertCard: {
    backgroundColor: "#f5faf4",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  alertText: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },

 noReminderText: {
  fontSize: 14,
  color: "#666",
  marginBottom: 15,
  textAlign: "center",
},

waterCard: {
  backgroundColor: "#B3907A",
  padding: 25,       
  borderRadius: 12,
  alignItems: "center",
  marginBottom: 15,
  minHeight: 120,       
  justifyContent: "center",
},
waterText: {
  fontSize: 20,         
  color: "white",
  marginBottom: 10,  
  textAlign: "center", 
  fontWeight:500,
},
waterTaskText: {
  fontSize: 16,
  color: "white",
},
scheduledCard: {
  backgroundColor: "#BDD1C5",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
  marginBottom: 15,
},
doneButton: {
  marginTop: 10,
  paddingVertical: 8,
  paddingHorizontal: 15,
  backgroundColor: "#A07866",
  borderRadius: 5,
  alignItems: "center",
  width:'98%',
},
doneButtonText: {
  color: "#ffffff",
  fontWeight: "bold",
},

  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  reminderContainer: {
    marginTop: 10,
    backgroundColor: "#f5faf4",
    padding: 15,
    borderRadius: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  frequencyBlock: {
  marginBottom: 15,
},
frequencyInput: {
  flexDirection: "row",
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  overflow: "hidden",
},
frequencyOption: {
  flex: 1,
  paddingVertical: 10,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5faf4",
},
frequencySelected: {
  backgroundColor: "#388E3C",
},
optionText: {
  color: "#000",
},
selectedText: {
  color: "#fff",
  fontWeight: "bold",
},

  saveButton: {
    backgroundColor: "#388E3C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
