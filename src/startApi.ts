import Api from "./infra/api/Api";
import FindOrders from "./application/query/find-order/FindOrders";
import MySqlConnectionAdapter from "./infra/database/MySqlConnectionAdapter";
import RootController from "./infra/api/controllers/RootController";

const connection = MySqlConnectionAdapter.startDefault();
const useCase = new FindOrders(connection);
const controller = new RootController(useCase);

const api = new Api();
api.setRoute('/', controller);
api.listen();
