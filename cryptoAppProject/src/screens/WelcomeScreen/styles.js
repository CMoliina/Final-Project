import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        
    },
    title: {
        fontSize: 35,
        color: "white",
    },
    title2: {
        fontSize: 30,
        color: "white",
        paddingBottom: 100
    },
    containerSvg: {
        width: width,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    mainContainer: {
        flex: 1,
    }
});

export default styles;