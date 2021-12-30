import PgPromiseConnectionAdapter from "../../src/infra/repository/database/PgPromiseConnectionAdapter";

export default () => new PgPromiseConnectionAdapter('postgres://dbuser:dbpass@localhost:5432/app');
