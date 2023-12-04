import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import AppText from './AppText'

import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'

import { COLORS } from 'utils/constants'

export default function AppInput({ label = 'label', placeholder, value }) {
  const [inputValue, setInputValue] = useState(value)

  const [fontsLoaded] = useFonts({ Inter_400Regular })
  if (!fontsLoaded) return

  return (
    <View>
      <AppText style={styles.label}>{label}</AppText>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.white,
    marginBottom: 8,
  },
  input: {
    color: COLORS.white,
    fontFamily: 'Inter_400Regular',

    backgroundColor: COLORS.secondaryLight,
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 15,
  },
})
