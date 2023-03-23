import CouponRepository from "../../../domain/repository/CouponRepository";
import Coupon from "../../../domain/entity/coupon/Coupon";
import Connection from "../../database/Connection";

export default class CouponDatabaseRepository implements CouponRepository {
    constructor(private readonly connection: Connection) {}

    async findById(id: string): Promise<Coupon | undefined> {
        const [couponData] = await this.connection.query("select * from coupon where code = $1", [id]);
        if (!couponData) return undefined;
        const {code, percentage, expire_date} = couponData;
        return new Coupon(code, percentage, expire_date);
    }
}
