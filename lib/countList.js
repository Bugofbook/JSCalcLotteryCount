/**
 * 暴力生成組選結果的陣列
 * @param {Array<Array<Number>>} startArr
 * 原陣列
 * @param {Array<Array<Number>>} optionArr
 * 要在陣列的第一個值增加的號碼的陣列
 * @returns {Array<Array<NUmber>>}
 * ex: [...,[2,9],[3,3],...] => [...,[0,2,9],[1,2,9],[0,3,3],[1,3,3],[2,3,3],[3,3,3],...]
 */
function createSelectAmountArr ({ optionArr = [], startArr = [] }) {
  return optionArr.flatMap((firstNumber) => {
    const filterSubArr = startArr.filter((oldArr) => oldArr[0] >= firstNumber)
    return filterSubArr.map((oldArr) => [firstNumber, ...oldArr])
  })
}
/**
 * 暴力生成直選結果的陣列
 * @param {Array<Array<Number>>} startArr
 * 原陣列
 * @param {Array<Array<Number>>} optionArr
 * 要在陣列的第一個值增加的號碼的陣列
 * @returns {Array<Array<NUmber>>}
 * ex: [...,[2,9],[3,3],...] =>
 * [...,[0,2,9],[1,2,9],[3,2,9],...,[0,3,3],[1,3,3],[2,3,3],...]
 */

function createAmountArr ({ optionArr = [], startArr = [] }) {
  return optionArr.flatMap((firstNumber) => {
    const filterSubArr = [...startArr]
    return filterSubArr.map((oldArr) => [firstNumber, ...oldArr])
  })
}

/**
 * 暴力計算和值的陣列
 * @param {Array<Array<Number>>} Arr
 * 原陣列
 * @returns {Array<Number>}
 * ex: [...,[2,9],[3,3],...] => [...,11,6,...]
 */
function calcArrSum (Arr = []) {
  return Arr.map((subArr) => subArr.reduce((preSum, curNumber) => preSum + curNumber, 0))
}
/**
 * 暴力計算跨度的陣列
 * @param {Array<Array<Number>>} Arr
 * 原陣列
 * @returns {Array<Number>}
 * ex: [...,[2,0,9],[3,0,3],...] => [...,7,3,...]
 */
function calcArrExtention (Arr = []) {
  return Arr.map((subArr) => Math.max(...subArr) - Math.min(...subArr))
}
/**
 * 分類次數的陣列
 * @param {Array<Number>} Arr
 * @returns {Array<Number>}
 * ex: [0,0,1,1,1,3,3] => [2,3,0,2]
 */
function classifySum (Arr = []) {
  const outPutArr = []
  Arr.forEach((curNumber) => {
    if (Number.isInteger(outPutArr[curNumber])) {
      outPutArr[curNumber] += 1
    } else {
      outPutArr[curNumber] = 1
    }
  })
  return outPutArr
}
/**
 * 利用遞迴來計算組選和值的注數的陣列
 * @param {Array<Array<Number>>} startArr
 * 原陣列
 * @param {Array<Array<Number>>} optionArr
 * 要在陣列的第一個值增加的號碼的陣列
 * @returns {Array<Array<NUmber>>}
 */
function calcSelectAmountArr ({ optionArr = [], startArr = [] }) {
  if (optionArr.length === 0) {
    // [0,0,0],[1,1,1] need filter
    const filterRepeatArr = startArr
      .filter((subArr) => Math.max(...subArr) - Math.min(...subArr) !== 0)
    const sumArr = calcArrSum(filterRepeatArr)
    return classifySum(sumArr)
  }
  const [curArr, ...othersarr] = optionArr
  const newStartArr = createSelectAmountArr({ optionArr: curArr, startArr })
  return calcSelectAmountArr({
    optionArr: othersarr,
    startArr: newStartArr
  })
}
/**
 * 利用遞迴來計算直選和值的注數的陣列
 * @param {Array<Array<Number>>} startArr
 * 原陣列
 * @param {Array<Array<Number>>} optionArr
 * 要在陣列的第一個值增加的號碼的陣列
 * @returns {Array<Array<NUmber>>}
 */
function calcSumArr ({ optionArr = [], startArr = [] }) {
  if (optionArr.length === 0) {
    const sumArr = calcArrSum(startArr)
    return classifySum(sumArr)
  }
  const [curArr, ...othersarr] = optionArr
  const newStartArr = createAmountArr({ optionArr: curArr, startArr })
  return calcSumArr({
    optionArr: othersarr,
    startArr: newStartArr
  })
}
/**
 * 利用遞迴來計算組選跨度的注數的陣列
 * @param {Array<Array<Number>>} startArr
 * 原陣列
 * @param {Array<Array<Number>>} optionArr
 * 要在陣列的第一個值增加的號碼的陣列
 * @returns {Array<Array<NUmber>>}
 */
function calcSelectExtentionArr ({ optionArr = [], startArr = [] }) {
  if (optionArr.length === 0) {
    // [0,0,0],[1,1,1] need filter
    const filterRepeatArr = startArr
      .filter((subArr) => Math.max(...subArr) - Math.min(...subArr) !== 0)
    const sumArr = calcArrExtention(filterRepeatArr)
    return classifySum(sumArr)
  }
  const [curArr, ...othersarr] = optionArr
  const newStartArr = createSelectAmountArr({ optionArr: curArr, startArr })
  return calcSelectExtentionArr({
    optionArr: othersarr,
    startArr: newStartArr
  })
}

/**
 * 利用遞迴來計算直選跨度的注數的陣列
 * @param {Array<Array<Number>>} startArr
 * 原陣列
 * @param {Array<Array<Number>>} optionArr
 * 要在陣列的第一個值增加的號碼的陣列
 * @returns {Array<Array<NUmber>>}
 */
function calcExtentionArr ({ optionArr = [], startArr = [] }) {
  if (optionArr.length === 0) {
    const sumArr = calcArrExtention(startArr)
    return classifySum(sumArr)
  }
  const [curArr, ...othersarr] = optionArr
  const newStartArr = createAmountArr({ optionArr: curArr, startArr })
  return calcExtentionArr({
    optionArr: othersarr,
    startArr: newStartArr
  })
}

/**
 * 計算組選和值的注數陣列
 * @param {*} option
 * 二維陣列，開獎號碼的可能值，每列必須是遞增數列。ex: [[1,2,3],[1,2,3]]
 * @return {Array<Number>}
 * 組選和值的注數陣列，陣列的索引值是和值的總和，對應的元素值是注數
 */
function createSelectSumList (option = []) {
  const [startArr, ...optionArr] = option
  return calcSelectAmountArr({
    optionArr,
    startArr: startArr.map((curNumber) => [curNumber])
  })
}
/**
 * 計算直選和值的注數陣列
 * @param {*} option
 * 二維陣列，開獎號碼的可能值，每列必須是遞增數列。ex: [[1,2,3],[1,2,3]]
 * @return {Array<Number>}
 * 直選和值的注數陣列，陣列的索引值是和值的總和，對應的元素值是注數
 */
function createSumList (option = []) {
  const [startArr, ...optionArr] = option
  return calcSumArr({
    optionArr,
    startArr: startArr.map((curNumber) => [curNumber])
  })
}
/**
 * 計算直選跨度的注數陣列
 * @param {*} option
 * 二維陣列，開獎號碼的可能值，每列必須是遞增數列。ex: [[1,2,3],[1,2,3]]
 * @return {Array<Number>}
 * 直選跨度的注數陣列，陣列的索引值是和值的總和，對應的元素值是注數
 */
function createExtentionList (option = []) {
  const [startArr, ...optionArr] = option
  return calcExtentionArr({
    optionArr,
    startArr: startArr.map((curNumber) => [curNumber])
  })
}
/**
 * 計算組選跨度的注數陣列
 * @param {*} option
 * 二維陣列，開獎號碼的可能值，每列必須是遞增數列。ex: [[1,2,3],[1,2,3]]
 * @return {Array<Number>}
 * 組選跨度的注數陣列，陣列的索引值是和值的總和，對應的元素值是注數
 */
function createSelectExtentionList (option = []) {
  const [startArr, ...optionArr] = option
  return calcSelectExtentionArr({
    optionArr,
    startArr: startArr.map((curNumber) => [curNumber])
  })
}
module.exports = {
  createSelectSumList,
  createSumList,
  createExtentionList,
  createSelectExtentionList
}
