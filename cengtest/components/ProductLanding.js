/*
Product Landing page alternative to product details page, with tabbed view for the customers to look at running offers and personalized recommendations. Issues with rendering the tab view and product details. This feature is taken out offline for MVP.  
*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
const baseUrl = "<<base_url>>";
const urilink = "https://reqres.in/img/faces/1-image.jpg";
const Separator = () => (
  <View style={styles.separator} />
);
const Tab = createBottomTabNavigator();



function Prod({ prodObject }) {
  return (
    <SafeAreaView style={styles.dtlcontainer}>
    <View>
      <Text style={{marginTop:10, marginBottom:20}}>
      {`${prodObject['product-hier']['product-grp-name']}`}
      </Text>
      <Image
        source={{ uri: urilink }}
        style={{ width: 128, height: 128, borderRadius: 64, marginBottom: 10 }}
      />
      <Text style={{marginTop:10, marginBottom: 10}}> Size :  
      {`${prodObject['product-components']['product-details'][0]['style-desc']}`}
      </Text>
      <View style={styles.fixToText}>
        <Button title="Try on" onPress={()=>Alert.alert("Try on pressed")}/>
        <Button title="Try out" onPress={()=>Alert.alert("Try on pressed")}/>
      </View> 

      <Separator style={{marginTop:10}} />
      <Text style={{marginTop:10, marginBottom: 10}}> Size :  
      {`${prodObject['product-components']['product-details'][1]['style-desc']}`}
      </Text>
      <View style={styles.fixToText}>
        <Button title="Try on" onPress={()=>Alert.alert("Try on pressed")}/>
        <Button title="Try out" onPress={()=>Alert.alert("Try on pressed")}/>
      </View> 
      <Separator style={{marginTop:10}} />
      <Text> Size :  
      {`${prodObject['product-components']['product-details'][2]['style-desc']}`}
      </Text>
       <View style={styles.fixToText}>
        <Button title="Try on" onPress={()=>Alert.alert("Try on pressed")}/>
        <Button title="Try out" onPress={()=>Alert.alert("Try on pressed")}/>
      </View> 
      </View>
    </SafeAreaView>
    
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ProductLanding"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="ProductLanding"
        component={prodLanding}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={offers}
        options={{
          tabBarLabel: 'Deals',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="recommendations"
        component={recommendations}
        options={{
          tabBarLabel: 'You may like it',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function ProductLanding() {
  return (
         <MyTabs />
  );
}

function prodLanding() {
  const [prodId, setprodId] = useState(1001);
  const [prod, setprod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeprodIdHandler = () => {
    setprodId((prodId) => (prodId === 1003 ? 1001 : prodId + 1));
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/api/read/${prodId}`;
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setprod(response.data);
          console.log("Successful");
          //console.log(response.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch Products");
        }
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Data fetching cancelled');
        }else{
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchProducts();
    return () => source.cancel("Data fetching cancelled");
  }, [prodId]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapperStyle}>
        {!isLoading && !hasError && prod && <Prod prodObject={prod} />}
      </View>
      <View style={styles.wrapperStyle}>
        {isLoading && <Text> Loading </Text>}
        {!isLoading && hasError && <Text> An error has occurred </Text>}
      </View>
     
    </ScrollView>
  );
}
function offers() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Offers</Text>
    </View>
  );
}
function recommendations() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Offers</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "left",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  dtlcontainer: {
       justifyContent: 'center',
       marginHorizontal: 16,
       marginTop: 5,
      
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  wrapperStyle: {
    minHeight: 128,
  },
  separator: {
    margin: 0,
    marginVertical:  4,
    borderBottomColor: '#737373',
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  
});