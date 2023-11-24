import React, { useState, useLayoutEffect } from 'react';
import { Form, Card, Image, Icon, Button } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('example-user');
  const [userName, setuserName] = useState('');
  const [url, setUrl] = useState('https://github.com/example');
  const [followers, setFollowers] = useState('43');
  const [following, setFollowing] = useState('0');
  const [repos, setRepos] = useState('1');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');


  const setData = ({
    name, login, html_url, followers, following, public_repos, avatar_url
  }) => {
    setName(name);
    setuserName(login);
    setUrl(html_url);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  }

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#E4F8E3"
  });

  return (
    <div>
      <div className='navbar'>GithubViewer</div>
      <div className='search'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Github Username' name='github user' onChange={handleSearch} />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      <div className='card'>
        <Card>
          <Image src={avatar}
            wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{userName}</Card.Header>

          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon url='linkify' />
              {url}
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='code' />
              {repos} Repo(s)
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {following} Following
            </a>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default App;
