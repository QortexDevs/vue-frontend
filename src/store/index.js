import * as Vue from 'vue'
import { createStore } from 'vuex'
import { faqs } from './faqs.module'
import { participants } from './participants.module'
import { quizes } from './quizes.module'

export const store = createStore({
  modules: {
    faqs,
    participants,
    quizes,
  }
})
