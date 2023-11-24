import React from 'react'
import { View, StyleSheet } from 'react-native'
import { COLORS } from 'utils/constants'

export default function horizontalConnectorLine(props) {
  return <View style={{ ...props.style, ...styles.horizontalLine }}></View>
}

const styles = StyleSheet.create({
  horizontalLine: {
    height: 4,
    width: 100,
    backgroundColor: COLORS.primary,
  },
})
