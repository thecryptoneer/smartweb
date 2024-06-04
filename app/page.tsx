"use client";

import dynamic from "next/dynamic";
import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import {Html, OrbitControls, Preload, Scroll, ScrollControls} from "@react-three/drei";
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
import {Plan, plans} from "../data/plans";
import Images from "@/components/canvas/Images";
import {Canvas} from "@react-three/fiber";
import {getXYFromMouse} from "@/helpers/global";

export default function Page() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [billingData, setBillingData] = useState<Plan>(plans[0]);

  const twistRef = useRef(null);
  const benefitRef = useRef(null);
  const pricingRef = useRef(null);
  const ctaRef = useRef(null);
  const complexityRef = useRef(null);
  const addOnRef = useRef(null);
  const getStartedRef = useRef(null);

  useEffect(() => {
    // make sure the sections are placed correctly (one after another with 80px gap between sections)
    window.addEventListener('resize', onWindowResize);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    }
  }, []);

  // useInterval
  setInterval(() => {
    placeSectionsBasedOnDisplay();
  }, 500)

  const [scrollDistanceY, setScrollDistanceY] = useState(2);

  const placeSectionsBasedOnDisplay = () => {
    const sections = [
      twistRef,
      benefitRef,
      pricingRef,
      ctaRef,
      complexityRef,
      addOnRef,
      getStartedRef
    ]

    sections.forEach((ref, index) => {
      if (ref.current) {
        // get previous section top + height
        let previousSectionTop = window.innerHeight;
        let previousSectionHeight = 0;
        if (index > 0) {
          const previousSection = sections[index - 1];
          previousSectionTop = previousSection.current.offsetTop;
          previousSectionHeight = previousSection.current.offsetHeight;
        }

        const sectionGap = "120px"

        ref.current.style.top = `calc(${previousSectionTop + previousSectionHeight}px + ${sectionGap})`;
        ref.current.style.position = 'absolute';
        ref.current.style.left = '20px';
        ref.current.style.right = '20px';
        ref.current.style.width = 'calc(100dvw - 40px)';

        if (index === sections.length - 1) {
          // x: (right boundary / window.innerWidth) * 2 - 1,
          // y: -(top boundary / window.innerHeight) * 2,

          // own section height
          const sectionHeight = ref.current.offsetHeight;
          const bottomBoundary = 200;
          ref.current.style.marginBottom = bottomBoundary + 'px';

          setScrollDistanceY((previousSectionTop + previousSectionHeight + sectionHeight + bottomBoundary) / window.innerHeight);
        }
      }
    });
  }

  useEffect(() => {
    console.log({scrollDistanceY})
  }, [scrollDistanceY]);

  const onWindowResize = () => {
    placeSectionsBasedOnDisplay();
  }

  return (
    <>
      <DottedBackground />

      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls damping={0.01} pages={scrollDistanceY}>

            <Scroll>
              <HeroScene />
            </Scroll>

            <Scroll html>

              <div ref={twistRef}>
                <TwistSection />
                {/*<Spacer type="section"/>*/}
              </div>


              <div ref={benefitRef}
                style={{ position: 'absolute', left: '0', right: '0', width: "100dvw" }}>
                <BenefitsSection />
                {/*<Spacer type="section"/>*/}
              </div>

              <div ref={pricingRef}
                   style={{ position: 'absolute', left: '0', right: '0', width: "100dvw" }}>
                <PricingPlans
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  billingData={billingData}
                  setBillingData={setBillingData}
                />
                {/*<Spacer type=""/>*/}
              </div>

              <div ref={ctaRef}
                style={{ position: 'absolute', left: '0', right: '0', width: "100dvw" }}>
                <CTASection selectedPlan={selectedPlan} billingData={billingData}/>
                {/*<Spacer type="section"/>*/}
              </div>


              <div ref={complexityRef}
                style={{ position: 'absolute', left: '0', right: '0', width: "100dvw" }}>
                <ComplexitySection />
                {/*<Spacer type="section"/>*/}
              </div>

              <div ref={addOnRef}
                style={{ position: 'absolute', left: '0', right: '0', width: "100dvw" }}>
                <AddOnSection />
                {/*<Spacer type="section"/>*/}
              </div>

              <div ref={getStartedRef}
                style={{ position: 'absolute', left: '0', right: '0', width: "100dvw" }}>
                <GetStartedSection selectedPlan={selectedPlan} billingData={billingData}/>
                {/*<Spacer type="section"/>*/}
              </div>




                {/*<AiSection />*/}
                {/*<Spacer type="section"/>*/}

                {/*<BillingSection />*/}
                {/*<Spacer type="section"/>*/}

                {/*<WhyUsSection />*/}
                {/*<Spacer type="section"/>*/}



            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  )

  // return (
  //   <>
  //     <DivColStartCenter>
  //       <Header />
  //
  //       {/* THREE HERO SECTION */}
  //       <StyledView orbit={true}>
  //         <Suspense fallback={<Html center>Loading.</Html>}>
  //           <HeroScene/>
  //         </Suspense>
  //       </StyledView>
  //
  //       {/* THREE HERO SECTION */}
  //       <StyledView2 orbit={true}>
  //         <Suspense fallback={<Html center>Loading.</Html>}>
  //           <FloatingCircleScene
  //             position={[2,2,0]}
  //             color={'#ffaacf'}
  //           />
  //         </Suspense>
  //       </StyledView2>
  //
  //       {/* THREE HERO SECTION */}
  //       <StyledView3 orbit={true}>
  //         <Suspense fallback={<Html center>Loading.</Html>}>
  //           <FloatingCircleScene
  //             position={[0,1.3,0]}
  //             color={'#93a9c9'}
  //           />
  //         </Suspense>
  //       </StyledView3>
  //
  //       {/* THREE HERO SECTION */}
  //       <StyledView4 orbit={true}>
  //         <Suspense fallback={<Html center>Loading.</Html>}>
  //           <FloatingCircleScene
  //             position={[-2,1.3,0]}
  //             color={'#ffda67'}
  //           />
  //         </Suspense>
  //       </StyledView4>
  //
  //       <Main>
  //         {/* main */}
  //         <DottedBackground>
  //           {/*Main*/}
  //           <div style={{
  //             height: "fit-content",
  //             padding: "96dvh 0 0 0",
  //             background: "transparent",
  //             // zIndex: 5,
  //           }}>
  //             <Container>
  //               <Column>
  //
  //                 <TwistSection />
  //                 <Spacer type="section"/>
  //
  //                 <BenefitsSection />
  //                 <Spacer type="section"/>
  //
  //                 <PricingPlans
  //                   selectedPlan={selectedPlan}
  //                   setSelectedPlan={setSelectedPlan}
  //                   billingData={billingData}
  //                   setBillingData={setBillingData}
  //                 />
  //                 <Spacer type=""/>
  //
  //                 <CTASection selectedPlan={selectedPlan} billingData={billingData}/>
  //                 <Spacer type="section"/>
  //
  //                 <ComplexitySection />
  //                 <Spacer type="section"/>
  //
  //                 <AddOnSection />
  //                 <Spacer type="section"/>
  //
  //                 {/*<AiSection />*/}
  //                 {/*<Spacer type="section"/>*/}
  //
  //                 {/*<BillingSection />*/}
  //                 {/*<Spacer type="section"/>*/}
  //
  //                 {/*<WhyUsSection />*/}
  //                 {/*<Spacer type="section"/>*/}
  //
  //                 <GetStartedSection selectedPlan={selectedPlan} billingData={billingData}/>
  //                 <Spacer type="section"/>
  //               </Column>
  //             </Container>
  //           </div>
  //
  //         </DottedBackground>
  //       </Main>
  //     </DivColStartCenter>
  //     <Footer />
  //   </>
  // );
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
  height: 100dvh;
  width: 100%;
  overflow: hidden;
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
  padding-top: 100dvh;
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 50vw);
  right: calc(50% - 50vw);
  //border-radius: 50px;
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
