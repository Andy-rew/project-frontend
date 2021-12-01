export default class UserFactory {
  public static emptyText() {
    return {
      text: '',
    }
  }

  public static emptyPerson() {
    return {
      name: '',
      surname: '',
      midname: '',
      address: '',
      convictNum: Number,
    }
  }
}
