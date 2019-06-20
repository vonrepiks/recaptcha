import React from 'react';
import {Container} from 'reactstrap';
import {Switch, Route, Redirect} from 'react-router-dom';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

import Navigation from '../Navigation/Navigation';
import Recaptcha3 from '../Recaptcha/Recaptcha3';
import Recaptcha2Checkbox from '../Recaptcha/Recaptcha2Checkbox';
import Recaptcha2Invisible from '../Recaptcha/Recaptcha2Invisible';

import styles from './App.module.scss';

const App = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY_V3}>
      <Container fluid className="text-center">
        <div className={`m-auto ${styles.app} bg-white`}>
          <Navigation />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Redirect to="/recaptcha-v3" />}
            />
            <Route path="/recaptcha-v3" component={Recaptcha3} />
            <Route
              path="/recaptcha-v2-checkbox"
              component={Recaptcha2Checkbox}
            />
            <Route
              path="/recaptcha-v2-invisible"
              component={Recaptcha2Invisible}
            />
          </Switch>
        </div>
      </Container>
    </GoogleReCaptchaProvider>
  );
};

export default App;
