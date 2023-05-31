import React from 'react';
import { View } from 'react-native';
import Navigation from './Navigation';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCOV0ATmCFA3yO_30gmXoJAsf0t3iQT2mY",
  authDomain: "football-2fbc0.firebaseapp.com",
  projectId: "football-2fbc0",
  storageBucket: "football-2fbc0.appspot.com",
  messagingSenderId: "61203166101",
  appId: "1:61203166101:web:800ba561fceb461c24fc9c",
  measurementId: "G-Z69LZLD6QM"
};

const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
};

export default App;
