import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Styles/Weather_Water_alerts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { apiFetch } from "../Services/fetchToken";
import { scheduleReminderNotification} from "../Services/notifications";
import * as Notifications from "expo-notifications";
import { useTranslation } from "react-i18next";


export default function Weather_Water_alerts({ route, navigation }) 

{
  const { t } = useTranslation();
  const { latitude, longitude } = route.params;

  const [savedTimes, setSavedTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextReminder, setNextReminder] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [hasWateringReminders, setHasWateringReminders] = useState(false);
  const [wateredIndexes, setWateredIndexes] = useState([]);
  const [weeklyDay, setWeeklyDay] = useState("Mon");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState([new Date()]);
  const [plants, setPlants] = useState("");
  const [frequency, setFrequency] = useState("");
  const [customDays, setCustomDays] = useState([]); 
  const [showPickerIndex, setShowPickerIndex] = useState(null);

 useEffect(() => {

  fetchWeatherForecast();

  fetchReminders();

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

 const [editingReminderId, setEditingReminderId] = useState(null);

const fetchReminders = async () => {

  try {

    const response = await apiFetch({
      endpoint: "/reminders/",
      method: "GET",
      auth: true,
    });

    console.log("REMINDERS:", response);

    await Notifications.cancelAllScheduledNotificationsAsync();
    const formattedReminders = response.map((item) => {

      const reminderTime = new Date();

      reminderTime.setHours(
        item.hour,
        item.minute,
        0,
        0
      );

      return {
        id: item.id,
        time: reminderTime,
        taskName: item.task_name,
        plants: item.plants || [],
        frequency: item.frequency,
        customDays: item.custom_days || [],
        dayOfWeek: item.day_of_week || [],
      };
    });

for (const item of formattedReminders) {

  const reminderDate = new Date();

  reminderDate.setHours(
    item.time.getHours(),
    item.time.getMinutes(),
    0,
    0
  );

  await scheduleReminderNotification(
  item.taskName,
  `${t("timeToWater")} ${item.plants.join(", ")}`,
  reminderDate,
  item.frequency,
  item.frequency === "Weekly"
    ? item.dayOfWeek
    : item.customDays
);
}

    setSavedTimes(formattedReminders);

    setHasWateringReminders(
      formattedReminders.length > 0
    );

  } catch (error) {

    console.log(
      "FETCH REMINDERS ERROR:",
      error
    );
  }
};

const handleSave = async () => {

  if (!taskName.trim()) {
    Alert.alert(t("validationError"), t("fillTaskField"));
    return;
  }

  if (!plants.trim()) {
    Alert.alert(t("validationError"), t("fillPlantsField"));
    return;
  }

  if (/[^a-zA-Z,\s]/.test(plants)) {
    Alert.alert(
  t("validationError"),
  t("invalidPlantCharacters")
);
    return;
  }

  if (!frequency) {
    Alert.alert(
  t("validationError"),
  t("selectFrequency")
);
    return;
  }

  if (frequency === "Custom" && customDays.length === 0) {
    Alert.alert(
  t("validationError"),
  t("selectCustomDay")
);
    return;
  }

  try {

    const uniqueTimesMap = {};

    time.forEach((t) => {
      const key = `${t.getHours()}:${t.getMinutes()}`;
      uniqueTimesMap[key] = t;
    });

    const uniqueTimes = Object.values(uniqueTimesMap);

    const plantArray = plants
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);


    for (let reminderTime of uniqueTimes) {

  const payload = {
    task_name: taskName,
    plants: plantArray,
    frequency: frequency,
    custom_days:
      frequency === "Custom"
        ? customDays
        : [],
    day_of_week:
      frequency === "Weekly"
        ? [weeklyDay]
        : [],
    hour: reminderTime.getHours(),
    minute: reminderTime.getMinutes(),
  };

  const response = await apiFetch({
    endpoint: editingReminderId
      ? `/reminders/${editingReminderId}`
      : "/reminders/",
    method: editingReminderId
      ? "PUT"
      : "POST",
    bodyData: payload,
    auth: true,
  });

  console.log("RAW RESPONSE:", response);

  const reminderDate = new Date();

  reminderDate.setHours(
    reminderTime.getHours(),
    reminderTime.getMinutes(),
    0,
    0
  );

  await scheduleReminderNotification(
    taskName,
    `${t("timeToWater")} ${plantArray.join(", ")}`,
    reminderDate,
    frequency,
    frequency === "Weekly"
      ? [weeklyDay]
      : customDays
  );
}

    // UPDATE EXISTING
    await fetchReminders();
    setHasWateringReminders(true);

    setReminderEnabled(false);

    setEditingReminderId(null);

    setTaskName("");
    setTime([new Date()]);
    setPlants("");
    setFrequency("");
    setCustomDays([]);

    Alert.alert(
  t("success"),
  editingReminderId
    ? t("reminderUpdated")
    : t("reminderSaved")
);

  } catch (error) {

    console.log("SAVE ERROR FULL:", error);

    console.log(
      "ERROR STRING:",
      JSON.stringify(error, null, 2)
    );

   Alert.alert(
  t("error"),
  editingReminderId
    ? t("updateReminderFailed")
    : t("saveReminderFailed")
);
  }
};



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("weatherWaterAlerts")}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Ionicons name="alert-circle-outline" size={22} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>{t("weatherAlerts")}</Text>
      </View>
      {alerts.length === 0 && <Text style={styles.noAlertText}>{t("noWeatherThreats")}</Text>}
      {alerts.map((alert, i) => (
        <View key={i} style={styles.alertCard}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertText}>{alert.description}</Text>
        </View>
      ))}

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Ionicons name="water-outline" size={22} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>{t("waterAlerts")}</Text>
      </View>

      {savedTimes.length === 0 && (
  <Text style={styles.noReminderText}>
    {t("noReminders")}
  </Text>
)}

{savedTimes.map((item, i) => {
  const formatted = formatTime(item.time);

  return (
    <View key={i} style={styles.alertCard}>

      {/* Top Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={styles.alertTitle}>
          {item.taskName}
        </Text>

        <View style={{ flexDirection: "row" }}>

  {/* Edit */}
  <TouchableOpacity
    onPress={() => {

      setEditingReminderId(item.id);

      setTaskName(item.taskName);

      setPlants(item.plants.join(", "));

      setFrequency(item.frequency);

      if (item.frequency === "Weekly" && item.dayOfWeek?.length > 0) 
      {
        setWeeklyDay(item.dayOfWeek[0]);
      }

      setCustomDays(item.customDays || []);

      setTime([item.time]);

      setReminderEnabled(true);
    }}
    style={{ marginRight: 15 }}
  >
    <Ionicons
      name="create-outline"
      size={22}
      color="#4CAF50"
    />
  </TouchableOpacity>

  {/* Delete */}
  <TouchableOpacity
    onPress={async () => {

      try {

        await apiFetch({
          endpoint: `/reminders/${item.id}`,
          method: "DELETE",
          auth: true,
        });

        await fetchReminders();
      

        Alert.alert(
  t("success"),
  t("reminderDeleted")
);

      } catch (error) {

        console.log(error);

        Alert.alert(
  t("error"),
  t("deleteReminderFailed")
);
      }
    }}
  >
    <Ionicons
      name="trash-outline"
      size={22}
      color="#f44336"
    />
  </TouchableOpacity>

</View>
      </View>

      {/* Reminder Details */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
  <Ionicons
    name="time-outline"
    size={18}
    color="#555"
    style={{ marginRight: 10 }}
  />

  <Text style={[styles.alertText, { marginLeft: 2 }]}>
    {formatted.hour}:{formatted.minute} {formatted.ampm}
  </Text>
</View>

<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
  <Ionicons
    name="leaf-outline"
    size={18}
    color="#4CAF50"
    style={{ marginRight: 10 }}
  />

  <Text style={[styles.alertText, { marginLeft: 2 }]}>
    {item.plants.join(", ")}
  </Text>
</View>

<View style={{ flexDirection: "row", alignItems: "center" }}>
  <Ionicons
    name="repeat-outline"
    size={18}
    color="#2196F3"
    style={{ marginRight: 10 }}
  />

  <Text style={[styles.alertText, { marginLeft: 2 }]}>
    {item.frequency}
  </Text>
</View>



      {item.frequency === "Custom" &&
        item.customDays?.length > 0 && (
          <Text style={styles.alertText}>
            📅 {item.customDays.join(", ")}
          </Text>
      )}
    </View>
  );
})}


      <View style={styles.reminderHeader}>
        <Ionicons name="alarm-outline" size={22} color="black" style={{ marginRight: 8 }} />
        <Text style={[styles.sectionTitle, { flex: 1, textAlign: "left" }]}>{t("customReminder")}</Text>
        <Switch 
          value={reminderEnabled} 
          onValueChange={setReminderEnabled} 
          trackColor={{ false: "#ccc", true: "#C8E6C9" }} 
          thumbColor={reminderEnabled ? "#4CAF50" : "#fff"} 
        />
      </View>

      {reminderEnabled && (
        <View style={styles.reminderContainer}>
          <Text style={styles.label}>{t("taskName")}</Text>
          <TextInput
            placeholder={t("taskPlaceholder")}
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName} />

          <Text style={styles.label}>{t("time")}</Text>
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

          <Text style={styles.label}>{t("selectPlants")}</Text>
          <TextInput
            placeholder={t("plantsPlaceholder")}
            style={styles.input}
            value={plants}
            onChangeText={setPlants}
          />

          <View style={styles.frequencyBlock}>
            <Text style={styles.label}>{t("frequency")}</Text>
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
<Text style={frequency === freq ? styles.selectedText : styles.optionText}>
  {freq}
</Text>
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

            {frequency === "Weekly" && (
  <View style={{ marginTop: 10 }}>

    <Text style={styles.label}>
      {t("selectDay")}
    </Text>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >

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
          onPress={() => setWeeklyDay(day.value)}

          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor:
              weeklyDay === day.value
                ? "#C8E6C9"
                : "#eeeeee",

            flex: 1,
            marginHorizontal: 2,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#000" }}>
            {day.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
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
