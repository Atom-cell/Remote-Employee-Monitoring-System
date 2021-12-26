import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import Task from "./Task";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskCompleted() {
  const [taskItems, setTaskItems] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("completed");
        if (JSON.parse(jsonValue) !== null) {
          setTaskItems(JSON.parse(jsonValue));
          // setBackup(JSON.parse(jsonValue));
        } else {
          setTaskItems([]);
        }
      } catch (e) {}
    };
    let a = getData();
  }, []);

  const deleteItem = async (id) => {
    let a = taskItems.filter((v) => {
      return v.id !== id;
    });
    setTaskItems(a);

    try {
      const jsonValue = JSON.stringify(a);
      await AsyncStorage.setItem("completed", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.heading}>Completed</Text>
        <View style={{ borderBottomWidth: 1, margin: 5 }}></View>

        <ScrollView>
          <View style={styles.tasks}>
            {taskItems.map((item, index) => {
              return (
                <Pressable key={item.id}>
                  <Task
                    key={item.id}
                    task={item}
                    deleteItem={deleteItem}
                    index={item.id}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: "85%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 7,
  },
  tasks: {},
  writeTaskWrapper: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 90,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  writeTaskWrapper2: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  writeTask: {
    backgroundColor: "white",
    color: "black",
    width: "80%",
    borderRadius: 60,
    padding: 15,
  },
  writeTask2: {
    backgroundColor: "white",
    color: "black",
    width: "30%",
    borderRadius: 60,
    padding: 15,
  },
  addWrapper: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    fontSize: 24,
  },
  cancelWrapper: {
    padding: 7,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "grey",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 90,
  },
  cancel: {
    fontWeight: "bold",
  },
});
