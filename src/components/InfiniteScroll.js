import React, { useState, useEffect } from "react";
import { Divider, Image, Typography, Space } from "antd";
import { PhoneFilled, MailOutlined } from "@ant-design/icons";
const { Title } = Typography;

export function InfiniteScroll(props) {
  const [dataList, setDataList] = useState([]);
  let page = 1;
  const last_page = 10;
  const pixel_offset = 400;

  useEffect(async () => {
    updateContactList();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", throttleHandler);
    return () => {
      window.removeEventListener("scroll", throttleHandler);
    };
  }, []);

  const throttleHandler = throttle(handleScroll, 200);

  function throttle(func, limit) {
    let triggered = false;
    return function () {
      if (!triggered) {
        triggered = func();
        if (triggered) {
          setTimeout(() => {
            triggered = false;
          }, limit);
        }
      }
    };
  }

  async function handleScroll() {
    let windowHeight = window.innerHeight,
      scrolledHeight = window.scrollY,
      contentHeight = document.body.scrollHeight,
      thresholdHeight = pixel_offset;

    if (windowHeight + scrolledHeight >= contentHeight - thresholdHeight) {
      page = page + 1;
      if (page <= last_page) {
        updateContactList(page);
        return true;
      }
    }
    return false;
  }
  async function updateContactList(page_no = 1) {
    let url = `https://randomuser.me/api/?page=${page_no}&results=10`;
    try {
      let data = await getData(url);
      setDataList((prev) => [...prev, ...data.results]);
    } catch (err) {
      alert("Error fetching data!");
    }
  }

  async function getData(url) {
    const response = await fetch(url);
    return response.json();
  }

  return (
    <div class="contactsListContainer">
      {dataList.map((data, index) => {
        return (
          <div class="card">
            <div class="image_container">
              <Image width={100} height={100} src={data.picture.large} />
            </div>
            <div class="contents_container">
              <Title level={4}>
                {data.name.first} {data.name.last}
              </Title>
              <Divider />
              <Space>
                <MailOutlined />
                {data.email}
              </Space>{" "}
              <br />
              <Space>
                <PhoneFilled />
                {data.phone}
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
}
