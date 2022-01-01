import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
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
import AssignModal from "./AssignModal";

export default function TaskCompleted() {
  const [taskItems, setTaskItems] = React.useState([]);
  const [filterN, setFilterN] = React.useState("My Tasks");
  const [ATasks, setATasks] = React.useState([]); //Assigned tasks List
  const [modal, setModal] = React.useState(false);
  const [obj, setObj] = React.useState({});

  React.useEffect(() => {
    filterTheList();
  }, []);

  const getData = async () => {};

  const filterTheList = async () => {
    // if (filterN === "My Tasks") {
    try {
      const jsonValue = await AsyncStorage.getItem("completed");
      if (JSON.parse(jsonValue) !== null) {
        setTaskItems(JSON.parse(jsonValue));
      } else {
        setTaskItems([]);
      }
    } catch (e) {}
    // } else {

    try {
      const jsonValue = await AsyncStorage.getItem("assignCompleted");
      if (JSON.parse(jsonValue) !== null) {
        setATasks(JSON.parse(jsonValue));
      } else {
        setATasks([]);
      }
    } catch (e) {}
    // }
  };

  const hideModal = () => {
    setModal(false);
  };

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
                  filterTheList(), setFilterN("My Tasks");
                }}
                text="My Tasks"
              />
              <MenuOption
                onSelect={() => {
                  filterTheList(), setFilterN("Assigned Tasks");
                }}
                text="Assigned Tasks"
              />
            </MenuOptions>
          </Menu>
        </View>
        <ScrollView>
          <View style={styles.tasks}>
            {filterN === "My Tasks"
              ? taskItems.map((item, index) => {
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
                })
              : ATasks.map((item, index) => {
                  console.log(item);
                  return (
                    <TouchableOpacity
                      style={styles.itemsWrapper}
                      onPress={() => {
                        setModal(true);
                        setObj(item);
                      }}
                      key={item._id}
                    >
                      <View style={styles.item}>
                        <View style={styles.itemLeft}>
                          <View style={styles.square}></View>
                          <Text style={styles.text}>{item.TaskName}</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: 5,
                              fontWeight: "bold",
                            }}
                          >
                            | ${item.Total}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}

            {modal ? (
              <AssignModal hideModal={hideModal} obj={obj} completed={true} />
            ) : null}
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
  filter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
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
