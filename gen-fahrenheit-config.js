const allKVPairs = ['heat', 'cool']
  .flatMap(prefix => {
    const tempsF = Array(40 + 1).fill(1).map((x, y) => x + y + 50 - 1);
    const tempsFAndCPairs = tempsF
      .map(tempF => [tempF, (tempF - 32) * 5 / 9])
      .map(([tempF, tempC]) => [tempF, Math.round(tempC * 10) / 10]);
    const dataKVPairs = tempsFAndCPairs
      .map(([tempF, tempC]) => [
        `${prefix}${tempC}`,
        {
          data: `TEMPERATURE_${tempF}F`,
        }
      ]);
    return dataKVPairs;
  });

console.log(
  JSON.stringify(Object.fromEntries(allKVPairs), null, 2)
);
