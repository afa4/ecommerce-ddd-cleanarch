import Order from '../../../domain/entity/order/Order'

export default class OrderPlacedEvent {
  constructor(readonly order: Order){}
}