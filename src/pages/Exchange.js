import React, { useEffect, useState } from "react";
import { Form, Input, message, Row, Col } from "antd";
import { API } from "../services/API";

export const Exchange = () => {
  const [state, setState] = useState([]);
  const [valueYouSend, setValueYouSend] = useState([]);
  const [valueTheyReceive, setValueTheyReceive] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    API.get("/exchange_rate")
      .then((response) => {
        setState(parseFloat(response.data.rate).toFixed(2));
      })
      .catch((e) => {
        message.error("Unable to get current currency rate!");
        setState("No Data!");
        console.log(e);
      });
  }, []);

  const handleFromChange = (value) => {
    if (value.target.value < 0) {
      setValueYouSend(Math.abs(value.target.value));
    } else {
      setValueYouSend(value.target.value);
    }
    if (
      (parseFloat(value.target.value).toFixed(2) * state).toFixed(2) === "NaN"
    ) {
      setValueTheyReceive("");
    } else {
      setValueTheyReceive(
        (parseFloat(Math.abs(value.target.value)).toFixed(2) * state).toFixed(2)
      );
    }
  };

  const handleToChange = (value) => {
    if (value.target.value < 0) {
      setValueTheyReceive(Math.abs(value.target.value));
    } else {
      setValueTheyReceive(value.target.value);
    }
    if (
      (parseFloat(value.target.value).toFixed(2) / state).toFixed(2) === "NaN"
    ) {
      setValueYouSend("");
    } else {
      setValueYouSend(
        (parseFloat(Math.abs(value.target.value)).toFixed(2) / state).toFixed(2)
      );
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "10%",
            paddingBottom: "8%",
          }}
        >
          Currency Exchange
        </h1>
        <Form layout="vertical" form={form}>
          You send
          <Form.Item name="youSend">
            <img
              src="https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-united-kingdom2x.png"
              alt="GBP"
              style={{ paddingRight: 10 }}
            ></img>
            <Input
              type="number"
              value={valueYouSend}
              onChange={handleFromChange}
              style={{ width: "30%" }}
              placeholder="GBP"
            />{" "}
            <b>GBP</b>
          </Form.Item>
          They receive
          <Form.Item name="theyReceive">
            <img
              src="https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-poland2x.png"
              alt="PLN"
              style={{ paddingRight: 10 }}
            ></img>
            <Input
              type="number"
              value={valueTheyReceive}
              onChange={handleToChange}
              style={{ width: "30%" }}
              placeholder="PLN"
            />{" "}
            <b>PLN</b>
          </Form.Item>
        </Form>
        1 GBP = <b>{state} PLN</b>
        <br></br>
        <b>No transfer fee</b>
      </Col>
    </Row>
  );
};
