import React from 'react';
import _ from 'lodash';

import './build_leaderboard.less';

export default
class BuildLeaderBoard extends React.Component {
  render() {
    const {builds} = this.props;

    let authors=_(builds).groupBy('author_email').map(function(items,author_email){
      return {author_avatar:items[0].author_avatar,author:items[0].author,author_email:author_email ,status:_.groupBy(items,'status')};
    }).orderBy('status.success','desc').slice(0,4).value();

    return (
      <section className="build-leaders">
        <h1 className="bar">This Week's Build Leaders <i className="fa fa-users"></i></h1>

        <ol>
          {authors.map((author) => {
            return (
          <li key={author.author_email}>
            <div className="container">
              <div className="developer">
                <img src={author.author_avatar} className="builder"/>
              </div>
              <span className="successes">{author.status.success?author.status.success.length:0}</span>
              <span className="failures" >{author.status.failure?author.status.failure.length:0}</span>
            </div>
          </li>
            );
            })}
        </ol>
      </section>
    );
  }
}
