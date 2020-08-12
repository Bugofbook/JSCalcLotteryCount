const { calcCombine, calcMenu } = require('../lib/index.js')

describe('calcMenu', () => {
  // 通常在定位膽或大小單雙龍虎使用
  it('11選5-定位膽', () => {
    const aaa = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
    expect(calcMenu(aaa)).toBe(9)
  })
  it('11選5-定位膽', () => {
    const aaa = [[1, 2], [1, 2, 3], []]
    expect(calcMenu(aaa)).toBe(5)
  })
  it('時時彩-大小單雙', () => {
    const aaa = [['大', '小'], ['單', '雙', '龍'], [], ['大', '小', '單', '雙']]
    expect(calcMenu(aaa)).toBe(9)
  })
})

describe('calcCombine', () => {
  // 通常在直選或是組選使用
  it('11選5-三碼-前三直選', () => {
    const aaa = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
    expect(calcCombine(aaa, [1, 1, 1])).toBe(6)
  })
  it('11選5-三碼-前三直選', () => {
    const aaa = [[1, 2], [1, 2, 3], []]
    expect(calcCombine(aaa, [1, 1, 1])).toBe(0)
  })
  it('時時彩-五星-組選120', () => {
    const aaa = [[1, 2, 3, 4, 5, 6, 7, 8]]
    expect(calcCombine(aaa, [5])).toBe(56)
  })
  it('時時彩-五星-組選60', () => {
    const aaa = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
    expect(calcCombine(aaa, [1, 3])).toBe(20)
  })
  it('時時彩-五星-組選30', () => {
    const aaa = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
    expect(calcCombine(aaa, [2, 1])).toBe(30)
  })
  it('時時彩-五星-三星報喜', () => {
    const aaa = [[1, 2, 3, 4, 5]]
    expect(calcCombine(aaa, [1])).toBe(5)
  })
})
