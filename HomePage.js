import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, TextInput } from 'react-native';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {  getFirestore, getDocs, query, collection, where } from 'firebase/firestore';
import backgroundImage from './assets/ronaldo.jpg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Header = ({ toggleDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={toggleDrawer}>
      <View style={styles.menuIcon}>
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </View>
    </TouchableOpacity>
  </View>
);

const SideMenu = ({ toggleDrawer }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const navigation = useNavigation();

  const handleMenuItemPress = (menuItem) => {
    console.log(`Menu item ${menuItem} pressed`);
    setSelectedMenuItem(menuItem);
    toggleDrawer();

    
    if (menuItem === 'Profil') {
      navigation.navigate('ProfilePage');
    } else if (menuItem === 'Licences') {
      navigation.navigate('Licences');
    } else if (menuItem === 'Accueil') {
      navigation.navigate('Home');
    }
  };
  const menuItems = [
    { title: 'Accueil', icon: 'home' },
    { title: 'Profil', icon: 'user' },
    { title: 'Planning', icon: 'calendar' },
    { title: 'Statistiques', icon: 'bar-chart' },
    { title: 'Entrainement', icon: 'futbol-o' },
    { title: 'Match', icon: 'trophy' },
    { title: 'Classement', icon: 'thumbs-up' },
    { title: 'Competition', icon: 'list' },
    { title: 'Licences', icon: 'book' }
  ];



 
  return (
    <View style={styles.sideMenu}>
      {menuItems.map((item) => (
        <TouchableOpacity key={item.title} onPress={() => handleMenuItemPress(item.title)}>
          <View style={styles.menuItem}>
            <Icon name={item.icon} size={24} color="white" />
            <Text style={item.title === selectedMenuItem ? styles.selectedMenuItemText : styles.menuItemText}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={toggleDrawer}>
        <Text style={styles.closeButton}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');


  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleLicencesPress = async () => {
    try {
      const db = getFirestore();
      const q = query(collection(db, 'licences'), where('Nom', '==', searchQuery));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        navigation.navigate('Licences', { searchQuery });
      } else {
        alert('Le nom recherché n\'existe pas');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des licences depuis Firebase:', error);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
        <Drawer
          type="overlay"
          content={<SideMenu toggleDrawer={toggleDrawer} />}
          open={drawerOpen}
          tapToClose={true}
          onClose={() => setDrawerOpen(false)}
          openDrawerOffset={100}
          panOpenMask={0.05}
          styles={{
            drawer: { width: screenWidth * 0.8, backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            main: { backgroundColor: 'transparent' },
          }}
        >
          <Header toggleDrawer={toggleDrawer} />
          <View style={styles.content}>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher"
                placeholderTextColor="white"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
              />
              <TouchableOpacity style={styles.searchButton}onPress={handleLicencesPress}>
                <Icon name="search" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.squareContainer}>
              <View style={styles.square}>
                <Icon name="trophy" size={50} color="white" />
                <Text style={styles.squareText}>Match</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareContainer}>
              <View style={styles.square}>
                <Icon name="bar-chart" size={50} color="white" />
                <Text style={styles.squareText}>Performances</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.squareContainer} onPress={handleLicencesPress}>
              <View style={styles.square}>
                <Icon name="book" size={50} color="white" />
                <Text style={styles.squareText}>Licences</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Drawer>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 60,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  menuIcon: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  sideMenu: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  selectedMenuItemText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeButton: {
    color: 'white',
    fontSize: 18,
    marginTop: 'auto',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    color: 'black',
  },
  searchButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 8,
  },
  squareContainer: {
    marginVertical: 20,
  },
  square: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  squareText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomePage;
