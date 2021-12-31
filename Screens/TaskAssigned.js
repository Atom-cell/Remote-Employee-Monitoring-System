import React from "react";

import DB, { AssignedTasks } from "../DB";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AssignModal from "./AssignModal";

export default function TaskAssigned({ navigation }) {
  const [tasksList, setTasksList] = React.useState([]);
  const [obj, setObj] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(false);
    let arr = [];
    setTasksList([...arr]);
    // getting tasks from DB
    AssignedTasks.where("empID", "==", "3").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        if (!v.data().Completed) arr.push({ _id: v.id, ...v.data() });
        setTasksList([...arr]);
      });
    });

    // storing completed tasks in Async
    let arr1 = [];
    AssignedTasks.where("empID", "==", "3").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        if (v.data().Completed) arr1.push({ _id: v.id, ...v.data() });
        const jsonValue = JSON.stringify(arr1);
        AsyncStorage.setItem("assignCompleted", jsonValue);
      });
    });
  };

  const hideModal = () => {
    setModal(false);
  };

  const change = async (name, id) => {
    hideModal();
    let obj = {
      name: name,
      _id: id,
    };
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem("timedTask", jsonValue);
    navigation.navigate("Time", { name: name });
  };

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          {/* <Button
            title="ff"
            onPress={async () => {
              // AsyncStorage.removeItem("timedTask");
              // let a = await AsyncStorage.getItem("timedTask");
              // let a = await AsyncStorage.getItem("assignCompleted");
              // console.log(JSON.parse(a));
              console.log(tasksList);
            }}
          /> */}
          <Text style={styles.heading}>Assigned Work</Text>
          <View style={{ borderBottomWidth: 1, margin: 5 }}></View>
          {tasksList.length == 0 ? (
            <Text>No Tasks for you. Enjoy your Day!</Text>
          ) : null}
          {modal ? (
            <AssignModal hideModal={hideModal} obj={obj} change={change} />
          ) : null}

          <FlatList
            refreshing={false}
            onRefresh={() => getData()}
            data={tasksList}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.itemsWrapper}
                  onPress={async () => {
                    let a = await AsyncStorage.getItem("started");
                    if (a === "false") {
                      setModal(true);
                      setObj(item.item);
                    }
                  }}
                >
                  <View style={styles.item}>
                    <View style={styles.itemLeft}>
                      <View style={styles.square}></View>
                      <Text style={styles.text}>{item.item.TaskName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#F4BE2C" size="large" />
        <Text style={{ alignSelf: "center" }}>Getting data....</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  itemsWrapper: {
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 7,
  },
  text: {
    maxWidth: "80%",
    fontSize: 17,
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  date: {
    fontSize: 17,
  },
  itemLeft: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#F4BE2C",
    borderRadius: 5,
    opacity: 0.5,
    marginRight: 15,
  },
});

// AssignedTasks.add({
//   TaskName: "Bye World",
//   TaskDescp: "Make an App saying Bye world",
//   Billable: false,
//   Rate: 0,
//   empID: "3",
// });
