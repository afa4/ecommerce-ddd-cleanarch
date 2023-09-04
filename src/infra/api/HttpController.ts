import {HttpResponse} from "./HttpResponse";

export default interface HttpController {
    handle(): Promise<HttpResponse>;
}