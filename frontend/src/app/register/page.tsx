"use client";

import { Button, Form, Input } from "antd";
import Image from "next/image";
import {
  AppleOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

export default function Register() {
  const [form] = Form.useForm();

  return (
    <section className="flex flex-col justify-center items-center h-screen gap-6">
      <Image
        src="/logo.svg"
        alt="spotify logo"
        width={50}
        height={38}
        priority
      />
      <h2 className=" text-4xl">Sign up and get into music</h2>

      <Form form={form} className="w-72 flex flex-col gap-6 text-white">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: (
                <p>
                  The email address is invalid. Make sure it is in this format:
                  example@email.com.
                </p>
              ),
              type: "email",
            },
          ]}
        >
          <Input
            variant={"borderless"}
            className="w-full border border-solid border-gray-400 text-gray-400 placeholder-gray-400"
            placeholder="Email"
          />
        </Form.Item>
        <Button type="primary">Next</Button>
        <div className=" flex flex-row items-center gap-2">
          <div className="w-full bg-white h-0.5"></div>
          <p className=" text-center">or</p>
          <div className="w-full bg-white h-0.5"></div>
        </div>
        <div className=" flex flex-col gap-6">
          <Button
            className="bg-transparent text-white"
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
      </Form>
    </section>
  );
}
