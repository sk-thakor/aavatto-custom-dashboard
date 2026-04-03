import React from "react";
import { Card, Table, InputNumber, Button, Space, Typography, Empty, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const Cart = ({ items, onUpdateAmount, onRemoveItem, totalAmount }) => {
    const quickAmounts = [101, 251, 501, 1001];

    const columns = [
        {
            title: "Donation Type",
            dataIndex: "type_name",
            key: "type_name",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            width: 150,
            render: (amount, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <InputNumber
                        min={1}
                        value={amount}
                        formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value.replace(/₹\s?|(,*)/g, "")}
                        onChange={(val) => onUpdateAmount(index, val)}
                        style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {quickAmounts.map(q => (
                            <Button 
                                key={q} 
                                size="small" 
                                type="dashed" 
                                onClick={() => onUpdateAmount(index, q)}
                                style={{ fontSize: '10px', padding: '0 4px' }}
                            >
                                {q}
                            </Button>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "",
            key: "action",
            width: 50,
            render: (_, __, index) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onRemoveItem(index)}
                />
            ),
        },
    ];

    return (
        <Card 
            title={<Title level={5} style={{ margin: 0 }}>Selection Cart</Title>} 
            size="small" 
            className="donation-card shadow-sm h-100"
            styles={{ body: { padding: 0 } }}
        >
            <div style={{ height: 'calc(100vh - 450px)', overflowY: 'auto' }}>
                <Table
                    columns={columns}
                    dataSource={items}
                    pagination={false}
                    rowKey={(record, index) => index}
                    locale={{ emptyText: <Empty description="No items in cart" /> }}
                />
            </div>
            
            <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Text strong style={{ fontSize: '16px' }}>Total Amount</Text>
                    </Col>
                    <Col>
                        <Text strong style={{ fontSize: '24px', color: '#4f46e5' }}>
                            ₹ {totalAmount.toLocaleString()}
                        </Text>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default Cart;
