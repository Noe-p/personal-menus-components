/* eslint-disable indent */
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useScrollBlock } from '../hooks';

interface FullModalProps {
  isMenuAnimationFinish: boolean;
  children?: ReactNode;
  isMenuOpen: boolean;
  openModalAnimationDuration: number;
  isMenuRounded: boolean;
}
interface StyledProps {
  $isMenuAnimationFinish: boolean;
  $openModalAnimationDuration: number;
  $isMenuRounded: boolean;
}

export function FullModal(props: FullModalProps): JSX.Element {
  const {
    isMenuAnimationFinish,
    children,
    isMenuOpen,
    openModalAnimationDuration,
    isMenuRounded,
  } = props;
  const [blockScroll, allowScroll] = useScrollBlock();
  isMenuAnimationFinish ? blockScroll() : allowScroll();

  return isMenuAnimationFinish ? (
    <Main
      $openModalAnimationDuration={openModalAnimationDuration}
      $isMenuAnimationFinish={isMenuOpen}
      $isMenuRounded={isMenuRounded}
    >
      <div className={'modal-wrapper'}>{children}</div>
    </Main>
  ) : (
    <></>
  );
}

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 102;

  .modal-wrapper {
    z-index: 103;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${(props: StyledProps) =>
      props.$isMenuAnimationFinish ? 'slideIn' : 'slideOut'};
    animation-duration: ${(props: StyledProps) =>
      props.$openModalAnimationDuration}s;
    overflow: hidden;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  @keyframes slideIn {
    from {
      height: 0%;
      border-bottom-left-radius: ${(props: StyledProps) =>
        props.$isMenuRounded ? '50%' : 0};
      border-bottom-right-radius: ${(props: StyledProps) =>
        props.$isMenuRounded ? '50%' : 0};
    }
  }

  @keyframes slideOut {
    to {
      height: 0%;
      border-bottom-left-radius: ${(props: StyledProps) =>
        props.$isMenuRounded ? '50%' : 0};
      border-bottom-right-radius: ${(props: StyledProps) =>
        props.$isMenuRounded ? '50%' : 0};
    }
  }
`;
