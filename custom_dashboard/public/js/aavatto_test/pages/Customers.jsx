import React, { useState } from "react";
import { Table, Spin, Alert, Button, Modal, Form, Input, message } from "antd";
import { useFrappeGetDocList, useFrappeCreateDoc } from "../hooks/useFrappe";

const Customers = () => {
    // 1. Fetch Using Custom Hook
    const { data: customers, loading, error, mutate } = useFrappeGetDocList("Customer", {
        fields: ["name", "customer_name", "phone"]
    });

    // 2. Create Using Custom Hook
    const { createDoc, loading: creating } = useFrappeCreateDoc();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        }
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleCreate = (values) => {
        createDoc("Customer", {
            customer_name: values.customer_name,
            customer_type: "Individual", // default required in Frappe
            customer_group: "All Customer Groups",
            territory: "All Territories"
        })
        .then(() => {
            message.success("Customer created successfully!");
            setIsModalOpen(false);
            form.resetFields();
            mutate(); // Refresh the table list!
        })
        .catch((err) => {
            message.error(err.message || "Failed to create customer.");
        });
    };

    return (
        <div style={{ padding: "20px", background: "#f5f7fa", minHeight: "100vh" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Customers List</h2>
                <Button type="primary" onClick={showModal}>+ Create Customer</Button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <Alert message="Error" description={error.message || "Something went wrong"} type="error" showIcon />
            ) : (
                <Table
                    dataSource={customers}
                    columns={columns}
                    rowKey="name"
                    pagination={{ pageSize: 10 }}
                />
            )}

            {/* Create Customer Drawer/Modal */}
            <Modal
                title="Create New Customer"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item
                        name="customer_name"
                        label="Customer Name"
                        rules={[{ required: true, message: 'Please enter customer name!' }]}
                    >
                        <Input placeholder="Enter Customer Name" />
                    </Form.Item>
                    <Form.Item style={{ marginTop: '20px', textAlign: 'right' }}>
                        <Button style={{ marginRight: '10px' }} onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={creating}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Customers;