import React, { useEffect, useState, useContext } from 'react';
import { Card, Modal, Button, Input } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import moment from 'moment';
import { useQuery } from '@apollo/client';

import { USER_QUERY } from '../../libraries/queries';
import { AuthContext } from '../../context/AuthContext';
import RepoDetail from './components/RepoDetail.component';
import {
  RepositoriesWrapper,
  StyledCard,
  FollowContent,
  DetailWrapper,
  FavoritesSection,
} from './ListRepositories.styles';

const { Meta } = Card;

function ListRepositories() {
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const { favorites: storageFav, githubUserName } = isAuthenticated;

  const [repoSelected, setRepoSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [githubUserNameModal, setGithubUserNameModal] = useState(false);
  const [githubUser, setGithubUser] = useState('');
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      name: githubUserName,
    },
  });

  useEffect(() => {
    if (githubUserName) setGithubUserNameModal(true);
  }, [githubUserName]);

  useEffect(() => {
    if (storageFav) {
      setFavorites(storageFav);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageFav]);

  function favoriteList(e, repo) {
    e.stopPropagation();

    const isAdded = favorites.find((favorite) => favorite.id === repo.id);

    let newFavorites;

    if (isAdded) {
      newFavorites = favorites.filter((favorite) => favorite.id !== repo.id);
    } else {
      newFavorites = [...favorites, repo];
    }

    const newStorage = {
      ...isAuthenticated,
      favorites: newFavorites,
    };

    setFavorites(newFavorites);

    setAuthenticated(newStorage);
    localStorage.setItem('user', JSON.stringify(newStorage));
  }

  function checkFavorites(repo) {
    const isFavorite = favorites.find((favorite) => favorite.id === repo.id);

    if (!isFavorite) return <StarOutlined className="star" />;
    else return <StarFilled className="star filled" />;
  }

  function onGithubUserNameChange() {
    const newUserData = {
      ...isAuthenticated,
      githubUserName: githubUser,
    };

    setAuthenticated(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
    setGithubUserNameModal(true);
  }

  const filterRepo = data?.user.repositories.nodes.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!githubUserNameModal)
    return (
      <Modal
        title="Repository Detail"
        visible={!githubUserNameModal}
        footer={[
          <Button type="primary" key="back" onClick={onGithubUserNameChange}>
            Save
          </Button>,
        ]}
      >
        <p>Enter the Github username</p>
        <Input
          placeholder="Github UserName"
          onChange={(e) => setGithubUser(e.target.value)}
        />
      </Modal>
    );

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2> UPS, something is wrong, try again!!</h2>;

  return (
    <RepositoriesWrapper>
      <StyledCard
        hoverable
        cover={<img alt={data.user.name} src={data.user.avatarUrl} />}
      >
        <Meta
          title={data.user.name}
          description={
            <div>
              <p>Joined in {moment(data.user.created_at).format('YYYY')}</p>
              <FollowContent>
                <span>{data.user.following.totalCount} Following</span>
                <span>{data.user.followers.totalCount} Followers</span>
              </FollowContent>
            </div>
          }
        />
      </StyledCard>

      <DetailWrapper>
        <h2>Repositories</h2>

        <div>
          <Input
            placeholder="search a repo"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {filterRepo?.map((repo) => (
            <div
              key={repo.id}
              className="repoItem"
              onClick={() => setRepoSelected(repo.name)}
            >
              <h3>{repo.name}</h3>
              <div onClick={(e) => favoriteList(e, repo)}>
                {checkFavorites(repo)}
              </div>
            </div>
          ))}
        </div>
      </DetailWrapper>

      <FavoritesSection>
        <h2>Favorites Repositories</h2>

        <div>
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <StarFilled />
              <h4>{favorite.name}</h4>
            </div>
          ))}
        </div>
      </FavoritesSection>

      <Modal
        title="Repository Detail"
        visible={repoSelected}
        onCancel={() => setRepoSelected(false)}
        footer={[
          <Button
            type="primary"
            key="back"
            onClick={() => setRepoSelected(false)}
          >
            Return
          </Button>,
        ]}
      >
        <RepoDetail repoSelected={repoSelected} userName={githubUserName} />
      </Modal>
    </RepositoriesWrapper>
  );
}
export default ListRepositories;
