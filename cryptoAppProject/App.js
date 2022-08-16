import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import CoinItem from './src/components/CoinItem';
import cryptocurrency from './assets/data/cryptocurrencies.json';
export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={cryptocurrency}
        renderItem={({item}) => <CoinItem marketCoin={item} />}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
});
