import {branch} from 'baobab-react/higher-order';
import PageContent from '../../components/layout/content';
import React from 'react';
import {Switch} from 'react-mdl';
import {events, GET_DASHREPO_LIST, POST_DASHREPO, DEL_DASHREPO} from '../../actions/events';

import './index.less';

class Content extends React.Component {

  componentDidMount() {
    events.emit(GET_DASHREPO_LIST);
  }

  handleSwitch(repo) {
    if (repo.selected) {
      events.emit(DEL_DASHREPO, repo);
    } else {
      events.emit(POST_DASHREPO, repo);
    }
  }

  render() {
    let {user, repos, params} = this.props;
    if (!user || !repos) {
      return <div>Loading ...</div>;
    }

    if (repos.length === 0) {
      return (
          <div className="alert alert-empty">Your repository list is empty.</div>
        );
    }

    // sort repositories by name ascending
    // TODO move this to the data handler
    repos.slice(0).sort((a, b) => {
      return a.full_name.localeCompare(b.full_name);
    });

    // filter repositories by owner
    if (params.account) {
      repos = repos.filter((repo) => {
        return params.account == repo.owner;
      });
    }

    function repoList(repo) {
      return (
        <div key={repo.full_name}>
          <h3>{repo.full_name}</h3>
          <div>
            <Switch checked={!!repo.selected} onChange={this.handleSwitch.bind(this, repo)}/>
          </div>
        </div>
      );
    }

    return (
      <span>
        <PageContent className="user-profile">
          {repos.map(repoList.bind(this))}
        </PageContent>
      </span>
    );
  }
}

export default branch({
  user: ['user'],
  token: ['user', 'token'],
  repos: ['user', 'dashrepos']
}, Content);
