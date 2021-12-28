import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Task = ({ navigation }) => {
  return (
    <View>
      {/* <TouchableOpacity
        style={styles.btnWrapper}
        onPress={() => navigation.navigate("MyDay")}
      >
        <View style={styles.dot}></View>
        <Text style={styles.txt}>My Day</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={() => navigation.navigate("Assigned")}
      >
        <View style={styles.dot}></View>
        <Text style={styles.txt}>Assigned to me</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={() => navigation.navigate("Mine")}
      >
        <View style={styles.dot}></View>
        <Text style={styles.txt}>My tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={() => navigation.navigate("Completed")}
      >
        <View style={styles.dot}></View>
        <Text style={styles.txt}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  btnWrapper: {
    padding: 27,
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 2,
  },
  txt: {
    fontSize: 23,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "#F4BE2C",
    marginTop: 12,
    marginRight: 10,
  },
});
