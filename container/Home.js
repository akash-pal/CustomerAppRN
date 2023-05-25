import React from 'react';
import {View, Text} from 'react-native';
import {getCustomers} from '../service/CustomersDB';
import {useNavigation} from '@react-navigation/native';
import {getData} from "../utils/storage";

function HomeScreen() {
  const navigation = useNavigation();
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");
  const loadCustomers = async () => {
    const customers = await getCustomers();
    setCount(customers.length);
  };
  const getCustomerName = async () => {
    const name = await getData('name');
    setName(name);
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCustomers();
      getCustomerName();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen {name}</Text>
      <Text>There are {count} customers</Text>
    </View>
  );
}

export default HomeScreen;
