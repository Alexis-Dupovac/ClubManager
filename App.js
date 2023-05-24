import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text } from 'react-native';
import AddButton from './components/AddButton.js';
import Modalpage3 from './components/Modalpage3.js';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPage3Visible, setIsModalPage3Visible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }
  
  const handleOpenModalPage3 = () => {
    setIsModalVisible(false);
    setIsModalPage3Visible(true);
  }

  const handleRedirect = () => {
    setIsModalVisible(true);
    setIsModalPage3Visible(false);
    // Ajoutez votre code de redirection ici
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/Final_Logo.jpg')} style={styles.logo} />
      <TextInput style={styles.input} placeholder="Adresse e-mail" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />
      <AddButton content="Connexion" onPress={() => setIsModalVisible(true)} />
      <Modalpage3 visible={isModalPage3Visible} onClose={() => setIsModalPage3Visible(false)} onRedirect={handleRedirect} />
      <TouchableOpacity onPress={handleOpenModalPage3}>
        <Text style={styles.signupText}>Pas encore inscrit ? <Text style={styles.signupLink}>Inscrivez-vous</Text> !</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
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
  signupText: {
    color: 'white',
    marginTop: 16,
  },
  signupLink: {
    color: '#002D72',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});