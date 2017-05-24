import React from 'react';
import _ from 'lodash';

import './build_health.less';


export default
class BuildHealth extends React.Component {
  render() {
    const {builds} = this.props;

    let buildStats=_(builds).groupBy('status').value();
    let failureCount=buildStats.failure?buildStats.failure.length:0;
    let successCount=buildStats.success?buildStats.success.length:0;
    let failureBarLength= (failureCount/ ( successCount+ failureCount) ) * 100;
    let failureStyle={
      width: 'calc( '+failureBarLength+'% - 25px )'
    };

    return (
      <section className="build-health">
        <h1 className="bar">This Week's Build Health <i className="fa fa-medkit"></i></h1>

        <div className="build-count">
          <h2>Builds</h2>
          <div className="count">{builds.length}</div>
        </div>

        <div className="success-fail">
          <h2>Successes</h2>
          <h2>Failures</h2>
          <div className="build-bar">
            <div className="success">{successCount}</div>
            <div className="failure" style={failureStyle}><span>{failureCount}</span></div>
          </div>
        </div>
      </section>
    );
  }
}
