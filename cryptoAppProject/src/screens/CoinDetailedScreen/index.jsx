import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import Coin from '../../../assets/data/crypto.json';

const CoinDetailedScreen = () => {
    const {
        image: { small },
        symbol,
        name,
        market_data: { market_cap_rank }
    } = Coin;
    return (
        <View style={{flexDirection:'row', paddingHorizontal:10 }}>
            <Ionicons name="chevron-back-sharp" size={30} color="white" />
            <Image source={{ uri: small }} style={{ width: 25, height: 25 }} />
            <Text style={{ color: 'white' }}>{symbol.toUpperCase()}</Text>
            <Text style={{ color: 'white' }}>#{market_cap_rank}</Text>
            <EvilIcons name="user" size={30} color="white" />
        </View>
    );
};

export default CoinDetailedScreen;