export default class ItemVolume {
  public readonly height: number;
  public readonly width: number;
  public readonly length: number;
  public readonly weight: number;
  
  constructor(cmHeight: number = 0, cmWidth: number = 0, cmLength: number = 0, kgWeight: number = 0) {
    this.height = cmHeight / 100;
    this.width = cmWidth / 100;
    this.length = cmLength / 100;
    this.weight = kgWeight;
  }

  getVolume(): number {
    return this.height * this.width * this.length;
  }

  getDensity(): number {
    const volume =  this.getVolume();
    if(volume === 0) return 0;
    return this.weight / this.getVolume();
  }
}
