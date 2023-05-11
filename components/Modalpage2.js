import React from 'react';
import { Modal, Text, View } from 'react-native';
import AddButton from './AddButton.js';

const Modalpage2 = (props) => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#020000' }}>
        <Text style={{color: 'white'}}> {props.inscription}</Text>
        <Text style={{color: 'white'}}> {props.inscription2}</Text>
        <AddButton content="Inscription" onPress={props.onOpenModalPage3} />
      </View>
    </Modal>
  );
};

export default Modalpage2;