import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screens/Login'
import SignupScreen from './src/screens/Signup'

import './firebaseConfig.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Stack = createNativeStackNavigator()

interface AppState {
  loaded: boolean
  loggedIn: boolean
}

export class App extends Component<{}, AppState> {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      loggedIn: false,
    }
  }

  componentDidMount(): void {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          loaded: true,
          loggedIn: true,
        })
      } else {
        this.setState({
          loaded: true,
          loggedIn: false,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state

    if (!loaded) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <View>
        <Text>Sign in or create an account</Text>
      </View>
    )
  }
}

export default App
