import React, { useState } from 'react';
import { StyleSheet, Modal, View, TextInput } from 'react-native';
import Modalpage2 from './Modalpage2';
import AddButton from './AddButton.js';

const Modalpage3 = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleConfirm = () => {
    props.onClose();
  };
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <TextInput style={styles.input} placeholder="Prénom" />
      <TextInput style={styles.input} placeholder="Nom" />
      <TextInput style={styles.input} placeholder="Numéro de téléphone" />
      <TextInput style={styles.input} placeholder="Date de naissance (au format:xx/xx/xxxx)" />
      <label style={{width: '80%', height: 15, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: "white" }} for='role'> Choisissez un rôle :</label> 
        <select style={{width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, }} id="role">
        <option value="Entraîneur">Entraineur</option>
        <option value="Joueur">Joueur</option>
        <option value="Président">President</option>
    </select>
      <TextInput style={styles.input} placeholder="Adresse e-mail" keyboardType="email-address" />  
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmation du Mot de passe" secureTextEntry />
      <Modalpage2 visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <AddButton content="Confirmer" onPress={handleConfirm} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
    color: 'white',
  },
});

export default Modalpage3;