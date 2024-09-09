export class UserCelularAlreadyExistsError extends Error {
    constructor() {
        super('O celular digitado já existe')
    }
}