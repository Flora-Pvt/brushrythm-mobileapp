import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import AppText from './AppText'

import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'

import { COLORS } from 'utils/constants'

type InputModeOptions =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url'

export default function AppInput({
  label = 'label',
  placeholder = '',
  inputMode = 'text' as InputModeOptions,
  maxLength = null,
  value,
  onChangeText = (text) => {},
}) {
  const [fontsLoaded] = useFonts({ Inter_400Regular })
  if (!fontsLoaded) return

  return (
    <View>
      <AppText style={styles.label}>{label}</AppText>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        inputMode={inputMode}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
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
