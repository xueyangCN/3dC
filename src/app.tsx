import * as React from 'react';
import {render} from 'react-dom';
interface IAppProps {}
interface IAppState {}
import { HashRouter, Route } from 'react-router-dom';
import './test/interface.tsx';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact children={HomePage} />
      <Route path="/ok/users" component={UsersPage} />
    </main>
  </div>
)
const Ps = () => (
    <div>
        <header >parent</header>
        <main>
            <Route path = '/ok' component={PrimaryLayout} />
        </main>
    </div>
)

const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const App = () => (
  <HashRouter>
    <Ps/>
  </HashRouter>
)

render(<App />, document.getElementById('root'))