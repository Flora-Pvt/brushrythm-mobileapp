import { format, formatDistance } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'

import i18n from './i18n'

const locales = { enUS, fr }

const locale = i18n.language === 'en' ? 'enUS' : 'fr'

// choose format: https://date-fns.org/v2.16.1/docs/format
export const formatDate = (date, formatStr = 'PP') => {
  return format(date, formatStr, {
    locale: locales[locale],
  })
}

export const formatDateDistance = (date, baseDate) => {
  return formatDistance(date, baseDate, {
    locale: locales[locale],
  })
}
