import { AxiosPromise } from 'axios'
import { baseURL, http } from '@/api/requests/httpAxios'
import _ from 'lodash'

export type DefFilter = { [k: string]: any }
export function createURLParams(
  filter?: DefFilter | null,
  extendFilter = true
) {
  const params = new URLSearchParams()
  if (filter) {
    if (extendFilter) {
      for (const [key, value] of Object.entries(filter)) {
        params.append(key, _.isString(value) ? value : JSON.stringify(value))
      }
    } else {
      params.append('filter', JSON.stringify(filter))
    }
  }
  return params
}

export default class UserAPI {
  public static getAccidentOfPerson(id: number): AxiosPromise {
    return http.get(`${baseURL}/accidents/personal/${id}`)
  }

  public static getAccidents(
    filter: { [k: string]: any } | null
  ): AxiosPromise {
    const params = createURLParams(filter)
    return http.get(`${baseURL}/accidents`, { params })
  }

  public static getAccidentsDate(start: string, end: string): AxiosPromise {
    const params = new URLSearchParams()
    params.append('start', start)
    params.append('end', end)
    return http.get(`${baseURL}/accidents/date`, { params })
  }

  public static deleteAccident(id: number): AxiosPromise {
    return http.delete(`${baseURL}/accidents/delete/${id}`)
  }

  public static deletePerson(id: number): AxiosPromise {
    return http.delete(`${baseURL}/people/delete/${id}`)
  }

  public static getPeople(): AxiosPromise {
    return http.get(`${baseURL}/people`)
  }
}
