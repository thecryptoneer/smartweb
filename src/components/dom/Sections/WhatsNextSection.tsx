import React from "react";
import {PlanCard} from "@/components/dom/Plans/PricingPlans";
import {RowCentered, SectionHeadline, SectionSubHeadline, Text} from "@/components/dom/Styled";

export default function WhatsNextSection () {
  return (
    <>
      <SectionHeadline>What happens after you subscribed?</SectionHeadline>
      <Text style={{textAlign: "center"}}>
        We have a simple 3-step process to get you started.
      </Text>
      <br/>
      <RowCentered style={{marginTop: "20px", width: "100%"}}>
        <PlanCard style={{width: "100%"}}>
          <SectionSubHeadline>Onboarding</SectionSubHeadline>
          <Text style={{marginTop: "20px", textAlign: "center"}}>We create a Trello board</Text>
          <Text style={{marginTop: "20px", textAlign: "center"}}>We invite you and your team.</Text>
        </PlanCard>
        <PlanCard style={{width: "100%"}}>
          <SectionSubHeadline>Create task(s)</SectionSubHeadline>
          <Text style={{marginTop: "20px", textAlign: "center"}}>Start adding your first tasks.</Text>
          <Text style={{marginTop: "20px", textAlign: "center"}}>Receive feedback within 24h</Text>
        </PlanCard>
        <PlanCard style={{width: "100%"}}>
          <SectionSubHeadline>Start Task</SectionSubHeadline>
          <Text style={{marginTop: "20px", textAlign: "center"}}>Receive first results</Text>
          <Text style={{marginTop: "20px", textAlign: "center"}}>Tell your friends about us</Text>
        </PlanCard>
      </RowCentered>
    </>
  )
}