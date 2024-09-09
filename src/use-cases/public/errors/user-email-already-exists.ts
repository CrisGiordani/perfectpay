export class UserEmailAlreadyExistsError extends Error {
  constructor() {
    super('O e-mail digitado já existe')
  }
}
