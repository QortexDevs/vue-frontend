<template>
    <div class="content">
        <div class="container">
            <img class="main-statistics-btn" src="../assets/img/stat-btn.svg" @click="goToElement('.statistics')">
            <h1 class="main-head">
                Вопрос <br>на миллион
                <img class="star1" src="../assets/img/star1.svg" alt="">
                <img class="star2" src="../assets/img/star2.svg" alt="">
            </h1>
            <p class="paragraph-main">
                Заходите в игру каждый день, отвечайте на вопросы и выигрывайте деньги
            </p>
            <img class="owl" src="../assets/img/owl.png" alt="">
            <div class="btns">
                <button class="btn btn-empty" @click="goToElement('.regulations')">
                    Правила
                </button>
                <router-link to="/game" class="btn btn-success">
                    Играть
                </router-link>
            </div>
        </div>

        <div class="regulations">
            <div class="container">
                <h2 class="regulations__head">Как играть?</h2>
                <div class="regulations__box">
                    <div class="regulations__decorate">
                        <img class="regulations__star1" src="../assets/img/star4.svg" alt="">
                        <img class="regulations__star2" src="../assets/img/star5.svg" alt="">
                    </div>
                    <h3 class="regulations__subhead">
                        Отвечайте <br>на вопросы
                    </h3>
                    <p class="regulations__paragraph">
                        Три вопроса каждый день — разного уровня сложности, на время и эрудицию.
                    </p>
                </div>
                <div class="regulations__box">
                    <h3 class="regulations__subhead">
                        Выигрывайте <br>деньги
                    </h3>
                    <p class="regulations__paragraph">
                        Разыгрываем 10 призов по 100 000 ₽ среди самых быстрых и догадливых. Деньги придут на счёт до 30
                        сентября.
                    </p>
                </div>
                <div class="regulations__box">
                    <div class="regulations__decorate2 decorate2">
                        <img class="regulations__star3" src="../assets/img/star3.svg" alt="">
                        <img class="regulations__star4" src="../assets/img/star1.svg" alt="">
                    </div>
                    <h3 class="regulations__subhead">
                        Играйте <br>каждый день
                    </h3>
                    <p class="regulations__paragraph">
                        Меняем вопросы ежедневно. Заходите в игру чаще — будет больше шансов выиграть деньги.
                    </p>
                </div>
                <div class="regulations__box">
                    <div class="regulations__decorate2 decorate3">
                        <img class="regulations__star3" src="../assets/img/star3.svg" alt="">
                        <img class="regulations__star4" src="../assets/img/star1.svg" alt="">
                    </div>
                    <h3 class="regulations__subhead">
                        Расскажите <br>друзьям
                    </h3>
                    <p class="regulations__paragraph">
                        Поделитесь результатом и получите дополнительную попытку. Её можно использовать только раз за
                        всю игру.
                    </p>
                </div>
                <div class="statistics">
                    <div class="statistics__head">
                        Статистика
                    </div>
                    <div class="statistics__decorate">
                        <img class="statistics__star1" src="../assets/img/star2.svg" alt="">
                        <img class="statistics__star2" src="../assets/img/star6.svg" alt="">
                    </div>

                    <Statistics :countGame="getQuiz.statistics.round_count"
                        :rightAnswers="getQuiz.statistics.correct_answers"
                        :winRate="getQuiz.statistics.correct_percents" />
                </div>
                <router-link to="/game" class="btn btn-success regulations__btn">
                    Играть
                </router-link>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <router-link class="footer__link" to="/faqs">Частые вопросы</router-link>
            </div>
        </footer>
    </div>
</template>

<script>
import Statistics from '../components/Statistics.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Main',
    components: {
        Statistics
    },

    computed: {
        ...mapGetters(['participants/getQuiz']),
        getQuiz() {
            return this['participants/getQuiz']
        }
    },

    methods: {
        goToElement(element) {
            const elementTo = document.querySelector(element)
            elementTo.scrollIntoView({ block: 'start', inline: 'center', behavior: 'smooth' })
        }
    }
}
</script>

<style>
</style>