import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import { Button} from 'react-native-paper';
import theme from '../../config/theme';

export default function LandingScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/bg.png")} style={styles.bg}>
                <View style={styles.bgColor}/>
                <View style={styles.logo}>
                    <Image source={require("../../assets/logo.png")}/>
                </View>
                <View style={styles.buttons}>
                    <Button style={styles.btnDaftar} onPress={() => {
                    navigation.navigate("Daftar");
                    }} mode='outlined'>Daftar</Button>
                    <Button style={styles.btnLogin} onPress={() => {
                    navigation.navigate("Daftar");
                    }} mode='outlined' color="#fff">Login</Button>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        flex: 1,
        resizeMode: "cover"
    },
    bgColor: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: .9
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        position: "absolute",
        width: "100%",
        padding: 50,
        bottom: 20,
    },
    btnDaftar: {
        backgroundColor: "#fff",
    },
    btnLogin: {
        borderColor: "#fff",
        marginTop: 16,
        borderWidth: 1
    }
})