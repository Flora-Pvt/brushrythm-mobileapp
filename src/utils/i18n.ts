import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../public/locales/en/translation.json'
import fr from '../../public/locales/fr/translation.json'

import { NativeModules } from 'react-native'

const getLocale = () => {
  // iOS:
  let rawLocale =
    NativeModules.SettingsManager?.settings?.AppleLocale ||
    NativeModules.SettingsManager?.settings?.AppleLanguages[0]

  // Android:
  if (!rawLocale) rawLocale = NativeModules.I18nManager?.localeIdentifier

  // Default
  if (!rawLocale) rawLocale = 'fr'

  let locale = rawLocale.split('_')[0]
  locale = locale.split('-')[0]

  return locale
}

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    fr: fr,
  },
  lng: getLocale(),
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
  compatibilityJSON: 'v3',
})

export default i18n
