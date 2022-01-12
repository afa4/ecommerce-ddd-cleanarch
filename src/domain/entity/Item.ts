import ItemVolume from './ItemVolume';

export default class Item {
  constructor(
    public readonly id: number,
    public readonly description: string,
    public readonly price: number,
    public readonly volume: ItemVolume,
  ) {}
}
