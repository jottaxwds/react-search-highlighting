import styled from "styled-components";

export const CheckGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const GroupLabel = styled.label`
  color: #000000;
  margin-right: 0.8rem;
`;

export const Label = styled.label`
  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

export const Wrapper = styled.div`
  label {
    cursor: pointer;
    margin: 0;
    border: 1px solid white;
    color: #000000;
    background: rgba(0,0,0,0);
    padding: 0.4rem 0.8rem;
  }
  input:checked + label {
    background: #D9EEF7;
    color: #000000;
  }
`;
