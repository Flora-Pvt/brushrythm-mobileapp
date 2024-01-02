import React, { useEffect, useState } from 'react'
import AppText from 'components/general/AppText'

export default function Timer({ timeLimit = 60 * 15 }) {
  let timerInterval = null

  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    startTimerInterval()
    clearTimerInterval()
  }, [timeLeft])

  const startTimerInterval = () => {
    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval)
        return
      }

      setTimeLeft(timeLeft - 1)
    }, 1000)
  }

  const clearTimerInterval = () => {
    return () => clearInterval(timerInterval)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = `${time % 60}`

    if (Number(seconds) < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  return <AppText id="base-timer-label">{formatTime(timeLeft)}</AppText>
}
