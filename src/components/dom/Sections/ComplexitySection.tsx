import plansData from "../../../../data/plans.json";
import React from "react";
import {Text, SectionHeadline, Row} from "@/components/dom/Styled";
import {PlanCard, PlanDetails, PlanHeader, PlanTitle} from "@/components/dom/Plans/PricingPlans";
import styled from "styled-components";
import Spacer from "@/components/dom/Spacer/Spacer";

export default function ComplexitySection () {
  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <br/>
      <br/>
      <SectionHeadline>What is task complexity?</SectionHeadline>
      <Spacer type="headline"/>
      <Text style={{textAlign: "center"}}>
        We categorize tasks into three levels of complexity <br/>enabling fast delivery times and best-in-class results.
        <br/>
        <br/>
        <b>Here are some examples:</b>
      </Text>
      <Spacer type="block"/>

      <Row style={{width: "100%", maxWidth: "1280px", flexWrap: "wrap", zIndex: "2"}}>
        {
          plansData.plans.map((plan, index) => (
            <PlanCard key={'plan'+index}
                      id={index === 0 ? 'tier-1' : index === 1 ? 'tier-2' : 'tier-3'}
            style={{
              minWidth: "320px",
              background: index === 0 ? 'rgba(202,255,202,0.04)' : index === 1 ? 'rgba(0,0,255,0.04)' : 'rgba(255,0,0,0.04)',
            }}>
              <PlanHeader>
                <PlanTitle>{index === 0 ? 'Basic' : index === 1 ? 'Advanced' : 'Complex'}</PlanTitle>
                {/*<Text  style={{marginTop: "10px"}}>Tier {index + 1}</Text>*/}
                <Text  style={{marginTop: "20px", fontSize: "12px"}}>On average</Text>
                <DeliveryChip style={{marginTop: "5px"}}><b>
                  {
                    index === 0 ? "Delivered within 48h" :
                      index === 1 ? "Delivered within 3 days" :
                        index === 2 ? "Delivered within 7-10 days" : ""
                  }
                </b></DeliveryChip>
                <Example style={{marginTop: "20px"}}><b>
                  {
                    index === 0 ? "Covers most standard tasks" :
                      index === 1 ? "Covers most advanced tasks" :
                        index === 2 ? "Covers most complex tasks" : ""
                  }
                </b></Example>

              </PlanHeader>
              <PlanDetails>

                <Spacer />

                <ul style={{listStyle: "outside", paddingLeft: "30px"}}>
                  {plan.design_examples.map((example, idx) => (
                    <li key={'design'+idx}>
                      <Example
                        style={{
                          marginBottom: idx === 0 ? '10px' : '0',
                          fontWeight: idx === 0 ? 'bold' : 'normal'
                        }}
                        key={idx}>
                        {example}
                      </Example></li>
                  ))}
                </ul>

                <ul style={{listStyle: "outside", paddingLeft: "30px"}}>
                  {plan.dev_examples.map((example, idx) => (
                    <li key={'dev'+idx}>
                      <Example
                        style={{
                          marginBottom: idx === 0 ? '10px' : '0',
                          fontWeight: idx === 0 ? 'bold' : 'normal'
                        }}
                        key={idx}>
                        {example}
                      </Example>
                    </li>
                  ))}
                </ul>

              </PlanDetails>
            </PlanCard>
          ))
        }
      </Row>
    </div>
  )
}

export const noScrollBarDiv = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RowNoScrollBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  gap: 20px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Example = styled.p`
  margin: 0;
  line-height: 2;
  font-size: 16px;
`;

export const DeliveryChip = styled.div`
  background: #212121;
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  height: 27px;
  padding: 4px 16px;
`;
