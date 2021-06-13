import React from 'react';
import { useQuery } from '@apollo/client';

import { REPO_DETAIL_QUERY } from '../../../libraries/queries';

// const REPO_DETAIL_QUERY = gql`
//   query repoDetailQuery($name: String!, $owner: String!) {
//     repository(name: $name, owner: $owner) {
//       id
//       name
//       description
//       forks {
//         totalCount
//       }
//       isPrivate
//       languages(first: 100) {
//         nodes {
//           id
//           name
//         }
//       }
//       stargazerCount
//     }
//   }
// `;

function RepoDetail({ repoSelected, userName }) {
  const { loading, error, data } = useQuery(REPO_DETAIL_QUERY, {
    variables: {
      name: repoSelected,
      owner: userName,
    },
  });

  if (loading) return <h2>loading...</h2>;

  if (error) return <h2> UPS, something is wrong, try again!!</h2>;

  return (
    <div>
      <p>
        <strong>Name: </strong>
        <span>{data.repository.name}</span>
      </p>

      <p>
        <strong>Description: </strong>
        <span>{data.repository.description}</span>
      </p>

      <p>
        <strong>Forks Count: </strong>
        <span>{data.repository.forks.totalCount}</span>
      </p>

      <p>
        <strong>Stars: </strong>
        <span>{data.repository.stargazerCount}</span>
      </p>

      <div>
        <strong>Language: </strong>
        {data.repository.languages.nodes.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    </div>
  );
}

export default RepoDetail;
