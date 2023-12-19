import { ComicBubble, Gesture, School } from './svg-images'

import i18n from './i18n'

export const artisticPaths = [
  {
    type: 'comic',
    title: i18n.t('paths.comic.title'),
    description: i18n.t('paths.comic.description'),
    steps: i18n.t('paths.comic.steps', { returnObjects: true }),
    tips: i18n.t('paths.comic.tips'),
    icon: ComicBubble,
  },
  {
    type: 'practice',
    title: i18n.t('paths.practice.title'),
    description: i18n.t('paths.practice.description'),
    steps: [],
    tips: i18n.t('paths.practice.tips'),
    icon: Gesture,
  },
  {
    type: 'theory',
    title: i18n.t('paths.theory.title'),
    description: i18n.t('paths.theory.description'),
    steps: i18n.t('paths.theory.steps', { returnObjects: true }),
    tips: i18n.t('paths.theory.tips'),
    icon: School,
  },
]

export const defaultArtisticPath = artisticPaths.find(
  (path) => path.type === 'practice'
)

export const getArtisticPath = (path) => {
  let userPath = artisticPaths.find((artPath) => artPath.type === path)
  if (!userPath) userPath = defaultArtisticPath
  return userPath
}
