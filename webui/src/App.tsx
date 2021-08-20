import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Card, Table, Button, Modal, Input } from "antd";
import { setInterval } from "timers";

function App() {
  const [time, setTime] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [link, setLink] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    getlist();
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const getlist = async () => {
    const res = await fetch("/api/list", {
      method: "GET",
    });
    console.log(res);
    const json = await res.json();
    console.log(json);
    setList(json);
  };
  useEffect(() => {
    console.log("time change");
    getlist();
  }, [time]);
  return (
    <Card
      title="Download Manager for RaspberryPi"
      bordered={false}
      style={{}}
    >
      <Modal
        title="New"
        visible={show}
        onOk={async () => {
          console.log(link);
          const res = await fetch("/api/new", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: link,
            }),
          });
          console.log(res);
          const json = await res.json();
          console.log(json);
          setShow(false);
        }}
        onCancel={() => {
          setShow(false);
        }}
      >
        <Input
          onChange={(x) => {
            setLink(x.target.value);
          }}
          value={link}
        />
      </Modal>

      <Button
        type="primary"
        onClick={() => {
          setShow(true);
        }}
      >
        New
      </Button>

      <p></p>

      <Table
        bordered={true}
        pagination={false}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Complete",
            dataIndex: "complete",
            key: "complete",
          },
          {
            title: "Size",
            dataIndex: "total",
            key: "total",
          },
          {
            title: "%",
            dataIndex: "",
            key: "",
            render: (x) => {
              return <>{((x.complete / x.total) * 100).toFixed(0)}</>;
            },
          },
          {
            title: "Speed",
            dataIndex: "download_speed",
            key: "download_speed",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
        ]}
        dataSource={list}
      />
    </Card>
  );
}

export default App;
