import React, { useState, useEffect } from "react";

import { Form, Input, Button, Typography, Tabs } from "antd";
import { useHistory } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";

const { Text } = Typography;
const { TabPane } = Tabs;

export function Login(props) {
  const history = useHistory();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [invalidError, setInvalidError] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      history.push("/home");
    }
  }, []);

  const onLoginClick = (e) => {
    if (!isValidCredentials()) {
      setInvalidError("Invalid credentials!");
    } else {
      setInvalidError(null);
      window.localStorage.setItem("token", "123456789");
      history.push("/home");
    }
  };

  const isValidCredentials = () => {
    if (userName === "foo" && password === "bar") {
      return true;
    }
    return false;
  };

  return (
    <Modal closable={false} visible={true} footer={null}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Sign In" key="1">
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              <Button type="primary" htmlType="submit" onClick={onLoginClick}>
                Submit
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              {invalidError && <Text type="danger">{invalidError}</Text>}
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
}
