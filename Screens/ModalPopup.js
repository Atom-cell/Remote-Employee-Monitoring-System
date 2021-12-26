import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

function ModalPopup({ hideModal }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={true} onBackdropPress={() => hideModal()}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "900" }}>Well Done!</Text>
          <Text style={{ fontSize: 25, fontWeight: "900" }}>
            Task Completed
          </Text>
          {/* <Button title="Hide modal" onPress={() => hideModal()} /> */}
        </View>
      </Modal>
    </View>
  );
}

export default ModalPopup;
