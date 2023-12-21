import React, { useState, useEffect } from 'react'
import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import AppModal from 'components/general/AppModal'
import AppText from 'components/general/AppText'
import AppButton from 'components/general/AppButton'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { selectUser, updateUser } from 'features/user/userSlice'

import { COLORS } from 'utils/constants'
import { artisticPaths, getArtisticPath } from 'utils/paths'
import { formatDate } from 'utils/date-fns-format'

export default function HeaderPathPanel({
  panelVisible,
  setPanelVisible,
  headerHeight,
  setHeaderPathIcon = (pathType) => {},
}) {
  const { t } = useTranslation('translation')
  const { width: windowWidth } = useWindowDimensions()

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [selectedPath, setSelectedPath] = useState({
    type: '',
    title: '',
    description: '',
    steps: [] as {},
    tips: '',
    icon: null,
  })
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

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

  const seePathDetails = (pathType) => {
    if (pathType === selectedPath.type) {
      setPanelVisible(false)
      return
    }

    setSelectedPath(getArtisticPath(pathType))
  }

  const confirmNewPath = () => {
    resetPath(selectedPath.type)
    // TODO: get status and display toaster if error
    setHeaderPathIcon(() => selectedPath.icon)
    setConfirmModalVisible(false)
    setPanelVisible(false)
  }

  if (!selectedPath.type.length) return
  return (
    <View
      style={{
        ...styles.panelContainer,
        width: windowWidth,
        top: headerHeight,
      }}
    >
      <View
        style={{
          ...styles.panelInner,
          display: panelVisible ? 'flex' : 'none',
        }}
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
              onPress={() => seePathDetails(path.type)}
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

        <AppButton
          text={t('home.headerPanelCta')}
          customStyles={styles.panelCta}
          onPress={() => setConfirmModalVisible(true)}
        />
      </View>

      <AppModal
        modalVisible={confirmModalVisible}
        setModalVisible={setConfirmModalVisible}
        containerStyle={styles.confirmModalContainer}
        cta={t('home.headerConfirmPathModal.cta')}
        onPressCta={confirmNewPath}
      >
        <AppText style={{ color: COLORS.white }}>
          {t('home.headerConfirmPathModal.body')}
        </AppText>
      </AppModal>
    </View>
  )
}

const styles = StyleSheet.create({
  panelContainer: {
    position: 'absolute',
    backgroundColor: COLORS.secondary,
    left: -16,
  },
  panelInner: {
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  panelCta: {
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

  confirmModalContainer: {
    backgroundColor: COLORS.secondaryTransparent,
  },
})
