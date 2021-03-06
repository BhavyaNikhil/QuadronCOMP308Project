import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button, ButtonGroup, ButtonToolbar, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function SendEmergencyAlert(props) {

  // initial values for an alert
  const [alert, setAlert] = useState({
    message: "EMERGENCY ALERT!! NEED URGENT HELP!", // default message
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const apiUrl = "http://localhost:3000/api/alert/create";

  const saveAlert = (e) => {

    setShowLoading(true);
    e.preventDefault();
    // set a value to each field
    const data = {
      message: alert.message,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        if (result.data.screen === "error") {
          setShowError(true);
          console.log("error: " + showError);
        } else {
          props.history.push("/emergencyAlertHistory");
        }
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setAlert({ ...alert, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid  d-flex justify-content-center margins bg-Color fore-Color">
          <div className="col-6 div-style bg-Color3">
          <center>
          <h2 className="h2-style">Send Emergency Alert</h2>
          </center>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          {showError && (
            <span>
              Unable to register! Please check the entered details and try again.
            </span>
          )}
            <Form onSubmit={saveAlert}>

              <Form.Group>
                <Form.Label className="font-weight-bold">
                  Enter Message
              </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  name="message"
                  id="message"
                  className="textarea"
                  value={alert.message}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="info col-6" type="submit">
                  Send Alert
                </Button>
              </div><br></br>
              <Form.Group>
                <Form.Label className="font-weight-bold">
                  Emergency Alert Sender
                </Form.Label>
                <br />
                Your alert will automatically be sent to:<br />
              - Emergency Health Service<br />
              - Your hospital
              </Form.Group>
            </Form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SendEmergencyAlert);
