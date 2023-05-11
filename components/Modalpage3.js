import React, { useState } from 'react';
import { Modal, View, TextInput } from 'react-native';
import Modalpage2 from './Modalpage2';
import AddButton from './AddButton.js';

const Modalpage3 = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Prénom" />
      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Nom" />
      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Numéro de téléphone" />
      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Date de naissance (au format:xx/xx/xxxx)" />
      <label for='role'> Choisissez un rôle :</label> 
        <select style={{width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, }} id="role">
        <option value="Attaquant">Attaquant</option>
        <option value="Défenseur">Défenseur</option>
        <option value="Milieu">Milieu</option>
    </select>

      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Adresse e-mail" keyboardType="email-address" />  
      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Mot de passe" secureTextEntry />
      <TextInput style={{ width: '80%', height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, fontFamily: 'Inter_400Regular', marginBottom: 12, color: 'white' }} placeholder="Confirmation du Mot de passe" secureTextEntry />
      <Modalpage2 visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <AddButton content="Confirmer" onPress={props.onOpenModalPage3} />
      </View>
    </Modal>
  );
};

export default Modalpage3;