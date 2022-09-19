import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import ArticleComponent from "../../components/ArticlesItems/ArticleComponent";
import axios from "axios";
import styles from "./styles";

const ArticleScreen = () => {
    const [articles, setArticles] = useState([]);
    const getNews = () => {
        axios.get('https://newsapi.org/v2/everything?q=crypto&apiKey=9c419f7a3fc64c8da9256819b59da177')
            .then((response) => {
                // handle success
                console.log(response.data.articles);
                setArticles(response.data.articles);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    useEffect(() => {
        getNews();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }) =>

                    <ArticleComponent
                        urlToImage = {item.urlToImage}
                        title = {item.title}
                        description = {item.description}
                        author = {item.author}
                        publishedAt = {item.publishedAt}
                        sourceName = {item.source.name}
                    />}
                keyExtractor = {(item) => item.title}
            />
        </SafeAreaView>
    )
}

export default ArticleScreen;