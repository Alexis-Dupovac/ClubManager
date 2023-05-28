import React, { useState } from 'react';
import { View, TextInput, Button,TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './Fire.js';

const Auth = ({ onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = getAuth(app);

  const handleLogin = async () => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      onClose();
      setIsModalVisible(true);
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = '';

      switch (errorCode) {
        case 'auth/user-not-found':
          errorMessage = 'Utilisateur non trouvé.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect.';
          break;
        default:
          errorMessage = 'Erreur lors de la connexion.';
          break;
      }

      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
              <TouchableOpacity style={styles.buttonConnect} onPress={handleLogin}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text>Contenu de la modal</Text>
          <Button title="Fermer" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
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
  buttonConnect: {
    width: '80%',
    height: 50,
    backgroundColor: 'blue',
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Auth;