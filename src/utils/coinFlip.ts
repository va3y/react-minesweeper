export function coinFlip(percentChanceOfTrue: number = 50) {
  return Boolean(Math.random() * 100 <= percentChanceOfTrue);
}
