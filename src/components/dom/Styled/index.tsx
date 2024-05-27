import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
  gap: 20px;
`;

export const RowCentered = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  gap: 20px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  //gap: 10px;
`;

export const Container = styled.div`
  padding: 0 20px;
  width: calc(100dvw - 40px);
`;

export const SectionHeadline = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  font-weight: bold;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  @media (min-width: 992px) {
    font-size: 2.5rem;
  }
  @media (min-width: 1201px) {
    font-size: 3rem;
  }
`;

export const SectionSubHeadline = styled.h3`
  text-align: center;
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  font-weight: bold;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.25rem;
  }
  @media (min-width: 1201px) {
    font-size: 1.5rem;
  }
`;

export const StyledButton = styled.button`
  background: #212121;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 1rem;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.125rem;
  }
  @media (min-width: 1201px) {
    font-size: 1.25rem;
  }
`;