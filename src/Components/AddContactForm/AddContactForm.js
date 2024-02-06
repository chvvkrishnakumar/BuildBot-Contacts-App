import React, { useEffect, useMemo } from "react";
import { Form, Input, Button, notification } from "antd";

const AddContactForm = (props) => {
    const { contact, closePopup } = props;
    const edit = contact.id ? true : false;

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const onRequiredTypeChange = (changedValues) => {
        console.log("Required mark type changed:", changedValues);
    };
    const sendData = async (formdata) => {
        try {
            const url = edit
                ? `https://jsonplaceholder.typicode.com/users/${contact.id}`
                : `https://jsonplaceholder.typicode.com/users`;
            const response = await fetch(url, {
                method: edit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    edit
                        ? {
                              ...contact,
                              name: formdata.name,
                              username: formdata.userName,
                              email: formdata.email,
                              phone: formdata.mobileNumber,
                          }
                        : {
                              name: formdata.name,
                              username: formdata.userName,
                              email: formdata.email,
                              phone: formdata.mobileNumber,
                          }
                ),
            });
            if (response.ok) {
                closePopup();
                api.info({
                    message: edit ? "Updated" : "Added",
                    description: edit
                        ? "Contact updated successfully, But its a Fake API:)"
                        : "Contact added successfully,  But its a Fake API:)",
                });
            } else {
                api.info({
                    message: edit ? "Failed" : "Added",
                    description: edit
                        ? "Contact updated failed"
                        : "failed to add",
                });
            }
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                const response = sendData(values);
                console.log(response);
            })
            .catch((errorInfo) => {
                console.error("Form validation failed:", errorInfo);
            });
    };

    useEffect(() => {
        console.log(contact);
        const intialData = {
            name: contact.name,
            userName: contact.username,
            mobileNumber: contact.phone,
            email: contact.email,
        };
        form.setFieldsValue(intialData);
    }, [contact]);

    return (
        <>
            {" "}
            {contextHolder}
            <Form
                form={form}
                layout="vertical"
                initialValues={{ requiredMarkValue: "default" }}
                onValuesChange={onRequiredTypeChange}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter your  name" },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                    label="User Name"
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your user name",
                        },
                    ]}
                >
                    <Input placeholder="User Name" />
                </Form.Item>

                <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your mobile number",
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: "Please enter a valid mobile number",
                        },
                        {
                            len: 10,
                            message: "Please enter a 10-digit mobile number",
                        },
                    ]}
                >
                    <Input placeholder="Mobile Number" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email address",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email address",
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={handleSubmit}
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddContactForm;
