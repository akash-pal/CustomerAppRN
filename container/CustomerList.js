import React, {useState, useEffect} from 'react';

import {
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
} from '../service/CustomersDB';

const Item = ({item, onPress, style, deleteRecord, copyRecord, editRecord}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <View style={{flex: 8, height: 50, flexDirection: 'row'}}>
        <View style={{flex: 7, height: 50}}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => copyRecord(item.id)}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://training.pyther.com/icons/copy-icon.png',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => editRecord(item.id)}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://training.pyther.com/icons/edit.png?9',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, height: 50}}>
          <TouchableOpacity onPress={() => deleteRecord(item.id)}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://training.pyther.com/icons/delete.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 2, height: 50}}>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const FlatListCustomer = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [customerData, setCustomerData] = useState();

  const loadCustomers = async () => {
    const customers = await getCustomers();
    console.log(customers);
    setCustomerData(customers);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCustomers();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [route.params?.action]);

  useEffect(() => {
    if (route.params?.action == 'Add') {
      addCustomer(route.params.newData);
    } else if (route.params?.action == 'Edit') {
      updateCustomer(route.params.newData);
    }
  }, [route.params?.newData, route.params?.action]);

  const editRecord = id => {
    const [data] = customerData.filter(item => item.id == id);
    navigation.navigate('CustomerAdd', {action: 'Edit', initialdata: data});
  };

  const deleteRecord = id => {
    deleteCustomer(id);
    loadCustomers();
  };

  const copyRecord = async id => {
    const [customer] = await getCustomerById(id);
    addCustomer(customer);
    loadCustomers();
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    return (
      <Item
        item={item}
        deleteRecord={deleteRecord}
        copyRecord={copyRecord}
        editRecord={editRecord}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Add User"
        onPress={() => {
          navigation.navigate('CustomerAdd', {action: 'Add'});
        }}
      />
      <FlatList
        data={customerData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  email: {
    fontSize: 20,
  },
  phone: {
    fontSize: 18,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default FlatListCustomer;
