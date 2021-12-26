import React from "react";

import DB, { AssignedTasks } from "../DB";
import { StyleSheet, Text, View } from "react-native";
import { DocumentSnapshot } from "@firebase/firestore";

const TaskAssigned = () => {
  React.useEffect(() => {
    AssignedTasks.doc(1)
      .get()
      .then((documentSnapshot) => {
        console.log("hello"), documentSnapshot.data();
      });
  }, []);

  return (
    <View>
      <Text>assigned</Text>
    </View>
  );
};

export default TaskAssigned;

const styles = StyleSheet.create({});

// import React, { Component } from "react";
// import { Text, View } from "react-native";

// export class TaskAssigned extends Component {
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     );
//   }
// }

// export default TaskAssigned;
