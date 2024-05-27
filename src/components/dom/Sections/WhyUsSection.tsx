import {Text, SectionHeadline, SectionSubHeadline} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";
import React from "react";

export default function WhyUsSection () {
  return (
    <>
      <SectionHeadline>Why Choose Us?</SectionHeadline>
      <Spacer type="headline"/>
      <div style={{maxWidth: "735px", marginBottom: "80px"}}>
        <SectionSubHeadline>Effortless Collaboration</SectionSubHeadline>
        <Text style={{textAlign: "center"}}>Eliminate the complexities of hiring and managing external teams. Seamlessly integrate with your companies workflow, allowing you to focus on scaling your business.</Text>
        <Spacer />
        <SectionSubHeadline>Flexible Engagement</SectionSubHeadline>
        <Text style={{textAlign: "center"}}>Tailor our services to your specific needs with a flat monthly fee. Scale up or down, pause or cancel anytime, ensuring you only pay for what you need.</Text>
        <Spacer />
        <SectionSubHeadline>Iterative Process</SectionSubHeadline>
        <Text style={{textAlign: "center"}}>Stay ahead with an iterative process that adapts to your changing requirements. Continuously refine and enhance your product to meet market demands.</Text>
      </div>
    </>
  )
}