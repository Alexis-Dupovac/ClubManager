import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import AddButton from './components/AddButton.js';
import Modalpage2 from './components/Modalpage2.js';
import Modalpage3 from './components/Modalpage3.js';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCloseModal = () => {
    setIsModalVisible(false);
  }
  
  const handleOpenModalPage3 = () => {
    setIsModalVisible(false);
    setIsModalPage3Visible(true);
  }

  const handleOpenApp = () => {
    setIsModalVisible(false);
  };
  
  const [isModalPage3Visible, setIsModalPage3Visible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/Final_Logo.jpg')} style={styles.logo} />
      <TextInput style={styles.input} placeholder="Adresse e-mail" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />
      <AddButton content="Connexion" onPress={() => setIsModalVisible(true)}/>
      <Modalpage2
        visible={isModalVisible} onClose={handleCloseModal}
        inscription="Pas encore inscrit ?"
        inscription2="Inscrivez-vous !"
        onOpenModalPage3={handleOpenModalPage3}
      />
      <Modalpage3
        visible={isModalPage3Visible}
        onClose={() => setIsModalPage3Visible(false)}
        onOpenApp={handleOpenApp}
      />
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
});
