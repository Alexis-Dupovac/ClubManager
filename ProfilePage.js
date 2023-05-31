import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfilePage = () => {
  
  const profileData = {
    name: 'John Cena',
    role: 'Entraîneur',
    experience: 10, // en années
    qualifications: ['UEFA Pro License', 'Brevet éducateur sportif'],
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('./assets/Profile.png')} style={styles.profileImage} />
        <Text style={styles.profileText}>{profileData.name}</Text>
        <Text style={styles.profileRole}>{profileData.role}</Text>
        <Text style={styles.profileExperience}>{profileData.experience} années d'expérience</Text>
        <Text style={styles.qualificationsHeader}>Qualifications :</Text>
        <View style={styles.qualificationsList}>
          {profileData.qualifications.map((qualification, index) => (
            <Text key={index} style={styles.qualificationText}>
              <Icon name="check-circle" size={15} color="green" /> {qualification}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileRole: {
    fontSize: 16,
    color: '#666',
  },
  profileExperience: {
    fontSize: 16,
    marginTop: 10,
  },
  qualificationsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  qualificationsList: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  qualificationText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
});

export default ProfilePage;
