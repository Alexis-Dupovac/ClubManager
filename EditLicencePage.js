import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const EditLicencePage = ({ route, navigation }) => {
  const { licenceId } = route.params;

  const [licenceData, setLicenceData] = useState({
    genre: '',
    Nom: '',
    Prenom: '',
    DateNaissance: null,
    Nationalite: '',
    Adresse: '',
    EmailJoueur: '',
    NumeroTelephone: '',
    NomParentouResponsableLegal: '',
    Numerodetelparentouresponsablelegal: '',
    Club: '',
    Entraineur: '',
    category: '',
    NumeroLicence: '',
    DateDebutLicences: null,
    DateFinLicences: null,
    InformationsMedicalesSpecifiques: '',
    medicalVisit: false,
    Photo: '',
    SignatureMedecin: '',
  });

  useEffect(() => {
    const fetchLicence = async () => {
      const db = getFirestore();
      const licenceRef = doc(db, 'licences', licenceId);
      const licenceSnap = await getDoc(licenceRef);

      if (licenceSnap.exists()) {
        const data = licenceSnap.data();

        // convert Firebase timestamp to JavaScript Date object
        let formattedDateNaissance = null;
        let formattedDateDebutLicences = null;
        let formattedDateFinLicences = null;

        if (data.DateNaissance) {
          formattedDateNaissance = data.DateNaissance.toDate();
        }

        if (data.DateDebutLicences) {
          formattedDateDebutLicences = data.DateDebutLicences.toDate();
        }

        if (data.DateFinLicences) {
          formattedDateFinLicences = data.DateFinLicences.toDate();
        }

        setLicenceData({
          genre: data.genre,
          Nom: data.Nom,
          Prenom: data.Prenom,
          DateNaissance: formattedDateNaissance,
          Nationalite: data.Nationalite,
          Adresse: data.Adresse,
          EmailJoueur: data.EmailJoueur,
          NumeroTelephone: data.NumeroTelephone,
          NomParentouResponsableLegal: data.NomParentouResponsableLegal,
          Numerodetelparentouresponsablelegal: data.Numerodetelparentouresponsablelegal,
          Club: data.Club,
          Entraineur: data.Entraineur,
          category: data.category,
          NumeroLicence: data.NumeroLicence,
          DateDebutLicences: formattedDateDebutLicences,
          DateFinLicences: formattedDateFinLicences,
          InformationsMedicalesSpecifiques: data.InformationsMedicalesSpecifiques,
          medicalVisit: data.medicalVisit,
          SignatureMedecin: data.SignatureMedecin,
        });
      } else {
        console.log('No such document!');
      }
    };

    fetchLicence();
  }, [licenceId]);

  const handleUpdate = async () => {
    const db = getFirestore();
    const licenceRef = doc(db, 'licences', licenceId);
  
    const updatedLicenceData = Object.fromEntries(
      Object.entries(licenceData).filter(([_, value]) => value !== undefined)
    );
  
    await updateDoc(licenceRef, updatedLicenceData);
  
    Alert.alert('Mise à jour réussie', 'La licence a été mise à jour avec succès.');
    navigation.goBack();
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier la licence</Text>

      <TextInput
        style={styles.input}
        value={licenceData.Nom}
        placeholder='Nom'
        onChangeText={(text) => setLicenceData({ ...licenceData, Nom: text })}
      />

      <TextInput
        style={styles.input}
        value={licenceData.Prenom}
        placeholder='Prenom'
        onChangeText={(text) => setLicenceData({ ...licenceData, Prenom: text })}
      />

<TextInput
        style={styles.input}
        value={licenceData.Club}
        placeholder='club'
        onChangeText={(text) => setLicenceData({ ...licenceData, Club: text })}
      />

<TextInput
        style={styles.input}
        value={licenceData.Entraineur}
        placeholder='Entraineur'
        onChangeText={(text) => setLicenceData({ ...licenceData, Entraineur: text })}
      />


      
<TextInput
        style={styles.input}
        value={licenceData.EmailJoueur}
        placeholder='email joueur'
        onChangeText={(text) => setLicenceData({ ...licenceData, EmailJoueur: text })}
      />

<TextInput
        style={styles.input}
        value={licenceData.NumeroTelephone}
        placeholder='numero de telephone'
        onChangeText={(text) => setLicenceData({ ...licenceData, NumeroTelephone: text })}
      />

<TextInput
        style={styles.input}
        value={licenceData.NomParentouResponsableLegal}
        placeholder='nom responsable legal'
        onChangeText={(text) => setLicenceData({ ...licenceData, NomParentouResponsableLegal: text })}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Mettre à jour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '100%',
      marginBottom: 10,
      padding: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
    },
  });
  export default EditLicencePage;  

