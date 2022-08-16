import React from "react";
import CoinItem from '../../components/CoinItem';
import cryptocurrency from '../../../assets/data/cryptocurrencies.json';
import { FlatList } from 'react-native';

const HomeScreen = () => {
    return (
        <FlatList
            data={cryptocurrency}
            renderItem={({ item }) => <CoinItem marketCoin={item} />}
        />
    );
};

export default HomeScreen;