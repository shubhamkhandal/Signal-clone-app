import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase';




const Register = ({navigation}) => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[imgUrl, setImgUrl] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        });
    },[navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imgUrl || 'https://i.picsum.photos/id/2/5616/3744.jpg?hmac=l1XcSPFigtRLcO2F6Li-t17EIeylkWH94Oowb4vzApk',
            })
        }).catch((error)=> alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light'/>
            <Text h4 style={{textAlign:'center', marginBottom:50}}>Create New Account</Text>

            <View style={styles.inputContainer}>
                <Input type="text" autoFocus placeholder="Full name" value={name} onChangeText={text => setName(text)}/>
                <Input type="email" placeholder="Email" value={email} onChangeText={text => setEmail(text)}/>
                <Input type="password" placeholder="Password" value={password} onChangeText={text => setPassword(text)}/>
                <Input type="text" placeholder="Image url (Optional)" value={imgUrl} onChangeText={text => setImgUrl(text)} onSubmitEditing={register}/>
            </View>
            <Button containerStyle={styles.button} raised title="Register" onPress={register}/>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:30
    },
    inputContainer: {
        width:"90%"
    },
    button:{
        width:200,
        marginTop:20
    }
})
