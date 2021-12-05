import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView, Keyboard, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from "firebase/compat/app";
import { auth, db } from '../firebase';


const Chat = ({navigation,route}) => {
    const[chatInput, setChatInput] = useState('');
    const[messages, setMessages] = useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Chat',
            headerBackTitleVisible:false,
            headerTitleAlign:'left',
            headerTitle: () => (
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Avatar size={30} rounded source={{uri: messages[0]?.data.photoURL}}/>
                    <Text style={{color:'#fff', fontSize:20, fontWeight:"700",marginLeft:10}}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight:()=>(
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between",width:70,marginRight:10}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon name="video-camera" type="font-awesome" size={22} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon name="phone" type="font-awesome" size={22} color="#fff"/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();

        try {
            db.collection('chats').doc(route.params.id).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message:chatInput,
                displayName:auth.currentUser.displayName,
                email:auth.currentUser.email,
                photoURL:auth.currentUser.photoURL
            })
        }catch(error){
            Alert.alert(error)
        }
        setChatInput('')
    }

    useLayoutEffect(()=>{
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot)=> setMessages(
            snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            }))
        ))

        return unsubscribe;
    },[route])

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios"?"padding":"height"} keyboardVerticalOffset={90} style={styles.conatiner}>
                <>
                    <ScrollView contentContainerStyle={{paddingTop:15}}>
                        {
                            messages.map(({id, data})=>(
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar containerStyle={{position:"absolute", bottom: -6, right:-5}}  rounded size={20} source={{uri: data.photoURL}}/>
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ):(
                                    <View key={id} style={styles.sender}>
                                        <Avatar containerStyle={{position:"absolute", bottom: -6, left:-5}}  rounded size={20} source={{uri: data.photoURL}}/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput style={styles.textInput} 
                            placeholder="Write message" 
                            value={chatInput} 
                            onChangeText={text => setChatInput(text)}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity disabled={!chatInput} onPress={sendMessage} activeOpacity={0.5}>
                            <Icon name="send" type="ionicon" size={20} color={!chatInput ? "#9c9c9c":"#2b68e6"}/>
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    conatiner:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        width:'100%',
        padding:15
    },
    textInput:{
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ececec",
        padding:10,
        color:'#454545',
        borderRadius:30
    },
    reciever:{
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#ececec",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:'relative'
    },
    recieverText:{
        color:'#000',
        fontWeight:'500',
        marginRight:10,
        fontSize:16
    },
    sender:{
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        backgroundColor:'#2b68e6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderName: {
        left:10,
        paddingRight:10,
        paddingTop:5,
        fontSize:10,
        color:'#ececec',
    },
    senderText:{
        color:'#fff',
        fontWeight:'500',
        marginLeft:10,
        fontSize:16
    }

})
