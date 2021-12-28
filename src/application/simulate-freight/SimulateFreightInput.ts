export default class SimulateFreightInput {
  constructor(readonly orderItems: { itemId: number, quantity: number }[]) {}
}