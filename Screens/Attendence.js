import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import TouchID from "react-native-touch-id";
import { Calendar } from "react-native-calendars";

const Attendence = ({ navigation }) => {
  const [absentees, setAbsentess] = React.useState({
    "2021-12-17": { marked: true },
    "2021-12-25": { marked: true },
  });
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 10,
            marginRight: 20,
            backgroundColor: "white",
            borderRadius: 30,
          }}
          onPress={() => alert("hello there!")}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Take Attendence
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const optionalConfigObject = {
    title: "Authentication Required", // Android
    imageColor: "#e00606", // Android
    imageErrorColor: "#ff0000", // Android
    sensorDescription: "Touch sensor", // Android
    sensorErrorDescription: "Failed", // Android
    cancelText: "Cancel", // Android
    fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const check = () => {
    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        if (biometryType === "FaceID") {
          console.log("FaceID is supported.");
        } else {
          console.log("TouchID is supported.");
        }
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Calendar
        style={{
          padding: 10,
          height: 450,
        }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "orange", //#00adf5
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "orange",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "black",
          indicatorColor: "blue",
          // textDayFontFamily: "monospace",
          // textMonthFontFamily: "monospace",
          // textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        markedDates={absentees}
      />
      <View style={styles.wrapper}>
        <View style={styles.absentWrapper}>
          <Text style={{ fontSize: 25, marginBottom: 27 }}>Absents</Text>
          <Text style={styles.txt}>00</Text>
        </View>
        <View style={styles.presentWrapper}>
          <Text style={{ fontSize: 25, marginBottom: 27 }}>Presents</Text>
          <Text style={styles.txt}>00</Text>
        </View>
      </View>
    </View>
  );
};

export default Attendence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  absentWrapper: {
    borderWidth: 5,
    padding: 20,
    width: "48%",
    // paddingBottom: 50,
  },
  presentWrapper: {
    borderWidth: 5,
    padding: 20,
    width: "48%",
    // paddingBottom: 50,
  },
  txt: {
    fontSize: 60,
    marginTop: 20,
    marginLeft: 53,
    fontWeight: "bold",
  },
});
