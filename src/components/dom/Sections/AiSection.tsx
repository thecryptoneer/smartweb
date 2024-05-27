import {Text, SectionHeadline} from "@/components/dom/Styled";


export default function AiSection() {
  return (
    <>
      <SectionHeadline>What about AI?</SectionHeadline>
      <Text><b>Great question! As designers and developers, we are not afraid of AI.</b></Text>
      <Text style={{textAlign: "center"}}>
        We embrace AI to ideate, write better code, draft concepts and designs more efficiently.
        <br/>
        This enables us to focus on what matters most: pixel-perfect experiences for you and your users.
        <br/>
        <br/>
        <b>For us AI is a tool, not a replacement.</b>
      </Text>

      <Text style={{textAlign: "center"}}>
        We value human creativity, art and craftsmanship in all its forms.
        <br/>
        We value relationships and the ability to connect with you on a personal level.
        <br/>
        We value digital ownership and protection of everyone&apos;s rights and intellectual property.
        <br/>
      </Text>
    </>
  )
}