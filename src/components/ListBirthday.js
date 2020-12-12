import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import AddBirthday from './AddBirthday';
import ActionBar from '../components/ActionBar';
import firebase from '../utils/firebase'
import moment from 'moment';
import 'firebase/firestore';
import BirthDay from './BirthDay';

export default function ListBirthday(props) {
    const db = firebase.firestore(firebase)
    const {user} = props;
    const [showList, setShowList] = useState(true)
    const [birthDay, setbirthDay] = useState([]);
    const [pasatBirthday, setpasatBirthday] = useState([])
    const [reloadData, setReloadData] = useState(false)

    useEffect(() => {
        setbirthDay([])
        db.collection(user.uid).orderBy("dateBirth", "asc").get()
            .then((resp) => {
                const itemsArray = []
                resp.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id;
                    itemsArray.push(data)
                });
                formatData(itemsArray)
            })
        setReloadData(false)
    }, [reloadData]) 


    // eliminar cumpleaños
    const deleteBirthDay = (birthDay) => {
        Alert.alert(
        "Eliminar cumpleaños", 
        `¿Estas seguro de eliminar el cumpleaños de ${birthDay.name} ${birthDay.lastname}?`,
        [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelar')
            }, 
            {
                text: 'Eliminar',
                onPress: () => {
                    db.collection(user.uid).doc(birthDay.id).delete().then(() => setReloadData())
                }
            },
        ],
        { cancelable: false }
        )
    }

    // funcion para separar cumpleaños pasados y actuales
    const formatData = (items) => {
        const currentDate = moment().set({
           hour: 0,
           minute: 0,
           second: 0,
           millisecond:0
        });
 
        const birthDayTempArray = []
        const pasatbirthDayTempArray = []

        items.forEach((item) => {
            const dateBirth = new Date(item.dateBirth.seconds * 1000)
            const dateBirthDay = moment(dateBirth)
            const currentYear = moment().get("year")
            dateBirthDay.set({year: currentYear})

            const diffDate = currentDate.diff(dateBirthDay, "days")
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthDay;
            itemTemp.days = diffDate;  
            
            if(diffDate <=0){
                birthDayTempArray.push(itemTemp)
            }else{
                pasatbirthDayTempArray.push(itemTemp)
            }  
        });
         
        setbirthDay(birthDayTempArray)
        setpasatBirthday(pasatbirthDayTempArray)  
    }

    return (
        <View style={styles.container}>
            {
                showList ?
                    <ScrollView styles={styles.scrollView}>
                    {
                         birthDay.map((item, index) => (
                            <BirthDay deleteBirthDay={deleteBirthDay} key={index} birthday={item} />
                         ))
                    }

                    {
                         pasatBirthday.map((item, index) => (
                            <BirthDay deleteBirthDay={deleteBirthDay} key={index} birthday={item} />
                         ))
                    }
                    </ScrollView>
                    :
                    <AddBirthday setReloadData={setReloadData} user={user}/>
            }
            <ActionBar showList={showList} setShowList={setShowList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    scrollView: {
        marginBottom: 50,
        width: '100%'
    }
})