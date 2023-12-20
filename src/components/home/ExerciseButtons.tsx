import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { COLORS } from 'utils/constants'

import { useSelector } from 'react-redux'
import { selectUser } from 'features/user/userSlice'

export default function ExerciseButtons({
  setModalVisible = (state) => {},
  children = null,
}) {
  const user = useSelector(selectUser)

  const numberOfDays = 7
  const buttons = []

  // TODO: find a better algorithm
  const btnPositions = [0, 48, 96, 48, 0, -48, 0]

  const getButtonStyle = (btnIndex) => {
    const isToday = btnIndex === user.exercises_completed?.length - 1
    const isBefore = btnIndex < user.exercises_completed?.length - 1
    const isAfter = btnIndex > user.exercises_completed?.length - 1
    const isNotDone = user.exercises_completed?.[btnIndex] === 0

    const leftPosition = btnPositions[btnIndex]

    let backgroundColor = COLORS.primaryDark
    if (isBefore) backgroundColor = COLORS.primary
    if (isAfter || isNotDone) backgroundColor = COLORS.secondaryLighter
    if (isToday) backgroundColor = COLORS.primaryDark

    const opacity = isAfter ? 0.5 : 1

    return {
      left: leftPosition,
      backgroundColor: backgroundColor,
      opacity: opacity,
    }
  }

  for (let i = 0; i < numberOfDays; i++) {
    const isDisabled = i !== user.exercises_completed?.length - 1

    buttons.push(
      <Pressable
        key={`exercise-btn-${i}`}
        disabled={isDisabled}
        style={{ ...styles.step, ...getButtonStyle(i) }}
        onPress={() => setModalVisible(true)}
      >
        {/* TODO: add emojis depending on the exercises completed that day */}
      </Pressable>
    )
  }

  return buttons
}

const styles = StyleSheet.create({
  step: {
    height: 64,
    width: 64,
    borderRadius: 64 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
