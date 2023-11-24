import React from 'react'
import { View, StyleSheet } from 'react-native'
import { COLORS } from 'utils/constants'

export default function Step() {
  return <View style={styles.step}></View>
}

const styles = StyleSheet.create({
  step: {
    height: 64,
    width: 64,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },
})
