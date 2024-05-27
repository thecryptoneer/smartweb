import React from "react";
import {RowCentered, SectionHeadline, SectionSubHeadline, StyledButton, Text} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";
import {PlanCard, PlanDetails} from "@/components/dom/Plans/PricingPlans";
import styled from "styled-components";

export default function BenefitsSection() {
  const [showBenefits, setShowBenefits] = React.useState(true);
  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <SectionHeadline>Membership benefits</SectionHeadline>
      <Spacer type="headline"/>
      <SectionSubHeadline>Get the most out of your subscription</SectionSubHeadline>
      <Spacer type="block"/>

      {
        showBenefits && (
          <>
            <PlanDetailsGrid>
              {
                [
                  {
                    title: "Unique and all yours",
                    text: "All designs and code we create for you are 100% yours.",
                  },
                  {
                    title: "Unlimited revisions",
                    text: "We'll keep iterating until you're 100% satisfied with the outcome.",
                  },
                  {
                    title: "Lightning-fast delivery",
                    text: "Receive stunning results within two business days on average.",
                  },
                  {
                    title: "Always available",
                    text: "Simply add tasks and manage your queue with a Trello Board.",
                  },
                  {
                    title: "Fixed pricing",
                    text: "No hidden fees, no surprises. Pay the same fixed rate every time.",
                  },
                  {
                    title: "All-in-one solution",
                    text: "Get design, code, and everything web-related in one place.",
                  },
                ].map((benefit, idx) => (
                  <PlanCard
                    key={'addOn'+idx}
                    style={{
                      paddingTop: "30px",
                      width: "100%",
                      margin: "0",
                      padding: "30px",
                      background: "rgb(132 195 255 / 6%)",
                  }}
                  >
                    <SectionSubHeadline>{benefit.title}</SectionSubHeadline>
                    <Text style={{marginTop: "20px"}}>{benefit.text}</Text>
                    <br/>
                  </PlanCard>
                ))
              }
            </PlanDetailsGrid>
          </>
        )
      }
    </div>
  )
}

// responsive grid
// small 2 columns
// >= medium 3 columns
const PlanDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr
  }
`;
