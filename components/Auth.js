import React, { Component } from 'react'
import { View, TouchableHighlight, TextInput, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { createUser, fetchUser } from '../store'
import { StackNavigator } from 'react-navigation'
import styles from './styles'


export class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      message: '',
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleSignup() {
    this.setState({ message: '' })
    const { email, password } = this.state
    if ( !this.state.email || !this.state.password) {
      this.setState({ message: 'All fields required!' })
    } else {
      this.setState({ message: '' })
      this.props.createUser({ email, password })
      this.props.profileNav
        ? this.props.profileNav.navigate('Profile')
        : this.props.navigation.navigate('Profile')
    }
  }

  handleLogin() {
    this.setState({ message: '' })
    const { email, password } = this.state
    this.props.fetchUser({ email, password })
    console.log('fetched user')
    this.props.navigation.navigate('Profile')
  }

  render() {
return (
  <Image source={require('../img/loginbkg.jpg')}
  style={styles.backgroundImage}>
   
      <View style={styles.container}>
        <Text style={styles.title}>Build And go!</Text>
        <View style={styles.containerInput}>
        <TextInput
          // containerStyle={styles.containerInput}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          // containerStyle={styles.containerInput}
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={text => this.setState({ password: text })}
        />
          </View>
        {this.state.message ? (
          <Text style={styles.message}>{this.state.message}</Text>
        ) : null}
        <TouchableHighlight
          underlayColor={'#f9f5ec'}
          style={styles.button}
          onPress={this.handleLogin}
        >
          <Text style={{fontSize: 20, color: '#000000', fontWeight: 'bold'}}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#f9f5ec'}
          style={styles.button2}
          onPress={this.handleSignup}
        >
          <Text style={{fontSize: 20, color: '#000000', fontWeight: 'bold'}}>Sign Up</Text>
        </TouchableHighlight>
      </View>
      </Image>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = { createUser, fetchUser }

export default connect(mapState, mapDispatch)(Auth)
