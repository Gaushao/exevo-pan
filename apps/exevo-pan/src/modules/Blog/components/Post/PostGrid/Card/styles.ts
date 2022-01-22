import styled from 'styled-components'
import { FadeImage } from 'components/Atoms'

export const Card = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
  }

  transition: transform 0.2s ease-out;

  &:hover {
    transform: translateX(4px);
  }
`

export const Thumbnail = styled(FadeImage)`
  position: relative;
  flex-shrink: 0;
  height: 56px;
  width: 56px;
  border-radius: 5px;

  background-color: var(--primaryVariant);

  display: grid;
  place-content: center;

  img {
    object-fit: contain;
  }
`

export const TextWrapper = styled.div`
  display: grid;
  gap: 2px;
`

export const Title = styled.h5`
  font-size: 16px;
  font-weight: 400;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
