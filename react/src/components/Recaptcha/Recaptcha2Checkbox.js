import React, {useCallback, useRef, useState} from 'react';
import {Button, Col, Form, FormGroup, Row} from 'reactstrap';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha2Checkbox = () => {
  const [recaptcha, setRecaptcha] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const recaptchaRef = useRef();

  const onRecaptchaChange = useCallback(value => setRecaptcha(value), []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      setError('');
      setSuccess('');

      fetch(`${process.env.REACT_APP_GATEWAY_API}/verify-recaptcha/checkbox`, {
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

      recaptchaRef.current.reset();
    },
    [recaptcha]
  );

  return (
    <div className="mb-4 p-4">
      <Row>
        <Col md="9" className="mx-auto mb-4">
          {!!error && error.ErrorCode === 'EC_Invalid_Recaptcha' && (
            <span className="text-danger">Invalid Recaptcha</span>
          )}
          {!!success && <span className="text-success">Success Recaptcha</span>}
        </Col>
      </Row>
      <Row>
        <Col md="4" className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                className="d-flex justify-content-center"
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY_V2}
                onChange={onRecaptchaChange}
              />
            </FormGroup>
            <Button type="submit" color="primary" disabled={!recaptcha}>
              Запази
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Recaptcha2Checkbox;
