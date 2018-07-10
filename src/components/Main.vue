<template>
  <div class="main">
    <div class="hello">
      Hello, {{name}}!
    </div>

    <div class="submissions">See my submissions</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    init () {
      // eslint-disable-next-line
      FB.api('/me', (response) => {
        console.log(JSON.stringify(response))
        this.name = response.name
      })
    },
    logout () {
      // FB.api('/userId/permissions') - need to make delete request to here
    }
  },
  beforeMount () {
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

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hello {
  color: rgb(189, 107, 228);
}

.submissions {
  height: 250px;
  width: 250px;
  background-color: lightblue;
  text-align: center;
  vertical-align: middle;
  line-height: 250px;
}

.submissions:hover {
  background-color: rgb(111, 202, 233);
  color: white;
}
</style>
