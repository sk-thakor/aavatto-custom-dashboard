import React, { useState, useEffect } from "react";
import { Card, Input, Button, Form, Row, Col, Typography, Space } from "antd";
import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import DonorModal from "./DonorModal";

const { Text } = Typography;

const DonorSection = ({ onDonorSelect, selectedDonor }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searching, setSearching] = useState(false);

    const handleSearch = (value) => {
        setMobileNumber(value);
        if (value.length === 10) {
            setSearching(true);
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Donor",
                    filters: { mobile_number: value },
                    fields: ["name", "donor_name", "mobile_number", "address"]
                },
                callback: (r) => {
                    setSearching(false);
                    if (r.message && r.message.length > 0) {
                        onDonorSelect(r.message[0]);
                    } else {
                        onDonorSelect(null);
                    }
                }
            });
        } else {
            onDonorSelect(null);
        }
    };

    const handleNewDonor = (donor) => {
        setIsModalOpen(false);
        setMobileNumber(donor.mobile_number);
        onDonorSelect(donor);
    };

    return (
        <Card title="Donor Information" size="small" className="donation-card shadow-sm">
            <Form layout="vertical">
                <Row gutter={16} align="bottom">
                    <Col xs={24} sm={16} md={18}>
                        <Form.Item label="Mobile Number" className="mb-0">
                            <Input
                                placeholder="Enter 10-digit mobile number"
                                prefix={<SearchOutlined />}
                                value={mobileNumber}
                                onChange={(e) => handleSearch(e.target.value)}
                                maxLength={10}
                                allowClear
                                style={{ height: '40px' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8} md={6}>
                        {!selectedDonor && mobileNumber.length === 10 && !searching && (
                            <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                onClick={() => setIsModalOpen(true)}
                                block
                                style={{ height: '40px' }}
                            >
                                Add Donor
                            </Button>
                        )}
                    </Col>
                </Row>

                {selectedDonor && (
                    <div className="mt-4 donor-details-fade-in" style={{
                        background: '#f8fafc',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <Text strong style={{ color: '#4f46e5', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Matched Donor Profile
                            </Text>
                            <Button
                                type="link"
                                danger
                                size="small"
                                onClick={() => {
                                    onDonorSelect(null);
                                    setMobileNumber("");
                                }}
                                style={{ padding: 0, height: 'auto' }}
                            >
                                Change Donor
                            </Button>
                        </div>
                        <Row gutter={[16, 12]}>
                            <Col span={24}>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>Full Name</div>
                                <Text strong style={{ fontSize: '16px' }}>{selectedDonor.donor_name}</Text>
                            </Col>
                            <Col span={12}>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>Mobile</div>
                                <Text>{selectedDonor.mobile_number}</Text>
                            </Col>
                            {selectedDonor.email && (
                                <Col span={12}>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>Email</div>
                                    <Text>{selectedDonor.email}</Text>
                                </Col>
                            )}
                            {selectedDonor.address && (
                                <Col span={24}>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>Address</div>
                                    <Text type="secondary">{selectedDonor.address}</Text>
                                </Col>
                            )}
                        </Row>
                    </div>
                )}
            </Form>

            <DonorModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSuccess={handleNewDonor}
                initialMobileNumber={mobileNumber}
            />
        </Card>
    );
};

export default DonorSection;
