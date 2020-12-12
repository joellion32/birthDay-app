import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validations'
import firebase from '../utils/firebase'
import 'firebase/auth';

export default function RegisterForm(props) {
    const { changeForm } = props;
    const [formError, setFormError] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeat_password: ''
    })

    const register = () => {
        let errors = {}

        // validar formulario
        if (!formData.email || !formData.password || !formData.repeat_password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeat_password) errors.repeat_password = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
            setErrorMessage('Email no valido')
        } else if (formData.password !== formData.repeat_password) {
            errors.password = true;
            errors.repeat_password = true;
            setErrorMessage('Las contraseñas no son iguales')
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeat_password = true;
            setErrorMessage('La contraseña debe tener 6 caracteres')
        } else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then((resp) => {
                console.log(resp)
            }).catch(() => {
                setFormError({
                    email: true,
                    password: true,
                    repeat_password: true
                })
            })
        }

        setFormError(errors)
    }

    return (
        <>
            <TextInput style={[styles.input, formError.email && styles.inputError]}
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
            />

            <TextInput style={[styles.input, formError.password && styles.inputError]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
            />

            <TextInput style={[styles.input, formError.repeat_password && styles.inputError]}
                placeholder="Repetir contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, repeat_password: e.nativeEvent.text })}
            />

            {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>}

            <TouchableOpacity onPress={register}>
                <Text style={styles.text}>Registrate</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeForm}>
                <Text style={[styles.text, styles.textTop]}>¿Ya tienes cuenta? inicia sesión</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 18
    },
    textTop: {
        marginTop: 20
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    inputError: {
        borderColor: '#940c0c'
    },
    textError: {
        bottom: 20,
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
    }
})