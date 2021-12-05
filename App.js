import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import AddChat from "./screens/AddChat";
import Chat from "./screens/Chat";



const Stack = createNativeStackNavigator();

const GlobalScreenOptions = {
  headerStyle: { backgroundColor:"#2c6bed" },
  headerTitleStyle: {color:"#fff"},
  headerTintColor:"#fff",
  headerTitleAlign: "center"
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={GlobalScreenOptions}>
        <Stack.Screen options={{title:"Let's Login"}} name="LoginScreen" component={Login}/>
        <Stack.Screen name="RegisterScreen" component={Register}/>
        <Stack.Screen name="HomeScreen" component={Home}/>
        <Stack.Screen name="AddChatScreen" component={AddChat}/>
        <Stack.Screen name="ChatScreen" component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
