import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { Attend } from "../DB";

const Attendence = ({ navigation }) => {
  const [absentees, setAbsentess] = React.useState({});
  const [totalAbs, setTotalAbs] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  React.useEffect(() => {
    getAttendence();
  }, []);

  const markDots = () => {
    let a = {};
    for (let i = 1; i <= 31; i++) {
      if (i < 10) a[`2021-12-0${i}`] = { marked: true };
      else a[`2021-12-${i}`] = { marked: true };
    }
    setAbsentess(a);
  };

  const markPresent = () => {};

  const hideModal = () => {
    setModal(false);
  };
  const getAttendence = () => {
    let a = {};
    Attend.where("empID", "==", "3").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        for (let i = 1; i <= 31; i++) {
          if (i < 10 && v.data().date === `2021-12-0${i}`) {
            a[`2021-12-0${i}`] = { marked: false };
            setTotalAbs(totalAbs + 1);
          } else if (i < 10) {
            a[`2021-12-0${i}`] = { marked: true };
          } else if (v.data().date === `2021-12-${i}`) {
            a[`2021-12-${i}`] = { marked: false };
            setTotalAbs(totalAbs + 1);
          } else a[`2021-12-${i}`] = { marked: true };
        }
      });
      setAbsentess(a);
    });
  };

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
          onPress={() => markPresent()}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Take Attendence
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
          todayTextColor: "orange", //#00adf5
          arrowColor: "orange",
          dotColor: "orange",
        }}
        markedDates={absentees}
      />
      <View style={styles.wrapper}>
        <View style={styles.absentWrapper}>
          <Text style={{ fontSize: 25, marginBottom: 27 }}>Absents</Text>
          <Text style={styles.txt}>{totalAbs}</Text>
        </View>
        <View style={styles.presentWrapper}>
          <Text style={{ fontSize: 25, marginBottom: 27 }}>Presents</Text>
          <Text style={styles.txt}>{31 - totalAbs}</Text>
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
    marginLeft: 55,
    fontWeight: "bold",
  },
});
