import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";

export default () => new PgPromiseConnectionAdapter('postgres://dbuser:dbpass@localhost:5432/app');
