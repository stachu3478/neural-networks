import NetDefinition from './NetDefinition'
import Net from './Net'

const xorNetDef = new NetDefinition(2, 1)
const hiddenLayerIds = xorNetDef.addPerceptrons(3)
xorNetDef.connect(xorNetDef.inputs, hiddenLayerIds)
xorNetDef.connect(hiddenLayerIds, xorNetDef.outputs)
const xorNet = new Net(xorNetDef)

function randArray(n) {
  return new Array(n).fill(0).map(_ => Math.random() - 0.5)
}
const hiddenLayer = new Array(3).fill(0)
const hiddenLayerCoercion = new Array(3).fill(0)
const hiddenPerceptrons = randArray(3)
const layerWeights = [
  [randArray(3), randArray(3)],
  [randArray(1), randArray(1), randArray(1)],
]
const layerWeightsCoercion = [
  [randArray(3), randArray(3)],
  [randArray(1), randArray(1), randArray(1)],
]
let resultLayer = 0
const x1 = document.getElementsByName('x1')[0]
const x2 = document.getElementsByName('x2')[0]
const y = document.getElementsByName('y')[0]
const ys = document.getElementsByName('ys')[0]
const xorGainInput = document.getElementsByName('xorGain')[0]
document.getElementById('forward').addEventListener('click', () => {
  xorGainInput.value = xorGain()
  const result = xorNet.forward([parseFloat(x1.value), parseFloat(x2.value)])[0]
  y.value = resultLayer = result
})
const trainSpeed = 0.1
function backward(yStar) {
  layerWeights[1].forEach((val, i) => {
    const coercion = (trainSpeed * val[0] * (yStar - resultLayer))
    //console.log(coercion, yStar, resultLayer, val[0])
    val[0] += layerWeightsCoercion[1][i][0] = coercion
    hiddenLayerCoercion[i] /*+*/= coercion
  })
  hiddenLayer.forEach((_, i) => {
    hiddenPerceptrons[i] += hiddenLayerCoercion[i]
    //console.log(hiddenLayerCoercion[i])
  })
  layerWeights[0].forEach((val, i) => {
    val.forEach((v, j) => {
      const coercion = v * hiddenLayerCoercion[j]
      val[j] += layerWeightsCoercion[0][i][j] = coercion
      // no more hidden layers - not coercing input
    })
  })
  //console.log(layerWeights, hiddenPerceptrons, ' by ', layerWeightsCoercion, hiddenLayerCoercion)
}
document.getElementById('backward').addEventListener('click', () => {
  backward(parseFloat(ys.value))
  xorGainInput.value = xorGain()
  const result = xorNet.forward([parseFloat(x1.value), parseFloat(x2.value)])
  y.value = resultLayer = result
})
function xorGain() {
  return -Math.abs(xorNet.forward([0, 1]) - 1) - Math.abs(xorNet.forward([1, 0]) - 1) - Math.abs(xorNet.forward([1, 1])) - Math.abs(xorNet.forward([0, 0]))
}
function train() {
  for (let i = 0; i < 1000000; i++) {
    xorNet.forward([0, 1])
    backward(1)
    xorNet.forward([1, 0])
    backward(1)
    xorNet.forward([0, 0])
    backward(0)
    xorNet.forward([1, 1])
    backward(0)
    gain = xorGain()
    if (isNaN(gain)) {
      return
    }
    xorGainInput.value = gain
  }
}
function randomSearch() {
  const currentGain = xorGain()
  const randomPerceptronCoercion = randArray(3)
  const randomLayerWeightsCoercion = [
    [randArray(3), randArray(3)],
    [randArray(1), randArray(1), randArray(1)],
  ]
  randomPerceptronCoercion.forEach((v, i) => {
    hiddenPerceptrons[i] += v
  })
  randomLayerWeightsCoercion.forEach((v, i) => {
    v.forEach((u, j) => {
      u.forEach((x, k) => {
        layerWeights[i][j][k] += x
      })
    })
  })
  const newGain = xorGain()
  if (newGain <= currentGain) {
    randomPerceptronCoercion.forEach((v, i) => {
      hiddenPerceptrons[i] -= v
    })
    randomLayerWeightsCoercion.forEach((v, i) => {
      v.forEach((u, j) => {
        u.forEach((x, k) => {
          layerWeights[i][j][k] -= x
        })
      })
    })
  }
}

document.getElementById('randomSearch').addEventListener('click', () => {
  randomSearch()
  xorGainInput.value = xorGain()
  const result = xorNet.forward([parseFloat(x1.value), parseFloat(x2.value)])
  y.value = resultLayer = result
})

document.getElementById('train').addEventListener('click', () => {
  train()
})