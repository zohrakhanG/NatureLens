import * as ExpoNotifications from "expo-notifications";

export async function cancelAllNotifications() {

  await ExpoNotifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleReminderNotification(
  title,
  body,
  reminderDate,
  frequency,
  selectedDays = []
) {

  // DAILY
  if (frequency === "Daily") {

    await ExpoNotifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },

      trigger: {
        type: "daily",
        hour: reminderDate.getHours(),
        minute: reminderDate.getMinutes(),
      },
    });
  }

  // WEEKLY
  else if (frequency === "Weekly") {

    const dayMap = {
      Sun: 1,
      Mon: 2,
      Tue: 3,
      Wed: 4,
      Thu: 5,
      Fri: 6,
      Sat: 7,
    };

    await ExpoNotifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },

      trigger: {
        type: "weekly",
        weekday: dayMap[selectedDays[0]],
        hour: reminderDate.getHours(),
        minute: reminderDate.getMinutes(),
      },
    });
  }

  // CUSTOM
  else if (frequency === "Custom") {

    const dayMap = {
      Sun: 1,
      Mon: 2,
      Tue: 3,
      Wed: 4,
      Thu: 5,
      Fri: 6,
      Sat: 7,
    };

    for (const day of selectedDays) {

      await ExpoNotifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
        },

        trigger: {
          type: "weekly",
          weekday: dayMap[day],
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
        },
      });
    }
  }
}