import { authHeader } from '../helpers'

const jsonUrl = import.meta.env.VITE_JSON_API_BASE_URL

class FAQService {
  namespace = 'faqs'

  getJson () {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    return fetch(`${jsonUrl}api/faqs/www/data.json`, requestOptions).then(
      this.handleResponse
    )
  }

  handleResponse (response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
      if (response.status === 401) {
        authService.logout()
        location.reload()
      }

      return data
    })
  }
}

export const faqService = new FAQService()
