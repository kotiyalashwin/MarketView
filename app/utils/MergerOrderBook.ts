export function mergeOrderBook(
  prev: [string, string][],
  updates: [string, string][]
): [string, string][] {
  const map = new Map(prev);

  for (const [price, qty] of updates) {
    if (parseFloat(qty) === 0) {
      map.delete(price); // remove level
    } else {
      map.set(price, qty); // update or insert level
    }
  }

  // Return sorted top levels
  return Array.from(map.entries()).sort(
    (a, b) => parseFloat(b[0]) - parseFloat(a[0])
  ); // for bids, use reverse for asks
}
