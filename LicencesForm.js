import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const LicenceForm = () => {
  const [formData, setFormData] = useState({
    genre: '',
    Nom: '',
    Prenom: '',
    DateNaissance: '',
    Nationalite: '',
    Adresse: '',
    EmailJoueur: '',
    NumeroTelephone: '',
    NomParentouResponsableLegal: '',
    Numerodetelparentouresponsablelegal: '',
    club: '',
    category: 'Category',
    NumeroLicence: '',
    DateDebutLicences: '',
    DateFinLicences: '',
    InformationsMedicalesSpecifiques: '',
    medicalVisit: false,
    Photo: '',
    SignatureMedecin: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSendData = async () => {
    const db = getFirestore();
    const licencesCollection = collection(db, 'licences');

    const licenceData = {
      ...formData,
      DateNaissance: new Date(formData.DateNaissance).getTime(),
      DateDebutLicences: new Date(formData.DateDebutLicences).getTime(),
      DateFinLicences: new Date(formData.DateFinLicences).getTime(),
      medicalVisit: formData.medicalVisit ? 'Oui' : 'Non',
    };

    try {
      await addDoc(licencesCollection, licenceData);
      console.log('Licence ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la licence :', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const iosDatePickerStyle = {
    dateInput: {
      borderWidth: 0,
    },
    placeholderText: {
      color: '#999',
    },
    dateText: {
      color: '#333',
    },
  };

  const isReactNative = Platform.OS === 'android' || Platform.OS === 'ios';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire de Licence</Text>

      <Picker
        selectedValue={formData.genre}
        style={styles.input}
        onValueChange={(value) => handleInputChange('genre', value)}
      >
        <Picker.Item label="Genre" value="" />
        <Picker.Item label="Homme" value="Homme" />
        <Picker.Item label="Femme" value="Femme" />
        <Picker.Item label="Autres" value="Autres" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={(value) => handleInputChange('Nom', value)}
        value={formData.Nom}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={(value) => handleInputChange('Prenom', value)}
        value={formData.Prenom}
      />

      {isReactNative ? (
        <DatePicker
          style={styles.datePicker}
          date={formData.DateNaissance}
          mode="date"
          placeholder="Date de naissance"
          format="DD/MM/YYYY"
          onDateChange={(date) => handleInputChange('DateNaissance', date)}
          customStyles={iosDatePickerStyle}
        />
      ) : (
        <input
          type="date"
          style={styles.datePicker}
          value={formData.DateNaissance}
          onChange={(e) => handleInputChange('DateNaissance', e.target.value)}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Nationalité"
        onChangeText={(value) => handleInputChange('Nationalite', value)}
        value={formData.Nationalite}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        onChangeText={(value) => handleInputChange('Adresse', value)}
        value={formData.Adresse}
      />

      <TextInput
        style={styles.input}
        placeholder="Email du joueur"
        onChangeText={(value) => handleInputChange('EmailJoueur', value)}
        value={formData.EmailJoueur}
      />

      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        onChangeText={(value) => handleInputChange('NumeroTelephone', value)}
        value={formData.NumeroTelephone}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom du parent ou responsable légal"
        onChangeText={(value) => handleInputChange('NomParentouResponsableLegal', value)}
        value={formData.NomParentouResponsableLegal}
      />

      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone du parent ou responsable légal"
        onChangeText={(value) => handleInputChange('Numerodetelparentouresponsablelegal', value)}
        value={formData.Numerodetelparentouresponsablelegal}
      />

      <TextInput
        style={styles.input}
        placeholder="Club"
        onChangeText={(value) => handleInputChange('club', value)}
        value={formData.club}
      />

      <Picker
        selectedValue={formData.category}
        style={styles.input}
        onValueChange={(value) => handleInputChange('category', value)}
      >
        <Picker.Item label="Catégorie" value="" />
        <Picker.Item label="U6" value="U6" />
        <Picker.Item label="U8" value="U8" />
        <Picker.Item label="U10" value="U10" />
        <Picker.Item label="U12" value="U12" />
        <Picker.Item label="U14" value="U14" />
        <Picker.Item label="U16" value="U16" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Numéro de licence"
        onChangeText={(value) => handleInputChange('NumeroLicence', value)}
        value={formData.NumeroLicence}
      />

      {isReactNative ? (
        <>
          <DatePicker
            style={styles.datePicker}
            date={formData.DateDebutLicences}
            mode="date"
            placeholder="Date de début de licences"
            format="DD/MM/YYYY"
            onDateChange={(date) => handleInputChange('DateDebutLicences', date)}
            customStyles={iosDatePickerStyle}
          />
          <DatePicker
            style={styles.datePicker}
            date={formData.DateFinLicences}
            mode="date"
            placeholder="Date de fin de licences"
            format="DD/MM/YYYY"
            onDateChange={(date) => handleInputChange('DateFinLicences', date)}
            customStyles={iosDatePickerStyle}
          />
        </>
      ) : (
        <>
          <input
            type="date"
            style={styles.datePicker}
            value={formData.DateDebutLicences}
            onChange={(e) => handleInputChange('DateDebutLicences', e.target.value)}
          />
          <input
            type="date"
            style={styles.datePicker}
            value={formData.DateFinLicences}
            onChange={(e) => handleInputChange('DateFinLicences', e.target.value)}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Informations médicales spécifiques"
        onChangeText={(value) => handleInputChange('InformationsMedicalesSpecifiques', value)}
        value={formData.InformationsMedicalesSpecifiques}
      />

      <View style={styles.checkboxRow}>
        <Text style={styles.checkboxLabel}>Visite médicale effectuée ?</Text>
        <TouchableOpacity
          style={[styles.checkbox, formData.medicalVisit ? styles.checked : null]}
          onPress={() => handleInputChange('medicalVisit', !formData.medicalVisit)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Photo"
        onChangeText={(value) => handleInputChange('Photo', value)}
        value={formData.Photo}
      />

      <TextInput
        style={styles.input}
        placeholder="Signature du médecin"
        onChangeText={(value) => handleInputChange('SignatureMedecin', value)}
        value={formData.SignatureMedecin}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSendData}>
        <Text style={styles.submitButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  checked: {
    backgroundColor: '#333',
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LicenceForm;

