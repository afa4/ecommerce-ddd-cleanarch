import Item from '../../src/domain/Item';
import ItemVolume from '../../src/domain/ItemVolume';

test('should create item', () => {
  const volume = new ItemVolume(20, 15, 10, 1);
  expect(new Item("1", "Camera", 50, volume)).toBeTruthy();
});

test('should calculate volume in m3 based on dimensions', () => {
  const volume = new ItemVolume(20, 15, 10, 1);
  expect(volume.getVolume()).toBe(0.003);
});

test('should calculate density based on volume and weight', () => {
  const volume = new ItemVolume(20, 15, 10, 1);
  expect(volume.getDensity()).toBeCloseTo(333.33);
});
