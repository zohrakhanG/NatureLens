import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../Styles/Journal";

export default function Journal({ navigation }) {
  const [search, setSearch] = useState("");
  const [note, setNote] = useState("");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back-outline" size={24} color="#000" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Plant Growth Journal</Text>
      </View>

      {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8aa78a" style={{ marginRight: 5 }} />
          <TextInput style={styles.searchInput} placeholder="Search for plants" placeholderTextColor="#8aa78a"/>
        </View>

      {/* Card 1: Add New Plant */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add New Plant</Text>
        <Text style={styles.cardText}>Track your plants with names, notes and progress logs.</Text>
        <TouchableOpacity style={styles.greenButton}>
            <Ionicons name="add-circle-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Add New Plant</Text>
        </TouchableOpacity>
      </View>

      {/* Card 2: Add Quick Note */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Quick Note</Text>
        <TextInput
          style={styles.inputBar}
          placeholder="Quick observation about your plant"
          value={note}
          onChangeText={setNote}
        />
        <TouchableOpacity style={styles.greenButton}>
            <Ionicons name="add-circle-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {/* Card 3: Upload Plant Photo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upload Plant Photo</Text>
        <Text style={styles.cardText}>Add a photo of your plant to help us identify it.</Text>
        <TouchableOpacity style={styles.greenButton}>
          <Ionicons name="image-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Select Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Card 4: Schedule Plant Care */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Schedule Plant Care</Text>
        <Text style={styles.cardText}>Schedule taking care of your plants by notifications and alarms</Text>
        <TouchableOpacity style={styles.greenButton}>
          <Ionicons name="calendar-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Schedule Task</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
