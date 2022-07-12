import { authHeader } from '../helpers'

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export class ApiObjectService {
  namespace

  constructor (namespace) {
    this.namespace = namespace
  }

  create (formData) {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }

    return fetch(
      `${apiUrl}/api/${this.namespace}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  getAll () {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    return fetch(
      `${apiUrl}/api/${this.namespace}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  getById (id) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader()
    }

    return fetch(
      `${apiUrl}/api/${this.namespace}/${id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  update (data) {
    const requestOptions = {
      method: 'PATCH',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    return fetch(
      `${apiUrl}/api/${this.namespace}/${data.id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  delete (id) {
    const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
    }

    return fetch(
      `${apiUrl}/api/${this.namespace}/${id}/`,
      requestOptions
    ).then(this.handleResponse)
  }

  handleResponse (response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text)
      // if (response.status === 401) {
      //   authService.logout()
      //   location.reload()
      // }

      return data
    })
  }
}