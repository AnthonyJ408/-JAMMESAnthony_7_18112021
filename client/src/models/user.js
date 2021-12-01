export default class User {
  constructor (email, password, lastName, firstName) {
    this.lastName = lastName
    this.firstName = firstName
    this.fullName = firstName + ' ' + lastName
    this.email = email
    this.password = password
  }
}
