import React, { useState } from 'react'
import { ScrollView, View, Pressable, StyleSheet } from 'react-native'
import AppInput from 'components/general/AppInput'
import AppText from 'components/general/AppText'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

import { useTranslation } from 'react-i18next'

import { COLORS } from 'utils/constants'

export const Signup = ({ navigation }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' })

  const [newUser, setNewUser] = useState({
    age: '',
    name: '',
    username: '',
    email: '',
    password: '',
    streak: 0,
    experience: 0,
    league: 0,
    items: {
      gems: 5,
      cheatBreaks: 1,
      morningBonus: false,
      eveningBonus: false,
      purchasedBonuses: 0,
    },
    quests: {
      completed: 0,
      month: 0,
    },
  })

  const signupInputs = [
    {
      label: t('age', { keyPrefix: 'common' }),
      inputMode: 'numeric',
      maxLength: 2,
      value: newUser.age,
      key: 'age',
    },
    {
      label: t('name', { keyPrefix: 'common' }),
      value: newUser.name,
      key: 'name',
    },
    {
      label: t('username', { keyPrefix: 'common' }),
      value: newUser.username,
      key: 'username',
    },
    {
      label: t('email', { keyPrefix: 'common' }),
      inputMode: 'email',
      value: newUser.email,
      key: 'email',
    },
    {
      label: t('password', { keyPrefix: 'common' }),
      value: newUser.password,
      key: 'password',
    },
  ]

  const onSignup = () => {
    const auth = getAuth()
    const db = getFirestore()

    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async () => {
        const usersCol = collection(db, 'users')
        const newUserRef = doc(usersCol, auth.currentUser.uid)
        await setDoc(newUserRef, newUser)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          {signupInputs.map((signupInput, inputIndex) => (
            <AppInput
              key={`setting-input-${inputIndex}`}
              label={signupInput.label}
              value={signupInput.value}
              onChangeText={(newVal) =>
                setNewUser({ ...newUser, [signupInput.key]: newVal })
              }
            />
          ))}
        </View>

        <Pressable style={styles.button} onPress={onSignup}>
          <AppText>{t('createAccount')}</AppText>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <AppText style={styles.login}>{t('alreadyAccount')}</AppText>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 40,
    backgroundColor: COLORS.secondary,
    flex: 1,
  },
  inputContainer: {
    gap: 30,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 40,
    marginTop: 60,
    marginBottom: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: COLORS.white,
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
})

export default Signup
