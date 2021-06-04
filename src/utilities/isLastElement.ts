function isLastElement(index: number, data: number | any[]) {
  if (typeof data === 'object') {
    return index === data.length - 1;
  }
  return index === data - 1;
}

export { isLastElement };
