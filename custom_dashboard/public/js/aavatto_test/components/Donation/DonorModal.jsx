import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { useFrappeCreateDoc } from "../../hooks/useFrappe";

const DonorModal = ({ open, onCancel, onSuccess, initialMobileNumber }) => {
    const [form] = Form.useForm();
    const { createDoc, loading } = useFrappeCreateDoc();

    useEffect(() => {
        if (open && initialMobileNumber) {
            form.setFieldsValue({ mobile_number: initialMobileNumber });
        } else if (open) {
            form.resetFields();
        }
    }, [open, initialMobileNumber]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await createDoc("Donor", values);
            message.success("Donor added successfully");
            form.resetFields();
            onSuccess(values);
        } catch (error) {
            console.error("Failed to add donor:", error);
            message.error(error.message || "Failed to add donor");
        }
    };

    return (
        <Modal
            title="Add New Donor"
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="donor_name"
                    label="Donor Name"
                    rules={[{ required: true, message: "Please enter donor name" }]}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>
                <Form.Item
                    name="mobile_number"
                    label="Mobile Number"
                    rules={[
                        { required: true, message: "Please enter mobile number" },
                        { pattern: /^\d{10}$/, message: "Please enter a valid 10-digit mobile number" }
                    ]}
                >
                    <Input placeholder="Enter 10-digit mobile number" />
                </Form.Item>
                <Form.Item name="email" label="Email (Optional)">
                    <Input placeholder="Enter email address" />
                </Form.Item>
                <Form.Item name="address" label="Address (Optional)">
                    <Input.TextArea placeholder="Enter address" rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DonorModal;
