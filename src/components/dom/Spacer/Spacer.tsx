import React from "react";

type SpacerProps = {
  type: string;
};

const Spacer: React.FC<SpacerProps> = ({ type }) => {
  let height = 32;
  if (type === 'section') height = 100;
  if (type === 'headline') height = 32;
  if (type === 'block') height = 64;

  return <div style={{ height: `${height}px`, minHeight: `${height}px`, width: "100%" }}></div>;
};

export default Spacer;
