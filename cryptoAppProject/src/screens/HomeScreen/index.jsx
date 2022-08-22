import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";
const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
    />
  );
};

export default HomeScreen;