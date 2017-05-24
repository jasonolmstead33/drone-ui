import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import React from 'react';
import Breadcrumb, {SEPARATOR} from '../../components/layout/breadcrumb';

class Header extends React.Component {
  componentDidMount() {
    document.title = 'dashboard settings | drone';
  }

  render() {
    const {account} = this.props.params;
    if (!account) {
      return <Breadcrumb elements={['Dashboard Settings']}/>;
    }

    return (
      <Breadcrumb elements={[
        <Link to={'/dashboard-settings/'}>Dashboard Settings</Link>,
        SEPARATOR,
        <Link to={`/dashboard-settings/${account}`}>{account}</Link>
      ]}/>
    );
  }
}

export default branch({}, Header);
