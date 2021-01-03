const { invokeCombination } = require('./mathCalc')

/**
 * 可重複號碼，不會組合。
 * @param {Array<Array<Number|String>>} betData
 * 投注資料
 * @return {Number}
 * 這個投注資料的注數
 */
function calcMenu (betData = [[]]) {
  return betData.reduce((preVal, curArr) => preVal + curArr.length, 0)
}

/**
 * 可重複號碼的組合,但暫時沒有玩法用到
 * @param {Array<Array<Number|String>>} betData
 * 投注資料
 * @param {Array<NUmber>} selectCount
 * 形成注單時，每個子陣列選擇的注數所形成的陣列
 * @return {Number}
 * 這個投注資料的注數
 */
function calcRepeatCombine (betData = [[]], selectCount = []) {
  if (betData.length !== selectCount.length) {
    console.error('betData.length do not equal to selectCount.length')
    return 0
  }
  return betData
    .reduce((preVal, curArrs, index) => preVal * invokeCombination(curArrs, selectCount[index]), 1)
}

function createMultiArr (Arr = [], selectCount = 1, Arr1 = [[]]) {
  if (selectCount === 1) {
    return Arr1
  }
  const newArr1 = Arr1.flatMap((eleArr) => {
    const lastIndex = Arr.indexOf(eleArr[eleArr.length - 1])
    return Arr.filter((_, index) => index > lastIndex).map((e) => [...eleArr, e])
  })
  return createMultiArr(Arr, selectCount - 1, newArr1)
}

/**
 * 把傳入的陣列切分成不重複的子陣列
 * @param {Array<Number|String>} Arr
 * 要切分的陣列
 * @param {Nunber} count
 * 毎個子陣列的長度
 * @return {Array<Array<Number|String>>}
 * 二維陣列,內容是不重複的子陣列
 */
function createCombineArr (Arr = [], count = 1) {
  return createMultiArr(Arr, count, Arr.map((e) => [e]))
}

function separateArraysByLimit ([calcData = [[]], selectCount = []] = [], count = 1) {
  const [fArr, sArr, ...othersArr] = calcData
  return createCombineArr(fArr, count).map((element1) => [
    [sArr.filter((element2) => ![...selectCount, ...element1].includes(element2)),
      ...othersArr],
    [...selectCount, ...element1]
  ])
}
/**
 * 不可重複號碼的組合
 * @param {Array<Array<Number|String>>} betData
 * 投注資料
 * @param {Array<NUmber>} selectCount
 * 形成注單時，每個子陣列選擇的注數所形成的陣列
 */
function calcCombine (betData = [[]], selectCount = []) {
  if (betData.length !== selectCount.length) {
    return 0
  }
  if (betData.some((curArr) => curArr.length === 0)) {
    return 0
  }
  if (betData.length === 1) {
    return invokeCombination(betData[0].length, selectCount[0])
  }
  let resultArr = separateArraysByLimit([betData, []], selectCount[0])
  for (let i = 0, ith = Math.max(0, betData.length - 2); i < ith; i += 1) {
    resultArr = resultArr
      .flatMap((element3) => separateArraysByLimit(element3, selectCount[i + 1]))
  }
  return resultArr.reduce((preVal, curArrs) => {
    const combineN = curArrs[0][0].length
    const combineR = selectCount[selectCount.length - 1]
    return preVal + invokeCombination(combineN, combineR)
  }, 0)
}
/**
 * 膽拖組合
 * @param {*} betData
 * @param {*} selectCount
 */
function calcOptionalLocate (betData = [[]], selectCount = []) {
  const firstLimit = Math.min(betData[0].length, selectCount[0] - 1)
  const secondLimit = selectCount[0] - firstLimit
  return (secondLimit >= 0) ? calcCombine(betData, [firstLimit, secondLimit]) : 0
}

/**
 * 固定注數組合
 * @param {Array<Number|String>} betData
 * 投注資料
 * @param {Array<Number>} List
 * 每個號碼對應的注數
 */
function calcOneList (betData = [], List = []) {
  // const selectData = betData[0]
  return betData.reduce((preSum, number) => {
    if (List[parseInt(number, 10)]) {
      return preSum + List[parseInt(number, 10)]
    }
    return preSum
  }, 0)
}
/**
 * 固定注數組合
 * @param {Array<Array<Number|String>>} betData
 * 投注資料
 * @param {Array<Array<NUmber>>} List
 * 每個號碼對應的注數
 */
function calcList (betData = [[]], List = [[]]) {
  return betData
    .map((subBetData, index) => calcOneList(subBetData, List[index]))
    .reduce((preSum, curVal) => preSum + curVal, 0)
}

module.exports = {
  calcMenu,
  calcRepeatCombine,
  calcCombine,
  calcOptionalLocate,
  calcList
}
