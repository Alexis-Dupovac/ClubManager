import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text } from 'react-native';
import Modalpage3 from './components/Modalpage3.js';
import Auth from './Auth.js';
import {getFootball} from './Fire.js';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPage3Visible, setIsModalPage3Visible] = useState(false);
  const [filteredFootball, setFilteredFootball] = useState([]);

  const handleOpenModalPage3 = () => {
    setIsModalVisible(false);
    setIsModalPage3Visible(true);
  }

  const handleRedirect = () => {
    setIsModalVisible(true);
    setIsModalPage3Visible(false);
  };

  useEffect (() => {
    getFootball((football) => {
      setFilteredFootball(football);
    });
  },[]);
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Final_logo.png')} style={styles.logo} />
      <Modalpage3 visible={isModalPage3Visible} onClose={() => setIsModalPage3Visible(false)} onRedirect={handleRedirect} />
      <Auth onClose={() => setIsModalVisible(false)} />
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