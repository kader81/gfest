/*
Home.js => Login functionality - need to be integrated with Firebase auth 
*/
import * as React from 'react';
import { Text, Button, View, StyleSheet, Image, SafeAreaView, TextInput } from 'react-native';
import axios from 'axios';

export default function Home({navigation}) {
  const [text, onChangeText] = React.useState("frank@gmail.com");
  const [pwdtext, onpwdChangeText] = React.useState("Password");
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../assets/bkground_mobile.png')       } />
     <Text style={styles.textlabel}>Enter your email-id</Text>
     <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text style={styles.textlabel}>Enter your password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onpwdChangeText}
        value={pwdtext}
        secureTextEntry
      />
      <Button
          title="Sign in"
          onPress={() => navigation.navigate('TryonHelp')}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: '100%',
  },
  input: {
    height: '10%',
    width: '80%',
    margin: 15,
    borderWidth: 1,
    padding: 5,
  },
  textlabel: {
    width: '80%',
    margin: 3,
    borderWidth: 0,
    padding: 1,
  },  
});
