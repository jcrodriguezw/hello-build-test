import styled from 'styled-components';
import { Form } from 'antd';
import back_logo from '../../assets/back_logo.png';

export const SignInContainer = styled.section`
  width: 1280px;
  border: 1px solid grey;
  border-radius: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 10vh auto;

  background-image: url(${back_logo});
  background-size: cover;
`;

export const StyledForm = styled(Form)`
  width: 480px;
  min-height: 700px;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;

  & > div {
    text-align: center;

    & > img {
      margin-bottom: 2em;
      border-radius: 10px;
    }
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > h2 {
    color: #ffffff;
    font-size: 30px;
  }
`;

export const StyledChildrenWrapper = styled.div`
  width: 300px;

  div {
    display: block;
    text-align: center;
    margin: 0.5em auto;
  }
`;
