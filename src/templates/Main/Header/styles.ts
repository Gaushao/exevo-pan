import styled, { css } from 'styled-components'
import Image from 'next/image'
import ExevoPanLogoImage from 'assets/logo.png'
import MenuIconSvg from 'assets/svgs/menu.svg'
import MoonIconSvg from 'assets/svgs/moon.svg'
import MarketIconSvg from 'assets/svgs/market.svg'
import HistoryIconSvg from 'assets/svgs/history.svg'
import AdvertiseIconSvg from 'assets/svgs/advertise.svg'
import StatisticsIconSvg from 'assets/svgs/statistics.svg'
import WarIconSvg from 'assets/svgs/war.svg'
import AboutIconSvg from 'assets/svgs/about.svg'
import { InnerContainer, CustomScrollbar, Clickable, Shadow } from 'styles'

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 70;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  background-color: var(--primary);
  transition: 0.2s background ease-out;
  ${InnerContainer}
  ${CustomScrollbar}
  ${Shadow}

  &::after {
    content: '';
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    height: 60px;
    width: 32px;
    background-image: linear-gradient(
      to left,
      var(--primary),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }
`

export const Nav = styled.nav`
  margin-right: 24px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

export const MenuIcon = styled(MenuIconSvg)`
  ${Clickable}
  padding: 2px;
  height: 36px;
  width: 36px;
  border-radius: 4px;
  fill: var(--onPrimary);

  @media (min-width: 768px) {
    display: none;
  }
`

export const LogoWrapper = styled.a`
  display: none;

  @media (min-width: 768px) {
    margin-right: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;

    transition: 0.2s filter ease-out;
    &:hover {
      filter: brightness(110%);
    }
  }
`

export const H1 = styled.h1`
  display: none;
`

export const ExevoPanLogo = styled(Image).attrs({
  src: ExevoPanLogoImage,
})``

export const Ul = styled.ul`
  position: fixed;
  top: 60px;
  left: 0;

  padding: 20px;
  display: grid;
  grid-gap: 16px;
  grid-auto-columns: min-content;

  background-color: var(--darkerPrimary);
  ${Shadow}

  @media (min-width: 768px) {
    position: unset;
    padding: unset;
    background-color: unset;
    box-shadow: unset;

    display: flex;
    align-items: center;
  }
`

export const Li = styled.li`
  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const A = styled.a`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-radius: 9px;

  ${Clickable}
  &[aria-current='page'] {
    box-shadow: inset 3px 3px rgb(0 0 0 / 14%);
  }
`

export const H2 = styled.h2`
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 400;
  color: var(--onPrimary);
  white-space: nowrap;
`

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const MoonIcon = styled(MoonIconSvg)``

const NavIconStyle = css`
  margin-right: 6px;
  width: 18px;
  height: 18px;
  fill: var(--onPrimary);
`

export const MarketIcon = styled(MarketIconSvg)`
  ${NavIconStyle}
`
export const HistoryIcon = styled(HistoryIconSvg)`
  ${NavIconStyle}
`

export const AdvertiseIcon = styled(AdvertiseIconSvg)`
  ${NavIconStyle}
`

export const StatisticsIcon = styled(StatisticsIconSvg)`
  ${NavIconStyle}
`

export const WarIcon = styled(WarIconSvg)`
  ${NavIconStyle}
`

export const AboutIcon = styled(AboutIconSvg)`
  ${NavIconStyle}
`
