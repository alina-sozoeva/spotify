"use client";

import { Button } from "antd";
import {
  AppleOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

export default function AuthButtons() {
  return (
    <div className="w-72 flex flex-col gap-6">
      {/* <div className=" flex flex-row items-center gap-2">
        <div className="w-full bg-white h-0.5"></div>
        <p className=" text-center">or</p>
        <div className="w-full bg-white h-0.5"></div>
      </div> */}
      <div className=" flex flex-col gap-6">
        <Button
          className=" bg-transparent text-white"
          style={{ padding: "20px 0", borderRadius: "20px" }}
        >
          <GoogleOutlined />
          <p>Register via Google</p>
        </Button>
        <Button
          className="bg-transparent text-white"
          style={{ padding: "20px 0", borderRadius: "20px" }}
        >
          <FacebookOutlined />
          <p>Register via FaceBook</p>
        </Button>
        <Button
          className="bg-transparent text-white"
          style={{ padding: "20px 0", borderRadius: "20px" }}
        >
          <AppleOutlined />
          <p>Sign in with Apple</p>
        </Button>
      </div>
    </div>
  );
}
