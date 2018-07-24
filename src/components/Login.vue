<template>
  <div class="hello">
    <input type="button"
           value="FB: Log In"
           v-on:click="login"/>

    <input type="button"
           value="FB: Log Out"
           v-on:click="logout"/>

    <div>{{status}}</div>
  </div>
</template>

<script>
import { stateMate } from '../stateMate'
export default {
  name: 'Login',
  data () {
    return {
      status: 'unknown'
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
          this.status = 'in'
          this.authResponse = response.authResponse
          stateMate.setUserID(response.authResponse.userID)

          this.$router.push('main')
        }
      })
    },
    login () {
      // eslint-disable-next-line
      FB.login((response) => {
        if (response.status === 'connected') {
          alert('login success')
          this.status = 'in'
          this.token = response.authResponse.accessToken
        } else {
          alert('fail')
        }
      }, {scope: 'user_posts,user_photos,manage_pages,pages_show_list', auth_type: 'rerequest'})
    },
    logout () {
      // eslint-disable-next-line
      FB.logout((response) => {
        if (response.status === 'connected') {
          alert('logout success')
          this.status = 'out'
        } else {
          alert('fail')
        }
      })
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
