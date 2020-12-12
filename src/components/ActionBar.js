import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../utils/firebase'
import 'firebase/auth';

export default function ActionBar(props) {
    const {showList, setShowList} = props;

    const Logout = () => {
        firebase.auth().signOut()
    }

    return (
        <View style={[styles.viewFooter, showList ? {position: 'relative'} : {position: 'absolute'}]}>
            <TouchableOpacity onPress={Logout}>
                <View style={styles.viewClose}>
                    <Text style={styles.textLogout}>Cerrar Sesion</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowList(!showList)}>
                <View style={styles.viewAdd}>
                <Text style={styles.textLogout}>{showList ? "Nueva fecha" : "Cancelar Fecha"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 30
    },
    viewClose: {
        backgroundColor: '#820000',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    viewAdd: {
        backgroundColor: '#1ea1f2',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    textLogout: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
});