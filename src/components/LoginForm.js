import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import firebase from '../utils/firebase'
import 'firebase/auth';
import { validateEmail } from '../utils/validations'

export default function LoginForm(props) {
    const { changeForm } = props;
    const [formError, setFormError] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const login = () => {
        let errors = {}
        // validar formulario
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true
            setErrorMessage("Email no valido")
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(resp => {
                console.log(resp)
            }).catch(() => {
                setFormError({
                    email: true,
                    password: true
                })

                setErrorMessage('El email o la contraseña son incorrectos')
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

            {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>}

            <TouchableOpacity onPress={login}>
                <Text style={styles.text}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeForm}>
                <Text style={[styles.text, styles.textTop]}>¿No tienes cuenta? Registrate</Text>
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