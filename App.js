import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import Contact from './src/Contact';
import axios from 'axios';
import _ from 'lodash';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default function App() {
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynce, setLastSynce] = useState(new Date());

  const fetchData = ()=>{
    // console.log(isLoading);
    if(isLoading){ return }

    setIsLoading(true);

    client.get('/contacts', {
      params: {
        page: page
      }
    })
    .then((response) => {
      const data = _.unionBy(contacts, response.data.contacts, 'id');
      setContacts(data);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setIsLoading(false);
      setPage(page+1);
    });
  }

  const sync = ()=>{
    client.get('/contacts', {
      params: {
        since: lastSynce.toUTCString()
      }
    })
    .then((response) => {
      const data = _.unionBy(contacts, response.data.contacts, 'id');
      setContacts(data);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setLastSynce(new Date())
    });
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <Button title="Sync" onPress={()=> sync() } />
      <ScrollView
        style={styles.list}
        onMomentumScrollEnd={()=> fetchData()}
      >
        <FlatList

          data={contacts}
          renderItem={({ item }) => (
            <Contact
              name={item.name}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </ScrollView>
      {
        (isLoading) ? (
          <ActivityIndicator/>
        ) : null
      }

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    padding: 15,
  },
  list: {
    width: "50%"
  }
});
