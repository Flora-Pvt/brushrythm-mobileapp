import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/store'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screens/Login'
import SignupScreen from './src/screens/Signup'
import HomeScreen from './src/screens/Home'

import './firebaseConfig.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import './i18n.ts'
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { t } = useTranslation('translation', { keyPrefix: 'app' })

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoaded(true)
        setIsLoggedIn(true)
      } else {
        setIsLoaded(true)
        setIsLoggedIn(false)
      }
    })
  }, [])

  if (!isLoaded) {
    return (
      <View>
        <Text>{t('Loading', { keyPrefix: 'common' })}</Text>
      </View>
    )
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signup">
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
    <Provider store={store}>
      <HomeScreen></HomeScreen>
    </Provider>
  )
}

export default App
