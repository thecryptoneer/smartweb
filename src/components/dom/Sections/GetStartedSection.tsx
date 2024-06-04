import plansData from "../../../../data/plans.json";
import React from "react";
import {RowCentered, SectionHeadline, StyledAnchor, StyledButton, Text} from "@/components/dom/Styled";
import Spacer from "@/components/dom/Spacer/Spacer";

type GetStartedProps = {
  selectedPlan: number;
};
const GetStartedSection: React.FC<GetStartedProps> = ({ selectedPlan }) => {
  return (
    <div style={{zIndex: "2", display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column"}}>
      <SectionHeadline>Lets get started</SectionHeadline>
      <Spacer type="headline"/>
      <Text style={{textAlign: "center"}}>
        We&apos;re excited to work with you. Let&apos;s build something great together.
      </Text>
      <RowCentered style={{zIndex: "2", flexWrap: "wrap", marginBottom: "100px", justifyContent: "center"}}>
        <StyledAnchor
          href={'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0JVhbd7Nv3lI-SmNblP65Y-T3OVIFLfNvuRJWy0L1N-nkvNnmjaF4LnaQWg8KHVUUvc7ibL1oF'}
          target={'_blank'} rel={'noreferrer nofollow'}
          style={{
            backgroundColor: 'transparent',
            // border: '1px solid #212121',
            color: '#212121',
            minWidth: "320px",
          }}
        >
          Book free 15min intro call
        </StyledAnchor>
        {
          selectedPlan !== null ? (
            <StyledButton style={{minWidth: "320px"}}>Subscribe as {plansData.plans[selectedPlan].name}</StyledButton>
          ) : (
            <StyledButton style={{minWidth: "320px"}}disabled={true}>Select Plan</StyledButton>
          )
        }
      </RowCentered>
    </div>
  )
}

export default GetStartedSection;