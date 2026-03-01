import { useEffect, useRef, useState } from 'react';

const MAX_SECONDS = 60; // 1 minute

export const useRecordBar = (
    recording: boolean,
    stopRecording: () => void
) => {
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (recording) {
            timerRef.current = setInterval(() => {
                setElapsed((prev) => {
                    if (prev + 1 >= MAX_SECONDS) {
                        stopRecording();
                        return MAX_SECONDS;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [recording, stopRecording]);

    const percent = Number(((elapsed / MAX_SECONDS) * 100).toFixed(2));

    const formattedTime = new Date(elapsed * 1000)
        .toISOString()
        .substring(11, 19);

    return {
        elapsed,
        percent,
        formattedTime,
        maxSeconds: MAX_SECONDS,
    };
};