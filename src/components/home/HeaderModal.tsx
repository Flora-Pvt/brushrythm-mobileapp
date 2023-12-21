import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import AppModal from 'components/general/AppModal'
import AppText from 'components/general/AppText'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { selectUser, updateUser } from 'features/user/userSlice'

import { COLORS } from 'utils/constants'
import { artisticPaths, getArtisticPath } from 'utils/paths'
import { formatDate } from 'utils/date-fns-format'

export default function HeaderModal({
  modalVisible,
  setModalVisible,
  headerHeight,
  setHeaderPathIcon = (pathType) => {},
}) {
  const { t } = useTranslation('translation')

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [selectedPath, setSelectedPath] = useState({
    type: '',
    title: '',
    description: '',
    steps: [] as {},
    tips: '',
    icon: null,
  })

  const user = useSelector(selectUser)

  const isSelectedPath = (pathType) => selectedPath.type === pathType

  useEffect(() => {
    if (!selectedPath.type.length && user.path) {
      setSelectedPath(getArtisticPath(user.path))
    }
  }, [user.path])

  const resetPath = async (pathType) => {
    const today = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')

    const updates = {
      path: pathType,
      last_exercise_date: today,
      exercises_completed: JSON.stringify([0]),
    }

    dispatch(updateUser({ id: user.id, updates: updates }))
  }

  const onSeePath = (pathType) => {
    if (pathType === selectedPath.type) {
      setModalVisible(false)
      return
    }

    setSelectedPath(getArtisticPath(pathType))
  }

  const onChoosePath = (pathType) => {
    if (pathType === user.path) {
      setModalVisible(false)
      return
    }

    // TODO: get status and display toaster if error
    // TODO: alert that steps will be reset (when done allow reset if same path)
    resetPath(pathType)
    setHeaderPathIcon(() => selectedPath.icon)
    setModalVisible(false)
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
      onPressCta={() => onChoosePath(selectedPath.type)}
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
            onPress={() => onSeePath(path.type)}
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
