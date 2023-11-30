import React from 'react'
import { View, StyleSheet } from 'react-native'
import AppText from './AppText'
import { COLORS } from 'utils/constants'

export default function Card(props) {
  const Icon1 = props.icon1
  const Icon2 = props.icon2

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Icon1 />
      </View>

      <View style={styles.textContainer}>
        <AppText style={styles.title}>{props.title}</AppText>
        <AppText style={styles.description}>{props.description}</AppText>
      </View>

      <View style={styles.imageContainer}>
        <Icon2 color={COLORS.primaryDark} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  imageContainer: {
    backgroundColor: COLORS.secondary,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  textContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    color: COLORS.primary,
    fontSize: 11,
  },
})
