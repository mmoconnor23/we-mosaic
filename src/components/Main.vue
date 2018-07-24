<template>
  <div class="main">
    <input type="button"
           value="FB: Log Out"
           v-on:click="logout"/>

    <div class="hello">
      Hello, {{name}}!
    </div>

    <div class="account-select">
      <b-form-select v-model="selectedFacebookBusinessAccount"
                    class="mb-3">
        <option :value="null">Select a Business Account</option>
        <option v-for="account in facebookBusinessAccounts"
                :key="account.id"
                :value="account">{{account.name}}</option>
      </b-form-select>

      <b-button v-on:click="selectFacebookBusinessAccount">Set Account</b-button>
    </div>

    <div v-if="error">Cannot connect to Instagram business account.</div>

    <div class="account-photos main"
         v-if="instagramBusiness.id">
      <div class="submissions">Photos {{instagramBusiness.id}} is tagged in</div>
      <div class="all-photos">
        <div class="photo-card"
            v-for="photo in photos"
            :key="photo.id">
          <img class="insta-image"
              :src="photo.src"/>
          <div class="photo-meta">
            <div>Submitter: {{photo.submitter}}</div>
            <div>Date: {{photo.date}}</div>
            <div>Hashtag: {{photo.hashtag}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stateMate } from '../stateMate'

export default {
  name: 'Main',
  data () {
    return {
      userId: stateMate.getUserID(),
      error: false,
      facebookBusinessAccounts: [],
      instagramBusiness: {},
      name: '',
      photos: [{
        src: require('../assets/Headshot.jpg'),
        id: 0,
        submitter: 'Melissa O\'Connor',
        date: Date.now(),
        hashtag: '#FactSetHackathon2018'
      }, {
        src: require('../assets/Kitten.jpg'),
        id: 1,
        submitter: 'Aslesha Pansare',
        date: Date.now(),
        hashtag: '#FactSetHackathon2018'
      }, {
        src: require('../assets/Sleeping.jpg'),
        id: 2,
        submitter: 'Aslesha Pansare',
        date: Date.now(),
        hashtag: '#FDSatGHC'
      }, {
        src: require('../assets/Tongue.jpg'),
        id: 3,
        submitter: 'Melissa O\'Connor',
        date: Date.now(),
        hashtag: '#BeTheAdvantage'
      }],
      selectedFacebookBusinessAccount: {}
    }
  },
  methods: {
    init () {
      // eslint-disable-next-line
      FB.api('/me', (response) => {
        this.name = response.name
      })

      // This will get the accounts related to this user id
      // eslint-disable-next-line
      FB.api(`/${stateMate.getUserID()}/accounts`, (response) => {
        this.facebookBusinessAccounts = response.data
      })
    },
    logout () {
      // eslint-disable-next-line
      FB.api(`/${stateMate.getUserID()}/permissions`, 'delete', (resp) => {
        this.$router.push({name: 'Login'})
      })
    },
    selectFacebookBusinessAccount () {
      // eslint-disable-next-line
      FB.api(`/${this.selectedFacebookBusinessAccount.id}?fields=instagram_business_account`, (response) => {
        if (response.error) {
          this.error = true
        } else {
          this.error = false
          this.instagramBusiness = response

          // TODO: get mentioned media
          // eslint-disable-next-line
          // FB.api(`/${this.instagramBusiness.id}?fields=mentioned_media`, (response) => {
          //   console.log(response)
          // })
        }
      })
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
  height: 50px;
  width: 100%;
  background-color: lightblue;
  text-align: center;
  vertical-align: middle;
  line-height: 50px;
}

.submissions:hover {
  background-color: rgb(111, 202, 233);
  color: white;
}

.insta-image {
  border: 1px solid black;
  display: inline-block;
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: 50% 50%;
}

.photo-card {
  display: flex;
}

.photo-meta {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.account-select {
  display: flex;
  height: 38px;
}

.account-photos {
  padding-top: 10px;
}
</style>
