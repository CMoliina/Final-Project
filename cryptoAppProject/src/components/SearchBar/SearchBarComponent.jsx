import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

const SearchBarComponent = (props) => {
    return(
        <View style={styles.container}>
            <TextInput
                placeholder="Search"
                style={styles.input}
                value={props.searchText}
                onChangeText={(text) => props.setSearchText(text)}
                onSubmitEditing={props.onSubmit}
            />
        </View>
    )
};

export default SearchBarComponent;