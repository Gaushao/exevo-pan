import { isRareNickname, setDoesntHasValue } from '../utils'

describe('filterCharacters/utils', () => {
  test('isRareNickname()', () => {
    expect(isRareNickname('Assd')).toBeFalsy()
    expect(isRareNickname('Asd')).toBeTruthy()
    expect(isRareNickname('As')).toBeTruthy()
    expect(isRareNickname('A')).toBeTruthy()
    expect(isRareNickname('Dark Magician')).toBeFalsy()
    expect(isRareNickname('Dark-Magician')).toBeTruthy()
    expect(isRareNickname("Dark'Magician")).toBeTruthy()
    expect(isRareNickname('Dark.Magician')).toBeTruthy()
    expect(isRareNickname('Dark,Magician')).toBeTruthy()
    expect(isRareNickname('Dark Magician IV')).toBeTruthy()
    expect(isRareNickname('Dark MAgician')).toBeTruthy()
    expect(isRareNickname('Därk Magician')).toBeTruthy()
  })

  test('setDoesntHasValue()', () => {
    expect(setDoesntHasValue(new Set([1, 2, 4, 8]), 0)).toBeTruthy()
    expect(setDoesntHasValue(new Set([1, 2, 4, 8]), 1)).toBeFalsy()
    expect(setDoesntHasValue(new Set([1, 2, 4, 8]), 4)).toBeFalsy()
    expect(setDoesntHasValue(new Set([]), 1)).toBeFalsy()
    expect(setDoesntHasValue(new Set([8]), 8)).toBeFalsy()
    expect(setDoesntHasValue(new Set([8]), 4)).toBeTruthy()
  })
})
