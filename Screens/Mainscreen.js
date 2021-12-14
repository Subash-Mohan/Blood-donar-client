//import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, 
  Text, 
  View,
  Platform,
  StatusBar,
   FlatList,
   TouchableOpacity,
   Clipboard,
   Image,
   BackHandler,
    Alert } from 'react-native';
import { Searchbar,Chip } from 'react-native-paper';
import Donars from '../components/Donars';

const DATA = [
  {
    id: '1',
    title: 'O+',
  },
  {
    id: '2',
    title: 'O-',
  },
  {
    id: '3',
    title: 'B+',
  },
  {id:'4',
    title: 'B-',},
    {
      id: '5',
      title: 'AB+',
    },
    {
      id: '6',
      title: 'AB-',
    },
    {
      id: '7',
      title: 'A+',
    },
    {
      id: '8',
      title: 'A-',
    },
];
const USERDATA=[
]
const Item = ({ title,backgroundColor,onPress }) => (
  
  <Chip style={styles.uniqchips} selectedColor={backgroundColor} 
  onPress={onPress} mode='flat' >{title}</Chip>
  
);



export default function Mainscreen({navigation,route}) {
  const [selectedId, setSelectedId] = useState(null);

  const userId=route.params._id;
  console.log("this is testing",userId);


  const[donorId,setDonorId]=useState(null);
  const [userdata,setUserdata]=useState([]);

  const Bquery=[]
  const Squery=[]
  

  useEffect(() => {
    fetch('http://192.168.137.1:8800/api/users/allusers').then(res => res.json()).then(res => {
      //console.log(res);
      
      
    for(const item in res){
      if(res[item]._id !== userId){
      USERDATA.push({
        id:res[item]._id,
        bloodgroup:res[item].bloodgroup,
        mobilenumber:res[item].mobilenumber,
        city:res[item].city,
        status:res[item].status,
        username:res[item].username
      })
    }
      
      }
    //console.log(USERDATA);
    setUserdata(USERDATA);
    //console.log(DATA);
  }) 
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();




}, []);


  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query =>{ 
    setSearchQuery(query);
    searchbyCity(query);

  }


const searchbybg = (query) => {
  const filtereddata= Squery.length>0 ? Squery : USERDATA;
  for(const item in filtereddata){
    if(filtereddata[item].bloodgroup==query){
      Bquery.push(filtereddata[item]);
    }
  }
  console.log(Bquery);
  setUserdata(Bquery);
}



const searchbyCity = (query) => {
  const filtereddata= USERDATA;
  for(const item in filtereddata){
    if(filtereddata[item].city.toLowerCase().includes(query.toLowerCase())){
      Squery.push(filtereddata[item]);
    }
  }
  console.log(Squery);
  setUserdata(Squery);
}



   const renderItem = ({ item }) => {
   const backgroundColor = item.id === selectedId ? "#FFA6A6" : "black";
   
    return(
    <Item style={styles.chips} backgroundColor={backgroundColor} 
    title={item.title} onPress={() =>{ setSelectedId(item.id)
    searchbybg(item.title)} }/>
    )
  }




  const renderdonar=({item})=>{
    
    return <Donars style={styles.donars} data={item} onPress={()=> {
      Clipboard.setString(item.mobilenumber);
    }}   />
  }





  return (
    <View style={styles.container}>
      
        <View style={styles.header}>
            <Text style={styles.headerText}>Donaters</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profilescreen',{...route.params})}}>
            <View style={styles.view}>
            <Image style={{height:30,width:30}}source={require('../assets/life.png')} resizeMode="contain"   />
            </View>
            </TouchableOpacity>
        </View>
        <View style={styles.search}>
        <Searchbar style={styles.searchbar} 
         placeholder="Search"
         onChangeText={onChangeSearch}
        value={searchQuery}
    />
    
        <View style={styles.chips} >
        <FlatList
        horizontal={true}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        
      />
        </View>
        </View>
        <View style={styles.body}>
        <FlatList
       
        data={userdata}
        renderItem={renderdonar}
        keyExtractor={item => item.id}
       
        />
        
        </View>
  
    </View>
  );
}








const styles = StyleSheet.create({
  container: {
    flex: 1,
   top:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
   justifyContent: 'center',
   backgroundColor:"#FFEFEF",
   
   
  },
  header: {
    height:60,
    flexDirection:"row",
    top:0,
    width:"100%",
    justifyContent:"space-between",
    
  },
  headerText:{
    fontSize:30,
    color:"black",
    fontWeight:"bold",
    padding:10,
    paddingLeft:"40%",
  },
  view: {
    
      height:50,
      width:50,
      backgroundColor:'white',
      marginRight:10,
      borderRadius:50,
      alignItems:"center",
      justifyContent:"center",

     
  },
  searchbar: {
    
  },
  search:{
    height:120,
    
    padding:10,
  },
  body:{
    flex:5,
    
    padding:10,
  },
  chips:{
    margin:10,
    height:35,
  },
  uniqchips:{
    
    marginHorizontal:5,
    width:60,
    backgroundColor:"white",
    alignItems:'center'
  },
  donars:{
    padding:10,
    position:"absolute",
    
  },
});
