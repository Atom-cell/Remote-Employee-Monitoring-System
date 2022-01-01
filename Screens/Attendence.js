import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { Attend } from "../DB";
import AttendeModal from "./AttendModal";
import CongratsModals from "./CongratsModal";

const Attendence = ({ navigation }) => {
  const [absentees, setAbsentess] = React.useState({});
  const [totalAbs, setTotalAbs] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState("");
  React.useEffect(() => {
    // markDots();
    getAttendence();
  }, []);

  const markDots = () => {
    let a = {};
    for (let i = 1; i <= 31; i++) {
      if (i < 10) a[`2022-01-0${i}`] = { marked: true };
      else a[`2022-01-${i}`] = { marked: true };
    }
    setAbsentess(a);
  };

  const markAbsents = (d, a) => {
    if (d !== []) {
      d.forEach((v) => {
        console.log("insiide foreach", v);
        a[v] = { marked: false };
      });
    }
    setTotalAbs(d.length);
    setAbsentess(a);
  };

  const hideModal2 = () => {
    setModal2(false);
  };

  // mark attendence in DB
  const hideModal = (auth) => {
    setModal(false);
    if (auth === "yes") {
      setModalMsg("Have a nice day!");
      setModal2(true);

      let date = new Date();
      let day = date.getDate();
      if (day < 10) day = `0${day}`;
      let month = date.getMonth() + 1;
      month = `0${month}`;
      let year = date.getFullYear();

      let newAttend = {
        date: `${year}-${month}-${day}`,
        empID: "3",
      };

      Attend.add(newAttend);
      getAttendence();
    } else {
    }
  };
  const getAttendence = () => {
    // markDots();
    let a = {}; //obj to be set in absentees
    let d = []; //dates
    Attend.where("empID", "==", "3").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        d.push(v.data().date);
        for (let i = 1; i <= 31; i++) {
          if (i < 10 && v.data().date === `2022-01-0${i}`) {
            a[`2022-01-0${i}`] = { marked: false };
          } else if (i < 10) {
            a[`2022-01-0${i}`] = { marked: true };
          } else if (v.data().date === `2022-01-${i}`) {
            a[`2022-01-${i}`] = { marked: false };
          } else a[`2022-01-${i}`] = { marked: true };
        }
      });
      setAbsentess(a);
      setTotalAbs(d.length);

      // markAbsents(d, a);
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
          onPress={() => setModal(true)}
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
      {modal ? <AttendeModal hideModal={hideModal} /> : null}
      {modal2 ? <CongratsModals hideModal={hideModal2} msg={modalMsg} /> : null}
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
