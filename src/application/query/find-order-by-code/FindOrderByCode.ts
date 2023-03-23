import UseCase from "../../use-cases/UseCase";
import FindOrderByCodeOutput from "./FindOrderByCodeOutput";
import Connection from "../../../infra/database/Connection";

export default class FindOrderByCode
  implements UseCase<string, FindOrderByCodeOutput>
{
  constructor(private readonly connection: Connection) {}

  async execute(codeInput: string): Promise<FindOrderByCodeOutput> {
    const [orderData] = await this.connection.query(
      "select * from order_ o where o.code = $1",
      [codeInput]
    );
    if (!orderData) throw Error("Not found");
    const { code, cpf, issue_date } = orderData;
    return Promise.resolve(new FindOrderByCodeOutput(code, cpf, issue_date));
  }
}
