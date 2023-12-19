import React, { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import AppModal from 'components/general/AppModal'
import AppText from 'components/general/AppText'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'
import { selectUser } from 'features/user/userSlice'

import { COLORS } from 'utils/constants'
import { artisticPaths, getArtisticPath } from 'utils/paths'

export default function HeaderModal({
  modalVisible,
  setModalVisible,
  headerHeight,
}) {
  const { t } = useTranslation('translation')

  const user = useSelector(selectUser)

  const [selectedPath, setSelectedPath] = useState(getArtisticPath(user?.path))

  const isSelectedPath = (pathType) => selectedPath.type === pathType

  const onChoosePath = (pathType) => {
    if (pathType === selectedPath.type) {
      setModalVisible(false)
      return
    }

    setSelectedPath(getArtisticPath(pathType))
  }

  return (
    <AppModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      animationType="fade"
      containerStyle={{ ...styles.modalContainer, paddingTop: headerHeight }}
      modalStyle={styles.modalInner}
      ctaStyle={styles.modalCta}
      ctaText={t('home.headerCta')}
    >
      <View style={styles.pathsContainer}>
        {artisticPaths.map((path) => (
          <Pressable
            key={path.type}
            style={{
              ...styles.path,
              borderColor: isSelectedPath(path.type)
                ? COLORS.primaryDark
                : COLORS.secondaryLighter,
            }}
            onPress={() => onChoosePath(path.type)}
          >
            <path.icon color={COLORS.white} />
          </Pressable>
        ))}
      </View>

      <AppText style={styles.pathTitle}>{selectedPath.title}</AppText>
      <AppText style={styles.pathContent}>{selectedPath.description}</AppText>
      {selectedPath.steps.map((step, index) => (
        <AppText key={`step-${index}`} style={styles.pathContent}>
          {step.summary}
        </AppText>
      ))}
      <AppText style={styles.pathTips}>{selectedPath.tips}</AppText>
    </AppModal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-start',
  },
  modalInner: {
    margin: 0,
    padding: 0,
    borderRadius: 0,
    alignItems: 'flex-start',
    width: '100%',
  },
  modalCta: {
    backgroundColor: COLORS.primaryDark,
  },

  pathsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  path: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 12,
    padding: 8,
  },
  pathTitle: {
    color: COLORS.white,
    fontSize: 16,
    marginVertical: 20,
  },
  pathContent: {
    color: COLORS.white,
    marginBottom: 5,
  },
  pathTips: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 20,
  },
})
