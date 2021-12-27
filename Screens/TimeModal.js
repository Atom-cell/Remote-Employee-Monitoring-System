import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const TimeModal = ({ hideModal, msg }) => {
  const [isModalVisible, setModalVisible] = React.useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={true}>
        <View style={styles.modal}>
          <Text style={styles.txt}>{msg}</Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity onPress={() => hideModal("n")} style={styles.no}>
              <Text style={{ fontSize: 15 }}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => hideModal("y")} style={styles.yes}>
              <Text style={{ fontSize: 15 }}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimeModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
  },
  txt: {
    fontSize: 20,
    // fontWeight: "700",
  },
  btnWrapper: {
    flexDirection: "row",
    marginTop: 23,
  },
  yes: {
    marginHorizontal: 10,
    backgroundColor: "#F4BE2C",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  no: {
    marginHorizontal: 10,
    borderWidth: 3,
    borderColor: "#CC1414",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
