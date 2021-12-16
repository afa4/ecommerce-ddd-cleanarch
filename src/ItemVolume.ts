export default class ItemVolume {
  public readonly height: number;
  public readonly width: number;
  public readonly length: number;
  public readonly weight: number;
  public readonly m3: number;
  public readonly density: number;
  
  constructor(cmHeight: number = 0, cmWidth: number = 0, cmLength: number = 0, kgWeight: number = 0) {
    this.height = cmHeight / 100;
    this.width = cmWidth / 100;
    this.length = cmLength / 100;
    this.weight = kgWeight;
    this.m3 = this.height * this.width * this.length;
    this.density = this.weight / this.m3;
  }
}