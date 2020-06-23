import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

export default function Contact({ name }) {
  return (
    <View style={styles.container} >
      <Text>{ name }</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 15
  }
});
