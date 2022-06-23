/*
Product details page gives the product details along with the available styles and color. Product details will be fetched from Firestore database product master
Notify store functionality - to notify the store associate. It will post the data to store notification database in the backend with the customer information,,store information and trial room information. 
Further planning
1. to add feature to select the size/color and pass it to store associate 
2. To add chat functionality - problems in getting firebase to work with snack expo code
Issues: Application works with web or iOS mode. Android mode crash observed in the last few builds. 
*/

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  View,
  Button,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
const baseUrl = "<<REPLACE base url>>";
const urilink = "<<image uri>>";
const Separator = () => (
  <View style={styles.separator} />
);

const getRandomId = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return(Math.floor(Math.random()*(max - min +1))+min);
};

const postnotifications = async () => {
  const notiid = getRandomId(1,99999);
  const params = JSON.stringify({
      "id": notiid,
      "notification": {
      "storeId": "G001",
      "trialRoomId": "T01",
      }
  });
  try {
    console.log(notiid);
    console.log(params);
    const response = await axios.post(`${baseUrl}/api/notifications/create`,               params,{"headers": {
                  "content-type": "application/json",
                  },});
    console.log("posting done");
  //  setButtonText("Notified");
  }
  catch(error)
  {
    console.log("error post");
    console.log(params);
  }
  };


function Prod({ prodObject }) {
  return (
    <SafeAreaView style={styles.dtlcontainer}>
    <View>
      <Text style={{marginTop:10, marginBottom:20}}>
        Store: G-0001 Trial Room: T1
      </Text>  
      <Text style={{marginTop:10, marginBottom:20}}>
      {`${prodObject['product-hier']['product-grp-name']}`}
      </Text>
      <Image
        source={{ uri: urilink }}
        style={{ width: 128, height: 128, marginBottom: 10 }}
      />
      <Text style={{marginTop:10, marginBottom: 10}}> Size :  
      {`${prodObject['product-components']['product-details'][0]['style-desc']}`}
      </Text>
      <Text style={{marginTop:10, marginBottom: 10}}> Style-Id :  
      {`${prodObject['product-components']['product-details'][0]['style-id']}`}
      </Text>
      
      <Separator style={{marginTop:10}} />
      <Text style={{marginTop:10, marginBottom: 10}}> Size :  
      {`${prodObject['product-components']['product-details'][1]['style-desc']}`}
      </Text>
      <Text style={{marginTop:10, marginBottom: 10}}> Style-Id :  
      {`${prodObject['product-components']['product-details'][1]['style-id']}`}
      </Text>
      <Separator style={{marginTop:10}} />
      <Text> Size :  
      {`${prodObject['product-components']['product-details'][2]['style-desc']}`}
      </Text>
      <Text style={{marginTop:10, marginBottom: 10}}> Style-Id :  
      {`${prodObject['product-components']['product-details'][2]['style-id']}`}
      </Text>
      </View>
    </SafeAreaView>
    
  );
}
export default function ProductDetails({navigation}) {
  const [prodId, setprodId] = useState(1001);
  const [prod, setprod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeprodIdHandler = () => {
    setprodId((prodId) => (prodId === 1003 ? 1001 : prodId + 1));
  };
  const [buttonText, setButtonText] = useState('Notify Store');
  useEffect(() => {
    console.log("Inside useEffect");
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/api/read/${prodId}`;
    const fetchProducts = async () => {
      try {
        console.log("inside fetchproducts");
        setIsLoading(true);
        const respons = await axios.get(url, { cancelToken: source.token });
        console.log("before call");
        if (respons.status === 200) {
          setprod(respons.data);
          console.log("Successful");
          console.log(respons.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch Products");
          
        }
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Data fetching cancelled');
        }else{
          console.log("no error");
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
      <View>
      <Button
          title={buttonText}
          onPress={postnotifications}
          disabled={isLoading}
          style={styles.buttonStyles}
        />
       </View> 
    </ScrollView>
  );
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



