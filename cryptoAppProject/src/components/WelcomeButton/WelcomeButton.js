import React from "react";
import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const WelcomeButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Root")}>
            <LinearGradient
                colors={['#ffc800', '#ffca00']}
                style={styles.button}>
                <Text style={styles.text}>ENTER</Text>
            </LinearGradient>
            
        </TouchableOpacity>
    )
};

export default WelcomeButton;