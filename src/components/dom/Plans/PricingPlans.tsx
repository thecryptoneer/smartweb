import React, {useState} from 'react';
import plansData from '../../../../data/plans.json';
import {Text, Row, SectionHeadline, SectionSubHeadline, StyledButton, Container} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";
import styled from "styled-components";
import {plans} from "../../../../data/plans";

type PricingPlanProps = {
  selectedPlan: number;
  setSelectedPlan: (index: number) => void;
}

const PricingPlans = ({selectedPlan, setSelectedPlan}: PricingPlanProps) => {

  const [billingData, setBillingData] = useState(plans[0]);

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column", width: "100%"}}>
      <SectionHeadline id="plans">Select your membership</SectionHeadline>
      <Spacer type="headline"/>
      <Text style={{textAlign: "center", maxWidth: "835px"}}>
        From basic tasks to complex projects, we offer three plans to meet your needs.
      </Text>
      <Spacer type="block"/>

      <div style={{display: "flex", flexDirection: "column"}}>
        <SectionSubHeadline>Select how many active days to top up!</SectionSubHeadline>
        <Spacer/>
        <ResponsiveFlexRowCol >
          <p style={{display: "flex", alignItems: "center", textAlign: "center"}}>Renew subscription after</p>
          <StyledButton
            style={{background: billingData.baseBillingCycle === plans[1].baseBillingCycle ? "#000" : '#21212180', margin: "0"}}
            onClick={
            () => setBillingData(plans[1])
          }>
            5
          </StyledButton>
          {/*<StyledButton*/}
          {/*  style={{background: billingData.baseBillingCycle === plans[1].baseBillingCycle ? "#000" : '#21212180'}}*/}
          {/*  onClick={*/}
          {/*  () => setBillingData(plans[1])*/}
          {/*}>*/}
          {/*  5*/}
          {/*</StyledButton>*/}
          <StyledButton
            style={{background: billingData.baseBillingCycle === plans[0].baseBillingCycle ? "#000" : '#21212180', margin: "0"}}
            onClick={
            () => setBillingData(plans[0])
          }>
            30
          </StyledButton>
          <StyledButton
            style={{background: billingData.baseBillingCycle === plans[2].baseBillingCycle ? "#000" : '#21212180', margin: "0"}}
            onClick={
            () => setBillingData(plans[2])
          }>
            60
          </StyledButton>
          <StyledButton
            style={{background: billingData.baseBillingCycle === plans[3].baseBillingCycle ? "#000" : '#21212180', margin: "0"}}
            onClick={
            () => setBillingData(plans[3])
          }>
            90
          </StyledButton>
          <p style={{display: "flex", alignItems: "center", textAlign: "center"}}>active day{billingData.baseBillingCycle === 1 ? '' : 's'} have been used.</p>
        </ResponsiveFlexRowCol>
      </div>
      <Spacer type="block"/>

      <Row style={{width: "100%", maxWidth: "1280px", flexWrap: "wrap", zIndex: "2"}}>
        {plansData.plans.map((plan, index) => (
          <PlanCard key={index} style={{
            minWidth: "320px",
            padding: "30px",
            background: index === 0 ? 'rgba(202,255,202,0.04)' : index === 1 ? 'rgba(0,0,255,0.04)' : 'rgba(255,0,0,0.04)',
          }}>
            <PlanHeader>
              <PlanTitle>{plan.name}</PlanTitle>
              {plan.recommended ? <RecommendedChip style={{
                backgroundColor: index === 1 ? '#212121' : '#21212120',
                color: index === 1 ? '#fff' : '#212121'
              }}>{plan.recommended}</RecommendedChip> : <div style={{height: "20px"}}></div>}
              <PlanPrice>{
                index === 0 ? `${formatter.format(billingData.standard.price)} / ${billingData.baseBillingCycle} active day${billingData.baseBillingCycle === 1 ? '' : 's'}` :
                  index === 1 ? `${formatter.format(billingData.pro.price)} / ${billingData.baseBillingCycle} active day${billingData.baseBillingCycle === 1 ? '' : 's'}` :
                    `${formatter.format(billingData.expert.price)} / ${billingData.baseBillingCycle} active day${billingData.baseBillingCycle === 1 ? '' : 's'}`
              }</PlanPrice>
              <br/>
              <p style={{textAlign: "center", fontSize: "12px"}}>
                {
                  billingData.baseBillingCycle === 1 ? "You will be charged daily unless you pause the subscription." : `*We will only charge you again once you've used ${billingData.baseBillingCycle} days
                of active service. We do not count paused days.`
                }
                </p>
              <SectionSubHeadline
                style={{fontSize: "18px", margin: "32px 0 32px 0", textAlign: "center", width: "100%"}}>{plan.idealFor}
              </SectionSubHeadline>
            </PlanHeader>
            <PlanDetails>
              {
                [
                  {text: "Task complexity", value: plan.requestComplexity},
                  {text: "Max. weekly tasks", value: plan.weeklyRequests},
                  {text: "Max. daily tasks", value: plan.dailyRequests},
                  {text: "Support", value: plan.support},
                  {text: "Calls", value: plan.calls},
                  // {text: "Latest auto-renewal", value: "after 12 months"},
                  {text: "Pause feature", value: plan.pauseFeature},
                  {text: "Parallel tasks", value: plan.parallelRequests},
                ].map((item, idx) => (
                  <div style={{display: "flex", justifyContent: "space-between"}} key={"task"+idx}>
                    {item.text}:
                    {
                      item.text === 'Task complexity' ?
                        <a href={index === 0 ? '#tier-1' : index === 1 ? '#tier-2' : '#tier-3'} style={{
                          color: '#212121',
                        }}>
                          <strong>{item.value === true ? 'Yes' : item.value}</strong>
                        </a> : <strong>{item.value === true ? 'Yes' : item.value}</strong>
                    }
                  </div>
                ))
              }

              <StyledButton onClick={() => {
                setSelectedPlan(index);
              }} style={{
                backgroundColor: selectedPlan === index ? '#212121' : 'transparent',
                border: selectedPlan === index ? '1px solid #212121' : '1px solid #000',
                color: selectedPlan === index ? '#fff' : '#212121'
              }}>
                {selectedPlan === index ? "Great choice" : 'Select'}
              </StyledButton>

              <p style={{marginTop: "10px", fontSize: "12px", textAlign: "center"}}>
                Billing cycles are dynamic based on your usage.
              </p>
            </PlanDetails>
          </PlanCard>
        ))}
      </Row>

      <Spacer type="block"/>

      <Text style={{textAlign: "center", maxWidth: "935px"}}>
        You can stretch one billing cycle over a year, or use it all in a month, or anything in between.

        No need to pay for idle-time. Remaining days can be used anytime in the future.
      </Text>
    </div>
  );
};

export const ResponsiveFlexRowCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const PlanCard = styled.div`
  //width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  padding: 40px 20px;
  max-width: 400px;
  margin: 0 auto;
  z-index: 2;
`;

export const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlanTitle = styled.h2`
  margin: 0;
  font-size: 32px;
`;

export const PlanPrice = styled.h3`
  margin: 20px 0 0 0;
  font-size: 22px;
  color: #212121;
`;

export const PlanDetails = styled.div`
  width: 100%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RecommendedChip = styled.div`
  background: #212121;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  height: 24px;
  padding: 4px 12px;
`;


export default PricingPlans;
