import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer : {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        paddingVertical: 40,
        marginBottom: 50,
        alignSelf : 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    label: {
        marginTop: 25,
        color:'white',
        fontWeight: 'bold',
    },
    inputField : {
        color: 'white',
        fontSize : 10
    },
    inputFieldIOS : {
        borderBottomColor : 'white',
        borderBottomWidth : 2,
        paddingBottom : 4
    },
    buttonContainer : {
       alignItems: 'center',
       marginTop:50 
    },
    button : {
        borderWidth: 2,
        borderColor : 'white',
        paddingHorizontal: 20,
        paddingVertical : 5,
        borderRadius: 100
    },
    active : {
        backgroundColor : "rgba(255,255,255,0.6)",
        color : "black!"
    },

    buttonText : {
        fontSize: 18,
        color : 'white'
    },
    newUserContainer : {
        alignItems: "flex-end",
        marginTop: 10
    }
})