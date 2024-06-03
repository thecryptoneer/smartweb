import React from "react";
import {RowCentered, SectionHeadline, SectionSubHeadline, StyledButton, Text} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";
import {PlanCard, PlanDetails} from "@/components/dom/Plans/PricingPlans";

export default function AddOnSection() {
  const [showAddOns, setShowAddOns] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <SectionHeadline>Flexible Add-Ons</SectionHeadline>
      <Spacer type="headline"/>
      <SectionSubHeadline>Deadline is close? You need help with a more complex task?</SectionSubHeadline>
      <Text style={{textAlign: "center"}}>
        We offer a wide range of add-ons to meet you where you are.
      </Text>
      <Spacer/>

      {/*<StyledButton*/}
      {/*  style={{marginTop: "0"}}*/}
      {/*  onClick={() => setShowAddOns(!showAddOns)}>*/}
      {/*  {*/}
      {/*    showAddOns ? "Hide" : "Show"*/}
      {/*  } Add-Ons*/}
      {/*</StyledButton>*/}

      {
        showAddOns && (
          <>
            <Spacer type="block"/>
            <RowCentered style={{width: "100%", margin: "0", flexWrap: "wrap", justifyContent: "center"}}>

              {
                [
                  {
                    title: "Fastlane Delivery",
                    text: "Need it faster?",
                    details: [
                      {text: "Basic within 24h", value: "$100"},
                      {text: "Advanced within 48h", value: "$250"},
                      {text: "Complex within 5 days", value: "$500"},
                    ]
                  },
                  {
                    title: "Complexity Boost",
                    text: "Don't want to upgrade?",
                    details: [
                      {text: "1x advanced task", value: "starting at $500"},
                      {text: "1x complex task", value: "starting at $1000"},
                    ]
                  },
                  {
                    title: "Additional tasks",
                    text: "Only available if subscribed.",
                    details: [
                      {text: "Basic", value: "$100 / task"},
                      {text: "Advanced", value: "$250 / task"},
                      {text: "Complex", value: "$500 / task"},
                    ]
                  },
                  {
                    title: "Additional Calls",
                    text: "Need more time?",
                    details: [
                      {text: "15 minutes", value: "$50"},
                    ]
                  },
                ].map((addOn, idx) => (
                  <PlanCard key={'addOn'+idx} style={{paddingTop: "30px", width: "100%", margin: "0", padding: "30px"}}>
                    <SectionSubHeadline>{addOn.title}</SectionSubHeadline>
                    <Text style={{marginTop: "20px"}}>{addOn.text}</Text>
                    <br/>
                    {/*<br/>*/}
                    {/*<PlanDetails>*/}
                    {/*  {*/}
                    {/*    addOn.details.map((item, idx) => (*/}
                    {/*      <div style={{display: "flex", justifyContent: "space-between"}} key={'addOnItem'+idx}>*/}
                    {/*        {item.text}:*/}
                    {/*        {*/}
                    {/*          isLoggedIn ? (<strong> {item.value}</strong>) : (<strong>Login required</strong>)*/}
                    {/*        }*/}
                    {/*      </div>*/}
                    {/*    ))*/}
                    {/*  }*/}
                    {/*</PlanDetails>*/}
                    <br/>
                  </PlanCard>
                ))
              }
            </RowCentered>
          </>
        )
      }
    </div>
  )
}
