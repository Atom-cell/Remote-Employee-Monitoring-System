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
} from "react-native";
import Task from "./Task";
import { Icon } from "react-native-elements";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function TaskMine() {
  const [task, setTask] = React.useState("");
  const [taskItems, setTaskItems] = React.useState([]);
  const [filterList, setFilterList] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState();
  const [day, setDay] = React.useState(0);
  const [month, setMonth] = React.useState(0);
  const [year, setYear] = React.useState(0);

  const [backup, setBackup] = React.useState([]);

  React.useEffect(() => {}, [taskItems, backup]);
  const checkDay = (num, field) => {
    if ((field === "d" && num > 31) || (field === "d" && num < 1))
      alert("Enter valid day");
    else {
      setDay(num);
    }
  };
  const checkMonth = (num, field) => {
    if ((field === "m" && num > 12) || (field === "m" && num < 1))
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
    let a = "";
    let m = d.getMonth() + 1;
    if (m > 12) m = 1;
    let c = d.getDate();
    let y = d.getFullYear();
    a = c + "-" + m + "-" + y;
    if (filter === "today") {
      setFilterList(
        backup.filter((i) => {
          return i.date === a;
        })
      );
      console.log("FILTER ", filterList);
      setTaskItems(filterList);
    } else if (filter === "tmr") {
      c = d.getDate() + 1;
      a = c + "-" + m + "-" + y;
      setFilterList(
        backup.filter((i) => {
          return i.date === a;
        })
      );
      console.log("FILTER ", filterList);
      setTaskItems(filterList);
    } else {
      setTaskItems(backup);
    }
  };

  const addItems = () => {
    Keyboard.dismiss();
    let item = {
      name: task,
      year: year,
      month: month,
      day: day,
      date: `${day}-${month}-${year}`,
    };
    if (task !== "" && year !== 0 && month !== 0 && day !== 0) {
      setTaskItems([...taskItems, item]);
    }
    setTask("");
    setYear(0);
    setMonth(0);
    setDay(0);
    console.log(taskItems);
    setBackup(taskItems);
    console.log("BACKUP", backup);
  };

  const deleteItem = (id) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(id, 1);
    setTaskItems(itemsCopy);
  };

  const editItem = (index) => {
    setEdit(true);
    setTask(taskItems[index].name);
    setYear(taskItems[index].year);
    setMonth(taskItems[index].month);
    setDay(taskItems[index].day);
    setId(index);
  };

  const saveEdit = () => {
    Keyboard.dismiss();
    // let a = [...taskItems];
    // a[id] = task;
    // setTaskItems(a);
    let item = {
      name: task,
      year: year,
      month: month,
      day: day,
      date: `${year}-${month}-${day}`,
    };

    setTaskItems(
      taskItems.map((x, i) => {
        return id === i ? { ...item } : { ...x };
      })
    );
    setEdit(false);
    setTask("");
    setId();
    setYear(0);
    setMonth(0);
    setDay(0);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
                onSelect={() => filterTheList("today")}
                text="Today"
              />
              <MenuOption
                onSelect={() => filterTheList("tmr")}
                text="Tomorrow"
              />
              <MenuOption onSelect={() => filterTheList("all")} text="All" />
            </MenuOptions>
          </Menu>
        </View>
        <View style={{ borderBottomWidth: 1, margin: 5 }}></View>
        <Text style={styles.heading}>My Tasks</Text>
        <ScrollView>
          <View style={styles.tasks}>
            {taskItems.map((item, index) => {
              return (
                <Pressable onLongPress={() => editItem(index)} key={index}>
                  <Task
                    key={index}
                    task={item}
                    deleteItem={deleteItem}
                    index={index}
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
    marginBottom: 15,
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
