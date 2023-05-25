import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import {storeData, getData} from "../utils/storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    headerTitle: 'Login',
  };
  state = {
    email: 'admin',
    password: 'admin',
  };

  componentDidMount() {
    getData("isLoggedIn").then(value => {
      if(value) {
        this.props.navigation.navigate('Root');
      }
    });
  }

  onLoginButton = () => {
    console.log('>> on login button');
    if (this.state.email == this.state.password) {
      storeData("name", this.state.email);
      storeData("isLoggedIn", true);
      this.props.navigation.navigate('Root', {name: this.state.email});
      this.setState({
        email: '',
        password: '',
      });
    } else {
      alert('Username/Password should be admin/admin.');
    }
  };

  onForgotText = () => {
    //this.props.navigation.navigate('Forgot');
  };

  onRegister = () => {
    //this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://training.pyther.com/icons/user.png'}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://training.pyther.com/icons/key.png'}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onLoginButton()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
