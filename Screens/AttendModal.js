import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AttendModal({ hideModal }) {
  const [isModalVisible, setModalVisible] = useState(true);
  const [password, setPass] = React.useState("");

  const checkUser = async () => {
    let pass = await AsyncStorage.getItem("Password");
    if (pass === password) {
      hideModal("yes");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={true} onBackdropPress={() => hideModal("no")}>
        <View style={styles.modal}>
          <View style={styles.top}></View>
          <View style={{ width: "90%" }}>
            <Input
              placeholder="Password"
              label={"Enter Password to mark attendence"}
              onChangeText={(v) => setPass(v)}
            />
          </View>

          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => (password ? checkUser() : null)}>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>OK</Text>
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
    height: "30%",
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
