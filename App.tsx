import 'core-js/stable/atob'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { API_URL } from '@env'

import React, { useState } from 'react'
import { View } from 'react-native'
import AppText from 'components/general/AppText'

import { Provider } from 'react-redux'
import store from './src/store'
import { logUser } from 'features/user/userSlice'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from 'screens/Login'
import SignupScreen from 'screens/Signup'
import MainComponent from 'components/Main'

import 'utils/i18n'
import { useTranslation } from 'react-i18next'
import { getStringData } from '/utils/async-storage'

axios.defaults.baseURL = API_URL

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { t } = useTranslation('translation', { keyPrefix: 'app' })

  const checkUserCredentialsInStorage = async () => {
    const token = await getStringData('token')
    const userId = await getStringData('userId')

    if (typeof token === 'string') {
      const decodedToken = jwtDecode(token)

      if (decodedToken.exp === 0) {
        setIsLoggedIn(false)
      } else {
        store.dispatch(logUser({ id: userId, token }))
        setIsLoggedIn(true)
      }
    }

    setIsLoaded(true)
  }
  checkUserCredentialsInStorage()

  if (!isLoaded) {
    return (
      <View>
        <AppText>{t('loading', { keyPrefix: 'common' })}</AppText>
      </View>
    )
  }

  if (!isLoggedIn) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen
                  navigation={props.navigation}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Signup" options={{ headerShown: false }}>
              {(props) => (
                <SignupScreen
                  navigation={props.navigation}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <MainComponent></MainComponent>
    </Provider>
  )
}

export default App
