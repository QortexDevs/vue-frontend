export function share (
  url,
  title = '',
  description = '',
  imageUrl = '',
  imageName = '',
  callback = null,
  use_share_images = false
) {
  if (typeof Android !== 'undefined' && Android.shareData) {
    Android.shareData(title, description, imageUrl, url)
    console.log('android')
    return 'android'
  } else if (navigator.share) {
    console.log('generic')
    if (imageUrl && use_share_images && false) {
      fetch(imageUrl, { mode: 'no-cors' }).then(response => {
        response.blob().then(blob => {
          const file = new File([blob], imageName, {
            type: 'image/jpeg',
            lastModified: new Date().getTime()
          })
          text = navigator
            .share({
              text: description + '\n' + url,
              files: [file]
            })
            .then(success => {
              console.log('with image success')
              console.log(success)
              callback(true)
            })
            .catch(error => {
              console.log('with image error')
              console.log(error)
              callback(true)
            })
        })
      })
    } else {
      console.log('generic without picture')
      navigator
        .share({
          text: description + '\n' + url
        })
        .then(success => {
          console.log('without image success')
          console.log(success)
          callback(true)
        })
        .catch(error => {
          console.log('without image success')
          console.log(success)
          callback(true)
        })
    }
    return 'generic'
  } else {
    console.log('clipboard')
    copyShareLinkToClipboard(url, title, description, callback)
    return 'clipboard'
  }
}

function createTemporaryTextArea (text) {
  const textArea = document.createElement('textarea')
  textArea.value = text

  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  return textArea
}

function copyTextAreaValue (textArea, callback) {
  textArea.focus()
  textArea.select()

  try {
    if (detectiOS()) {
      const range = document.createRange()
      range.selectNodeContents(textArea)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, textArea.value.length)
    }
    const successful = document.execCommand('copy')
    const message = successful ? 'successful' : 'unsuccessful'
    console.log(`Fallback: Copying text to clipboard command was ${message}`)
    if (message === 'successful') {
      callback(true)
    }
  } catch (err) {
    console.error('Fallback: Unable to copy text to clipboard', err)
    callback(false)
  }
}

function destroyTemporaryTextArea (textArea) {
  document.body.removeChild(textArea)
}

function copyShareLinkToClipboard (url, title, description, callback) {
  let shareText = ''
  if (title && title !== '') {
    shareText += title + '\n'
  }
  if (description && description !== '') {
    shareText += description + '\n'
  }
  shareText += url
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareText)
  } else {
    const textArea = createTemporaryTextArea(shareText)
    copyTextAreaValue(textArea, callback)
    destroyTemporaryTextArea(textArea)
  }
}

function detectiOS () {
  return (
    ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}
