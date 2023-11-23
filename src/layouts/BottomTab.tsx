import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'

import HomeScreen from 'screens/Home'
import QuestsScreen from 'screens/Quests'
import GalleryScreen from 'screens/Gallery'
import SettingsScreen from 'screens/Settings'
import Header from 'layouts/Header'

import { COLORS } from 'utils/constants'
import { Draw, Trophy, Gallery, Settings } from 'utils/svg-images'

export default function BottomTab() {
  const Tab = createBottomTabNavigator()

  const tabList = [
    {
      name: 'Home',
      component: HomeScreen,
      icon: Draw,
    },
    {
      name: 'Quests',
      component: QuestsScreen,
      icon: Trophy,
    },
    {
      name: 'Gallery',
      component: GalleryScreen,
      icon: Gallery,
    },
    {
      name: 'Settings',
      component: SettingsScreen,
      icon: Settings,
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.secondaryLighter,
        tabBarStyle: styles.tabBar,
      }}
    >
      {tabList.map((tab, tabIndex) => (
        <Tab.Screen
          key={`tab-${tabIndex}`}
          name={tab.name}
          component={tab.component}
          options={{
            headerStyle: styles.header,
            headerTitle: () => <Header />,
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => <tab.icon color={color}></tab.icon>,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.secondary,
    opacity: 80,
    height: 70,
  },

  header: {
    backgroundColor: COLORS.primaryDark,
  },
})
