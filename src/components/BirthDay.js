import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function BirthDay(props){
    const {key, birthday, deleteBirthDay} = props;
    const pasat = birthday.days > 0 ? true: false;

    const infoDay = () => {
        if (birthday.days === 0) {
            return (
                <Text style={{color: '#fff'}}>Es su cumpleaños</Text>
            )
        } else {
            const days = - birthday.days;
            return (
                <View>
                   {
                       days === 1 ? <Text style={styles.textCurrent}>1 dia</Text> : <Text style={styles.textCurrent}>{days} Dias</Text>
                   }
                </View>
            )
        }
    }
    return(
        <TouchableOpacity onPress={() => deleteBirthDay(birthday)} style={[styles.card, pasat ? styles.pasat : birthday.days === 0 ? styles.actual : styles.current]}>
            <Text style={{color: '#fff'}}>{birthday.name} {birthday.lastname}</Text>
            {pasat ? <Text style={{color: '#fff'}}>Pasado</Text> : infoDay()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10, 
        borderRadius: 15 
    },
    pasat: {
        backgroundColor: '#820000'
    },
    current: {
        backgroundColor: '#1ae1f2'
    },
    actual: {
        backgroundColor: '#559204'
    },
    textCurrent: {
        backgroundColor: '#fff',
        width: 50,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})