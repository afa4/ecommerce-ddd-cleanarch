import Order from '../../../domain/entity/order/Order'

export default class OrderPlacedEvent {
  constructor(private readonly order: Order){}
}