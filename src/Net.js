export default class Net {
  constructor(netDefinition) {
    this.netDefinition = netDefinition
    this.stateTable = netDefinition.all.map(() => 0)
  }

  forward(inputValues) {
    this.readyTable = this.netDefinition.all.map(() => false)
    inputValues.forEach((v, id) => {
      this.readyTable[id] = true
      this.stateTable[id] = v
    })
    return this.netDefinition.outputs.map((id) => this._result(id))
  }

  _result(id) {
    if (this.netDefinition.value(id) === undefined) {
      throw new Error('value index ouf of range')
    }
    return this.stateTable[id] = this.netDefinition.previous(id).reduce((sum, prevId) => {
      if (!this.readyTable[prevId]) {
        this._result(prevId)
        this.readyTable[prevId] = true
      }
      const weightIndex = this.netDefinition.next(prevId).findIndex((nextId) => nextId === id)
      if (weightIndex === -1) {
        console.log(this.netDefinition.previous(id), this.netDefinition.next(prevId), prevId, id)
        throw new Error('next index out of range')
      }
      if (this.netDefinition.weights(prevId)[weightIndex] === undefined) {
        throw new Error('weight index out of range')
      }
      if (this.stateTable[id] === undefined) {
        throw new Error('state table index out of range')
      }
      if (isNaN(sum + this.netDefinition.weights(prevId)[weightIndex] * this.stateTable[id] )) {
        console.log(sum, this.netDefinition.weights(prevId)[weightIndex], this.stateTable[id] )
        throw new Error('NaN idk')
      }
      return sum + this.netDefinition.weights(prevId)[weightIndex] * this.stateTable[id] 
    }, 0) + this.netDefinition.value(id)
  }
}