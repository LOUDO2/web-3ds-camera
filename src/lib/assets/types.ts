export interface MediaType {
    id: number
    url?: string
    selected?: boolean
    isVideo?: boolean
    changeSelected: Function
    zoomMode: number
}