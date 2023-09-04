import {HttpResponse} from "../HttpResponse";

export default class JsonResponse implements HttpResponse {

    private constructor(private readonly status: number, private readonly body: object) {
    }

    public static success(body: object) {
        return new JsonResponse(200, body);
    }

    public static internalError(body: object) {
        return new JsonResponse(500, body);
    }
    getBody(): string {
        return JSON.stringify(this.body);
    }

    getStatus(): number {
        return this.status;
    }

}