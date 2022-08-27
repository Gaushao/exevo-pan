import { vocation } from 'shared-utils/dist/vocations'
import { memoize } from 'utils'
import { common } from 'locales'
import { RareOutfitTestParams, RareOutfitTest } from './types'

type SpecialTag = keyof typeof common.en.CharacterCard.SpecialTags

const CHARM_CHECK = 7
const QUEST_CHECK = 26
const MOUNT_CHECK = 35
const STORE_CHECK = 4
export const rareMountSet = new Set<string>([
  'Rift Runner',
  'Phantasmal Jade',
  'Singeing Steed',
  'Neon Sparkid',
  'Vortexion',
  'Phant',
  'Antelope',
  'Fleeting Knowledge',
  'Ripptor',
])

const rareOutfitTests: RareOutfitTest[] = [
  ({ name, type, sex }) => name === 'Mage' && !sex && type >= 2,
  ({ name, type, sex }) => name === 'Summoner' && sex && type >= 2,
  ({ name, type }) => name === 'Elementalist' && type > 0,
  ({ name, type }) => name === 'Revenant' && type > 0,
  ({ name, type }) => name === 'Battle Mage' && type > 0,
  ({ name, type }) => name === 'Demon Outfit' && type >= 2,
  ({ name, type }) => name === 'Fire-Fighter' && (type === 1 || type === 3),
  ({ name }) => name === 'Golden Outfit',
  ({ name }) => name === 'Makeshift Warrior',
  ({ name }) => name === 'Royal Costume',
]

export const testRareOutfit = memoize((params: RareOutfitTestParams): boolean =>
  rareOutfitTests.some((test) => test(params)),
)

const knightSkills: Array<keyof CharacterSkillsObject> = [
  'axe',
  'club',
  'sword',
]

const HIGH_SKILL_VALUE = 100

export const getCharacterTags = (character: CharacterObject): SpecialTag[] => {
  const { charms, quests, mounts, outfits, storeMounts, storeOutfits, sex } =
    character

  const tags: SpecialTag[] = []

  if (charms.length >= CHARM_CHECK) tags.push('manyCharms')
  if (quests.length >= QUEST_CHECK) tags.push('manyQuests')
  if (mounts.length >= MOUNT_CHECK) tags.push('manyMounts')
  if (storeOutfits.length + storeMounts.length >= STORE_CHECK) {
    tags.push('manyStoreCosmetics')
  }

  if (mounts.some((mount) => rareMountSet.has(mount))) {
    tags.push('rareMounts')
  }

  if (outfits.some((outfit) => testRareOutfit({ ...outfit, sex }))) {
    tags.push('rareOutfits')
  }

  if (
    vocation.getName(character.vocationId) === 'Knight' &&
    knightSkills.filter((skill) => character.skills[skill] >= HIGH_SKILL_VALUE)
      .length >= 2
  ) {
    tags.push('secondaryEkSkill')
  }

  if (
    character.level >= 400 &&
    !character.outfits.some(({ name }) => name === 'Revenant')
  ) {
    tags.push('soulwarAvailable')
  }

  return tags
}
