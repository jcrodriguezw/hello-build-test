import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  height: 72px;
  align-items: center;

  & > div:nth-of-type(1) {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
