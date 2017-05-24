import BuildListItem from '../build_list_item';
import {Link} from 'react-router';
import React from 'react';

import './latest_builds.less';

export default
class LatestBuilds extends React.Component {
  render() {
    const {builds} = this.props;

   let latestBuilds= _(builds).orderBy('finished_at','desc').value().slice(0,5)
    return (
      <section className="latest-builds">
        <h1 className="bar">Latest Builds <i className="fa fa-rocket"></i></h1>
        <ol>
          {
            latestBuilds.map((build) => {
              return (
                <Link key={`/${build.owner}/${build.name}/${build.number}`} to={`/${build.owner}/${build.name}/${build.number}`}>
                  <BuildListItem build={build}/>
                </Link>
              );
            })
            }
        </ol>

      </section>
    );
  }
}
/**
 * Created by bhc9 on 2/28/17.
 */
