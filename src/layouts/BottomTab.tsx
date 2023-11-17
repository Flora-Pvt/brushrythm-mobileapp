import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from 'screens/Home'
import QuestsScreen from 'screens/Quests'
import GalleryScreen from 'screens/Gallery'
import SettingsScreen from 'screens/Settings'

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
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          opacity: 80,
          height: 70,
        },
      }}
    >
      {tabList.map((tab, tabIndex) => (
        <Tab.Screen
          key={`tab-${tabIndex}`}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color }) => (
              <tab.icon size={32} color={color}></tab.icon>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
