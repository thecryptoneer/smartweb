import React from "react";
import {SectionHeadline, Text} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";

export default function TwistSection() {
  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <SectionHeadline style={{zIndex: 3}}>What&apos;s the twist?</SectionHeadline>
      <Spacer type="headline"/>
      <Text style={{textAlign: "center"}}>
        Expert software and design services at your fingertips.
        <br/>
        <br/>
        All plans can be paused and continued anytime and as often as you need.
        <br/>
        <br/>
        We create outstanding experiences for you and your users.
        <br/>
        <br/>
        It&apos;s up to you how frequently you use our services.
      </Text>
    </div>
  )
}
