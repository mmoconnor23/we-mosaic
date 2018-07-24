<template>
  <div class="hello">
    <input type="button"
           value="FB: Log In"
           v-on:click="login"/>
  </div>
</template>

<script>
import { stateMate } from '../stateMate'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    init () {
      // eslint-disable-next-line
      FB.getLoginStatus((response) => {
        // response.status can be 'connected', 'not_authorized', 'unknown'
        if (response.status !== 'connected') {
          this.login()
        } else {
          /**
           * authResponse: {
           *   accessToken: '',
           *   expiresIn: 'UNIX time',
           *   signedRequest: '',
           *   userID: '',
           * }
           */
          stateMate.setUserID(response.authResponse.userID)
          this.$router.push({name: 'Main'})
        }
      })
    },
    login () {
      // eslint-disable-next-line
      FB.login((response) => {
        if (response.status === 'connected') {
          stateMate.setUserID(response.authResponse.userID)
          this.$router.push({name: 'Main'})
        } else {
          alert('fail')
        }
      }, {scope: 'user_posts,user_photos,manage_pages,pages_show_list'})
    }
  },
  beforeUpdate () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
