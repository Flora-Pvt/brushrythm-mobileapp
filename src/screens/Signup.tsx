import React, { Component } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

interface SignupState {
  age: string
  name: string
  username: string
  email: string
  password: string
}

export class Signup extends Component<{}, SignupState> {
  constructor(props) {
    super(props)

    this.onSignup = this.onSignup.bind(this)
  }

  onSignup = () => {
    const auth = getAuth()
    const { age, name, username, email, password } = this.state

    createUserWithEmailAndPassword(auth, email, password)
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
          placeholder="Age"
          inputMode="numeric"
          maxLength={3}
          onChangeText={(age) => this.setState({ age })}
        />
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Username"
          onChangeText={(username) => this.setState({ username })}
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
        <Pressable onPress={this.onSignup}>
          <Text>Create account</Text>
        </Pressable>
      </View>
    )
  }
}

export default Signup
