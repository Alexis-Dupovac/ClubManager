import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('./assets/Terrain_foot.jpg')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
