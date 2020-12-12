import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../utils/firebase'
import 'firebase/firestore';
import moment from 'moment';

export default function AddBirthday(props) {
    const {user, setReloadData} = props;
    const db = firebase.firestore(firebase)

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});

    const changeDate = (event, selectedDate) => {
        setShow(false)
        const dateBirth = selectedDate || date;
        dateBirth.setHours(0)
        dateBirth.setMinutes(0)
        dateBirth.setSeconds(0)
        setFormData({ ...formData, dateBirth })
    }

    const showPicker = () => {
        setShow(!show)
    }


    const onSubmit = () => {
        let errors = {}
        if (!formData.name || !formData.lastname || !formData.dateBirth) {
            if (!formData.name) errors.name = true;
            if (!formData.lastname) errors.lastname = true;
            if (!formData.dateBirth) errors.dateBirth = true;
        } else {
            const data = formData;
            data.dateBirth.setYear(0)
            db.collection(user.uid).add(data)
                .then((resp) => {
                    ToastAndroid.show('Cumpleaños agregado correctamente', ToastAndroid.SHORT);
                    setReloadData(true)
                })
                .catch(() => {
                    setFormError({
                        name: true,
                        lastname: true,
                        dateBirth: true
                    })
                })
        }

        setFormError(errors)
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, formError.name && styles.inputError]}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                    onChange={(e) => setFormData({ ...formData, name: e.nativeEvent.text })}
                />

                <TextInput
                    style={[styles.input, formError.lastname && styles.inputError]}
                    placeholder="Apellido"
                    placeholderTextColor="#969696"
                    onChange={(e) => setFormData({ ...formData, lastname: e.nativeEvent.text })}
                />

                <View style={[styles.input, formError.dateBirth && styles.inputError, styles.datePicker]}>
                    <Text onPress={showPicker} style={{ color: formData.dateBirth ? '#fff' : '#969696', fontSize: 18 }}>{formData.dateBirth ? moment(formData.dateBirth).format("LL") : "Fecha Nacimiento"}</Text>
                </View>

                {
                    show && (<DateTimePicker mode="date" value={date} onChange={changeDate} />)
                }

                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.textAdd}>Crear cumpleaños</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
        borderRadius: 50
    },
    inputError: {
        borderColor: '#940c0c'
    },
    datePicker: {
        justifyContent: 'center',
    },
    textAdd: {
        color: '#fff',
        fontSize: 18
    }

});