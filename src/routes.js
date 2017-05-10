import Page from './components/layout/page';
import Pages from './pages/index';
import React from 'react';
import {IndexRoute, Route} from 'react-router';

export const routes = (
  <Route path="/" component={Page}>
    <IndexRoute components={{
      pageHead: Pages.Home.Header,
      pageContent: Pages.Home.Content,
      pageSidebar: Pages.Repository.Sidebar
    }}/>
    <Route path="/account" components={{
      pageHead: Pages.UserProfile.Header,
      pageContent: Pages.UserProfile.Content,
      pageSidebar: Pages.UserProfile.Sidebar
    }}/>
    <Route path="/account/:account" components={{
      pageHead: Pages.UserProfile.Header,
      pageContent: Pages.UserProfile.Content,
      pageSidebar: Pages.UserProfile.Sidebar
    }}/>
    <Route path="/dashboard" components={{
      pageHead: Pages.Dashboard.Header,
      pageContent: Pages.Dashboard.Content
    }}/>
    <Route path="/dashboard-settings" components={{
      pageContent: Pages.DashboardSettings.Content,
      pageSidebar: Pages.DashboardSettings.Sidebar
    }}/>
    <Route path="/dashboard-settings/:account" components={{
      pageHead: Pages.DashboardSettings.Header,
      pageContent: Pages.DashboardSettings.Content,
      pageSidebar: Pages.DashboardSettings.Sidebar
    }}/>
    <Route path="/:owner/:name" components={{
      pageHead: Pages.Repository.Header,
      pageContent: Pages.Repository.Content,
      pageSidebar: Pages.Repository.Sidebar,
      pageToolbar: Pages.Repository.Toolbar
    }}/>
    <Route path="/:owner/:name/settings" components={{
      pageHead: Pages.RepositorySettings.Header,
      pageContent: Pages.RepositorySettings.Content,
      pageSidebar: Pages.Repository.Sidebar,
      pageToolbar: Pages.Repository.Toolbar
    }}/>
    <Route path="/:owner/:name/settings/badges" components={{
      pageHead: Pages.RepositoryBadge.Header,
      pageContent: Pages.RepositoryBadge.Content,
      pageSidebar: Pages.Repository.Sidebar,
      pageToolbar: Pages.Repository.Toolbar
    }}/>
    <Route path="/:owner/:name/:number" components={{
      pageHead: Pages.Build.Header,
      pageContent: Pages.Build.Content,
      pageSidebar: Pages.Repository.Sidebar,
      pageToolbar: Pages.Repository.Toolbar
    }}/>
    <Route path="/:owner/:name/:number/:job" components={{
      pageHead: Pages.Build.Header,
      pageContent: Pages.Build.Content,
      pageSidebar: Pages.Repository.Sidebar,
      pageToolbar: Pages.Repository.Toolbar
    }}/>
  </Route>
);
