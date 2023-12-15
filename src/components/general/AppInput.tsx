import React from 'react'
import { TextInputProps, View, TextInput, StyleSheet } from 'react-native'
import AppText from './AppText'

import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'

import { COLORS } from 'utils/constants'

export default function AppInput({
  label = 'label',
  placeholder = '',
  inputMode = 'text' as TextInputProps['inputMode'],
  maxLength = null,
  value,
  autocomplete = 'off' as TextInputProps['autoComplete'],
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
        autoComplete={autocomplete}
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
