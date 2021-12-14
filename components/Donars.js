import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, Clipboard } from 'react-native';



export default function Donars({data,onPress}) {

return (
    <View style={styles.container}>
        <View style={styles.profile}>
             <Image source={data.status=="Available"? require('../assets/available.png'): require('../assets/unavailable.png')} style={styles.status} resizeMode='center' />
             <Text>{data.status}</Text>

        </View>
        <View style={styles.txt}>
            <Text>Name: {data.username}</Text>
            <Text>City: {data.city}</Text>
            <Text>Mobile number: {data.mobilenumber}</Text>
            <Text>Blood Group: {data.bloodgroup}</Text>
        </View>
        
        <View style={styles.clipboard}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={require('../assets/clipboard.png')}  />
        </TouchableOpacity>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    backgroundColor:'white',
    height:110,
    margin:5,
    flexDirection:"row",
    borderRadius:20,
    borderColor:"white",
    borderWidth:5,
    borderStyle:"solid",
    
   
},
profile:{
    
    flex:1,
    justifyContent:"center",
    alignItems:"center",
},
txt:{
    
    flex:4,
    justifyContent:"center",
    padding:10,
    borderEndColor:"#CECECE",
    borderEndWidth:1,
    borderStartColor:"#CECECE",
    borderStartWidth:1,
},
clipboard:{
    
    flex:0.6,
    justifyContent:"center",
    alignItems:"center",
},
status:{
    height:60,
    width:60,

    
},

});