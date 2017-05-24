import { branch } from 'baobab-react/higher-order';
import PageContent from '../../components/layout/content';
import React from 'react';
import TimeAgo from 'react-timeago';
import LatestBuilds from '../../components/dashboard/latest_builds';
import { events, GET_DASHBOARD_FEED } from '../../actions/events';
import BuildLeaderBoard from '../../components/dashboard/build_leaderboard';
import BuildHealth from '../../components/dashboard/build_health';
import RepoStatus from '../../components/dashboard/repo_status';
import _ from 'lodash';

import './index.less';

import  '../../../node_modules/react-vis/main.css';

class Content extends React.Component {
  componentDidMount () {
    var d = new Date();
    d.setDate(d.getDate() - d.getDay());
    events.emit(GET_DASHBOARD_FEED,{since: d.getTime()/1000|0});
  }

  componentWillMount () {

  }

  render () {
    let {user, dashfeed, params} = this.props;

    var d = new Date();
    d.setDate(d.getDate() - d.getDay());
    if (!user || !user.login) {
      return (
        <PageContent fluid className="dashboard">
          <div className="alert">Welcome to Drone, OMNI Team. Please <a href="/login">login</a> to proceed.</div>
        </PageContent>
      );
    }
    if (dashfeed) {

      let buildStats=_(dashfeed).groupBy('status').value();
      _.orderBy(buildStats.failure,'finished_at');
      let latestFailure=buildStats.failure?buildStats.failure[0]:null;
      return (
        <PageContent fluid className="dashboard">
          <section className="build-column">
            <section className="last-failure">
              { !latestFailure?(
                <h1><span className="good">No failed builds</span> today!</h1>)
              :(<h1>Last Failed Build: <span className="bad"><TimeAgo date={latestFailure.finished_at * 1000} /></span></h1>)}
            </section>
            <BuildHealth builds={dashfeed}/>
            <BuildLeaderBoard builds={dashfeed}/>
            <LatestBuilds builds={_(dashfeed).orderBy('finished_at','desc').value().slice(0,5)}/>
          </section>
          <section className="repo-column">
            <section className="last-failure">
              <h1>Watching repos since {d.toDateString()} </h1>
            </section>
            <RepoStatus builds={dashfeed}/>
          </section>
        </PageContent>
      );
    }


    return (
      <PageContent fluid className="dashboard">
      </PageContent>
    );
  }
}

export default branch({
  dashfeed: ['dashfeed'],
  user: ['user']
}, Content);
