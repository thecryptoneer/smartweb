"use client";

import dynamic from "next/dynamic";
import React, {Suspense, useState} from "react";
import {Html, OrbitControls} from "@react-three/drei";
import styled from "styled-components";

const View = dynamic(() => import("@/components/canvas/View"), {
  ssr: false,
  loading: () => (
    <StyledLoading>
      <p>Loading...</p>
    </StyledLoading>
  ),
});
import Logo from "@/components/canvas/Logo";
import Circle from "@/components/canvas/Circle/Circle";
import PlusSvg from "@/components/canvas/Plus/Plus";
import Header from "@/components/dom/Header/Header";
import HeroText from "@/components/canvas/HeroText/HeroText";
import Footer from "@/components/dom/Footer/Footer";
import Banner from "@/components/canvas/Banner/Banner";
import PricingPlans from "@/components/dom/Plans/PricingPlans";
import TwistSection from "@/components/dom/Sections/TwistSection";
import CTASection from "@/components/dom/Sections/CTASection";
import AddOnSection from "@/components/dom/Sections/AddOnSection";
import ComplexitySection from "@/components/dom/Sections/ComplexitySection";
import BillingSection from "@/components/dom/Sections/BillingSection";
import WhyUsSection from "@/components/dom/Sections/WhyUsSection";
import GetStartedSection from "@/components/dom/Sections/GetStartedSection";
import {Column, Container} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";
import BenefitsSection from "@/components/dom/Sections/BenefitsSection";

export default function Page() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  return (
    <>
      <DivColStartCenter>
        <Header />

        {/* THREE HERO SECTION */}
        <StyledView orbit={true}>
          <Suspense fallback={<Html center>Loading.</Html>}>
            <HeroScene/>
          </Suspense>
        </StyledView>

        {/* THREE HERO SECTION */}
        <StyledView2 orbit={true}>
          <Suspense fallback={<Html center>Loading.</Html>}>
            <FloatingCircleScene
              position={[2,2,0]}
              color={'#ffaacf'}
            />
          </Suspense>
        </StyledView2>

        {/* THREE HERO SECTION */}
        <StyledView3 orbit={true}>
          <Suspense fallback={<Html center>Loading.</Html>}>
            <FloatingCircleScene
              position={[0,1.3,0]}
              color={'#93a9c9'}
            />
          </Suspense>
        </StyledView3>

        {/* THREE HERO SECTION */}
        <StyledView4 orbit={true}>
          <Suspense fallback={<Html center>Loading.</Html>}>
            <FloatingCircleScene
              position={[-2,1.3,0]}
              color={'#ffda67'}
            />
          </Suspense>
        </StyledView4>

        <Main>
          {/* main */}
          <DottedBackground>
            {/*Main*/}
            <div style={{
              height: "fit-content",
              padding: "96dvh 0 0 0",
              background: "transparent",
              // zIndex: 5,
            }}>
              <Container>
                <Column>

                  <TwistSection />
                  <Spacer type="section"/>

                  <BenefitsSection />
                  <Spacer type="section"/>

                  <PricingPlans selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan}/>
                  <Spacer type=""/>

                  <CTASection selectedPlan={selectedPlan}/>
                  <Spacer type="section"/>

                  <ComplexitySection />
                  <Spacer type="section"/>

                  <AddOnSection />
                  <Spacer type="section"/>

                  {/*<AiSection />*/}
                  {/*<Spacer type="section"/>*/}

                  {/*<BillingSection />*/}
                  {/*<Spacer type="section"/>*/}

                  {/*<WhyUsSection />*/}
                  {/*<Spacer type="section"/>*/}

                  <GetStartedSection selectedPlan={selectedPlan}/>
                  <Spacer type="section"/>
                </Column>
              </Container>
            </div>

          </DottedBackground>
        </Main>
      </DivColStartCenter>
      <Footer />
    </>
  );
}

const HeroScene = () => {
  return (
    <>
      <ambientLight intensity={10}/>
      <pointLight intensity={20} position={[-0.6, 1.25, 6]}/>
      <HeroText />
      <Banner />
      <Logo/>
      <Circle color={'#ffc64b'} color1={'#4d8cff'}/>
      <PlusSvg/>
    </>
  );
};

const FloatingCircleScene = ({position, position1, color, color1}: {position?: number[], position1?: number[], color?: string, color1?: string}) => {
  return (
    <>
      <ambientLight intensity={10}/>
      <pointLight intensity={20} position={[-0.6, 1.25, 6]}/>
      <Circle position={position} position1={position1} amount={1} color={color} color1={color1}/>
    </>
  );
}

const StyledView = styled(View)`
  position: absolute;
  display: flex;
  height: 110dvh;
  width: 100%;
  overflow-x: hidden;
  z-index: 1;
  touch-action: auto!important;
`;

const StyledView2 = styled(View)`
  position: absolute;
  display: flex;
  height: 110dvh;
  width: 100%;
  overflow-x: hidden;
  z-index: 2;
  bottom: -145dvh;
  touch-action: auto!important;
  @media (max-width: 768px) {
    bottom: -200dvh;
  }
`;

const StyledView3 = styled(View)`
  position: absolute;
  display: flex;
  height: 110dvh;
  width: 100%;
  overflow-x: hidden;
  z-index: 2;
  bottom: -280dvh;
  touch-action: auto!important;
  @media (max-width: 768px) {
    bottom: -300dvh;
  }
`;

const StyledView4 = styled(View)`
  position: absolute;
  display: flex;
  height: 110dvh;
  width: 100%;
  overflow-x: hidden;
  z-index: 2;
  bottom: -430dvh;
  touch-action: auto!important;
  @media (max-width: 768px) {
    bottom: -500dvh;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0px auto 80px auto;
`;


const DivColStartCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DottedBackground = styled.div`
  border-radius: 50px;
  min-height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa url("/background.svg") repeat fixed center;
  background-size: 26%;
  width: 90%;
  margin: 0 auto;
  //animation: dottedBackgroundAnimation 10s linear infinite;
`;

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
