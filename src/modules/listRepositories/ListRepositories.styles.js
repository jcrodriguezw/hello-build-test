import styled from 'styled-components';
import { Card } from 'antd';

export const RepositoriesWrapper = styled.section`
  display: grid;
  grid-template-columns: 400px 1fr 400px;
  column-gap: 4em;
  padding: 5em;
  margin: 0 auto;
`;

export const StyledCard = styled(Card)`
  width: 340px;
  padding: 2em;
  height: 500px;
`;

export const FollowContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  column-gap: 1em;
`;

export const DetailWrapper = styled.div`
  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 2em;
  }

  & > div > div.repoItem {
    padding: 1em;
    margin: 1em 0;
    box-shadow: 0 3px 6px #f0f0f0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;

    &:hover {
      background: #c5f7d9;
      cursor: pointer;
    }

    h3 {
      font-size: 20px;
      color: #4b0082;
    }
  }

  & .star {
    font-size: 30px;
  }

  & .filled {
    color: orange;
  }
`;

export const FavoritesSection = styled.div`
  width: 100%;

  & .favorite-item {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
    color: orange;
    font-size: 20px;

    & > h4 {
      margin: 0;
      margin-left: 0.5em;
    }
  }
`;
