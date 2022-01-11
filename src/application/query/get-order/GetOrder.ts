import UseCase from "../../use-cases/UseCase";
import GetOrderOutput from "./GetOrderOutput";
import Connection from "../../../infra/database/Connection";

export default class GetOrder implements UseCase<string, GetOrderOutput> {

    constructor(private readonly connection: Connection) {
    }

    execute(input: string): Promise<GetOrderOutput> {
        return Promise.resolve(new GetOrderOutput());
    }
}
