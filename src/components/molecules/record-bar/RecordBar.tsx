import React from 'react';
import { Button, Progress, Typography, Space, Flex } from 'antd';
import { FaStop } from "react-icons/fa";
import { useRecordBar } from './useRecordBar';
import type { ProgressProps } from 'antd';

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#f8f8f8',
    '100%': '#8250ff',
};

const { Text } = Typography;

interface RecordBarProps {
    recording: boolean;
    handleStopRecording: () => void;
}

const RecordBar: React.FC<RecordBarProps> = ({
    recording,
    handleStopRecording,
}) => {
    const { percent, formattedTime } = useRecordBar(
        recording,
        handleStopRecording
    );

    if (!recording) return null;

    return (
        <Flex orientation="horizontal" gap={16} align="center">
            <Button
                type="primary"
                onClick={handleStopRecording}
            >Send</Button>
            <Text>{formattedTime} / 00:00:60</Text>

            <Progress
                percent={percent}
                showInfo={false}
                strokeColor={twoColors}
                style={{ flex: 1 }}
            />


        </Flex>
    );
};

export default RecordBar;