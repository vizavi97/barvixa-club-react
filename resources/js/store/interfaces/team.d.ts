export interface TeamDefaultStateInterface {
    teams: [] | TeamFieldsInterface[],
    loader: boolean,
    error: boolean,
    message: string,
}
export interface TeamFieldsInterface {
    id: number,
    title: string,
    preview_img: string,
}