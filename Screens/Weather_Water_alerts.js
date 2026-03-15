import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/Weather_Water_alerts";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Weather_Water_alerts({ route, navigation }) 
{
  const { latitude, longitude } = route.params;

  const [savedTimes, setSavedTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextReminder, setNextReminder] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [hasWateringReminders, setHasWateringReminders] = useState(false);
  const [wateredIndexes, setWateredIndexes] = useState([]);

  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState([new Date()]);
  const [plants, setPlants] = useState("");
  const [frequency, setFrequency] = useState("");
  const [customDays, setCustomDays] = useState([]); 
  const [showPickerIndex, setShowPickerIndex] = useState(null);

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [currentTime]);

  useEffect(() => {
    if (hasWateringReminders && savedTimes.length > 0) {
        const now = new Date();
        const todayReminders = savedTimes.map((t) => {
        const reminderDate = new Date();
        reminderDate.setHours(t.time.getHours(), t.time.getMinutes(), 0, 0); // <-- use t.time
        return reminderDate;
      });


        if (now.getHours() === 0 && now.getMinutes() === 0) {
          setWateredIndexes([]);
        }

        const futureReminders = todayReminders.filter((t, i) => !wateredIndexes.includes(i));
        if (futureReminders.length > 0) {
          const next = futureReminders.reduce((a, b) => a < b ? a : b);
          setNextReminder(next);
        } else {
          setNextReminder(null);
        }
    }
  }, [currentTime, savedTimes, hasWateringReminders, wateredIndexes]);

  const fetchWeatherForecast = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`
      );
      const data = await response.json();

      const formatted = data.daily.time.map((day, i) => {
        const dateObj = new Date(day);
        return {
          date: day,
          dayName: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObj.getDay()],
          min: data.daily.temperature_2m_min[i],
          max: data.daily.temperature_2m_max[i],
          rain: data.daily.precipitation_sum[i],
          wind: data.daily.windspeed_10m_max[i],
        };
      });

      setForecast(formatted);
      detectAlerts(formatted);
    } catch (err) {
      console.log("Weather API Error:", err);
    }
  };

  const detectAlerts = (week) => {
    let tempAlertsMap = {
      "Frost Risk": [],
      "Heavy Rainfall": [],
      "Extreme Heat": [],
      "Strong Winds": [],
    };

    week.forEach((day) => {
      const dayName = day.dayName;
      if (day.min <= 2) tempAlertsMap["Frost Risk"].push(dayName);
      if (day.rain >= 15) tempAlertsMap["Heavy Rainfall"].push(dayName);
      if (day.max >= 40) tempAlertsMap["Extreme Heat"].push(dayName);
      if (day.wind >= 35) tempAlertsMap["Strong Winds"].push(dayName);
    });

    let tempAlerts = [];
    if (tempAlertsMap["Frost Risk"].length > 0) tempAlerts.push({ title: "Frost Risk", description: `On ${tempAlertsMap["Frost Risk"].join(", ")}: Temperatures may drop to 2°C or below, protect sensitive plants` });
    if (tempAlertsMap["Heavy Rainfall"].length > 0) tempAlerts.push({ title: "Heavy Rainfall", description: `On ${tempAlertsMap["Heavy Rainfall"].join(", ")}: No need to water outdoor plants - soil will stay moist` });
    if (tempAlertsMap["Extreme Heat"].length > 0) tempAlerts.push({ title: "Extreme Heat", description: `On ${tempAlertsMap["Extreme Heat"].join(", ")}: Water your plants in early morning or late evening. Avoid afternoon watering` });
    if (tempAlertsMap["Strong Winds"].length > 0) tempAlerts.push({ title: "Strong Winds", description: `On ${tempAlertsMap["Strong Winds"].join(", ")}: Bring fragile potted plants indoors to avoid damage` });

    setAlerts(tempAlerts);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return { hour: `${hours}`, minute: minutes < 10 ? `0${minutes}` : `${minutes}`, ampm };
  };

  const addTimeField = () => setTime([...time, new Date()]);
  const removeTimeField = (index) => setTime(time.filter((_, i) => i !== index));
  const updateTime = (event, selectedTime, index) => {
    setShowPickerIndex(null);
    if (selectedTime) {
      const updatedTimes = [...time];
      updatedTimes[index] = selectedTime;
      setTime(updatedTimes);
    }
  };

  const toggleDay = (day) => {
    if (customDays.includes(day)) setCustomDays(customDays.filter(d => d !== day));
    else setCustomDays([...customDays, day]);
  };

  const handleSave = () => {
  if (!taskName.trim()) { Alert.alert("Validation Error", "Please fill out the Task field"); return; }
  if (!plants.trim()) { Alert.alert("Validation Error", "Please fill out the Plants field"); return; }
  if (/[^a-zA-Z,\s]/.test(plants)) { Alert.alert("Validation Error", "Invalid characters detected! Only letters, numbers, commas and spaces are allowed"); return; }
  if (!frequency) { Alert.alert("Validation Error", "Please select a frequency"); return; }
  if (frequency === "Custom" && customDays.length === 0) { Alert.alert("Validation Error", "Please select at least one custom day"); return; }

  const uniqueTimesMap = {};
  time.forEach(t => { const key = `${t.getHours()}:${t.getMinutes()}`; uniqueTimesMap[key] = t; });
  const uniqueTimes = Object.values(uniqueTimesMap);

  const plantArray = plants.split(",").map((p) => p.trim()).filter((p) => p.length > 0);

const reminderData = {
  taskName,
  plants: plantArray,
  frequency,
  customDays: frequency === "Custom" ? customDays : [],
  dayOfWeek: frequency === "Weekly" ? [new Date().getDay()] : [], // store weekday for weekly reminders
};

setSavedTimes(uniqueTimes.map((t) => ({ 
  time: t,       // store as Date object
  ...reminderData
})));

  setHasWateringReminders(true);
  setReminderEnabled(false);

  Alert.alert("Success", "Reminder saved successfully!");
};



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather & Water Alerts</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Ionicons name="alert-circle-outline" size={22} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>Weather Alerts</Text>
      </View>
      {alerts.length === 0 && <Text style={styles.noAlertText}>No weather threats this week</Text>}
      {alerts.map((alert, i) => (
        <View key={i} style={styles.alertCard}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertText}>{alert.description}</Text>
        </View>
      ))}

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Ionicons name="water-outline" size={22} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>Water Alerts</Text>
      </View>

      {hasWateringReminders ? (
  <View style={styles.waterCard}>
    {savedTimes.length > 0 ? (() => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday

      // Sort by time
      const sortedTimes = [...savedTimes].sort(
  (a, b) => a.time.getHours() * 60 + a.time.getMinutes() - (b.time.getHours() * 60 + b.time.getMinutes())
);


      // Find overdue reminder
      const overdueIndex = sortedTimes.findIndex((item, i) => {
    const t = item.time;

    // Already marked done today
    if (wateredIndexes.includes(i)) return false;

    // Weekly reminders: check day
    if (item.frequency === "Weekly" && !item.dayOfWeek.includes(currentDay)) return false;

    // Custom reminders: check selected days
    if (item.frequency === "Custom") {
      const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      if (!item.customDays.includes(dayNames[currentDay])) return false;
    }

    // Check if time has passed
    return t.getHours() < now.getHours() || (t.getHours() === now.getHours() && t.getMinutes() <= now.getMinutes());
});


      if (overdueIndex !== -1) {
        const item = sortedTimes[overdueIndex];
        return (
          <>
            <Text style={styles.waterText}>Water me!</Text>
            {item.taskName ? <Text style={styles.waterTaskText}>{item.taskName}</Text> : null}
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => setWateredIndexes([...wateredIndexes, overdueIndex])}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </>
        );
      } else {
        // Find next scheduled reminder
        const nextIndex = sortedTimes.findIndex((_, i) => !wateredIndexes.includes(i));
        if (nextIndex !== -1) {
const formatted = formatTime(sortedTimes[nextIndex].time);
          return (
            <>
              <Text style={styles.waterText}>Watering scheduled at:</Text>
              <Text style={styles.waterTaskText}>
                {formatted.hour}:{formatted.minute} {formatted.ampm}
              </Text>
            </>
          );
        } else {
          return <Text style={styles.waterText}>All reminders completed</Text>;
        }
      }
    })() : (
      <Text style={styles.noReminderText}>Not set any reminders yet</Text>
    )}
  </View>
) : (
  <Text style={styles.noReminderText}>Not set any reminders yet</Text>
)}


      <View style={styles.reminderHeader}>
        <Ionicons name="alarm-outline" size={22} color="black" style={{ marginRight: 8 }} />
        <Text style={[styles.sectionTitle, { flex: 1, textAlign: "left" }]}>Custom Reminder</Text>
        <Switch 
          value={reminderEnabled} 
          onValueChange={setReminderEnabled} 
          trackColor={{ false: "#ccc", true: "#C8E6C9" }} 
          thumbColor={reminderEnabled ? "#4CAF50" : "#fff"} 
        />
      </View>

      {reminderEnabled && (
        <View style={styles.reminderContainer}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput
            placeholder="e.g. Water the Rose"
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName} />

          <Text style={styles.label}>Time</Text>
          {time.map((timeObj, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {Platform.OS === "android" ? (
                  <TouchableOpacity onPress={() => setShowPickerIndex(index)} style={{ flex: 1, padding: 10, backgroundColor: "#eee", borderRadius: 5 }}>
                    <Text style={{ color: "#000" }}>
                      {formatTime(timeObj).hour}:{formatTime(timeObj).minute} {formatTime(timeObj).ampm}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <DateTimePicker
                    value={timeObj}
                    mode="time"
                    display="spinner"
                    is24Hour={false}
                    onChange={(e, selectedTime) => updateTime(e, selectedTime, index)}
                    style={{ flex: 1 }}
                  />
                )}

                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  {index === 0 ? (
                    <>
                      <TouchableOpacity onPress={addTimeField} style={{ marginRight: 5 }}>
                        <Ionicons name="add-circle-outline" size={28} color="green" />
                      </TouchableOpacity>
                      {time.length > 1 && (
                        <TouchableOpacity onPress={() => removeTimeField(index)}>
                          <Ionicons name="remove-circle-outline" size={28} color="red" />
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <TouchableOpacity onPress={() => removeTimeField(index)}>
                      <Ionicons name="remove-circle-outline" size={28} color="red" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {Platform.OS === "android" && showPickerIndex === index && (
                <DateTimePicker
                  value={timeObj}
                  mode="time"
                  display="clock"
                  is24Hour={false}
                  onChange={(e, selectedTime) => updateTime(e, selectedTime, index)}
                />
              )}
            </View>
          ))}

          <Text style={styles.label}>Select Plants</Text>
          <TextInput
            placeholder="Enter plants (comma separated)"
            style={styles.input}
            value={plants}
            onChangeText={setPlants}
          />

          <View style={styles.frequencyBlock}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyInput}>
              {["Daily", "Weekly", "Custom"].map((freq, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.frequencyOption,
                    i < 2 && { borderRightWidth: 1, borderRightColor: "#ccc" },
                    frequency === freq && styles.frequencySelected,
                  ]}
                  onPress={() => setFrequency(freq)}
                >
                  <Text style={frequency === freq ? styles.selectedText : styles.optionText}>{freq}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {frequency === "Custom" && (
              <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                {[
                  { label: "M", value: "Mon" },
                  { label: "T", value: "Tue" },
                  { label: "W", value: "Wed" },
                  { label: "T", value: "Thu" },
                  { label: "F", value: "Fri" },
                  { label: "S", value: "Sat" },
                  { label: "S", value: "Sun" },
                ].map((day, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => toggleDay(day.value)}
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      backgroundColor: customDays.includes(day.value) ? "#C8E6C9" : "#eeeeee",
                      flex: 1,
                      marginHorizontal: 2,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "#000" }}>{day.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity style={[styles.saveButton, { flex: 1, marginRight: 5 }]} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.saveButton, { flex: 1, marginLeft: 5, backgroundColor: "#f44336" }]}
                onPress={() => {
                  setTaskName("");
                  setTime([new Date()]);
                  setPlants("");
                  setFrequency("");
                  setCustomDays([]);
                  setReminderEnabled(false);
                  setHasWateringReminders(false);
                  setWateredIndexes([]);
                }}>
                <Text style={[styles.saveButtonText, { color: "#fff" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
