export interface HttpResponse {
    getBody(): string
    getStatus(): number
}