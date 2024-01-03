import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { COLORS } from 'utils/constants'
import AppText from './AppText'

export default function AppButton({
  customStyles = {},
  text = '',
  disabled = false,
  onPress,
}) {
  /** TODO: add loading visual feedback */

  return (
    <Pressable
      style={{ ...styles.button, opacity: disabled ? 0.4 : 1, ...customStyles }}
      disabled={disabled}
      onPress={onPress}
    >
      <AppText style={styles.text}>{text}</AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 40,
    marginTop: 60,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: COLORS.secondary,
  },
})
