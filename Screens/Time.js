import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeModal from "./TimeModal";
import { useStopwatch } from "react-timer-hook";
import { AssignedTasks } from "../DB";

const PauseTime = ({ startTimer, stopTimer, getPauseTime }) => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });
  React.useEffect(() => {
    if (startTimer) {
      console.log("START ");
      // reset();
      start();
    } else if (stopTimer) {
      console.log("STOP ");
      reset();
      pause();
    } else {
      console.log("PAUSE");
      pause();
      getPauseTime(seconds, minutes);
    }
  }, [startTimer, startTimer]);
  return (
    <View style={{ alignItems: "center", marginHorizontal: 20 }}>
      <Text style={{ fontSize: 17 }}>H H : M M</Text>
      <Text style={{ fontSize: 47, fontWeight: "bold" }}>
        {minutes}:{seconds}
      </Text>
      <Text style={{ fontSize: 20 }}>Pause time</Text>
    </View>
  );
};
const Time = ({ route, navigation }) => {
  const [startbtn, setStartbtn] = React.useState(true);
  const [pausebtn, setPausebtn] = React.useState(false);
  const [current, setCurrent] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState("");

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  React.useEffect(() => {}, [startbtn]);

  const getData = async () => {
    let v = JSON.parse(await AsyncStorage.getItem("timedTask"));
    setCurrent(v.name);
    console.log(v);
  };

  React.useEffect(() => {
    if (route.params) {
      const { name } = route.params;
      setCurrent(name);
    }
  });

  const getPauseTime = (s, m) => {
    console.log("sec", s, "min", m);
  };

  // timer STOPPED
  const updateComplete = async () => {
    setPausebtn(false);
    console.log("p btn ", pausebtn);
    setStartbtn(true);
    console.log("s btn", startbtn);
    navigation.setParams({ name: "" });
    let a = await AsyncStorage.getItem("timedTask");
    let id = JSON.parse(a);
    AssignedTasks.doc(id._id).update({ Completed: true });
    AsyncStorage.setItem("started", "false");
  };

  const hideModal = (ans) => {
    setModal(false);
    if (modalMsg === "Do You Want to Start this Task?" && ans === "y") {
      AsyncStorage.setItem("started", "true");
      setStartbtn(false);
      reset();
      start();
    } else if (modalMsg === "Do You Want to Start this Task?" && ans === "n") {
    }

    if (modalMsg === "Do You Want to Finish this Task?" && ans === "y") {
      reset();
      pause();
      updateComplete();
    } else if (modalMsg === "Do You Want to Finish this Task?" && ans === "n") {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerWrapper}>
        {modal ? <TimeModal hideModal={hideModal} msg={modalMsg} /> : null}
        <Text style={{ fontSize: 37, fontWeight: "bold" }}>{current}</Text>
        <View style={styles.timer}>
          <PauseTime
            stopTimer={startbtn}
            startTimer={pausebtn}
            getPauseTime={getPauseTime}
          />

          <View style={{ alignItems: "center", marginHorizontal: 20 }}>
            <Text style={{ fontSize: 17 }}>H H : M M</Text>
            <Text style={{ fontSize: 47, fontWeight: "bold" }}>
              {minutes}:{seconds}
            </Text>
            <Text style={{ fontSize: 20 }}>Work time</Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          {startbtn ? (
            <TouchableOpacity
              style={styles.play}
              onPress={() => {
                if (current !== "") {
                  setModal(true);
                  setModalMsg("Do You Want to Start this Task?");
                }
              }}
            >
              <Icon
                name="play"
                type="font-awesome-5"
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.pause}
                onPress={() => {
                  if (!pausebtn) {
                    pause();
                    setPausebtn(true);
                  } else {
                    start();
                    setPausebtn(false);
                  }
                }}
              >
                <Icon
                  name="pause"
                  type="font-awesome-5"
                  size={20}
                  color={"white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.stop}
                onPress={() => {
                  setModal(true);
                  setModalMsg("Do You Want to Finish this Task?");
                }}
              >
                <Icon
                  name="stop"
                  type="font-awesome-5"
                  size={20}
                  color={"white"}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    padding: 13,
  },
  timerWrapper: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  timer: {
    flexDirection: "row",
    margin: 35,
  },
  btnWrapper: {
    flexDirection: "row",
  },
  stop: {
    width: 60,
    height: 60,
    backgroundColor: "#CC1414",
    borderRadius: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  play: {
    width: 60,
    height: 60,
    backgroundColor: "#F4BE2C",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  pause: {
    width: 60,
    height: 60,
    backgroundColor: "#F4BE2C",
    borderRadius: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

{
  /* <View style={{ alignItems: "center", marginHorizontal: 20 }}>
            <Text style={{ fontSize: 17 }}>H H : M M</Text>
            <Text style={{ fontSize: 47, fontWeight: "bold" }}>
              {minutes}:{seconds}
            </Text>
            <Text style={{ fontSize: 20 }}>Pause time</Text>
          </View> */
}
