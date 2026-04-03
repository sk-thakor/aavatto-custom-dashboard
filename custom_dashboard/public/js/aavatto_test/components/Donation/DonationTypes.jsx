import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Empty, Layout, Spin, Button, message } from "antd";
import { ShoppingCartOutlined, HeartFilled } from "@ant-design/icons";

const { Text, Title } = Typography;

const DonationTypes = ({ selectedTemple, onAddToCart }) => {
    const [donationTypes, setDonationTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedTemple) {
            fetchDonationTypes();
        } else {
            setDonationTypes([]);
        }
    }, [selectedTemple]);

    const fetchDonationTypes = () => {
        setLoading(true);
        frappe.call({
            method: "frappe.client.get_list",
            args: {
                doctype: "Donation Type",
                filters: { temple: selectedTemple },
                fields: ["name", "type_name", "temple",]
            },
            callback: (r) => {
                setLoading(false);
                if (r.message) {
                    setDonationTypes(r.message);
                } else {
                    setDonationTypes([]);
                }
            }
        });
    };

    if (!selectedTemple) {
        return (
            <Card className="shadow-sm mt-3" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Empty description="Please select a temple first" />
            </Card>
        );
    }

    return (
        <Card title="Donation Types" size="small" className="donation-card shadow-sm mt-3">
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin tip="Loading donation types..." />
                </div>
            ) : donationTypes.length > 0 ? (
                <Row gutter={[12, 12]}>
                    {donationTypes.map(type => (
                        <Col key={type.name} xs={12} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                onClick={() => onAddToCart(type)}
                                className="type-card"
                                bodyStyle={{ padding: '16px', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '24px', color: '#4f46e5', marginBottom: '8px' }}>
                                    <HeartFilled />
                                </div>
                                <Text strong>{type.type_name}</Text>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty description="No donation types available for this temple" />
            )}
        </Card>
    );
};

export default DonationTypes;
