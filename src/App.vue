<template>
    <router-view />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'app',

    data() {
        return {
            online: true,
            end: false,
        }
    },

    created() {
        if (navigator.onLine) {
            this.online = true
        } else {
            this.online = false
        }

        window.addEventListener('online', () => {
            this.online = true
        })

        window.addEventListener('offline', () => {
            this.online = false
        })

        this.userId = this.getUserIdFromHash()

        if (!this.userId) {
            this.userId = window.localStorage.getItem("userId")
        }

        if (this.userId) {
            this.$store.dispatch("participants/setId", this.userId)
        }

        this.userId = this.getUserIdFromHash()
        this["participants/init"](this.userId)
    },

    methods: {
        ...mapActions([
            'participants/init',
            'participants/setId'
        ]),

        reloadPage() {
            location.reload()
        },

        getUserIdFromHash() {
            const re = /user_id=(.+)$/i
            const location = window.location.hash.toString()
            const userData = location.match(re)
            if (userData) {
                return userData[1]
            }
            return null;
        },
    }
}
</script>

<style>
</style>
