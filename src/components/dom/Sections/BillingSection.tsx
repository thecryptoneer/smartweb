import React from "react";
import {SectionHeadline, SectionSubHeadline, Text} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";

export default function BillingSection () {
  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <SectionHeadline>How does billing work?</SectionHeadline>
      <Spacer type="headline"/>
      <SectionSubHeadline style={{textAlign: "center"}}>
        It&apos;s like a prepaid SIM card for software and design services.
      </SectionSubHeadline>
      <Text style={{textAlign: "center", lineHeight: "1.8"}}>
        Your usage determines when you need to top up.
      </Text>
      <Spacer type="block"/>

      <div style={{width: "100%", margin: "0 auto"}}>

          <Text style={{display: "flex", justifyContent: "space-between", maxWidth: "835px", gap: "3vw"}}>
            <strong style={{fontSize: "20px", width: "100%",textAlign: "right"}}>Example scenarios</strong>
            <strong style={{fontSize: "20px", width: "100%", textAlign: "left"}}>Billing frequency</strong>
          </Text>
          <Spacer/>

          {
            [
              {
                scenario: "Subscription is always active",
                outcome: "every 30 days"
              },
              {
                scenario: "Subscription is used 3 days / week",
                outcome: "every 10 weeks"
              },
              {
                scenario: "Subscription is used 1 day / week",
                outcome: "every 30 weeks"
              },
              {
                scenario: "Subscription paused after 10 days",
                outcome: "paused *"
              }
            ].map((item, idx) => (
              <Text key={"scenario"+idx} style={{display: "flex", justifyContent: "space-between", maxWidth: "835px", gap: "3vw"}}>
                <span style={{width: "100%",textAlign: "right"}}>{item.scenario}</span>
                <strong style={{width: "100%", textAlign: "left"}}>{item.outcome}</strong>
              </Text>
            ))
          }

        <Spacer type="block"/>
        <Text style={{textAlign: "center", maxWidth: "835px"}}>
          *If you pause your subscription after 10 days, you&apos;ll have 20 days left to use at anytime in the future.
          You can continue in a few day, a week or a month. It&apos;s up to you.
        </Text>
      </div>
    </div>
  )
}