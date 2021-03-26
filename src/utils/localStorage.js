export const setLocalStorageItem = (key, value) => {
  try {
    const data = JSON.stringify(value)
    window.localStorage.setItem(key, data)
  } catch {
    // do nothing
  }
}

export const getLocalStorageItem = (key) => {
  try {
    const data = window.localStorage.getItem(key)
    return JSON.parse(data)
  } catch {
    return undefined
  }
}
