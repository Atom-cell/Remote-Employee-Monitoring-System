import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function Task({ task, index, deleteItem }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.text}>{task.name}</Text>
      </View>
      <Text style={styles.date}>{task.date}</Text>
      <View>
        <TouchableOpacity onPress={() => deleteItem(index)}>
          <Icon
            name="trash-alt"
            type="font-awesome-5"
            size={20}
            iconStyle={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    // marginLeft: 20,
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
  text: {
    maxWidth: "80%",
    fontSize: 17,
  },
  circle: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderRadius: 5,
    borderWidth: 2,
  },
});
