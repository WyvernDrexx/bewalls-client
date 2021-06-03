function isLastElement(index: number, length: number | object[]) {
  if (typeof length === 'object') {
    return index === length.length - 1;
  }
  return index === length - 1;
}

export { isLastElement };
