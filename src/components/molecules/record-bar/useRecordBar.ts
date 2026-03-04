import { useState, useEffect, useRef } from 'react';

const MAX_SECONDS = 60;

const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
};

export const useRecordBar = (
    recording: boolean,
    handleStopRecording: () => void
) => {
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const formattedMaxSeconds = formatTime(MAX_SECONDS);

    useEffect(() => {
        if (!recording) {
            // Reset when recording stops
            if (intervalRef.current) clearInterval(intervalRef.current);
            setElapsed(0);
            return;
        }

        setElapsed(0);
        intervalRef.current = setInterval(() => {
            setElapsed((s) => {
                const next = s + 1;
                if (next >= MAX_SECONDS) {
                    // Auto-stop at the limit
                    clearInterval(intervalRef.current!);
                    handleStopRecording();
                }
                return next;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [recording]);

    const percent = Math.min((elapsed / MAX_SECONDS) * 100, 100);

    const formattedTime = formatTime(elapsed);

    return { percent, formattedTime, formattedMaxSeconds };
};