function rgbToHex(...rgb) {
  return rgb
    .map((n) => ('0' + Math.max(0, Math.min(255, n)).toString(16)).slice(-2)) // 음수 -> 0, 양수 -> 255
    .join('')
    .toUpperCase();
}

function assertEquals(received, expected) {
  if (received !== expected)
    throw new Error(`received: ${received} | expected: ${expected}`);
  console.log('pass: ', { received });
}

assertEquals(rgbToHex(0, 0, 0), '000000');
assertEquals(rgbToHex(0, 0, -20), '000000');
assertEquals(rgbToHex(300, 255, 255), 'FFFFFF');
assertEquals(rgbToHex(173, 255, 47), 'ADFF2F');
