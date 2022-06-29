import { Vocation, Skill } from './types'

export const VOCATION: Record<Vocation, Record<Skill, number>> = {
  knight: {
    magic: 3,
    melee: 1.1,
    distance: 1.4,
  },
  paladin: {
    magic: 1.4,
    melee: 1.2,
    distance: 1.1,
  },
  druid: {
    magic: 1.1,
    melee: 1.8,
    distance: 1.8,
  },
  sorcerer: {
    magic: 1.1,
    melee: 2,
    distance: 2,
  },
}

export const SKILL = 1600

export const generateMarks = (noneText: string) => [
  { label: noneText, value: 0 },
  { label: '5%', value: 5 },
  { label: '10%', value: 10 },
  { label: '15%', value: 15 },
  { label: '20%', value: 20 },
  { label: '25%', value: 25 },
  { label: '30%', value: 30 },
  { label: '35%', value: 35 },
  { label: '40%', value: 40 },
  { label: '45%', value: 45 },
  { label: '50%', value: 50 },
]
