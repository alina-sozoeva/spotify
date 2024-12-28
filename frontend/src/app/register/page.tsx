"use client";

import { Button, Checkbox, CheckboxProps, Form, Input, Steps } from "antd";
import Image from "next/image";
import AuthButtons from "../components/AuthButtons/page";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../store/register/register.api";
import { useRouter, useSearchParams } from "next/navigation";

export default function Register() {
  const [form] = Form.useForm();
  const [isStepMode, setIsStepMode] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [register] = useRegisterUserMutation({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "0";

  const email = form.getFieldValue("email");
  const password = form.getFieldValue("password");
  const username = form.getFieldValue("username");
  const birthDate = form.getFieldValue("birthDate");
  const gender = form.getFieldValue("gender");

  const onFinish = () => {
    register({
      email: email,
      password: password,
      username: username,
      birthDate: birthDate,
      gender: gender,
    });
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleStepNext = () => {
    const next = +step + 1;
    router.push(`/register?step=${next}`);
  };

  const handleNext = () => {
    if (!isStepMode) {
      form
        .validateFields(["email"])
        .then(() => {
          const email = form.getFieldValue("email");

          setIsStepMode(true);

          form.setFieldsValue({ email });
          handleStepNext();
        })
        .catch(() => {
          console.log("Email validation failed");
        });
    } else {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        handleStepNext();
      }
    }
  };

  const hadleStepPrev = () => {
    let next = +step - 1;
    if (next < 0) {
      next = 0;
    }
    router.push(`/register?step=${next}`);

    if (next === 0) {
      setIsStepMode(false);
      router.push(`/register`);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    hadleStepPrev();
  };

  useEffect(() => {
    if (!isStepMode) {
      router.push("/register");
    }
  }, [isStepMode, router]);

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
      content: (
        <>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
        </>
      ),
    },
  ];

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
