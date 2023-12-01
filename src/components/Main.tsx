import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { fetchUser } from '../store/features/userSlice'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from 'layouts/BottomTabNavigator'
import StoreScreen from 'screens/Store'

import { COLORS } from 'utils/constants'

const Stack = createNativeStackNavigator()

export default function Main() {
  const { t } = useTranslation('translation')

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const userStatus = useSelector(
    (state: { user: { status } }) => state.user.status
  )
  const error = useSelector((state: { user: { error } }) => state.user.error)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

  let content
  switch (userStatus) {
    case 'loading':
      content = (
        <View>
          <Text>{t('common.loading')} </Text>
        </View>
      )
      break
    case 'succeeded':
      content = (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="BottomTabNavigator">
            <Stack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Store"
              component={StoreScreen}
              options={{
                headerStyle: styles.storeHeader,
                headerTitleStyle: styles.storeHeaderTitle,
                headerTintColor: COLORS.white,
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )

      break
    case 'failed':
      content = (
        <View>
          <Text>{error}</Text>
        </View>
      )
      break
  }

  return content
}

const styles = StyleSheet.create({
  storeHeader: {
    backgroundColor: COLORS.secondaryLight,
    borderBottomWidth: 0,
  },
  storeHeaderTitle: {
    fontSize: 24,
  },
})
