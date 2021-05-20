// @flow strict
import { Layout, Menu } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Crypto, { MarketIndex } from './pages/Crypto/MarketIndex';
import Home from './pages/Home';

const { Header, Content, Sider } = Layout;

export default function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/crypto">Crypto</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Switch>
              <Route path="/crypto">
                <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Link to="/crypto/market_index">Market Index</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/crypto/performance">Performance</Link>
                  </Menu.Item>
                </Menu>
              </Route>
            </Switch>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/crypto">
                  <Crypto />
                </Route>
                <Route path="/crypto/market_index">
                  <MarketIndex />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}
