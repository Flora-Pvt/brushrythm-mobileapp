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
    <>
      <View style={styles.header}>
        <Pressable
          style={styles.iconPathContainer}
          onPress={() => setPanelVisible(!panelVisible)}
        >
          {HeaderPathIcon && <HeaderPathIcon color={iconsColor} />}
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

      <HeaderPathPanel
        panelVisible={panelVisible}
        setPanelVisible={setPanelVisible}
        headerHeight={headerHeight}
        setHeaderPathIcon={setHeaderPathIcon}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 12,
    marginTop: 'auto',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 32,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },

  secondaryColor: {
    color: COLORS.secondary,
  },

  iconPathContainer: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 12,
    padding: 4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
