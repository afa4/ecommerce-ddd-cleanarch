import HttpController from "../HttpController";
import {HttpResponse} from "../HttpResponse";
import FindOrders from "../../../application/query/find-order/FindOrders";
import JsonResponse from "../responses/JsonResponse";

export default class RootController implements HttpController {

    constructor(private readonly findOrdersUseCase: FindOrders) {
    }
    async handle(): Promise<HttpResponse> {
        try {
            const result = await this.findOrdersUseCase.execute();
            return JsonResponse.success(result);
        } catch (e) {
            console.log((e as Error).message);
            return JsonResponse.internalError({})
        }
    }

}