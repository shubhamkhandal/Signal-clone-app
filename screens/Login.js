import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { auth } from '../firebase';

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');



    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("HomeScreen")
            }
        })
        return unsubscribe;
    },[])

    const SignIN = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios'?"padding":"height"} style={styles.container}>
            <StatusBar style="light"/>
            <Image source={require("../assets/image/1200px-Signal-Logo.png")} style={styles.logo}/>

            <View style={styles.inputContainer}>
                <Input placeholder="Username" autoFocus type="email" value={email} onChangeText={text => setEmail(text)}/>
                <Input placeholder="Passowrd" secureTextEntry type="password" value={password} onChangeText={pass => setPassword(pass)} onSubmitEditing={SignIN}/>
            </View>
            <Button  containerStyle={styles.button} title="Login" onPress={SignIN}/>
            <Button containerStyle={styles.button} type="outline" title="Register" onPress={()=> navigation.navigate("RegisterScreen")}/>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#fff'
    },
    logo: {
        width:150,
        height:150,
        resizeMode:"contain",
        marginBottom:50
    },
    inputContainer: {
        width:"100%"
    },
    button:{
        width:200,
        marginTop:20
    }
})
