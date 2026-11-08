export interface AlbumMedia {
    url: string
    type: "photo" | "video"
}

export interface MediaType {
    id: number
    url?: string
    selected?: boolean
    isVideo?: boolean
    changeSelected: Function
    zoomMode: number
}