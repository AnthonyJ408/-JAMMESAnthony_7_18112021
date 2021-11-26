import Api from '@/services/api'

export default {
  signup (credentials) {
    return Api().post('signup', credentials)
  }
}
