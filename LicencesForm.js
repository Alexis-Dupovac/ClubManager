import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker, Platform, Modal, ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { getFirestore, collection, addDoc, Timestamp, getDocs, query, where} from '@firebase/firestore';
import { format} from 'date-fns';
import { useNavigation } from '@react-navigation/native';

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
    Club: '',
    Entraineur: '',
    category: 'Category',
    NumeroLicence: '',
    DateDebutLicences: '',
    DateFinLicences: '',
    InformationsMedicalesSpecifiques: '',
    medicalVisit: '',
    Photo: '',
    SignatureMedecin: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState("");
  const [formField, setFormField] = useState('');

  const [formError, setFormError] = useState({
    Nom: null,
    Prenom: null,
    Club: null,
    category: null, 
    genre: null
  });

  
  const handleInputChange = (name, value) => {
    if (value.trim() === '') {
      // If the value is empty, set the error message
      setFormError({ ...formError, [name]: 'Veuillez remplir ce champ' });
    } else {
      // If the value is not empty, clear the error message
      setFormError({ ...formError, [name]: null });
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleCodeSubmit = () => {
    if (/^\d{4}$/.test(code)) {  // New line: check if code is a 4-digit number
      handleInputChange('SignatureJoueur', code);
      setFormField(code);
      setModalVisible(!modalVisible);
    } else {
      alert('Le code doit être un nombre à 4 chiffres');
    }
  };
  
  const navigation = useNavigation(); 
  const handleSendData = async () => {
    setIsLoading(true);
    const db = getFirestore();
    const licencesCollection = collection(db, 'licences');
      // Vérifier si un document avec le même nom et prénom existe déjà
  const querySnapshot = await getDocs(query(licencesCollection, where("Nom", "==", formData.Nom), where("Prenom", "==", formData.Prenom)));
  if (!querySnapshot.empty) {
    console.error('Un document avec le même nom et prénom existe déjà');
    return;
  }
    
    const licenceData = {
        ...formData,
        DateNaissance: formData.DateNaissance ? Timestamp.fromDate(new Date(formData.DateNaissance)) : null,
        DateDebutLicences: formData.DateDebutLicences ? Timestamp.fromDate(new Date(formData.DateDebutLicences)) : null,
        DateFinLicences: formData.DateFinLicences ? Timestamp.fromDate(new Date(formData.DateFinLicences)) : null,
        medicalVisit: formData.medicalVisit === 'Oui',
    };

    // Calculer l'âge à partir de la date de naissance
    const birthDate = new Date(formData.DateNaissance);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    // Obtenir l'année de la date de début de licence
    const licenceStartYear = new Date(formData.DateDebutLicences).getFullYear();
    const currentYear = new Date().getFullYear();

    // Assurez-vous que tous les champs sont remplis et que les conditions d'âge et de date sont respectées
    if (licenceData.Nom && licenceData.Prenom && licenceData.Club && licenceData.category && licenceData.genre && age >= 5 && age <= 15 && licenceStartYear >= currentYear && licenceStartYear <= currentYear + 1) { 
        try {
            await addDoc(licencesCollection, licenceData);
            console.log('Licence ajoutée avec succès');
            // Affichez votre écran éphémère ici
            // Après un certain délai, redirigez l'utilisateur vers la page des licences
            setTimeout(() => {
                setIsLoading(false);
                navigation.navigate('Licences'); // remplacez 'Licences' par le nom de votre page de licences
            }, 5000); // attendez 2 secondes avant de rediriger
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la licence :', error);
            setIsLoading(false);
        }
    }; if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } 
     else {
        // Affichez un message d'erreur si toutes les conditions ne sont pas remplies
        alert('Veuillez vérifier les informations saisies. L\'âge doit être compris entre 5 et 15 ans et la date de début de la licence doit être pour cette année ou l\'année suivante.');
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
      {formError.genre && <Text style={styles.errorText}>{formError.genre}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={(value) => handleInputChange('Nom', value)}
        value={formData.Nom}
      />
       {formError.Nom && <Text style={styles.errorText}>{formError.Nom}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={(value) => handleInputChange('Prenom', value)}
        value={formData.Prenom}
      />
      {formError.Prenom && <Text style={styles.errorText}>{formError.Prenom}</Text>}

      <Text style={styles.label}>Date de naissance</Text>
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
        keyboardType="numeric"  // only display number pad
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
        keyboardType="numeric"  // only display number pad
        placeholder="Numéro de téléphone du parent ou responsable légal"
        onChangeText={(value) => handleInputChange('Numerodetelparentouresponsablelegal', value)}
        value={formData.Numerodetelparentouresponsablelegal}
      />

      <TextInput
        style={styles.input}
        placeholder="Club"
        onChangeText={(value) => handleInputChange('Club', value)}
        value={formData.Club}
      />
      {formError.Club && <Text style={styles.errorText}>{formError.Club}</Text>}

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
      {formError.category && <Text style={styles.errorText}>{formError.category}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Numéro de licence"
        onChangeText={(value) => handleInputChange('NumeroLicence', value)}
        value={formData.NumeroLicence}
      />
    <Text style={styles.label}>Date de début de licences</Text>
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

<Picker
        selectedValue={formData.medicalVisit}
        style={styles.input}
        onValueChange={(value) => handleInputChange('medicalVisit', value)}
      >
        <Picker.Item label="Visite medicale" value="" />
        <Picker.Item label="Oui" value="Oui" />
        <Picker.Item label="Non" value="Non" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Photo"
        onChangeText={(value) => handleInputChange('Photo', value)}
        value={formData.Photo}
      />
      <TextInput
    style={styles.input}
    value={formField}  // Use formField as the value for this TextInput
    editable={false}   // Optional: make it non-editable
  />

<TouchableOpacity style={styles.signatureButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.signatureButtonText}>Signer ici</Text>
      </TouchableOpacity>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
     <View style={styles.modalView}>
  <TextInput
    style={styles.input}
    onChangeText={setCode}
    value={code}
    placeholder="Entrez votre code ici"
    autoFocus={true}
  />

  <View style={{flexDirection: 'row', marginTop: 15}}>
    <TouchableOpacity
      style={[styles.button, styles.buttonClose, {marginRight: 10}]}
      onPress={() => setModalVisible(false)}
    >
      <Text style={styles.textStyle}>Annuler</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, styles.buttonSave]}
      onPress={handleCodeSubmit}
    >
      <Text style={styles.textStyle}>Soumettre</Text>
    </TouchableOpacity>
  </View>
</View>

    </Modal>



    <TouchableOpacity style={styles.submitButton} onPress={() => handleSendData()}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#F0F8FF',  
    borderColor: '#008B8B',      
  },

  errorText: {
    color: 'red',
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
  signatureButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signatureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  buttonSave: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});

export default LicenceForm; 

