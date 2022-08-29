const prettyJoin = (input, basicJoin = ', ', finalJoin = ' & ') => {
  if (!Array.isArray(input)) return input;

  if (input.length === 1) return input;

  const terminalPair = input.slice(input.length-2, input.length).join(finalJoin);
  if (input.length === 2) return terminalPair;

  const output = [...input.slice(0, input.length-2), terminalPair].join(basicJoin);

  return output;
}

module.exports = prettyJoin;
