import React, {useCallback, useState} from 'react';
import {Button, Col, Form, Row} from 'reactstrap';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

import {getRecaptchaTocken} from '../Common/Utils';

const Recaptcha3 = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const {executeRecaptcha} = useGoogleReCaptcha();

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      setError('');
      setSuccess('');

      const recaptcha = await getRecaptchaTocken(executeRecaptcha, 'homepage');

      fetch(`${process.env.REACT_APP_GATEWAY_API}/verify-recaptcha/3`, {
        method: 'POST',
        body: JSON.stringify({recaptcha}),
        headers: {'Content-Type': 'application/json'}
      })
        .then(res => res.json())
        .then(json => {
          if (!json.success) {
            throw json;
          }
          console.log(json);
          setSuccess(json);
        })
        .catch(err => {
          setError({ErrorCode: 'EC_Invalid_Recaptcha'});
          console.log(err);
        });
    },
    [executeRecaptcha]
  );

  return (
    <div className="bg-white p-4 ">
      <Row>
        <Col md="9" className="mx-auto mb-4">
          {!!error && error.ErrorCode === 'EC_Invalid_Recaptcha' && (
            <span className="text-error">Invalid Recaptcha</span>
          )}
          {!!success && <span className="text-success">Success Recaptcha</span>}
        </Col>
      </Row>
      <Row>
        <Col md="8" lg="4" className="mx-auto">
          <Form onSubmit={onSubmit}>
            <Button type="submit" color="primary" className="mb-4">
              Запази
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Recaptcha3;
