import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import { FontAwesome } from '@expo/vector-icons';
import ArticleScreen from '../screens/ArticleScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#eaaa00",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "#282a36"
                }
            }}
        >
            <Tab.Screen
                name="Home" component={HomeScreen} options={{
                    tabBarIcon: ({ focused, color }) => (<FontAwesome name="home" size={focused ? 30 : 25} color={color} />)
                }}
            />

            <Tab.Screen
                name="News" component={ArticleScreen} options={{
                    tabBarIcon: ({ focused, color }) => (<FontAwesome name="newspaper-o" size={focused ? 25 : 20} color={color} />)
                }}
            />

            <Tab.Screen
                name="Search news" component={SearchScreen} options={{
                    tabBarIcon: ({ focused, color }) => (<FontAwesome name="search" size={focused ? 25 : 20} color={color} />)
                }}
            />

            <Tab.Screen
                name="Watchlist" component={WatchlistScreen} options={{
                    tabBarIcon: ({ focused, color }) => (<FontAwesome name="star" size={focused ? 30 : 25} color={color} />)
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;