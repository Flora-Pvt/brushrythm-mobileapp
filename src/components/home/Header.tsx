import React, { useState, useEffect } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import HeaderPathPanel from './HeaderPathPanel'
import AppText from 'components/general/AppText'

import { useSelector } from 'react-redux'
import { selectUser } from 'features/user/userSlice'

import { COLORS } from 'utils/constants'
import { Timeline, Infinite, Gem } from 'utils/svg-images'
import { getArtisticPath } from 'utils/paths'

const headerHeight = 80

export default function Header({ navigation }) {
  const [panelVisible, setPanelVisible] = useState(false)
  const [HeaderPathIcon, setHeaderPathIcon] = useState(null)

  const user = useSelector(selectUser)

  const iconsColor = COLORS.secondary

  useEffect(() => {
    if (!HeaderPathIcon && user.path) {
      const currentPath = getArtisticPath(user.path)
      setHeaderPathIcon(() => currentPath.icon)
    }
  }, [user.path])

  return (
    <View>
      <HeaderPathPanel
        panelVisible={panelVisible}
        setPanelVisible={setPanelVisible}
        headerHeight={headerHeight}
        setHeaderPathIcon={setHeaderPathIcon}
      />

      <View style={styles.header}>
        <Pressable
          style={styles.userInfo}
          onPress={() => setPanelVisible(!panelVisible)}
        >
          <View style={styles.iconPathContainer}>
            {HeaderPathIcon && <HeaderPathIcon color={iconsColor} />}
          </View>
        </Pressable>

        <View style={styles.userInfo}>
          <Timeline color={iconsColor} />
          <AppText style={styles.secondaryColor}>
            {user?.experience || 0} XP
          </AppText>
        </View>

        <View style={styles.userInfo}>
          <Infinite color={iconsColor} />
          <AppText style={styles.secondaryColor}> {user?.streak || 0}</AppText>
        </View>

        <Pressable
          style={styles.userInfo}
          onPress={() => navigation.navigate('Store')}
        >
          <Gem color={iconsColor} />
          <AppText style={styles.secondaryColor}>{user?.gems || 0}</AppText>
        </Pressable>
      </View>
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

  secondaryColor: {
    color: COLORS.secondary,
  },

  iconPathContainer: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 12,
    padding: 4,
  },
})
