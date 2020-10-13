import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export default function DaftarScreen() {
    return (
        <View style={styles.loading} >
            <ActivityIndicator animating={true} color={Colors.purpleA700} size='large' />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})