import React, { useEffect, useState } from "react";
import CoinItem from '../../components/CoinItem';
import { FlatList, RefreshControl } from 'react-native';
import { getMarketData } from "../../services/requests";

const HomeScreen = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async () => {
        setLoading(true);
        const coinsData = await getMarketData()
        setCoins(coinsData)
        setLoading(false);
    }

    const refetchCoins = async () => {
        setLoading(true);
        const coinsData = await getMarketData()
        setCoins(coinsData)
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <FlatList
            data={coins}
            renderItem={({ item }) => <CoinItem marketCoin={item} />}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={refetchCoins}
                />
            }
        />
    );
};

export default HomeScreen;