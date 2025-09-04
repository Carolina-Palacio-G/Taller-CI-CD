function nextId(collection) {
  if (!collection || collection.length === 0) return 1;
  return Math.max(...collection.map(x => Number(x.id))) + 1;
}
module.exports = { nextId };