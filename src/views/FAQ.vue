<template>
	<div class="faqs" v-if="getFaqs">
		<div class="container">
			<h1 class="faqs__head">{{getFaqs.faq_sections[0].text}}</h1>
		</div>

		<div class="faqs-body">
			<FaqsItem
				v-for="(faq, i) in getFaqs.faq_sections[0].questions"
				:key="faq.question_text"
				:questionText="faq.question_text"
				:answerText="faq.answer_text"
				:isActive="faq.isActive"
				:index="i"
				@toggle="toggle"
			/>
		</div>
		<div class="faqs-btn-wrapper">
			<button class="btn btn-success faqs-btn" @click="goBack">
				Назад
			</button>
		</div>
	</div>
</template>

<script>
	import FaqsItem from '../components/FaqsItem.vue'
	import {mapActions, mapGetters} from 'vuex'

	export default {
		name: 'FAQ',
		components: {
			FaqsItem
		},

		computed: {
			...mapGetters(['faqs/getFaq']),
			getFaqs () {
				return this.faqs = this['faqs/getFaq']
			}
		},

		created () {
			this['faqs/getJson']()
		},

	    methods: {
	      	...mapActions(['faqs/getJson', 'faqs/toggle']),

	      	toggle (i) {
	      		this['faqs/toggle'](i)
	      	},

	      	goBack () {
	      		this.$router.back()
	      	},
	    }
	}	
</script>