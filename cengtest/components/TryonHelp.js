/*
Try on help - Read from barcode tag or RFID tag. Scan feature not implemented. As of now - it will re-direct the flow to product details page
*/

import * as React from 'react';
import { Text, Button, SafeAreaView, View, StyleSheet, Image } from 'react-native';
export default function TryonHelp({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Scan the product barcode 
      </Text>
      <Button
          title="Scan"
          onPress={() => navigation.navigate('ProductDetails')}
        />
      </View>
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
