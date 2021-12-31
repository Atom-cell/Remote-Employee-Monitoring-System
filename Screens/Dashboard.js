import React from "react";
import { Button, FlatList } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import DB, { AssignedTasks } from "../DB";
import AssignModal from "./AssignModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const [quote, setQuote] = React.useState("");
  const [tasksList, setTasksList] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    getQuote();
    getCompletedTasks();
  }, []);

  const getQuote = () => {
    const options = {
      method: "POST",
      url: "https://motivational-quotes1.p.rapidapi.com/motivation",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "motivational-quotes1.p.rapidapi.com",
        "x-rapidapi-key": "dba998558fmsh5ad7c3364d357f1p18263cjsne15b101e6edc",
      },
      data: { key1: "value", key2: "value" },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setQuote(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const hideModal = () => {
    setModal(false);
  };

  const getCompletedTasks = async () => {
    let arr = [];
    setTasksList([...arr]);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month > 12) month = 1;
    let year = date.getFullYear();
    AssignedTasks.where("empID", "==", "3").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        if (v.data().date === `${year}-${month}-${day}` && v.data().Completed)
          arr.push({ _id: v.id, ...v.data() });
        console.log("LIST ", arr);
        setTasksList([...arr]);
      });
    });

    // let a = await AsyncStorage.getItem("assignCompleted");
    // let b = JSON.parse(a);
    // setTasksList(b);
  };

  return (
    <View style={styles.container}>
      <View style={styles.quote}>
        <Text style={styles.qtxt}>{quote}</Text>
      </View>
      <View style={styles.progress}>
        <Text style={styles.heading}>Today's Progress</Text>
        <View style={{ borderBottomWidth: 1, margin: 5 }}></View>

        <View style={styles.tasks}>
          <FlatList
            refreshing={false}
            onRefresh={() => getCompletedTasks()}
            data={tasksList}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.itemsWrapper}
                  onPress={() => {
                    setModal(true);
                  }}
                  key={item.item._id}
                >
                  {modal ? (
                    <AssignModal
                      hideModal={hideModal}
                      obj={item.item}
                      completed={true}
                    />
                  ) : null}
                  <View style={styles.item}>
                    <View style={styles.itemLeft}>
                      <View style={styles.square}></View>
                      <Text style={styles.text}>{item.item.TaskName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  quote: {
    width: "100%",
    height: "24%",
    overflow: "visible",
    padding: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  qtxt: {
    fontSize: 20,
    flexWrap: "wrap",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  progress: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 7,
    paddingTop: 7,
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
