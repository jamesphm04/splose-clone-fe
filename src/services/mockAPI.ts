import type { AuthResponse, ChatMessage, LoginCredentials } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        await delay(800);

        if (credentials.email && credentials.password) {
            return {
                success: true,
                user: {
                    id: '1',
                    email: credentials.email,
                    name: 'Dr. Sarah Johnson'
                },
                token: 'mock-jwt-token-' + Date.now()
            };
        }

        return {
            success: false,
            message: 'Invalid credentials'
        };
    },

    async logout(): Promise<void> {
        await delay(300);
    }
}

export const chatAPI = {
    async sendMessage(message: string, imageFile?: File): Promise<ChatMessage> {
        await delay(1000);

        const responses = [
            "I've reviewed the session notes. Would you like me to help structure the progress note?",
            "Based on the information provided, I can help you document the patient's progress and treatment goals.",
            "I'm here to assist with documentation. What specific aspect would you like help with?",
            "I can help you summarize the key points from today's session.",
            "Would you like me to suggest some clinical observations based on what you've shared?"
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return {
            id: Date.now().toString(),
            role: 'assistant',
            content: randomResponse,
            timestamp: new Date()
        };
    },

    async processVoiceRecording(audioBlob: Blob): Promise<string> {
        await delay(1500);
        return "Voice recording received. Transcription: [Mock transcribed text from audio]";
    }
};

export const notesAPI = {
    async saveNote(content: string): Promise<{ success: boolean }> {
        await delay(500);
        localStorage.setItem('currentNote', content);
        return { success: true };
    },

    async loadNote(): Promise<string> {
        await delay(300);
        return localStorage.getItem('currentNote') || `# Progress Note
  
  **Patient:** John Doe
  **Date:** Mon 23 Feb 2026, 09:00am
  **Session Type:** Assessment consultation
  
  ## Session Summary
  
  The appointments scheduled for the next 2 weeks are:
  
  1. Appointment on 23 Feb 2026 from 09:00 to 10:00 at WCP.
  2. Appointment on 24 Feb 2026 from 10:15 to 11:15 at WCP.
  
  ## Clinical Observations
  
  - Patient presented with good engagement
  - Demonstrated progress on treatment goals
  - Reported improved coping strategies
  
  ## Treatment Plan
  
  - Continue current therapeutic approach
  - Schedule follow-up session
  - Monitor progress on identified goals
  `;
    }
};
