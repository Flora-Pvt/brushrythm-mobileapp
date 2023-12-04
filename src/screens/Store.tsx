import React from 'react'
import { View, StyleSheet } from 'react-native'
import AppText from 'components/general/AppText'
import Card from 'components/general/Card'

import { useTranslation } from 'react-i18next'

import { COLORS } from 'utils/constants'
import {
  Croissant,
  Flare,
  Gem,
  Lock,
  LockOpen,
  Moon,
  TrendingUp,
} from 'utils/svg-images'

export default function Store() {
  const { t } = useTranslation('translation', { keyPrefix: 'store' })

  const bonuses = [
    { title: t('earlyBirdBonus'), icon1: Flare, icon2: LockOpen },
    { title: t('nightOwlBonus'), icon1: Moon, icon2: Lock },
    { title: t('xpBonus'), icon1: TrendingUp, icon2: Gem },
  ]

  const streakBreak = { title: t('streakBreaks'), icon1: Croissant, icon2: Gem }

  return (
    <View style={styles.container}>
      <AppText style={styles.itemsType}>{t('bonuses')}</AppText>
      {bonuses.map((bonus, bonusIndex) => (
        <Card
          key={`bonus-${bonusIndex}`}
          title={bonus.title}
          icon1={bonus.icon1}
          icon2={bonus.icon2}
        />
      ))}

      <AppText style={{ ...styles.itemsType, marginTop: 30 }}>
        {t('breaks')}
      </AppText>
      <Card
        title={streakBreak.title}
        icon1={streakBreak.icon1}
        icon2={streakBreak.icon2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    padding: 20,
  },
  itemsType: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 5,
  },
})
