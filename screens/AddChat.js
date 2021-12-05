import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { db } from '../firebase';

const AddChat = ({navigation}) => {
    const [chatName, setChatName] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add New Chat",
            headerBackTitle:"Chats"
        })
    },[navigation])

    const createChat = async() => {
        await db.collection('chats').add({
            chatName: chatName
        }).then(()=>{
            navigation.goBack();
        }).catch((error)=> alert(error));
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Input placeholder="Enter a chat name." 
                value={chatName} 
                onChangeText={text => setChatName(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={22} color="#000"/>
                }
                onSubmitEditing={createChat}
            />
            <Button disabled={!chatName} onPress={createChat} title="Create new Chat"/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:30,
        height:'100%'
    }
})
