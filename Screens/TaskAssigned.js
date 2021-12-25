// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const TaskAssigned = () => {
//   return (
//     <View>
//       <Text>assigned</Text>
//     </View>
//   );
// };

// export default TaskAssigned;

// const styles = StyleSheet.create({});

import React, { Component } from "react";
import { Text, View } from "react-native";

export class TaskAssigned extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default TaskAssigned;
