import React from 'react'
import { StyleSheet } from 'react-native'

import { useTranslation } from 'react-i18next'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from 'layouts/BottomTabNavigator'
import StoreScreen from 'screens/Store'

import { COLORS } from 'utils/constants'

const Stack = createNativeStackNavigator()

export default function Main() {
  const { t } = useTranslation('translation')

  return (
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
            headerTitle: t('store.title'),
            headerTitleStyle: styles.storeHeaderTitle,
            headerTintColor: COLORS.white,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
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
