import React, { useState, useEffect } from "react";
import { Divider, Space, Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import { InfiniteScroll } from "./InfiniteScroll";

const { Title } = Typography;

export function Home(props) {
  const history = useHistory();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <span>
          <Space style={{ float: "left" }}>
            <Title level={2}>Contact directory</Title>
          </Space>
          <Space style={{ float: "right" }}>
            <Button
              type="primary"
              shape="round"
              onClick={(e) => {
                window.localStorage.removeItem("token");
                history.push("/");
              }}
            >
              Logout
            </Button>
          </Space>
        </span>
        <Divider />
        <InfiniteScroll />
      </Space>
    </div>
  );
}
