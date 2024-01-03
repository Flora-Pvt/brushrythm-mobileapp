import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { COLORS } from 'utils/constants'
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from '@expo-google-fonts/inter'

export default function AppText(props) {
  const [fontsLoaded] = useFonts({ Inter_500Medium, Inter_400Regular })

  if (!fontsLoaded) return

  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
})
