import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import Task from "./Task";
import { Icon } from "react-native-elements";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalPopup from "./ModalPopup";

export default function TaskMine() {
  const [task, setTask] = React.useState("");
  const [taskItems, setTaskItems] = React.useState([]);
  const [filterN, setFilterN] = React.useState("All");
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState();
  const [day, setDay] = React.useState(0);
  const [month, setMonth] = React.useState(0);
  const [year, setYear] = React.useState(0);

  const [backup, setBackup] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("myTasks");
        if (JSON.parse(jsonValue) !== null) {
          setTaskItems(JSON.parse(jsonValue));
          setBackup(JSON.parse(jsonValue));
        } else {
          setTaskItems([]);
        }
      } catch (e) {}
    };
    let a = getData();
  }, []);

  const checkDay = (num, field) => {
    if ((field === "d" && num > 31) || (field === "d" && num < 0))
      alert("Enter valid day");
    else {
      setDay(num);
    }
  };

  const checkMonth = (num, field) => {
    if ((field === "m" && num > 12) || (field === "m" && num < 0))
      alert("Enter Valid Month");
    else {
      setMonth(num);
    }
  };

  const checkYear = (num, field) => {
    setYear(num);
  };

  const filterTheList = (filter) => {
    let d = new Date();
    let m = d.getMonth() + 1;
    if (m > 12) m = 1;
    if (filter === "today") {
      let a = `${d.getDate()}-${m}-${d.getFullYear()}`;
      // console.log(a);
      setTaskItems(
        backup.filter((i) => {
          return i.date === a;
        })
      );
    } else if (filter === "tmr") {
      let a = `${d.getDate() + 1}-${m}-${d.getFullYear()}`;
      setTaskItems(
        backup.filter((i) => {
          return i.date === a;
        })
      );
    } else if (filter === "all") {
      setTaskItems(backup);
    }
  };

  const addItems = async () => {
    Keyboard.dismiss();
    let item = {
      id: Math.random(),
      name: task,
      year: year,
      month: month,
      day: day,
      date: `${day}-${month}-${year}`,
    };
    if (task !== "" && year !== 0 && month !== 0 && day !== 0) {
      setTaskItems([...taskItems, item]);
      setBackup([...taskItems, item]);
      const jsonValue = JSON.stringify([...taskItems, item]);
      await AsyncStorage.setItem("myTasks", jsonValue);
    }
    setTask("");
    setYear(0);
    setMonth(0);
    setDay(0);

    // console.log("BACKUP", backup);
  };

  const deleteItem = async (id) => {
    let itemsCopy = [...backup];
    let a = itemsCopy.filter((v) => {
      return v.id !== id;
    });
    setBackup(a);
    setTaskItems(a);

    try {
      const jsonValue = JSON.stringify(a);
      await AsyncStorage.setItem("myTasks", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const editItem = (index) => {
    setEdit(true);
    setTask(taskItems[index].name);
    setYear(taskItems[index].year);
    setMonth(taskItems[index].month);
    setDay(taskItems[index].day);
    setId(taskItems[index].id);
  };

  const saveEdit = async () => {
    Keyboard.dismiss();
    let item = {
      id: Math.random(),
      name: task,
      year: year,
      month: month,
      day: day,
      date: `${day}-${month}-${year}`,
    };

    setTaskItems(
      backup.map((x) => {
        return id === x.id ? { ...item } : { ...x };
      })
    );
    setBackup(
      backup.map((x) => {
        return id === x.id ? { ...item } : { ...x };
      })
    );

    try {
      const jsonValue = JSON.stringify(
        backup.map((x) => {
          return id === x.id ? { ...item } : { ...x };
        })
      );
      await AsyncStorage.setItem("myTasks", jsonValue);
    } catch (e) {
      // saving error
    }

    setEdit(false);
    setTask("");
    setId();
    setYear(0);
    setMonth(0);
    setDay(0);
  };

  const hideModal = () => {
    setModal(false);
  };
  const complete = async (id, index) => {
    let completed = [];
    setModal(true);
    let a = backup.filter((v) => {
      return v.id == id;
    });

    try {
      const jsonValue = await AsyncStorage.getItem("completed");
      if (JSON.parse(jsonValue) !== null) {
        completed = JSON.parse(jsonValue);
        let newArr = [...completed, a[0]];
        // console.log(completed);
        // console.log(a[0]);
        await AsyncStorage.setItem("completed", JSON.stringify(newArr));
      } else {
        await AsyncStorage.setItem("completed", JSON.stringify(a));
      }
    } catch (e) {}

    let itemsCopy = [...backup];
    let b = itemsCopy.filter((v) => {
      return v.id !== id;
    });
    setBackup(b);
    setTaskItems(b);

    try {
      const jsonValue = JSON.stringify(b);
      await AsyncStorage.setItem("myTasks", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.container}>
      {/* <Button
        title="sjsjsjs"
        onPress={async () => {
          const jsonValue = await AsyncStorage.getItem("completed");
          console.log(JSON.parse(jsonValue));
        }}
      /> */}
      {modal ? <ModalPopup hideModal={hideModal} /> : null}
      <View style={styles.tasksWrapper}>
        <Text style={styles.heading}>My Tasks</Text>
        <View style={{ borderBottomWidth: 1, margin: 5 }}></View>
        <View style={styles.filter}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{filterN}</Text>
          <Menu>
            <MenuTrigger>
              <Icon name="filter" type="font-awesome-5" size={25} />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{ position: "absolute", right: 10 }}
              customStyles={{
                optionWrapper: { padding: 16 },
                optionText: { fontSize: 17 },
              }}
            >
              <MenuOption
                onSelect={() => {
                  filterTheList("today"), setFilterN("Today");
                }}
                text="Today"
              />
              <MenuOption
                onSelect={() => {
                  filterTheList("tmr"), setFilterN("Tomorrow");
                }}
                text="Tomorrow"
              />
              <MenuOption
                onSelect={() => {
                  filterTheList("all"), setFilterN("All");
                }}
                text="All"
              />
            </MenuOptions>
          </Menu>
        </View>
        <ScrollView>
          <View style={styles.tasks}>
            {taskItems.map((item, index) => {
              return (
                <Pressable
                  onLongPress={() => complete(item.id, index)}
                  onPress={() => editItem(index)}
                  key={item.id}
                >
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.writeTask}
          placeholder="Write a Task!"
          value={task}
          onChangeText={(task) => setTask(task)}
        />
        {edit ? (
          <TouchableOpacity
            style={styles.cancelWrapper}
            onPress={() => {
              Keyboard.dismiss();
              setEdit(false);
              setTask("");
              setId();
              setYear(0);
              setMonth(0);
              setDay(0);
            }}
          >
            <Text styles={styles.cancel}>X</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            task !== "" && edit === false ? addItems() : saveEdit();
          }}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addButton}>{edit ? "^" : "+"}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.writeTaskWrapper2}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.writeTask2}
            placeholder="Year"
            value={year}
            keyboardType="numeric"
            onChangeText={(year) => checkYear(year, "y")}
          />
          <TextInput
            style={styles.writeTask2}
            placeholder="Month"
            value={month}
            keyboardType="numeric"
            onChangeText={(month) => checkMonth(month, "m")}
          />
          <TextInput
            style={styles.writeTask2}
            placeholder="Day"
            value={day}
            keyboardType="numeric"
            onChangeText={(day) => checkDay(day, "d")}
          />
          <Icon
            name="calendar"
            type="font-awesome-5"
            size={20}
            iconStyle={{ marginLeft: 10, marginTop: 22 }}
          />
        </View>
      </KeyboardAvoidingView>
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
