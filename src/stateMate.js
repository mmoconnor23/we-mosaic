/* eslint class-methods-use-this: 0 */

class StateMate {
  getPageID () {
    return this.pageID
  }

  setUserID (id) {
    this.userID = id
  }

  getUserID () {
    return this.userID
  }
}

/* eslint-disable */
export let stateMate = new StateMate()
