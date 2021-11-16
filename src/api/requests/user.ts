import { AxiosPromise } from 'axios'
import { baseURL, http } from '@/api/requests/httpAxios'

export default class UserAPI {
   public static login(roles: string[]) {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = `${baseURL}/auth`
    } else {
      // Dev
      const params = new URLSearchParams()

      if (roles && roles.length) {
        for (const role of roles) {
          params.append('roles', role)
        }
      } else {
        params.append('roles', '[]')
      }

      window.location.href = `${baseURL}/auth/dev?${params.toString()}`
    }
  }

  public static logout() {
    return http.get('/auth/logout')
  }

  public static changeUser(userId: number) {
    window.location.href = `${baseURL}/auth/dev?userId=${userId}`
  }

  public static getProfile(userId: number) {
    return http.get(`/users/profile?userId=${userId}`)
  }

  public static updateProfile(userId: number, data: any) {
    return http.put(`/users/profile?userId=${userId}`, data)
  }
}
