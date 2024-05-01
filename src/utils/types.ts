
interface SelectedNumber {
    firstField: Field
    secondField: Field

}
export type Field = number[];

export type GameState = "inProgress" | "win" | "lose";

export interface ResultRequestData {
    selectedNumber: SelectedNumber
    isTicketWon: boolean
}

export interface LoadingState {
    error: boolean
    loading: boolean
    message: string
}

export interface WinningCondition {
    firstField: number
    secondField: number
}