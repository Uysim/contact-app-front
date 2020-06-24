import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

export default function Contact({ name, email, avatar_url }) {
  return (
    <View style={styles.container} >
      <View style={styles.column}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar_url
          }}
        />
      </View>

      <View style={styles.column}>
        <Text style={styles.bold}>Name: </Text>
        <Text>{ name }</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.bold}>Email: </Text>
        <Text>{ email }</Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 15,
    flexDirection: 'row'
  },
  column: {
    marginRight: 25
  },
  bold: {
    fontWeight: 700
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'stretch'
  }
});
