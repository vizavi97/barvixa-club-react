export interface ImageFromBackendInterface {
    content_type: string
    created_at: string | Date
    description: null | string
    disk_name: string
    extension: string
    field: string
    file_name: string
    file_size: number
    id: number
    path: string
    sort_order: number
    title: null | string
    updated_at: string | Date
}