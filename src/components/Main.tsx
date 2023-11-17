import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { selectUser, fetchUser } from '../store/features/userSlice'

import BottomTab from 'layouts/BottomTab'

export default function Home() {
  const { t } = useTranslation('translation')

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const user = useSelector(selectUser)
  const userStatus = useSelector(
    (state: { user: { status } }) => state.user.status
  )
  const error = useSelector((state: { user: { error } }) => state.user.error)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

  console.log(user)

  let content
  switch (userStatus) {
    case 'loading':
      content = (
        <View>
          <Text>{t('common.loading')} </Text>
        </View>
      )
      break
    case 'succeeded':
      content = <BottomTab></BottomTab>
      break
    case 'failed':
      content = (
        <View>
          <Text>{error}</Text>
        </View>
      )
      break
  }

  return content
}
