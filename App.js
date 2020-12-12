import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, LogBox } from 'react-native';
import Auth from './src/components/Auth';
import firebase from './src/utils/firebase'
import 'firebase/auth';
import ListBirthday from './src/components/ListBirthday';

LogBox.ignoreAllLogs();

export default function App() {
const [user, setUser] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response)
    })
  }, [])

  if(user === undefined) return null;

  return (
    <>
    <StatusBar style="light" backgroundColor="#15212b"/>
    <SafeAreaView style={styles.background}>
      { user ?  <ListBirthday user={user}/>: <Auth/>}
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
 background: {
   backgroundColor: '#15212b',
   height: '100%',
   top: 20
 }
});

