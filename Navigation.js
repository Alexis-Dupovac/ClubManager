import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez les composants des différentes pages
import HomePage from './HomePage';
import LicencesPage from './LicencesPage';
import LicencesForm from './LicencesForm';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Licences" component={LicencesPage} />
        <Stack.Screen name="LicencesForm" component={LicencesForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
