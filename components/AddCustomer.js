import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const CustomerAdd = ({navigation, route}) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const {initialdata} = route.params;
    if (initialdata) {
      setNewUser({
        id: initialdata.id,
        name: initialdata.name,
        email: initialdata.email,
        address: initialdata.address,
        phone: initialdata.phone,
      });
    }
  }, [route.params.initialdata]);

  useEffect(() => {
    if (route.params.action == 'Add') {
      navigation.setOptions({title: 'Add Customer'});
    } else if (route.params.action == 'Edit') {
      navigation.setOptions({title: 'Edit Customer'});
    }
  }, [route.params?.action]);

  const handleChange = (key, e) => {
    setNewUser({
      ...newUser,
      [key]: e.nativeEvent.text,
    });
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newUser.name}
        onChange={e => handleChange('name', e)}
      />
      <TextInput
        style={styles.input}
        onChange={e => handleChange('email', e)}
        value={newUser.email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChange={e => handleChange('phone', e)}
        value={newUser.phone}
        placeholder="Phone"
      />
      <TextInput
        style={styles.input}
        onChange={e => handleChange('address', e)}
        value={newUser.address}
        placeholder="Address"
      />
      <View style={styles.buttonStyleContainer}>
        {route.params.action == 'Add' ? (
          <Button
            title="Add User"
            onPress={() =>
              navigation.navigate('CustomerList', {
                newData: newUser,
                action: route.params.action,
              })
            }
          />
        ) : (
          <Button
            title="Update User"
            onPress={() =>
              navigation.navigate('CustomerList', {
                newData: newUser,
                action: route.params.action,
              })
            }
          />
        )}
        <Button
          title="Close"
          onPress={() => {
            navigation.navigate('CustomerList');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonStyleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomerAdd;
