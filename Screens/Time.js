import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimeModal from "./TimeModal";
import { useStopwatch } from "react-timer-hook";
import { AssignedTasks } from "../DB";
import CongratsModals from "./CongratsModal";

const PauseTime = ({ startTimer, stopTimer, getPauseTime }) => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });
  React.useEffect(() => {
    console.log("render");
    if (startTimer) {
      console.log("START ");
      // reset();
      start();
    } else if (stopTimer) {
      console.log("STOP ");
      reset();
      pause();
      getPauseTime(seconds, minutes);
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
  const [ptime, setPtime] = React.useState("");
  const [current, setCurrent] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState("");

  const [modal2, setModal2] = React.useState(false);
  const [modalMsg2, setModalMsg2] = React.useState("");

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  React.useEffect(() => {
    reset();
    pause();
  }, []);

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
    setPtime(`${m}:${s}`);
  };

  // timer STOPPED
  const updateComplete = async () => {
    setPausebtn(false);
    // console.log("p btn ", pausebtn);
    setStartbtn(true);
    // console.log("s btn", startbtn);
    navigation.setParams({ name: "" });
    // let a = await AsyncStorage.getItem("timedTask");
    // let id = JSON.parse(a);
    // AssignedTasks.doc(id._id).update({ Completed: true });
    // AssignedTasks.doc(id._id).update({ PauseTime: ptime });
    // AssignedTasks.doc(id._id).update({ WorkTime: `${minutes}:${seconds}` });

    AsyncStorage.setItem("started", "false");

    setModalMsg2("Well done!");
    setModal2(true);
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
      updateComplete();
      reset();
      pause();
    } else if (modalMsg === "Do You Want to Finish this Task?" && ans === "n") {
    }
  };

  const hideModal2 = () => {
    setModal2(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerWrapper}>
        {modal ? <TimeModal hideModal={hideModal} msg={modalMsg} /> : null}

        {modal2 ? (
          <CongratsModals hideModal={hideModal2} msg={modalMsg2} />
        ) : null}
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
                    setPausebtn(false);
                    start();
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
