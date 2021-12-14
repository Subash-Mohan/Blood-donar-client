import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Mainscreen from './Screens/Mainscreen'
import Login from './Screens/Login'
import Profilescreen from './Screens/Profilescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
function LogoTitle() {
  return (
    <View style={{alignItems:"center"}}>
      
    <Image
      style={{ width: 500, height: 200,marginTop:80 }}
      source={require('./assets/available.png')} resizeMode="contain"
    />
    <Text style={{fontSize:25,fontWeight:"bold",color:"#F22C2C",marginTop:20,marginBottom:30}}>Register here</Text>
    </View>
  );
}


function UpdateTitle() {
  return (
    <View style={{alignItems:"center"}}>
      <Text style={{fontSize:25,fontWeight:"bold",color:"black",marginTop:20,marginBottom:30}}>
      Update</Text>
    <Image
      style={{ width: 500, height: 200,marginTop:40,marginBottom:40 }}
      source={require('./assets/available.png')} resizeMode="contain"
    />
    
    </View>
  );
}



const stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen name="Login" component={Login} options={{title:"Register as Donar"
        ,headerTitleAlign:"center",headerStyle:{backgroundColor:"#FFEFEF"},headerTitle:()=><LogoTitle/>
      
      }}/>
        <stack.Screen name="Mainscreen" component={Mainscreen} options={{headerShown:false}}/>
        <stack.Screen name="Profilescreen" component={Profilescreen} options={{title:"Register as Donar"
        ,headerStyle:{backgroundColor:"#FFEFEF"},headerTitle:()=><UpdateTitle/>}}/>
      </stack.Navigator>
    </NavigationContainer>

  
 )
}


