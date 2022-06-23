/* Chat not implemented or turned active. Issues with using firebase API into snack. Limitations of snack in importing firebase API
*/
import * as React from 'react';
import {useState,useEffect,useLayoutEffect,useCallback} from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
//import firebase from 'firebase';
/*import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';*/
//import { auth, database } from '../config/firebase';

export default function Chat({navigation}) {
  /* const [messages, setMessages] = useState([]);
  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
       return () => unsubscribe();
  }, []);*/
   
  
  
  return (
    <GiftedChat />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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
    width: 128,
  }
});
