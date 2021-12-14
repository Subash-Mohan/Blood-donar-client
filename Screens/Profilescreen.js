import React ,{useState}from 'react'
import { StyleSheet, Text, View,TextInput ,StatusBar,Picker,Alert,Platform} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import axios from 'axios';
import { Button } from 'react-native-paper';

export default function Profilescreen({route,navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Available', value: 'Available'},
    {label: 'Unavailable', value: 'Unavailable'}
  ]);


  console.log("this is testing",route);
const dum= {
  "bloodgroup": "B+",
  "city": "yyyyugy",
  "email": "subashh",
  "mobilenumber": "767867",
  "status": "Available",
  "username": "bhjb",
}
  const [bopen, setbOpen] = useState(false);
  const [bvalue, setbValue] = useState(null);
  const [bitems, setbItems] = useState([
    {label: 'O+', value: 'O+'},
    {label: 'O-', value: 'O-'},
    {label: 'A+', value: 'A+'},
    {label: 'A-', value: 'A-'},
    {label: 'B+', value: 'B+'},
    {label: 'B-', value: 'B-'},
    {label: 'AB+', value: 'AB+'},
    {label: 'AB-', value: 'AB-'},
  ]);

const Update = (values) => {
  values.bloodgroup =  bvalue!==null?bvalue:route.params.bloodgroup;
  values.status = value !==null?value:route.params.status;
  values.username = values.username!==""?values.username: route.params.username;
  values.mobilenumber = values.mobilenumber!==""?values.mobilenumber: route.params.mobilenumber;
  values.email = values.email!==""?values.email: route.params.email;
  values.city = values.city!==""?values.city: route.params.city;
  

  axios.put(`http://192.168.137.1:8800/api/users/${route.params._id}`, values)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(values);

}


    return (
      <Formik initialValues={{ email:route.params.email,
      username:route.params.username,
      mobilenumber:route.params.mobilenumber,
      city:route.params.city,
      bloodgroup:route.params.city,
      status:route.params.city}} 
      onSubmit={values => Update(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
            <TextInput
        style={styles.input}
        placeholder={route.params.email}
        keyboardType='email-address'
        onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           value={values.email}
      />
      <TextInput
        style={styles.input}
        placeholder={route.params.username}
        keyboardType='default'
        onChangeText={handleChange('username')}
           onBlur={handleBlur('username')}
           value={values.username}
      />
      <TextInput
        style={styles.input}
        placeholder={route.params.mobilenumber}
        keyboardType='decimal-pad'
        onChangeText={handleChange('mobilenumber')}
            onBlur={handleBlur('mobilenumber')}
            value={values.mobilenumber}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChange('city')}
           onBlur={handleBlur('city')}
           value={values.city}
        placeholder={route.params.city}
        keyboardType='default'
      />
      <View >
      <DropDownPicker
      containerStyle={{width:"40%",
      margin:10,
      marginLeft:"30%"}}
      open={bopen}
      value={bvalue}
      
      items={bitems}
      setOpen={setbOpen}
      setValue={setbValue}
      setItems={setbItems}
      placeholder={route.params.bloodgroup}
      placeholderStyle={{
        color: "grey",
        
      }}
      
      dropDownDirection='TOP'
      showTickIcon={true}
    />
      <DropDownPicker
      containerStyle={{width:"40%",
      margin:10,
      marginLeft:"30%"}}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={route.params.status}
      dropDownDirection='TOP'
      placeholderStyle={{
        color: "grey",
        
      }}
      
      showTickIcon={true}
    />
    </View>
    <View style={styles.buttonCenter}>
    <View style={styles.button}>
    <Button
        style={styles.button}
        onPress={handleSubmit}
        mode="contained"
        color="#F22C2C"
        uppercase={false}>
        <Text >Update</Text>
      </Button>
      </View>
      </View>
        </View>
)}
        </Formik>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:"#FFEFEF",
      
     
    },
  input: {
      height: 40,
      margin: 20,
      borderWidth: 1,
      padding: 10,
      backgroundColor:"white"
    },
    
    button: {
      margin: 50,
      width: "50%",
      alignItems: "center",
    },
    buttonCenter: {
      alignItems: "center",
    },
})
