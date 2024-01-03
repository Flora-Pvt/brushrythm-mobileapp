import React, { useEffect, useState } from 'react'
import AppText from 'components/general/AppText'

export default function Timer({ timeLimit = 60 * 15 }) {
  let timerInterval = null

  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        return () => clearInterval(timerInterval)
      }

      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [timeLeft])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = `${time % 60}`

    if (Number(seconds) < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  return <AppText style={{ fontSize: 19 }}>{formatTime(timeLeft)}</AppText>
}
