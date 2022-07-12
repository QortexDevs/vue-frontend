import { ApiObjectService } from './api-object.service'
import { authHeader } from '../helpers'

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL

class ParticipantService extends ApiObjectService {
  namespace = 'participants'

  init (alfabankUserId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    return fetch(
      `${apiUrl}/api/participants/init/${alfabankUserId}/app`,
      requestOptions
    ).then(this.handleResponse)
  }

  update (data) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(
      `${apiUrl}/api/participants/save/${data.alfabank_user_id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  saveShare (data) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(
      `${apiUrl}/api/participants/save-share/${data.alfabank_user_id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  acceptPlus1 (data) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(
      `${apiUrl}/api/participants/accept-plus1/${data.alfabank_user_id}/`,
      requestOptions
      ).then(this.handleResponse)
  }

  saveAnswer (data) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(
      `${apiUrl}/api/participants/save-answer/${data.alfabank_user_id}/`,
      requestOptions
      ).then(this.handleResponse)
  }
}

export const participantService = new ParticipantService()