import plansData from "../../../../data/plans.json";
import React from "react";
import {RowCentered, StyledButton} from "@/components/dom/Styled";

type CTASectionProps = {
  selectedPlan: number;
}
const CTASection: React.FC<CTASectionProps> = ({ selectedPlan }: CTASectionProps) => {
  return (
    <>
      <RowCentered style={{zIndex: "2", flexWrap: "wrap", justifyContent: "center"}}>
        <StyledButton
          style={{
            backgroundColor: 'transparent',
            // border: '1px solid #212121',
            color: '#212121',
            minWidth: "320px",
          }}
        >Book free 15min intro call</StyledButton>
        {
          selectedPlan !== null ? (
            <StyledButton style={{minWidth: "320px"}}>Subscribe as {plansData.plans[selectedPlan].name}</StyledButton>
          ) : (
            <StyledButton style={{minWidth: "320px"}} disabled={true}>Select Plan</StyledButton>
          )
        }
      </RowCentered>
    </>
  )
}
export default CTASection;