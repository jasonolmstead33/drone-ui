import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

import './repo_status.less';


export default
class RepoStatus extends React.Component {
  render() {
    const {builds} = this.props;

    let repos = _(builds).groupBy('name').map(function(items,name){
      return {name:name,latestBuild:_(items).orderBy('finished_at','desc').value()[0]};
    }).orderBy('finished_at','desc').value();

    return (
        <ul className="repos">
          {repos.map((repo) => {
            return (

              <li key={repo.name} className={repo.latestBuild.status}>
                <Link key={`/${repo.latestBuild.owner}/${repo.name}`} to={`/${repo.latestBuild.owner}/${repo.name}`}>
                  <div className="repo-name">{ repo.name }</div>
                </Link>
              </li>
            );
          })}
        </ul>
    );
  }
}
