function sleep(delayTimer) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayTimer)
  })
}

export { sleep }
