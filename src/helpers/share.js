export function share (
  url,
  title = '',
  description = '',
  imageUrl = '',
  imageName = '',
  callback = null
) {
  if (typeof Android !== 'undefined' && Android.shareData) {
    Android.shareData(title, description, imageUrl, url)
    return 'android'
  } else if (navigator.share) {
    if (imageUrl) {
      fetch(imageUrl).then(response => {
        response.blob().then(blob => {
          const file = new File([blob], imageName, {
            type: 'image/png'
          })
          navigator
            .share({
              url: url,
              title: title,
              text: description,
              files: [file]
            })
            .then(success => {
              callback(true)
            })
            .catch(error => {
              callback(true)
            })
        })
      })
    } else {
      navigator
        .share({
          url: url,
          title: title,
          text: description
        })
        .then(success => {
          callback(true)
        })
        .catch(error => {
          callback(true)
        })
    }
    return 'generic'
  } else {
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
  let shareText = '';
  if (title && title !== '') {
    shareText += title + "\n"
  }
  if (description && description !== '') {
    shareText += description + "\n"
  }
  shareText += url
  const textArea = createTemporaryTextArea(shareText)
  copyTextAreaValue(textArea, callback)
  destroyTemporaryTextArea(textArea)
}

function detectiOS () {
  return (
    ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}