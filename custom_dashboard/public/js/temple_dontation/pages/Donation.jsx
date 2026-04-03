import React, { useState, useEffect } from "react";
import { Row, Col, Typography, message, Card, Space, Divider, Button } from "antd";
import { ShoppingCartOutlined, HeartFilled, RedoOutlined } from "@ant-design/icons";

import DonorSection from "../components/Donation/DonorSection";
import TempleSelect from "../components/Donation/TempleSelect";
import DonationTypes from "../components/Donation/DonationTypes";
import Cart from "../components/Donation/Cart";
import PaymentSection from "../components/Donation/PaymentSection";

const { Title, Text } = Typography;

const Donation = () => {
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [selectedTemple, setSelectedTemple] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [submitting, setSubmitting] = useState(false);

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.amount || 0), 0);

    const handleAddToCart = (donationType) => {
        // Check if already in cart
        const exists = cartItems.find(item => item.donation_type === donationType.name);
        if (exists) {
            message.info(`${donationType.type_name} is already in the cart`);
            return;
        }

        const newItem = {
            donation_type: donationType.name,
            type_name: donationType.type_name,
            amount: 101 // Default amount
        };
        setCartItems([...cartItems, newItem]);
        message.success(`Added ${donationType.type_name}`);
    };

    const handleUpdateAmount = (index, amount) => {
        const newItems = [...cartItems];
        newItems[index].amount = amount;
        setCartItems(newItems);
    };

    const handleRemoveItem = (index) => {
        const newItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newItems);
    };

    const handleReset = () => {
        setSelectedDonor(null);
        setSelectedTemple(null);
        setCartItems([]);
        setPaymentMode("Cash");
    };

    const handleSubmit = () => {
        if (!selectedDonor) {
            message.error("Please select or add a donor");
            return;
        }
        if (!selectedTemple) {
            message.error("Please select a temple");
            return;
        }
        if (cartItems.length === 0) {
            message.error("Cart is empty. Please add donation types.");
            return;
        }

        setSubmitting(true);
        
        const donationData = {
            donor: selectedDonor.name,
            donor_name: selectedDonor.donor_name,
            mobile_number: selectedDonor.mobile_number,
            temple: selectedTemple,
            cashier: typeof frappe !== "undefined" ? frappe.session.user : "Guest",
            payment_mode: paymentMode,
            total_amount: totalAmount,
            items: cartItems.map(item => ({
                donation_type: item.donation_type,
                amount: item.amount
            }))
        };

        frappe.call({
            method: "frappe.client.insert",
            args: {
                doc: {
                    doctype: "Donation",
                    ...donationData
                }
            },
            callback: (r) => {
                setSubmitting(false);
                if (r.message) {
                    message.success("Donation submitted successfully!");
                    handleReset();
                }
            },
            error: (err) => {
                setSubmitting(false);
                message.error(err.message || "Failed to submit donation");
            }
        });
    };

    return (
        <div className="donation-page">
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                    <HeartFilled style={{ fontSize: '24px', color: '#4f46e5' }} />
                    <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.5px' }}>
                        Temple Donation POS
                    </Title>
                </Space>
                <Button 
                    icon={<RedoOutlined />} 
                    onClick={handleReset}
                    type="text"
                >
                    Reset Form
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                {/* Left Side: Donor Search, Temple Selection, and Grid */}
                <Col xs={24} lg={15}>
                    <DonorSection 
                        onDonorSelect={setSelectedDonor} 
                        selectedDonor={selectedDonor} 
                    />
                    
                    <TempleSelect 
                        onTempleSelect={setSelectedTemple} 
                        selectedTemple={selectedTemple} 
                    />
                    
                    <DonationTypes 
                        selectedTemple={selectedTemple} 
                        onAddToCart={handleAddToCart} 
                    />
                </Col>

                {/* Right Side: Cart and Payment */}
                <Col xs={24} lg={9}>
                    <Cart 
                        items={cartItems} 
                        onUpdateAmount={handleUpdateAmount} 
                        onRemoveItem={handleRemoveItem}
                        totalAmount={totalAmount}
                    />
                    
                    <PaymentSection 
                        paymentMode={paymentMode} 
                        onPaymentModeChange={setPaymentMode}
                        onSubmit={handleSubmit}
                        loading={submitting}
                        disabled={cartItems.length === 0}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Donation;
