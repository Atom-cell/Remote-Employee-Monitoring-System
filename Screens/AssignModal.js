import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function AssignModal({ hideModal, obj, change }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const startTask = () => {};
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={true} onBackdropPress={() => hideModal()}>
        <View style={styles.modal}>
          <View style={styles.top}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>New Task</Text>
          </View>
          <View style={{ width: "90%" }}>
            <Text style={styles.txt}>{obj.TaskName}</Text>
            <Text style={styles.txt}>{obj.TaskDescp}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt}>
              {obj.Billable ? <Text>Billable</Text> : <Text>not Billable</Text>}
            </Text>
            <View style={{ marginHorizontal: 10 }}></View>
            <Text style={styles.txt}>${obj.Rate}/h</Text>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => change(obj.TaskName, obj.id)}>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                Start Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: "13%",
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: "#F4BE2C",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    height: "13%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F4BE2C",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
  },
  txt: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
