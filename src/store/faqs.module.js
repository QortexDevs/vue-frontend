import { faqService } from '../services'

export const faqs = {
  namespaced: true,
  state: {
    faq_json: null
  },
  actions: {
    async getJson ({ commit }) {
      commit('getJsonRequest')
      faqService.getJson().then(
        payload => commit('getJsonSuccess', payload),
        error => commit('getJsonFailure', error)
      )
    },

    toggle ({ commit }, index) {
      commit('toggleFaq', index)
    }
  },
  mutations: {
    getJsonRequest (state, payload) {},
    getJsonSuccess (state, payload) {
      payload.faq_sections[0].questions.forEach(el => {
        el.answer_text = el.answer_text.replace(/\r?\n|\r/g, "<br>");
      })

      state.faq_json = payload
    },
    getJsonFailure (state, error) {},

    toggleFaq (state, index) {
      let questionActive = state.faq_json.faq_sections[0].questions[index].isActive

      state.faq_json.faq_sections[0].questions.forEach(el => {
        el.isActive = false
      })

      state.faq_json.faq_sections[0].questions[index].isActive = !questionActive
    }
  },
  getters: {
    getFaq (state) {
      return state.faq_json
    }
  }
}