import plansData from "../../../../data/plans.json";
import React, {useMemo} from "react";
import {RowCentered, StyledAnchor, StyledButton} from "@/components/dom/Styled";
import {Plan, plans} from "../../../../data/plans";
import styled from "styled-components";

type CTASectionProps = {
  selectedPlan: number;
  billingData: Plan;
}
const CTASection: React.FC<CTASectionProps> = ({ selectedPlan, billingData }: CTASectionProps) => {
  const paymentLink = useMemo( () => {
    return billingData ? billingData[plansData.plans[selectedPlan].id].paymentLink : null;
  }, [billingData, selectedPlan]);
  return (
    <>
      <RowCentered style={{zIndex: "2", flexWrap: "wrap", justifyContent: "center"}}>
        <StyledAnchor
          href={'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0JVhbd7Nv3lI-SmNblP65Y-T3OVIFLfNvuRJWy0L1N-nkvNnmjaF4LnaQWg8KHVUUvc7ibL1oF'}
          target={'_blank'} rel={'noreferrer nofollow'}
          style={{
            backgroundColor: 'transparent',
            // border: '1px solid #212121',
            color: '#212121',
            minWidth: "320px",
          }}
        >Book free 15min intro call</StyledAnchor>
        {
          selectedPlan !== null ? (
            <StyledAnchor href={paymentLink}
                          target={'_blank'} rel={'noreferrer nofollow'}
                          style={{minWidth: "320px"}}>
              Subscribe as {plansData.plans[selectedPlan].name}
            </StyledAnchor>
          ) : (
            <StyledButton style={{minWidth: "320px"}} disabled={true}>Select Plan</StyledButton>
          )
        }
      </RowCentered>
    </>
  )
}
export default CTASection;
