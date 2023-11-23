import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from 'components/AppText'

import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/userSlice'

import { COLORS } from 'utils/constants'
import { ComicBubble, Infinite, Gem } from 'utils/svg-images'

export default function Header() {
  const user = useSelector(selectUser)

  const iconsColor = COLORS.secondary

  return (
    <View style={styles.header}>
      <AppText style={styles.userInfo}>
        <ComicBubble color={iconsColor} />
        <Text>{user?.experience || 0} XP</Text>
      </AppText>

      <AppText style={styles.userInfo}>
        <Infinite color={iconsColor} />
        {user?.streak || 0}
      </AppText>

      <AppText style={styles.userInfo}>
        <Gem color={iconsColor} />
        {user?.gems || 0}
      </AppText>
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
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
})
