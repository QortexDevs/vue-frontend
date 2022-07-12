import { participantService } from '../services'

export const participants = {
  namespaced: true,
  state: {
    id: null,
    current: null,
    answer: {}
  },
  actions: {
    setId ({ dispatch, commit }, data) {
      window.localStorage.setItem('userId', data)
      commit('setIdSuccess', data)
    },
    update ({ dispatch, commit }, data) {
      commit('updateRequest', data)
      participantService.update(data).then(
        file => {
          commit('updateSuccess', file)
        },
        error => {
          commit('updateFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
    },
    init ({ commit }, alfabankUserId) {
      commit('initRequest')
      participantService.init(alfabankUserId).then(
        current => commit('initSuccess', current),
        error => commit('initFailure', error)
      )
    },
    saveShare ({ dispatch, commit }, data) {
      commit('saveShareRequest', data)
      participantService.saveShare(data).then(
        file => {
          commit('saveShareSuccess', file)
        },
        error => {
          commit('saveShareFailure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
    },
    acceptPlus1 ({ dispatch, commit }, data) {
      commit('acceptPlus1Request', data)
      participantService.acceptPlus1(data).then(
        file => {
          commit('acceptPlus1Success', file)
        },
        error => {
          commit('acceptPlus1Failure', error)
          dispatch('alert/error', error, { root: true })
        }
      )
    },

    saveAnswer ({ dispatch, commit }, payload) {
      commit('saveAnswerRequest', payload)
      return participantService.saveAnswer(payload).then(
        payload => {
          commit('saveAnswerSuccess', payload)
        },
        error => {
          commit('saveAnswerFailure', error)
        }
      )
    },
  },
  mutations: {
    updateRequest (state, payload) {},
    updateSuccess (state, payload) {},
    updateFailure (state, error) {},
    initRequest (state, payload) {},
    initSuccess (state, payload) {
      state.current = payload
    },
    setIdSuccess (state, payload) {
      state.id = payload
    },
    initFailure (state, error) {},
    getWinnersRequest (state, payload) {},
    getWinnersSuccess (state, payload) {
      state = payload
    },
    getWinnersFailure (state, error) {},
    saveShareRequest (state, payload) {},
    saveShareSuccess (state, payload) {},
    saveShareFailure (state, error) {},
    acceptPlus1Request (state, payload) {},
    acceptPlus1Success (state, payload) {},
    acceptPlus1Failure (state, error) {},
    saveAnswerRequest (state, payload) {},
    saveAnswerSuccess (state, payload) {
      state.answer.correct = payload.correct
      state.answer.correctAnswer = payload.correct_answer_id
      state.answer.statistics = payload.statistics
    },
    saveAnswerFailure (state, error) {},
  },
  getters: {
    getQuiz (state) {
      return state.current
    },

    getAnswer (state) {
      return state.answer
    }
  }
}