import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { useTranslation } from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { fetchUser } from '../store/features/userSlice'

import Navigator from 'layouts/Navigator'

export default function Home({ navigation }) {
  const { t } = useTranslation('translation')

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const userStatus = useSelector(
    (state: { user: { status } }) => state.user.status
  )
  const error = useSelector((state: { user: { error } }) => state.user.error)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser())
    }
  }, [userStatus, dispatch])

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
      content = <Navigator navigation={navigation}></Navigator>
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
