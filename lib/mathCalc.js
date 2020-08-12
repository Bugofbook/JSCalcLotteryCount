/**
* [5,40,20,...] => 5 * 40 * 20 * ...
* @param {[Number]} Arr
* 一串整數的陣列
* @returns
* 各整數的乘積
*/
function ProductArrayNumber (Arr = [1]) {
  return Arr.reduce((pre, cur) => pre * cur, 1)
}
/**
* nPr => invokePermutation(n,r)
* @param {Number} n
* @param {Number} r
*/
function invokePermutation (n, r) {
  if (n < r) {
    return 0
  }
  let num = 1
  let count = n
  for (let i = r; i > 0; i -= 1) {
    num *= count
    count -= 1
  }
  return num
}
/**
* nCr => invokeCombination(n,r)
* @param {Number} n
* @param {Number} r
*/
function invokeCombination (n, r) {
  if (n < r) {
    return 0
  }
  if (n === r) {
    return 1
  }
  return invokePermutation(n, r) / invokePermutation(r, r)
}

module.exports = {
  ProductArrayNumber,
  invokePermutation,
  invokeCombination
}
