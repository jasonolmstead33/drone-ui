import { branch } from 'baobab-react/higher-order';
import PageContent from '../../components/layout/content';
import React from 'react';
import {Link} from 'react-router';
import BuildListItem from '../../components/build_list_item';
import BuildHealth from '../../components/dashboard/build_health';
import { events, GET_DASHBOARD_FEED } from '../../actions/events';
import StackedBarChart from '../../components/stacked_bar_chart';
import _ from 'lodash';

import './index.less';

import  '../../../node_modules/react-vis/main.css';

class Content extends React.Component {
  componentDidMount () {
    const {user} = this.props;
    var d = new Date();
    d.setDate(d.getDate()-7);
    events.emit(GET_DASHBOARD_FEED, {user_email:user.email,since: d.getTime()/1000|0});
  }

  componentWillMount () {

  }

  render () {
    let {user, dashfeed, params} = this.props;

    var data = [], dataAuthor = [];


    if (!user || !user.login) {
      return (
        <PageContent fluid className="dashboard">
            <div className="alert">Welcome to Drone, OMNI Team. Please <a href="/login">login</a> to proceed.</div>
        </PageContent>
      );
    }
    if (dashfeed) {
      //dashfeed=_.filter(dashfeed,{author_email:user.email});

      var repos = _(dashfeed).groupBy('name').map(function(items,name){
        return {name:name,builds:items};
      }).value();

      return (
        <PageContent fluid className="dashboard">
          <BuildHealth builds={dashfeed}/>
          {repos.map((repo) => {
            var data=_(repo.builds).groupBy('status')
              .map(function(items,status){
                return {x:status,y:items.length};
              }).value();

            return (
              <div>
                <div>{repo.name}</div>
                {repo.builds.map((build) => {
                  return (
                    <Link key={`/${build.owner}/${build.name}/${build.number}`} to={`/${build.owner}/${build.name}/${build.number}`}>
                      <BuildListItem build={build}/>
                    </Link>
                  );
                })}
                <StackedBarChart data={data}/>
              </div>
            );
          })}

        </PageContent>
      );
    }


    return (
      <PageContent fluid className="dashboard">
        <div className="alert">Welcome to Drone.</div>
      </PageContent>
    );
  }
}

export default branch({
  dashfeed: ['dashfeed'],
  user: ['user']
}, Content);
