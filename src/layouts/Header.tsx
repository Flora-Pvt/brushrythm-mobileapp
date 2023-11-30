import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import AppText from 'components/AppText'

import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/userSlice'

import { COLORS } from 'utils/constants'
import { ComicBubble, Infinite, Gem } from 'utils/svg-images'

export default function Header({ navigation }) {
  const user = useSelector(selectUser)

  const iconsColor = COLORS.secondary

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <ComicBubble color={iconsColor} />
        <AppText>{user?.experience || 0} XP</AppText>
      </View>

      <View style={styles.userInfo}>
        <Infinite color={iconsColor} />
        <AppText> {user?.streak || 0}</AppText>
      </View>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Store')}>
        <View style={styles.userInfo}>
          <Gem color={iconsColor} />
          <AppText>{user?.gems || 0}</AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 12,
    flexDirection: 'row',
    gap: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
})
