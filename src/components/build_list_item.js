import Humanize from './humanize';
import React from 'react';
import Status from './status';
import TimeAgo from 'react-timeago';

import './build_list_item.less';

export default
class RepoListItem extends React.Component {
  render() {
    const {build} = this.props;

    return (
      <div className="build-list-item">
        <div className="build-list-item-header">
          <span>{build.full_name}</span>
          <Status state={build.status} />
        </div>
        <div className="build-list-item-sub-header">
          <span>{build.branch}</span>
        </div>
        <div className="build-list-item-body">
          <div>
            <i className="material-icons">access_time</i>
            {build.started_at || build.created_at ?
              <TimeAgo date={(build.started_at || build.created_at) * 1000} /> :
              <span>--</span>
            }
          </div>
          <div>
            <i className="material-icons">timelapse</i>
            {build.finished_at ?
              <Humanize finished={build.finished_at} start={build.started_at} /> :
              build.started_at ?
                <TimeAgo date={(build.started_at || build.created_at) * 1000} /> :
                <span>--</span>
            }
          </div>
        </div>
      </div>
    );
  }
}
