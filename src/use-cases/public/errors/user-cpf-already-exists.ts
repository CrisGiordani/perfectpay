export class UserCpfAlreadyExistsError extends Error {
    constructor() {
        super('O CPF digitado já existe')
    }
}