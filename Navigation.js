import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez les composants des différentes pages
import HomePage from './HomePage';
import LicencesPage from './LicencesPage';
import LicencesForm from './LicencesForm';
import EditLicencePage from './EditLicencePage';
import ProfilePage from './ProfilePage.js';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Licences" component={LicencesPage} />
        <Stack.Screen name="LicencesForm" component={LicencesForm} />
        <Stack.Screen name="EditLicencePage" component={EditLicencePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

