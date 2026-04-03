import React from "react";
import { Select, Card, Spin, Typography } from "antd";
import { useFrappeGetDocList } from "../../hooks/useFrappe";

const { Text } = Typography;

const TempleSelect = ({ onTempleSelect, selectedTemple }) => {
    const { data: temples, loading } = useFrappeGetDocList("Temple", { fields: ["name", "temple_name"] });

    return (
        <Card title="Select Temple" size="small" className="donation-card shadow-sm mt-3">
            <Select
                placeholder="Select a temple"
                style={{ width: '100%', height: '40px' }}
                value={selectedTemple}
                onChange={onTempleSelect}
                loading={loading}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={temples && temples.map(t => ({
                    value: t.name,
                    label: t.temple_name
                }))}
            />
            {temples && temples.length === 0 && !loading && (
                <div className="mt-2">
                    <Text type="warning">No temples found in the system</Text>
                </div>
            )}
        </Card>
    );
};

export default TempleSelect;
