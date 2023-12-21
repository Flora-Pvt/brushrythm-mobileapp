import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import AppText from 'components/general/AppText'
import AppModal from 'components/general/AppModal'
import ExerciseButtons from 'components/home/ExerciseButtons'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { selectUser, updateUser } from 'features/user/userSlice'

import { useTranslation } from 'react-i18next'
import { COLORS } from 'utils/constants'
import { getArtisticPath } from 'utils/paths'
import { formatDate } from 'utils/date-fns-format'

export default function Home() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' })

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const initialModalContent = {
    body: t('exerciseModalStart.body'),
    ctaText: t('exerciseModalStart.cta'),
    ctaAction: 'start',
  }
  const initialPath = {
    type: '',
    steps: [{ detailed: '' }] as {},
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState(initialModalContent)
  const [path, setPath] = useState(initialPath)
  const [stepSubject, setStepSubject] = useState('')

  const user = useSelector(selectUser)

  useEffect(() => {
    if (!path.type && user.path) {
      setPath(getArtisticPath(user.path))

      // TODO: add custom subject if practice path
      setStepSubject(path.steps[user.step || 0]?.detailed || '')
    }
  }, [user.path])

  const updateExercisesCompleted = async () => {
    const today = new Date()
    const lastExerciseDate = new Date(user.last_exercise_date)
    let exercisesCompleted = [...user.exercises_completed]

    if (
      today.getDay() === lastExerciseDate.getDay() &&
      exercisesCompleted.length
    ) {
      exercisesCompleted[exercisesCompleted.length - 1]++
    } else {
      exercisesCompleted.push(1)
    }

    // TODO: if end of the week increase step
    // TODO: if end of the path, choose new path or reset path
    // TODO: check difference between today and last_exercise_date to add exercise at the right index
    const updates = {
      last_exercise_date: formatDate(today, 'yyyy-MM-dd HH:mm:ss'),
      exercises_completed: JSON.stringify(exercisesCompleted),
    }

    // TODO: get status and display toaster if error
    dispatch(updateUser({ id: user.id, updates: updates }))
  }

  const onPressModalCta = () => {
    switch (modalContent.ctaAction) {
      case 'start':
        setModalContent({
          ...modalContent,
          body: t('exerciseModalDo.body'),
          ctaText: '',
        })

        // TODO: add a loading animation
        setTimeout(() => {
          setModalContent({
            ...modalContent,
            ctaText: t('exerciseModalDo.cta'),
            ctaAction: 'done',
          })
        }, 4000)
        break

      case 'done':
        setModalVisible(false)
        setModalContent(initialModalContent)
        updateExercisesCompleted()
        break
    }
  }

  if (!path.type) return
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <AppModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          ctaText={modalContent.ctaText}
          onPressCta={onPressModalCta}
        >
          <AppText style={styles.modalText}>{modalContent.body}</AppText>
          <AppText style={styles.modalText}>{stepSubject}</AppText>
        </AppModal>

        <View style={styles.lineContainer}>
          <ExerciseButtons setModalVisible={setModalVisible} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 40,
  },

  modalText: {
    color: COLORS.white,
  },

  lineContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: 24,
  },
})
