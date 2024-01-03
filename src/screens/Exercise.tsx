import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Timer from 'components/home/Timer'
import AppText from 'components/general/AppText'
import AppButton from 'components/general/AppButton'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { selectUser, updateUser } from 'features/user/userSlice'

import { useTranslation } from 'react-i18next'

import { getArtisticPath } from 'utils/paths'
import { formatDate } from 'utils/date-fns-format'
import { COLORS } from 'utils/constants'

export default function Exercise({ navigation }) {
  const { t } = useTranslation('translation', { keyPrefix: 'exercise' })

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const initialContent = {
    title: '',
    body: t('start.body'),
    subject: '',
    cta: t('start.cta'),
    ctaAction: 'start',
  }

  const [content, setContent] = useState(initialContent)

  // TODO: get practice time from backend
  const practiceTime = 60 * 0.25
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!content.title.length && user.path) {
      const pathStep = getArtisticPath(user.path).steps[user.step || 0]

      // TODO: add custom subject if practice path
      setContent({
        ...content,
        title: pathStep.summary || t('start.title'),
        subject: pathStep.detailed || '',
      })
    }
  }, [user.path])

  const showNextStep = () => {
    switch (content.ctaAction) {
      case 'start':
        setContent({
          ...content,
          body: '',
          cta: '',
          ctaAction: 'done',
        })

        setTimeout(() => {
          setContent({
            ...content,
            body: t('done.body'),
            subject: '',
            cta: t('done.cta'),
            ctaAction: 'done',
          })
        }, 1000 * practiceTime)
        break

      case 'done':
        setContent(initialContent)
        updateExercisesCompleted()
        navigation.navigate('BottomTabNavigator') // go home
        break
    }
  }

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

  if (!content.title.length) return
  // TODO: add an animation, progress bar?
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{content.title}</AppText>

      {content.body.length > 0 && (
        <AppText style={styles.text}>{content.body}</AppText>
      )}

      {content.subject.length > 0 && (
        <AppText style={styles.text}>{content.subject}</AppText>
      )}

      {content.ctaAction == 'done' && (
        <View style={styles.timer}>
          <AppText style={styles.timeText}>{t('remainingTime')}</AppText>
          <Timer timeLimit={practiceTime} />
        </View>
      )}

      {content.cta.length > 0 && (
        <AppButton
          text={content.cta}
          customStyles={styles.button}
          onPress={showNextStep}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 30,
    backgroundColor: COLORS.secondary,
  },

  title: {
    fontSize: 19,
    marginBottom: 20,
  },

  text: {
    marginBottom: 20,
  },

  timer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  timeText: {
    marginBottom: 5,
  },

  button: {
    width: 200,
    marginHorizontal: 'auto',
  },
})
