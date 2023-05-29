import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

const LicencesPage = ({ navigation }) => {
  const [licences, setLicences] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLicenceId, setSelectedLicenceId] = useState(null);

  useEffect(() => {
    const fetchLicences = async () => {
      const db = getFirestore();
      const licencesCollection = collection(db, 'licences');
      const querySnapshot = await getDocs(licencesCollection);

      const fetchedLicences = [];
      querySnapshot.forEach((doc) => {
        const licenceData = doc.data();

        let formattedDateNaissance = '';
        let formattedDateDebutLicences = '';
        let formattedDateFinLicences = '';

        if (licenceData.DateNaissance) {
          const dateNaissance = licenceData.DateNaissance.toDate();
          formattedDateNaissance = format(dateNaissance, 'dd/MM/yyyy');
        }

        if (licenceData.DateDebutLicences) {
          const dateDebutLicences = licenceData.DateDebutLicences.toDate();
          formattedDateDebutLicences = format(dateDebutLicences, 'dd/MM/yyyy');
        }

        if (licenceData.DateFinLicences) {
          const dateFinLicences = licenceData.DateFinLicences.toDate();
          formattedDateFinLicences = format(dateFinLicences, 'dd/MM/yyyy');
        }

        fetchedLicences.push({
          id: doc.id,
          Nom: licenceData.Nom,
          Prenom: licenceData.Prenom,
          DateNaissance: formattedDateNaissance,
          DateDebutLicences: formattedDateDebutLicences,
          DateFinLicences: formattedDateFinLicences,
          medicalVisit: licenceData.medicalVisit,
        });
      });

      setLicences(fetchedLicences);
    };

    fetchLicences();
  }, []);

  const handleCreateNewLicence = () => {
    navigation.navigate('LicencesForm');
  };

  const handleEdit = (id) => {
    // Add your edit function here
  };

  const handleDeleteConfirmation = (id) => {
    setSelectedLicenceId(id);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const db = getFirestore();
      const licenceRef = doc(db, 'licences', selectedLicenceId);
      await deleteDoc(licenceRef);

      const updatedLicences = licences.filter((licence) => licence.id !== selectedLicenceId);
      setLicences(updatedLicences);
      setModalVisible(false);

      Alert.alert('Suppression réussie', 'La licence a été supprimée avec succès.');
    } catch (error) {
      setModalVisible(false);
      Alert.alert('Erreur de suppression', 'Une erreur est survenue lors de la suppression de la licence.');
    }
  };

  const handleViewPdf = (id) => {
    // Add your view pdf function here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Licences</Text>

      {licences.map((licence) => (
        <View key={licence.id} style={styles.card}>
          <Text style={styles.cardText}>Nom: {licence.Nom}</Text>
          <Text style={styles.cardText}>Prénom: {licence.Prenom}</Text>
          <Text style={styles.cardText}>Date de naissance: {licence.DateNaissance}</Text>
          <Text style={[styles.cardText, styles.greenText]}>Date début licence: {licence.DateDebutLicences}</Text>
          <Text style={[styles.cardText, styles.redText]}>Date fin licence: {licence.DateFinLicences}</Text>
          <View style={styles.iconRow}>
            <Text style={styles.cardText}>Vu par le médecin: </Text>
            <MaterialIcons
              name={licence.medicalVisit ? 'check' : 'close'}
              size={24}
              color={licence.medicalVisit ? 'green' : 'red'}
              style={styles.icon}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleEdit(licence.id)}>
              <MaterialIcons name="edit" size={24} color="lightblue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteConfirmation(licence.id)}>
              <MaterialIcons name="delete" size={24} color="lightcoral" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleViewPdf(licence.id)}>
              <MaterialIcons name="picture-as-pdf" size={24} color="lightgreen" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateNewLicence}>
        <Text style={styles.createButtonText}>Créer une nouvelle licence</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Êtes-vous sûr de vouloir supprimer cette licence?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: 'red' }}
                onPress={handleDelete}
              >
                <Text style={styles.textStyle}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: 'green' }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: 'black',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  greenText: {
    color: 'lightgreen',
  },
  redText: {
    color: 'lightcoral',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  createButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
    alignItems: 'center',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default LicencesPage;






