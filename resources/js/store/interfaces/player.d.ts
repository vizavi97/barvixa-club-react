export interface PlayerDefaultStateInterface {
    players: [] | PlayerFieldsInterface[],
    loader: false,
    error: false,
    message: '',
}
export interface PlayerFieldsInterface {
    id: number,
    name: string,
    surname: string,
    preview_img: string,
    game_number: number,
}