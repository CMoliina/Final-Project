import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TextInput, ActivityIndicator } from "react-native";
import CoinDetailedHeader from "./components/CoinDetailedHeader";
import styles from "./styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LineChart, CandlestickChart } from 'react-native-wagmi-charts';
import { useRoute } from "@react-navigation/native";
import { getDetailedCoinData, getCoinMarketChart, getCandleChartData } from "../../services/requests";
import FilterComponent from "./components/FilterComponent";

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);


  const route = useRoute();
  const { params: { coinId } } = route;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const fetchCoinData = async () => {
    //setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    //setLoading(false);
  }

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(coinId, selectedRangeValue);
    setCoinMarketData(fetchedCoinMarketData);
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleChartData = await getCandleChartData(coinId, selectedRangeValue);
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandleStickChartData();
  }, [])

  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
    return <ActivityIndicator size="large" />
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;

  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0
    setUsdValue((floatValue * current_price.usd).toString())
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0
    setCoinValue((floatValue / current_price.usd).toString())
  };

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandleStickChartData(selectedRangeValue);
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
        <CoinDetailedHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <LineChart.PriceText format={formatCurrency} style={styles.currentPrice} />
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.filterContainer}>
          <FilterComponent filterDay="1" filterText="24h" selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange} />
          <FilterComponent filterDay="7" filterText="7d" selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange} />
          <FilterComponent filterDay="30" filterText="30d" selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange} />
          <FilterComponent filterDay="365" filterText="1y" selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange} />
          <FilterComponent filterDay="max" filterText="All" selectedRange={selectedRange} setSelectedRange={onSelectedRangeChange} />

          {isCandleChartVisible ? (
            <MaterialIcons name="show-chart" size={24} color="#16c784" onPress={() => setIsCandleChartVisible(false)} />
          ) : (
            <MaterialIcons name="waterfall-chart" size={24} color="#16c784" onPress={() => setIsCandleChartVisible(true)} />
          )}
        </View>

        {isCandleChartVisible ? (
          <CandlestickChart.Provider data={coinCandleChartData.map(([timestamp, open, high, low, close]) => ({ timestamp, open, high, low, close }))}>
            <CandlestickChart height={screenWidth / 2} width={screenWidth}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            </CandlestickChart>
            <View style={styles.candleStickDataContainer}>
              <View>
                <Text style={styles.candleStickTextLabel}>Open</Text>
                <CandlestickChart.PriceText style={styles.candleStickText} type="open" />
              </View>
              <View>
                <Text style={styles.candleStickTextLabel}>High</Text>
                <CandlestickChart.PriceText style={styles.candleStickText} type="high" />
              </View>
              <View>
                <Text style={styles.candleStickTextLabel}>Low</Text>
                <CandlestickChart.PriceText style={styles.candleStickText} type="low" />
              </View>
              <View>
                <Text style={styles.candleStickTextLabel}>Close</Text>
                <CandlestickChart.PriceText style={styles.candleStickText} type="close" />
              </View>
            </View>
            <CandlestickChart.DatetimeText style={{ color: "white", fontWeight: "700", margin: 10 }} />
          </CandlestickChart.Provider>
        ) : (
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        )}


        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailedScreen;