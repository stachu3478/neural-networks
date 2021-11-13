/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Net.js":
/*!********************!*\
  !*** ./src/Net.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Net)\n/* harmony export */ });\nclass Net {\r\n  constructor(netDefinition) {\r\n    this.netDefinition = netDefinition\r\n    this.stateTable = netDefinition.all.map(() => 0)\r\n  }\r\n\r\n  forward(inputValues) {\r\n    this.readyTable = this.netDefinition.all.map(() => false)\r\n    inputValues.forEach((v, id) => {\r\n      this.readyTable[id] = true\r\n      this.stateTable[id] = v\r\n    })\r\n    return this.netDefinition.outputs.map((id) => this._result(id))\r\n  }\r\n\r\n  _result(id) {\r\n    if (this.netDefinition.value(id) === undefined) {\r\n      throw new Error('value index ouf of range')\r\n    }\r\n    return this.stateTable[id] = this.netDefinition.previous(id).reduce((sum, prevId) => {\r\n      if (!this.readyTable[prevId]) {\r\n        this._result(prevId)\r\n        this.readyTable[prevId] = true\r\n      }\r\n      const weightIndex = this.netDefinition.next(prevId).findIndex((nextId) => nextId === id)\r\n      if (weightIndex === -1) {\r\n        console.log(this.netDefinition.previous(id), this.netDefinition.next(prevId), prevId, id)\r\n        throw new Error('next index out of range')\r\n      }\r\n      if (this.netDefinition.weights(prevId)[weightIndex] === undefined) {\r\n        throw new Error('weight index out of range')\r\n      }\r\n      if (this.stateTable[id] === undefined) {\r\n        throw new Error('state table index out of range')\r\n      }\r\n      if (isNaN(sum + this.netDefinition.weights(prevId)[weightIndex] * this.stateTable[id] )) {\r\n        console.log(sum, this.netDefinition.weights(prevId)[weightIndex], this.stateTable[id] )\r\n        throw new Error('NaN idk')\r\n      }\r\n      return sum + this.netDefinition.weights(prevId)[weightIndex] * this.stateTable[id] \r\n    }, 0) + this.netDefinition.value(id)\r\n  }\r\n}\n\n//# sourceURL=webpack://neural_networks/./src/Net.js?");

/***/ }),

/***/ "./src/NetDefinition.js":
/*!******************************!*\
  !*** ./src/NetDefinition.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NetDefinition)\n/* harmony export */ });\nclass NetDefinition {\r\n  constructor(inputsCount, outputsCount) {\r\n    this.inputsCount = inputsCount\r\n    this.outputsCount = outputsCount\r\n    this.connectionTable = new Array(inputsCount + outputsCount).fill(0).map(() => [])\r\n    this.reverseTable = new Array(inputsCount + outputsCount).fill(0).map(() => [])\r\n    this.weightsTable = new Array(inputsCount + outputsCount).fill(0).map(() => [])\r\n    this.perceptronsWeights = new Array(inputsCount + outputsCount).fill(0)\r\n  }\r\n\r\n  get inputs() {\r\n    return new Array(this.inputsCount).fill(0).map((_, i) => i)\r\n  }\r\n\r\n  get all() {\r\n    return new Array(this.connectionTable.length).fill(0).map((_, i) => i)\r\n  }\r\n\r\n  get outputs() {\r\n    return new Array(this.outputsCount).fill(0).map((_, i) => this.inputsCount + i)\r\n  }\r\n\r\n  next(from) {\r\n    return this.connectionTable[from]\r\n  }\r\n\r\n  previous(to) {\r\n    return this.reverseTable[to]\r\n  }\r\n\r\n  weights(from) {\r\n    return this.weightsTable[from]\r\n  }\r\n\r\n  value(id) {\r\n    return this.perceptronsWeights[id]\r\n  }\r\n\r\n  addPerceptrons(count) {\r\n    const startIndex = this.perceptronsWeights.length\r\n    const ids = new Array(count).fill(0).map((_, i) => startIndex + i)\r\n    this.connectionTable = this.connectionTable.concat(new Array(count).fill(0).map(() => []))\r\n    this.reverseTable = this.reverseTable.concat(new Array(count).fill(0).map(() => []))\r\n    this.weightsTable = this.weightsTable.concat(new Array(count).fill(0).map(() => []))\r\n    this.perceptronsWeights = this.perceptronsWeights.concat(new Array(count).fill(0).map(() => Math.random() - 0.5))\r\n    return ids\r\n  }\r\n\r\n  connect(from, to) {\r\n    from.forEach((i) => {\r\n      to.forEach((j) => {\r\n        this.connectionTable[i].push(j)\r\n        this.reverseTable[j].push(i)\r\n        this.weightsTable[i].push(Math.random() - 0.5)\r\n      })\r\n    })\r\n  }\r\n}\n\n//# sourceURL=webpack://neural_networks/./src/NetDefinition.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NetDefinition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NetDefinition */ \"./src/NetDefinition.js\");\n/* harmony import */ var _Net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Net */ \"./src/Net.js\");\n\r\n\r\n\r\nconst xorNetDef = new _NetDefinition__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, 1)\r\nconst hiddenLayerIds = xorNetDef.addPerceptrons(3)\r\nxorNetDef.connect(xorNetDef.inputs, hiddenLayerIds)\r\nxorNetDef.connect(hiddenLayerIds, xorNetDef.outputs)\r\nconst xorNet = new _Net__WEBPACK_IMPORTED_MODULE_1__[\"default\"](xorNetDef)\r\n\r\nfunction randArray(n) {\r\n  return new Array(n).fill(0).map(_ => Math.random() - 0.5)\r\n}\r\nconst hiddenLayer = new Array(3).fill(0)\r\nconst hiddenLayerCoercion = new Array(3).fill(0)\r\nconst hiddenPerceptrons = randArray(3)\r\nconst layerWeights = [\r\n  [randArray(3), randArray(3)],\r\n  [randArray(1), randArray(1), randArray(1)],\r\n]\r\nconst layerWeightsCoercion = [\r\n  [randArray(3), randArray(3)],\r\n  [randArray(1), randArray(1), randArray(1)],\r\n]\r\nlet resultLayer = 0\r\nconst x1 = document.getElementsByName('x1')[0]\r\nconst x2 = document.getElementsByName('x2')[0]\r\nconst y = document.getElementsByName('y')[0]\r\nconst ys = document.getElementsByName('ys')[0]\r\nconst xorGainInput = document.getElementsByName('xorGain')[0]\r\ndocument.getElementById('forward').addEventListener('click', () => {\r\n  xorGainInput.value = xorGain()\r\n  const result = xorNet.forward([parseFloat(x1.value), parseFloat(x2.value)])[0]\r\n  y.value = resultLayer = result\r\n})\r\nconst trainSpeed = 0.1\r\nfunction backward(yStar) {\r\n  layerWeights[1].forEach((val, i) => {\r\n    const coercion = (trainSpeed * val[0] * (yStar - resultLayer))\r\n    //console.log(coercion, yStar, resultLayer, val[0])\r\n    val[0] += layerWeightsCoercion[1][i][0] = coercion\r\n    hiddenLayerCoercion[i] /*+*/= coercion\r\n  })\r\n  hiddenLayer.forEach((_, i) => {\r\n    hiddenPerceptrons[i] += hiddenLayerCoercion[i]\r\n    //console.log(hiddenLayerCoercion[i])\r\n  })\r\n  layerWeights[0].forEach((val, i) => {\r\n    val.forEach((v, j) => {\r\n      const coercion = v * hiddenLayerCoercion[j]\r\n      val[j] += layerWeightsCoercion[0][i][j] = coercion\r\n      // no more hidden layers - not coercing input\r\n    })\r\n  })\r\n  //console.log(layerWeights, hiddenPerceptrons, ' by ', layerWeightsCoercion, hiddenLayerCoercion)\r\n}\r\ndocument.getElementById('backward').addEventListener('click', () => {\r\n  backward(parseFloat(ys.value))\r\n  xorGainInput.value = xorGain()\r\n  const result = xorNet.forward([parseFloat(x1.value), parseFloat(x2.value)])\r\n  y.value = resultLayer = result\r\n})\r\nfunction xorGain() {\r\n  return -Math.abs(xorNet.forward([0, 1]) - 1) - Math.abs(xorNet.forward([1, 0]) - 1) - Math.abs(xorNet.forward([1, 1])) - Math.abs(xorNet.forward([0, 0]))\r\n}\r\nfunction train() {\r\n  for (let i = 0; i < 1000000; i++) {\r\n    xorNet.forward([0, 1])\r\n    backward(1)\r\n    xorNet.forward([1, 0])\r\n    backward(1)\r\n    xorNet.forward([0, 0])\r\n    backward(0)\r\n    xorNet.forward([1, 1])\r\n    backward(0)\r\n    gain = xorGain()\r\n    if (isNaN(gain)) {\r\n      return\r\n    }\r\n    xorGainInput.value = gain\r\n  }\r\n}\r\nfunction randomSearch() {\r\n  const currentGain = xorGain()\r\n  const randomPerceptronCoercion = randArray(3)\r\n  const randomLayerWeightsCoercion = [\r\n    [randArray(3), randArray(3)],\r\n    [randArray(1), randArray(1), randArray(1)],\r\n  ]\r\n  randomPerceptronCoercion.forEach((v, i) => {\r\n    hiddenPerceptrons[i] += v\r\n  })\r\n  randomLayerWeightsCoercion.forEach((v, i) => {\r\n    v.forEach((u, j) => {\r\n      u.forEach((x, k) => {\r\n        layerWeights[i][j][k] += x\r\n      })\r\n    })\r\n  })\r\n  const newGain = xorGain()\r\n  if (newGain <= currentGain) {\r\n    randomPerceptronCoercion.forEach((v, i) => {\r\n      hiddenPerceptrons[i] -= v\r\n    })\r\n    randomLayerWeightsCoercion.forEach((v, i) => {\r\n      v.forEach((u, j) => {\r\n        u.forEach((x, k) => {\r\n          layerWeights[i][j][k] -= x\r\n        })\r\n      })\r\n    })\r\n  }\r\n}\r\n\r\ndocument.getElementById('randomSearch').addEventListener('click', () => {\r\n  randomSearch()\r\n  xorGainInput.value = xorGain()\r\n  const result = xorNet.forward([parseFloat(x1.value), parseFloat(x2.value)])\r\n  y.value = resultLayer = result\r\n})\r\n\r\ndocument.getElementById('train').addEventListener('click', () => {\r\n  train()\r\n})\n\n//# sourceURL=webpack://neural_networks/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;