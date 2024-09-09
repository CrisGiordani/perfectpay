import { StatusUseCase } from "../status"

export function makeStatusUseCase() {
    const useCase = new StatusUseCase()

    return useCase
}