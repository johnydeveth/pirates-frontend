import { useState } from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

export enum SwapType {
  SWAP,
  STABLE_SWAP,
}

const Wrapper = styled.div`
  & > div {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.input};
    border: 0;
  }
  & button {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.input};
    border-radius: 10px 10px 0 0;
  }
`

export default function SwapTab({ children, showStable }) {
  const { t } = useTranslation()
  const [swapTypeState, setSwapType] = useState(SwapType.SWAP)
  const { theme } = useTheme()

  if (showStable) {
    return (
      <>
        <Wrapper>
          <ButtonMenu
            activeIndex={swapTypeState}
            onItemClick={() => setSwapType((state) => (state === SwapType.SWAP ? SwapType.STABLE_SWAP : SwapType.SWAP))}
          >
            {[t('Swap'), t('StableSwap')].map((content, idx) => (
              <ButtonMenuItem
                key={content}
                style={{
                  color: idx === swapTypeState ? theme.colors.text : theme.colors.textSubtle,
                  backgroundColor: idx === swapTypeState ? theme.card.background : theme.colors.input,
                }}
              >
                {content}
              </ButtonMenuItem>
            ))}
          </ButtonMenu>
        </Wrapper>
        {children(swapTypeState)}
      </>
    )
  }

  return children(SwapType.SWAP)
}
