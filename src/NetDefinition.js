export default class NetDefinition {
  constructor(inputsCount, outputsCount) {
    this.inputsCount = inputsCount
    this.outputsCount = outputsCount
    this.connectionTable = new Array(inputsCount + outputsCount).fill(0).map(() => [])
    this.reverseTable = new Array(inputsCount + outputsCount).fill(0).map(() => [])
    this.weightsTable = new Array(inputsCount + outputsCount).fill(0).map(() => [])
    this.perceptronsWeights = new Array(inputsCount + outputsCount).fill(0)
  }

  get inputs() {
    return new Array(this.inputsCount).fill(0).map((_, i) => i)
  }

  get all() {
    return new Array(this.connectionTable.length).fill(0).map((_, i) => i)
  }

  get outputs() {
    return new Array(this.outputsCount).fill(0).map((_, i) => this.inputsCount + i)
  }

  next(from) {
    return this.connectionTable[from]
  }

  previous(to) {
    return this.reverseTable[to]
  }

  weights(from) {
    return this.weightsTable[from]
  }

  value(id) {
    return this.perceptronsWeights[id]
  }

  addPerceptrons(count) {
    const startIndex = this.perceptronsWeights.length
    const ids = new Array(count).fill(0).map((_, i) => startIndex + i)
    this.connectionTable = this.connectionTable.concat(new Array(count).fill(0).map(() => []))
    this.reverseTable = this.reverseTable.concat(new Array(count).fill(0).map(() => []))
    this.weightsTable = this.weightsTable.concat(new Array(count).fill(0).map(() => []))
    this.perceptronsWeights = this.perceptronsWeights.concat(new Array(count).fill(0).map(() => Math.random() - 0.5))
    return ids
  }

  connect(from, to) {
    from.forEach((i) => {
      to.forEach((j) => {
        this.connectionTable[i].push(j)
        this.reverseTable[j].push(i)
        this.weightsTable[i].push(Math.random() - 0.5)
      })
    })
  }
}