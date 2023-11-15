import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'

import HomeScreen from '../screens/Home'
import QuestsScreen from '../screens/Quests'
import GalleryScreen from '../screens/Gallery'
import SettingsScreen from '../screens/Settings'

export default function BottomTab() {
  const Tab = createBottomTabNavigator()

  const tabList = [
    {
      name: 'Home',
      component: HomeScreen,
      imageSrc: require('../../public/images/bottom-tab/draw.svg'),
    },
    {
      name: 'Quests',
      component: QuestsScreen,
      imageSrc: require('../../public/images/bottom-tab/trophy.svg'),
    },
    {
      name: 'Gallery',
      component: GalleryScreen,
      imageSrc: require('../../public/images/bottom-tab/gallery.svg'),
    },
    {
      name: 'Settings',
      component: SettingsScreen,
      imageSrc: require('../../public/images/bottom-tab/settings.svg'),
    },
  ]

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FAFBF9',
        tabBarStyle: {
          backgroundColor: '#272C2B',
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
              <Image
                source={tab.imageSrc}
                style={{ width: 32, height: 32 }}
                tintColor={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
