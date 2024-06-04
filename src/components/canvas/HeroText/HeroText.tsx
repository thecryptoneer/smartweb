import {Html, Button} from "@react-three/drei";
import styled from "styled-components";
import {useFrame, useThree} from "@react-three/fiber";
import {visibleHeightAtZDepth, visibleWidthAtZDepth} from "@/helpers/global";
import {useRef} from "react";

const HeroText = () => {
  const ref = useRef();
  const {camera} = useThree();
  useFrame(() => {
    if (!ref?.current) return;
    const visibleWidth = visibleWidthAtZDepth(ref.current.position.z, camera);
    const visibleHeight = visibleHeightAtZDepth(ref.current.position.z, camera);
    const isMobile = window.innerWidth < 959;
    const isLandScape = window.innerWidth > window.innerHeight;

    const xRange = [-visibleWidth / 2, visibleWidth / 2];
    const yRange = [-visibleHeight / 2, visibleHeight / 2];
    if (isLandScape && isMobile) {
      ref.current.position.y = yRange[1] - 1.8;
    } else if (isMobile) {
      ref.current.position.y = yRange[1] - 2.9;
    } else if (isLandScape) {
      ref.current.position.y = yRange[1] - 3;
    } else {
      ref.current.position.x = 0;
      ref.current.position.y = yRange[1] - 3.4;
    }
  })

  const getDynamicSlogan = () => {
    const slogans = [
      'All-in-one solution for your digital needs.',
    ]
    return slogans[Math.floor(Math.random() * slogans.length)];
  }
  return (
    <group ref={ref} zIndexRange={[10, 100]} position={[0, 0.45, 0]}>
      <Html center>
        <DivColStartCenter style={{
          width: "80vw",
          zIndex: "10",
        }}>

          <Headline>
            A software and design
            <br/>subscription with a twist
          </Headline>

          <SubHeadline>{getDynamicSlogan()}</SubHeadline>

          <StyledAnchor href={'#plans'}>
            See Plans
          </StyledAnchor>

          <DivRowStartCenter style={{gap: "8px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill={"#9df896"}
                 stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Available
          </DivRowStartCenter>
        </DivColStartCenter>
      </Html>
    </group>
  )
}
HeroText.displayName = "HeroText";
export default HeroText;

const Headline = styled.h1`
  text-align: center;
  margin: 330px 0 0 0;
  font-size: 1.5rem;
  font-family: Helvetica, Apple, sans-serif, serif;
  font-weight: bolder;
  line-height: 1.2;
  //text-wrap: balance;
  color: #212121;
  @media (min-width: 414px) {
    font-size: 1.8rem;
  }
  @media (min-width: 480px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  @media (min-width: 992px) {
    font-size: 3rem;
  }
  @media (min-width: 1201px) {
    font-size: 4rem;
  }
`;

const SubHeadline = styled.p`
  text-align: center;
  margin: calc(min(2dvh, 2dvw)) 0 0 0;
  font-size: 1rem;
  font-family: Helvetica, Apple, sans-serif, serif;
  font-weight: light;
  line-height: 1.5;
  color: #212121;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.25rem;
  }
  @media (min-width: 1201px) {
    font-size: 1.5rem;
  }
`;

const DivColStartCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledAnchor = styled.a`
  background-color: #212121;
  color: white;
  border: none;
  margin: 40px 0 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
`;

const StyledButton = styled.button`
  background-color: #212121;
  color: white;
  border: none;
  margin: calc(min(4dvh, 4dvw)) 0 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`;

const DivRowStartCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
