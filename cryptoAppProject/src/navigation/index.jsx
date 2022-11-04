import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import CoinDetailedScreen from "../screens/CoinDetailedScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="WelcomeHome"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="WelcomeHome" component={WelcomeScreen}/>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="CoinDetailedScreen" component={CoinDetailedScreen} />
        </Stack.Navigator>
    )
}

export default Navigation;