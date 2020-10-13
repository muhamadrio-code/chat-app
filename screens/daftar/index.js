import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button} from 'react-native-paper';

export default function LandingScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Daftar Screen</Text>
            <Button onPress={() => {
                navigation.goBack();
        }} mode='contained'>Back</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})