/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { LinkMenuType } from '.';
import { FullModal } from './Modals';

export interface FullScreenMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (ele: boolean) => void;
  linksList: LinkMenuType[];

  titleAnimationSpeed?: number;
  openModalAnimationDuration?: number;
  titleAnimationDelay?: number;
  horizontalSlide?: number;
  backgroundZoom?: number;
  backgroundColor?: string;
  transparentBackgroundColor?: string;
  titleColor?: string;
  titleFontSize?: string;
  titleFontfamily?: string;
  titleMobileFontSize?: string;
  isMenuRounded?: boolean;
}

export function FullScreenMenu(props: FullScreenMenuProps): JSX.Element {
  const {
    isMenuOpen,
    setIsMenuOpen,
    titleAnimationSpeed = 0.4,
    titleAnimationDelay = 0.4,
    horizontalSlide = 100,
    backgroundZoom = 1.05,
    openModalAnimationDuration = 0.7,
    isMenuRounded = true,
    titleMobileFontSize = '13vw',
    titleColor = 'white',
    titleFontSize = '90px',
    titleFontfamily = 'serif',
    backgroundColor = 'black',
    transparentBackgroundColor = 'rgba(0,0,0,0.5)',
    linksList,
  } = props;
  const [isMouseOnTitle, setIsMouseOnTitle] = useState(false);
  const [isTitleAnimationFinish, setIsTitleAnimationFinish] = useState(false);
  const imageContainer = useRef<HTMLHeadingElement>(null);
  const [isMenuAnimationFinish, setIsMenuAnimationFinish] = useState(false);
  const router = typeof window !== 'undefined' ? window.location : undefined;

  function onMouseHover(index: number) {
    setIsMouseOnTitle(!isMouseOnTitle);
    imageContainer.current?.children[index].classList.toggle(
      'backgroundVisible'
    );
  }

  function onLinkClick(href: string) {
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsMenuAnimationFinish(false);
      window.location.href = href;
    }, openModalAnimationDuration * 1000);
  }

  function titleAnimationCSS() {
    let styles = '';
    let duration = titleAnimationSpeed;
    linksList.forEach((_link, i) => {
      styles += `
        :nth-child(${i + 1}),
        :nth-child(${i + 1})::after {
          animation-duration: ${duration}s;
          animation-delay: ${titleAnimationDelay}s;
        }
     `;
      duration += 0.2;
    });

    return css`
      ${styles}
    `;
  }

  //Ne pas lancer l'animation des images tant que l'animation du menu n'est pas terminée
  useEffect(() => {
    if (!isTitleAnimationFinish && isMenuOpen) {
      const totalDelay = (linksList.length * 0.2 + titleAnimationDelay) * 1000;
      setTimeout(() => setIsTitleAnimationFinish(true), totalDelay);
    }

    if (isMenuOpen) {
      setIsMenuAnimationFinish(true);
    } else {
      setTimeout(
        () => setIsMenuAnimationFinish(false),
        openModalAnimationDuration * 1000
      );
      setIsTitleAnimationFinish(false);
    }
  }, [
    isTitleAnimationFinish,
    isMenuOpen,
    openModalAnimationDuration,
    linksList,
    titleAnimationDelay,
  ]);

  return (
    <FullModal
      isMenuAnimationFinish={isMenuAnimationFinish}
      isMenuOpen={isMenuOpen}
      openModalAnimationDuration={openModalAnimationDuration}
      isMenuRounded={isMenuRounded}
    >
      <Main $backgroundColor={backgroundColor}>
        <Background
          ref={imageContainer}
          $isPossibleToShowBackground={isMouseOnTitle && isTitleAnimationFinish}
          $backgroundZoom={backgroundZoom}
        >
          {linksList.map(link => (
            <img key={link.label} src={link.image} alt={link.image} />
          ))}
        </Background>

        <TitleContainer
          $titleMobileFontSize={titleMobileFontSize}
          $titleColor={titleColor}
          $titleFontSize={titleFontSize}
          $titleFontfamily={titleFontfamily}
          $isAnimate={isMenuAnimationFinish}
          $titleAnimationCSS={titleAnimationCSS}
          $horizontalSlide={horizontalSlide}
          $backgroundColor={backgroundColor}
          $transparentBackgroundColor={transparentBackgroundColor}
        >
          {linksList.map((link, i) => (
            <a
              onMouseOut={() => onMouseHover(i)}
              onMouseOver={() => onMouseHover(i)}
              key={link.label}
              className={router?.pathname === link.routes ? 'currentTitle' : ''}
              onClick={() => onLinkClick(link.routes)}
            >
              {link.label}
            </a>
          ))}
        </TitleContainer>
      </Main>
    </FullModal>
  );
}

interface TitleContainerStyle {
  $isAnimate: boolean;
  $titleAnimationCSS: () => FlattenSimpleInterpolation;
  $horizontalSlide: number;
  $backgroundColor: string;
  $transparentBackgroundColor: string;
  $titleColor: string;
  $titleFontSize: string;
  $titleFontfamily: string;
  $titleMobileFontSize: string;
}

interface BackgroundStyle {
  $isPossibleToShowBackground: boolean;
  $backgroundZoom: number;
}

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { $backgroundColor: string }) =>
    props.$backgroundColor};
`;

const Background = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    top: 0;
    opacity: 0;
    transform: scale(1);
    transition: all 0.5s;
    object-fit: cover;
    height: 100%;
    width: 100%;
    visibility: hidden;

    &.backgroundVisible {
      opacity: ${(props: BackgroundStyle) =>
        props.$isPossibleToShowBackground ? '1' : '0'};
      transform: scale(${(props: BackgroundStyle) => props.$backgroundZoom});
      visibility: inherit;
    }
  }
`;

const TitleContainer = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${(props: TitleContainerStyle) =>
    props.$transparentBackgroundColor};

  a {
    color: ${(props: TitleContainerStyle) => props.$titleColor};
    font-size: ${(props: TitleContainerStyle) => props.$titleFontSize};
    font-family: ${(props: TitleContainerStyle) => props.$titleFontfamily};
    font-weight: normal;
    text-transform: uppercase;
    margin: 0px;
    position: relative;
    line-height: ${(props: TitleContainerStyle) => props.$titleFontSize};
    text-decoration: none;
    opacity: 0.4;
    transition: all 0.4s;

    transform: translateY(
      ${(props: TitleContainerStyle) => props.$horizontalSlide}px
    );
    animation: ${(props: TitleContainerStyle) =>
      props.$isAnimate ? 'translateYTitleIn' : 'none'};
    animation-fill-mode: forwards;

    &.currentTitle,
    :hover {
      opacity: 1;
      cursor: pointer;
    }

    @media (max-width: 750px) {
      font-size: ${(props: TitleContainerStyle) => props.$titleMobileFontSize};
      line-height: ${(props: TitleContainerStyle) =>
        props.$titleMobileFontSize};
      margin-bottom: 30px;
    }

    :after {
      width: 100%;
      bottom: 0;
      background-color: ${(props: TitleContainerStyle) =>
        props.$backgroundColor};
      display: block;
      position: absolute;
      content: '';

      height: 100%;
      animation: ${(props: TitleContainerStyle) =>
        props.$isAnimate ? 'translateYIn' : 'none'};
      animation-fill-mode: forwards;
    }

    ${(props: TitleContainerStyle) => props.$titleAnimationCSS};

    @keyframes translateYIn {
      from {
        height: 100%;
      }
      to {
        height: 0%;
      }
    }

    @keyframes translateYTitleIn {
      from {
        transform: translateY(
          ${(props: TitleContainerStyle) => props.$horizontalSlide}px
        );
      }
      to {
        transform: translateY(0);
      }
    }
  }
`;
