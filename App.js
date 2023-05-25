import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './container/Login';
import AboutScreen from './container/About';
import HomeScreen from './container/Home';
import CustomerList from './container/CustomerList';
import AddCustomers from './components/AddCustomer';
import {storeData} from './utils/storage';

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="CustomerList"
        component={CustomerList}
        options={{title: 'Customers'}}
      />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Logout">
        {({navigation}) => {
          storeData('isLoggedIn', false);
          navigation.navigate('Login');
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CustomerAdd"
          component={AddCustomers}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
