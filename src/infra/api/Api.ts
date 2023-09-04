import express, {Express} from 'express';
import HttpController from "./HttpController";

export default class Api {
    constructor(private readonly port = 3000, private readonly exp: Express = express()) {
    }

    public setRoute(resource: string, controller: HttpController) {
        this.exp.get(resource, async (req, res) => {
            const response = await controller.handle();
            res.status(response.getStatus()).send(response.getBody());
        })
    }

    public listen() {
        this.exp.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        })
    }
}