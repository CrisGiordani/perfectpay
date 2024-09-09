export class CompanyCnpjAlreadyExistsError extends Error {
  constructor() {
    super('O CNPJ digitado já existe')
  }
}
