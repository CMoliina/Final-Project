import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import SearchBarComponent from "../../components/SearchBar/SearchBarComponent";
import styles from "./styles";
import axios from "axios";
import ArticleComponent from "../../components/ArticlesItems/ArticleComponent";

const SearchScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [articles, setArticles] = useState([]);

    const searchArticle = () => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9c419f7a3fc64c8da9256819b59da177', {
            params: {
                category: "business",
                q: searchText
            }
        })
            .then((response) => {
                // handle success
                //console.log(response.data.articles);
                setArticles(response.data.articles);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    return (
        <View style={styles.container}>
            <SearchBarComponent
                searchText={searchText}
                setSearchText={setSearchText}
                onSubmit={searchArticle}
            />
            <FlatList
                data={articles}
                renderItem={({ item }) =>
                    <ArticleComponent
                        urlToImage={item.urlToImage}
                        title={item.title}
                        description={item.description}
                        author={item.author}
                        publishedAt={item.publishedAt}
                        sourceName={item.source.name}
                        url={item.url}
                    />
                }
                keyExtractor={(item) => item.title}
            />
        </View>
    )
};

export default SearchScreen;