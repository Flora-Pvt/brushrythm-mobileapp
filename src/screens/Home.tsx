import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import {
  selectUser,
  selectUserStatus,
  selectUserError,
  fetchUser,
} from '../features/userSlice'

export default function Home() {
  const { t } = useTranslation('translation')

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const user = useSelector(selectUser)
  const userStatus = useSelector(selectUserStatus)
  const error = useSelector(selectUserError)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

  let content
  switch (userStatus) {
    case 'loading':
      content = <Text>{t('common.loading')} </Text>
      break
    case 'succeeded':
      content = <Text>Email: {user.email} </Text>
      break
    case 'failed':
      content = <Text>{error}</Text>
      break
  }

  return <View>{content}</View>
}
