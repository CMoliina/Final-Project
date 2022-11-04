import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 30,
        shadowOpacity: 0.5,
        shadowColor: "#fff",
        shadowOffset: {
            height: 5,
            width: 5
        }, 
        backgroundColor: "#343a40",
        marginTop: 20
    },
    image: {
        height: 200,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 10,
        color: "white"
    },
    description: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10,
    },
    data: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    heading: {
        color: "#00f5d4",
    },
    author: {
        color: "#00f5d4",
        fontWeight: "bold"
    },
    date: {
        color: "#00f5d4",
        fontWeight: "bold"
    },
    source: {
        color: "#00f5d4",
        fontWeight: "bold",
        fontSize: 15
    }
});

export default styles;