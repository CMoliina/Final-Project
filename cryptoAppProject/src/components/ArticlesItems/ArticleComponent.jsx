import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import styles from "./styles";
import moment from "moment";

const ArticleComponent = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: props.urlToImage }}
            />
            <View style={{padding: 20}}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.description}>{props.description}</Text>
                <View style={styles.data}>
                    <Text style={styles.heading}>by: <Text style={styles.author}>{props.author}</Text></Text>
                    <Text style={styles.date}>{moment(props.publishedAt).format("MMM Do YY")}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: "#00f5d4" }}>Source: <Text style={styles.source}>{props.sourceName}</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ArticleComponent;