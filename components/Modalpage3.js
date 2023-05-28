import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, TextInput, Text } from 'react-native';
import AddButton from './AddButton.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Fire.js';

const Modalpage3 = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  const auth = getAuth();

  const handleConfirm = async () => {
    props.onClose();
    props.onRedirect();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const address = `${street}, ${postalCode}, ${city}`;

      console.log('Utilisateur créé avec succès:', user);
      const userDocRef = await addDoc(collection(db, 'user'), {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        userId: user.uid,
      });
      console.log('Utilisateur ajouté à la collection "user" avec l\'ID:', userDocRef.id);
    } catch (error) {
      console.log('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.input} placeholder="Nom" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="Numéro de téléphone" value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput style={styles.input} placeholder="Adresse" value={street} onChangeText={setStreet} />
        <TextInput style={styles.input} placeholder="Code postal" value={postalCode} onChangeText={setPostalCode} />
        <TextInput style={styles.input} placeholder="Ville" value={city} onChangeText={setCity}/>
        <TextInput style={styles.input} placeholder="Adresse e-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReturn} onPress={() => props.onClose()}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  input: {
    width: '80%',
    height: 36,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    marginRight: 8,
    color: 'white',
    },
    buttonConfirm: {
    width: '80%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    },
    buttonReturn: {
    width: '80%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    },
    buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter_400Regular',
    },
    });
    
    export default Modalpage3;
