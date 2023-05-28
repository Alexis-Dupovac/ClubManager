import React, { useState } from 'react';
import { StyleSheet, Modal, View, TextInput, Text } from 'react-native';
import AddButton from './AddButton.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Modalpage3 = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleConfirm = async () => {
    props.onClose();
    props.onRedirect();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Utilisateur créé avec succès:', user);
    } catch (error) {
      console.log('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        <TextInput style={styles.input} placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Nom" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="Numéro de téléphone" value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput style={styles.input} placeholder="Adresse e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
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