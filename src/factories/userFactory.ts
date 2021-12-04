import { roles } from '@/config/roles/roles'

export default class UserFactory {
  public static emptyText() {
    return {
      text: '',
    }
  }

  public static emptySelects() {
    return {
      accidents: [],
      people: [],
      roles: [],
    }
  }

  public static sendSelects() {
    return {
      accidents: [] as any[],
      person: 0,
      role: roles,
    }
  }

  public static emptyAccident() {
    return {
      accidentId: 0,
      info: '',
      solution: '',
      registerDate: '' as '' | Date,
    }
  }

  public static emptyPerson() {
    return {
      id: 0,
      name: '',
      surname: '',
      midname: '',
      address: '',
      convictNum: Number,
    }
  }
}
