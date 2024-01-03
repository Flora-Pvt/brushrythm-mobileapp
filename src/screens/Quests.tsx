import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import AppText from 'components/general/AppText'
import Card from 'components/general/Card'
import QuestsProgression from 'components/quests/QuestsProgression'

import { useTranslation } from 'react-i18next'

import { dailyQuests } from 'utils/quests'
import { COLORS } from 'utils/constants'
import { Gem } from 'utils/svg-images'

export default function Quests() {
  const { t } = useTranslation('translation', { keyPrefix: 'quests' })

  return (
    <ScrollView>
      <QuestsProgression></QuestsProgression>

      <View style={styles.quests}>
        <AppText style={styles.questsType}>{t('dailyQuests')}</AppText>
        {dailyQuests.map((quest, questIndex) => (
          <Card
            key={`quest-${questIndex}`}
            title={quest.title}
            description={t(quest.description.key, {
              count: quest.description.count,
            })}
            icon1={quest.icon1}
            icon2={Gem}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  quests: {
    padding: 20,
  },
  questsType: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 5,
  },
})
