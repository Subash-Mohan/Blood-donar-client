import React ,{useEffect, useState}from 'react'
import { StyleSheet, Text, View,TextInput ,StatusBar,Picker,Alert,Platform} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import axios from 'axios';
import { Button } from 'react-native-paper';



const Login = ({navigation}) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Available', value: 'Available'},
    {label: 'Unavailable', value: 'Unavailable'}
  ]);

 


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

  
const register = (values) => {
  const userid=null;
  values.bloodgroup = bvalue;
  values.status = value;
  axios.post('http://192.168.137.1:8800/api/users/register', values)
  .then(function (response) {
    console.log(response);
    navigation.navigate('Mainscreen',{...response.data})
  })
  .catch(function (error) {
    console.log(error);
  });
  console.log(values);
  
}



    return (
      
      <Formik initialValues={{ email:"",username:"",mobilenumber:"",city:"",bloodgroup:"",status:"" }} onSubmit={values => register(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
            <TextInput
        style={styles.input}
        
        placeholder="Email"
        keyboardType='email-address'
        onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           value={values.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType='default'
        onChangeText={handleChange('username')}
           onBlur={handleBlur('username')}
           value={values.username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
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
        placeholder="City"
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
      placeholder="Blood Group"
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
      placeholder="Status for donation"
      placeholderStyle={{
        color: "grey",
        
      }}
      dropDownDirection='TOP'
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
        <Text >Get In</Text>
      </Button>
      </View>
      </View>
        </View>
)}
        </Formik>
        
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
       backgroundColor:"#FFEFEF"
       
      },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor:"white"
      },
      
      button: {
        margin: 30,
        width: "50%",
        alignItems: "center",
        
      },
      buttonCenter: {
        alignItems: "center",

      },
})
