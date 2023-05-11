import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default AddButton;