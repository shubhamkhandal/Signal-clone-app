import { StatusBar } from 'expo-status-bar';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItems from '../components/CustomListItems'
import { auth, db } from '../firebase';
import { Icon } from 'react-native-elements';

const Home = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace("LoginScreen");
        }).catch(error => alert(error))
    }

    const signOutAlert = () => {
        Alert.alert("Alert!", 
        "Are you sure you want to Signout!",
        [
            {
                text:"Cancel",
                style:"cancel"
            },
            {
                text:"OK",
                onPress:()=> {signOutUser()}
            }
        ]
        )
    }

    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot(
            (snapshot)=>{
                setChats(
                    snapshot.docs.map((doc)=>({
                        id: doc.id,
                        data: doc.data()
                    })) 
                )
            }
        )

        return unsubscribe;
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"#000"},
            headerTintColor:"#000",
            headerLeft: () => <View>
                                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between',width:90}} onPress={signOutAlert} activeOpacity={0.5}>
                                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                                        <Text>Sign Out</Text>
                                    </TouchableOpacity>
                                </View>,
            headerRight: () => <View style={{flexDirection:'row',justifyContent:'space-between',width:70,marginRight:10}}>
                                    <TouchableOpacity activeOpacity={0.5}>
                                        <Icon name="camera" type="simple-line-icon" size={22} color="#000"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} onPress={()=> navigation.navigate("AddChatScreen")}>
                                        <Icon name="pencil" type="simple-line-icon" size={22} color="#000"/>
                                    </TouchableOpacity>

                                </View>
        });
    },[])

    const enterChat = (id,chatName) => {
        navigation.navigate("ChatScreen",{id:id, chatName:chatName})
    }

    return (
        <SafeAreaView>
            <StatusBar style="dark"/>
            <ScrollView style={styles.container}>
                {
                    chats.map(({id, data:{chatName}})=>(
                         <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:'100%'   
    }
})
