import React, { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import HeaderModal from './HeaderModal'
import AppText from 'components/general/AppText'

import { useSelector } from 'react-redux'
import { selectUser } from 'features/user/userSlice'

import { COLORS } from 'utils/constants'
import { Timeline, Infinite, Gem } from 'utils/svg-images'
import { getArtisticPath } from 'utils/paths'

const headerHeight = 80

export default function Header({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)

  const user = useSelector(selectUser)

  const IconPath = getArtisticPath(user?.path).icon

  const iconsColor = COLORS.secondary

  return (
    <View style={styles.header}>
      <HeaderModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        headerHeight={headerHeight}
      />

      <Pressable style={styles.userInfo} onPress={() => setModalVisible(true)}>
        <View style={styles.iconPathContainer}>
          <IconPath color={iconsColor} />
        </View>
      </Pressable>

      <View style={styles.userInfo}>
        <Timeline color={iconsColor} />
        <AppText>{user?.experience || 0} XP</AppText>
      </View>

      <View style={styles.userInfo}>
        <Infinite color={iconsColor} />
        <AppText> {user?.streak || 0}</AppText>
      </View>

      <Pressable
        style={styles.userInfo}
        onPress={() => navigation.navigate('Store')}
      >
        <Gem color={iconsColor} />
        <AppText>{user?.gems || 0}</AppText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    gap: 32,
    height: headerHeight,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  iconPathContainer: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 12,
    padding: 4,
  },
})
