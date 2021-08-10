import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import SkillBar from '..'

describe('<SkillBar />', () => {
  beforeEach(() => {
    jest
      .spyOn(window, 'setTimeout')
      .mockImplementationOnce(fn => fn() as unknown as NodeJS.Timeout)
  })
  test('should render correctly', () => {
    renderWithProviders(
      <SkillBar
        skillName="test"
        skillValue={10}
        highlight
        data-testid="test"
      />,
    )
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })

  describe('should calculate percentages correctly', () => {
    test('for 0', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={0} />)
      expect(screen.getByTitle('0%')).toBeInTheDocument()
    })
    test('for 0.1', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={0.1} />)
      expect(screen.getByTitle('10%')).toBeInTheDocument()
    })
    test('for 1', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1} />)
      expect(screen.getByTitle('0%')).toBeInTheDocument()
    })
    test('for 1.0', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1.0} />)
      expect(screen.getByTitle('0%')).toBeInTheDocument()
    })
    test('for 1.001', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1.001} />)
      expect(screen.getByTitle('0%')).toBeInTheDocument()
    })
    test('for 1.01', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1.01} />)
      expect(screen.getByTitle('1%')).toBeInTheDocument()
    })
    test('for 1.1', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1.1} />)
      expect(screen.getByTitle('10%')).toBeInTheDocument()
    })
    test('for 1.11', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1.11} />)
      expect(screen.getByTitle('11%')).toBeInTheDocument()
    })
    test('for 1.111', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={1.111} />)
      expect(screen.getByTitle('11%')).toBeInTheDocument()
    })
    test('for 10', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={10} />)
      expect(screen.getByTitle('0%')).toBeInTheDocument()
    })
    test('for 100', () => {
      renderWithProviders(<SkillBar skillName="test" skillValue={100} />)
      expect(screen.getByTitle('0%')).toBeInTheDocument()
    })
  })
})
