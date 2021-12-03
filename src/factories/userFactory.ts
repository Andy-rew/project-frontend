export default class UserFactory {
  public static emptyText() {
    return {
      text: '',
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
