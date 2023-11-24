import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import AppText from 'components/AppText'

import { useTranslation } from 'react-i18next'

import { endOfMonth, getDaysInMonth } from 'date-fns'
import { formatDate, formatDateDistance } from 'utils/date-fns-format'

import { useSelector } from 'react-redux'
import { selectUser } from '../store/features/userSlice'

import { COLORS } from 'utils/constants'
import { Clock, Trophy } from 'utils/svg-images'

export default function Quests() {
  const { t } = useTranslation('translation', { keyPrefix: 'quests' })

  const today = new Date()
  const lastDayInMonth = endOfMonth(today)

  const month = formatDate(today, 'LLLL')
  const daysLeft = formatDateDistance(today, lastDayInMonth)
  const daysInMonth = getDaysInMonth(today)

  const user = useSelector(selectUser)
  const questsLeft = daysInMonth - (user.quests?.completed || 0)

  return (
    <ScrollView>
      <View style={styles.progressContainer}>
        <AppText style={styles.badge}>{month}</AppText>

        <AppText style={styles.month}>
          {t('month-quests', { month: month })}
        </AppText>

        <View style={styles.daysLeftContainer}>
          <Clock color={COLORS.secondaryLight} size={16} />
          <AppText style={styles.daysLeft}> {daysLeft}</AppText>
        </View>

        <View style={styles.completeContainer}>
          <AppText style={styles.completeText}>
            {t('complete', { questsLeft: questsLeft })}
          </AppText>
          <View style={styles.progressBar}>
            <View style={{ ...styles.progressBarInner, width: '40%' }}></View>
            <View style={styles.trophyContainer}>
              <Trophy color={COLORS.primaryDark} size={36} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: COLORS.primary,
    padding: 25,
    paddingBottom: 35,
  },

  badge: {
    backgroundColor: COLORS.secondaryLight,
    textTransform: 'capitalize',
    fontSize: 13,
    color: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },

  month: {
    fontSize: 24,
    marginBottom: 5,
  },

  daysLeftContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  daysLeft: {
    fontSize: 13,
  },

  completeContainer: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 12,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 14,
    paddingLeft: 12,
  },
  completeText: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 14,
  },
  progressBar: {
    height: 24,
    backgroundColor: COLORS.secondaryLighter,
    borderRadius: 12,
    justifyContent: 'center',
  },
  progressBarInner: {
    height: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  trophyContainer: {
    position: 'absolute',
    right: -14,
  },
})
