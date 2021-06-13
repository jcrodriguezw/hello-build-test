import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query userQuery($name: String!) {
    user(login: $name) {
      id
      avatarUrl
      name
      repositories(first: 100) {
        nodes {
          id
          name
        }
      }
      createdAt
      following {
        totalCount
      }
      followers {
        totalCount
      }
    }
  }
`;

export const REPO_DETAIL_QUERY = gql`
  query repoDetailQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      description
      forks {
        totalCount
      }
      isPrivate
      languages(first: 100) {
        nodes {
          id
          name
        }
      }
      stargazerCount
    }
  }
`;
