import { atom } from 'recoil'

export const showModalState = atom({
  key: 'showModalState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
