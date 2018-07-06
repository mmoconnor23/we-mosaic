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
export default {
  name: 'HelloWorld',
  data () {
    return {
      status: 'unknown'
    }
  },
  methods: {
    login () {
      // eslint-disable-next-line
      FB.login((response) => {
        console.log(response)
        if (response.status === 'connected') {
          alert('login success')
          this.status = 'in'
          this.token = response.authResponse.accessToken
        } else {
          alert('fail')
        }
      }, {scope: 'user_posts,user_photos'})
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
