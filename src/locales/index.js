import { createLocale } from 'react-localized'
import messagesRu from './ru.po'
import messagesDe from './de.po'
import messagesFr from './fr.po'

export const en = createLocale(null, { name: 'English', nameShort: 'En' })
export const ru = createLocale(messagesRu, { name: 'Русский', nameShort: 'Ру' })
export const de = createLocale(messagesDe, { name: 'Deutsch', nameShort: 'De' })
export const fr = createLocale(messagesFr, { name: 'Français', nameShort: 'Fr' })
