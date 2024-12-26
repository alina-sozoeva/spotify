"use client";

import { Button, Form, Input, Steps } from "antd";
import Image from "next/image";
import AuthButtons from "../components/AuthButtons/page";
import { useState } from "react";
import { useRegisterUserMutation } from "../store/register/register.api";

export default function Register() {
  const [form] = Form.useForm();
  const [isStepMode, setIsStepMode] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  // console.log(values.email, values);

  const [register] = useRegisterUserMutation({});

  const values = form.getFieldsValue();

  console.log(values, "values");

  console.log(values.email, "valuesemail");

  const onFinish = () => {
    register({
      email: values.email,
      password: values.password,
      username: values.username,
      birthDate: values.birthDate,
      gender: values.gender,
    });
  };

  // const options = [
  //   { label: "Apple", value: "Apple" },
  //   { label: "Pear", value: "Pear" },
  //   { label: "Orange", value: "Orange" },
  // ];

  const steps = [
    {
      title: "Step-1",
      content: (
        <Form.Item
          className="m-0"
          name="password"
          // rules={[
          //   {
          //     required: true,
          //     message: (
          //       <p>
          //         The email address is invalid. Make sure it is in this format:
          //         example@email.com.
          //       </p>
          //     ),
          //   },
          // ]}
        >
          <Input
            variant={"borderless"}
            className="w-full border border-solid border-gray-400 text-gray-400 placeholder-gray-400"
            placeholder="password"
          />
        </Form.Item>
      ),
    },
    {
      title: "Step-2",
      content: (
        <>
          <Form.Item
            className="m-0"
            name="username"
            // rules={[
            //   {
            //     required: true,
            //     message: (
            //       <p>
            //         The email address is invalid. Make sure it is in this format:
            //         example@email.com.
            //       </p>
            //     ),
            //   },
            // ]}
          >
            <Input
              variant={"borderless"}
              className="w-full border border-solid border-gray-400 text-gray-400 placeholder-gray-400"
              placeholder="username"
            />
          </Form.Item>
          <Form.Item
            className="m-0"
            name="birthDate"
            // rules={[
            //   {
            //     required: true,
            //     message: (
            //       <p>
            //         The email address is invalid. Make sure it is in this format:
            //         example@email.com.
            //       </p>
            //     ),
            //   },
            // ]}
          >
            <Input
              variant={"borderless"}
              className="w-full border border-solid border-gray-400 text-gray-400 placeholder-gray-400"
              placeholder="birthDate"
            />
          </Form.Item>

          <Form.Item
            className="m-0"
            name="gender"
            // rules={[
            //   {
            //     required: true,
            //     message: (
            //       <p>
            //         The email address is invalid. Make sure it is in this format:
            //         example@email.com.
            //       </p>
            //     ),
            //   },
            // ]}
          >
            <Input
              variant={"borderless"}
              className="w-full border border-solid border-gray-400 text-gray-400 placeholder-gray-400"
              placeholder="gender"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Step-3",
      // content: (

      // ),
    },
  ];

  const handleNext = () => {
    if (!isStepMode) {
      form
        .validateFields()
        .then((values) => {
          setFormValues({ ...formValues, ...values }); // Сохраняем текущие значения
          setIsStepMode(true);
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
          }
        })
        .catch(() => {});
    } else {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  console.log(currentStep, "currentStep");

  const handlePrev = () => {
    if (currentStep === 0) {
    }

    setCurrentStep(currentStep - 1);
  };

  return (
    <section className=" flex flex-col justify-center items-center h-screen gap-6">
      <Image
        src="/logo.svg"
        alt="spotify logo"
        width={50}
        height={38}
        priority
      />

      <Form
        form={form}
        onFinish={onFinish}
        className="w-72 flex flex-col gap-6 text-white"
      >
        {isStepMode ? (
          <>
            <Steps
              current={currentStep}
              className="mb-6 text-white w-80"
              style={{}}
            >
              {steps.map((step, index) => (
                <Steps key={index} />
              ))}
            </Steps>
            <Button onClick={handlePrev}>Back</Button>
            {steps[currentStep]?.content}
          </>
        ) : (
          <div className=" flex flex-col gap-6">
            <h2 className=" text-5xl text-center">
              Sign up and get into music
            </h2>
            <Form.Item
              className="m-0"
              name="email"
              rules={[
                {
                  required: true,
                  message: (
                    <p>
                      The email address is invalid. Make sure it is in this
                      format: example@email.com.
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
          </div>
        )}

        {currentStep !== 2 ? (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </Form>
      {!isStepMode && <AuthButtons />}
    </section>
  );
}
