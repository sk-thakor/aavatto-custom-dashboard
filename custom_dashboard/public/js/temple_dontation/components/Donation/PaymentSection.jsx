import React from "react";
import { Card, Radio, Button, Space, Typography, Grid } from "antd";
import { CheckCircleOutlined, WalletOutlined, CreditCardOutlined, QrcodeOutlined, ProfileOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const PaymentSection = ({ paymentMode, onPaymentModeChange, onSubmit, loading, disabled }) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const paymentModes = [
        { label: "Cash", value: "Cash", icon: <WalletOutlined /> },
        { label: "UPI", value: "UPI", icon: <QrcodeOutlined /> },
        { label: "Card", value: "Card", icon: <CreditCardOutlined /> },
        { label: "Cheque", value: "Cheque", icon: <ProfileOutlined /> },
    ];

    return (
        <Card title="Payment Information" size="small" className="donation-card shadow-sm mt-3">
            <Text type="secondary" className="mb-3 d-block">Select Payment Mode</Text>
            <Radio.Group 
                value={paymentMode} 
                onChange={(e) => onPaymentModeChange(e.target.value)}
                style={{ width: '100%', marginBottom: '24px' }}
                buttonStyle="solid"
            >
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: '8px' }}>
                    {paymentModes.map(mode => (
                        <Radio.Button 
                            key={mode.value} 
                            value={mode.value}
                            style={{ 
                                height: 'auto', 
                                padding: '12px', 
                                textAlign: 'center',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{mode.icon}</div>
                            <div>{mode.label}</div>
                        </Radio.Button>
                    ))}
                </div>
            </Radio.Group>

            <Button
                type="primary"
                size="large"
                block
                icon={<CheckCircleOutlined />}
                onClick={onSubmit}
                loading={loading}
                disabled={disabled}
                style={{ height: '56px', fontSize: '18px', fontWeight: 'bold' }}
            >
                Submit Donation
            </Button>
        </Card>
    );
};

export default PaymentSection;
