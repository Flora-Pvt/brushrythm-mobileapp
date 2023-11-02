import React, { Component } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

interface LoginState {
  name: string
  email: string
  password: string
}

export class Login extends Component<{}, LoginState> {
  constructor(props) {
    super(props)

    this.onSignin = this.onSignin.bind(this)
  }

  onSignin = () => {
    const auth = getAuth()
    const { name, email, password } = this.state

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Pressable onPress={this.onSignin}>
          <Text>Sign In</Text>
        </Pressable>
      </View>
    )
  }
}

export default Login
