function convertToPercentage(value) {
  const scaledValue = Number(value) / Math.pow(10, 27);
  return (scaledValue * 100).toFixed(2); // Keeping two decimal places for readability
}

export { convertToPercentage };
