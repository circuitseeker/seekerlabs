import { useState, useRef, useCallback, useEffect } from 'react';

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
const SARVAM_CHAT_URL = 'https://api.sarvam.ai/v1/chat/completions';
const SARVAM_TTS_URL = 'https://api.sarvam.ai/text-to-speech';

const SYSTEM_PROMPT = `You are the friendly voice assistant for SeekerLabs (seekerlab.in) — a product engineering studio based in India. Keep responses concise (2-3 sentences max). Be warm, professional, and helpful.

About SeekerLabs:
- We build MVPs, full-stack web/mobile apps, AI/ML solutions, and cloud infrastructure
- Tech stack: React, Next.js, Node.js, Python, AWS, GCP, Flutter, React Native
- We've worked with startups and enterprises across healthcare, fintech, edtech, and more
- Contact: info@seekerlab.in | sales@seekerlab.in | +91 888 492 3815
- We turn bold ideas into production-grade products

If someone asks about pricing, tell them to reach out to sales@seekerlab.in for a custom quote.
If someone wants to start a project, ask what they're building and suggest they book a call.
Always be enthusiastic about technology and building great products.`;

function VoiceAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | listening | thinking | speaking
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  const speak = useCallback(async (text) => {
    setStatus('speaking');
    try {
      const res = await fetch(SARVAM_TTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': SARVAM_API_KEY,
        },
        body: JSON.stringify({
          text: text.slice(0, 2400),
          target_language_code: 'en-IN',
          model: 'bulbul:v3',
          speaker: 'anushka',
          pace: 1.1,
        }),
      });

      if (!res.ok) throw new Error('TTS failed');

      const data = await res.json();
      const audioBase64 = data.audios?.[0];
      if (!audioBase64) throw new Error('No audio returned');

      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      audioRef.current = audio;
      audio.onended = () => setStatus('idle');
      audio.onerror = () => setStatus('idle');
      await audio.play();
    } catch {
      setStatus('idle');
    }
  }, []);

  const chat = useCallback(async (userText) => {
    setStatus('thinking');
    const newMessages = [...messages, { role: 'user', content: userText }];

    try {
      const res = await fetch(SARVAM_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SARVAM_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'sarvam-m',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.slice(-10), // keep last 10 messages for context
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!res.ok) throw new Error('Chat failed');

      const data = await res.json();
      const assistantText = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";

      setMessages([...newMessages, { role: 'assistant', content: assistantText }]);
      setResponse(assistantText);
      await speak(assistantText);
    } catch {
      const fallback = "I'm having trouble connecting right now. Please email us at info@seekerlab.in!";
      setMessages([...newMessages, { role: 'assistant', content: fallback }]);
      setResponse(fallback);
      setStatus('idle');
    }
  }, [messages, speak]);

  const startListening = useCallback(() => {
    setError('');
    stopAudio();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setStatus('listening');
      setTranscript('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onend = () => {
      const finalText = transcript;
      // Use a small timeout to capture the final transcript from state
      setTimeout(() => {
        const el = document.getElementById('voice-transcript');
        const text = el?.textContent?.trim();
        if (text) {
          chat(text);
        } else {
          setStatus('idle');
        }
      }, 100);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        setStatus('idle');
      } else {
        setError(`Mic error: ${event.error}`);
        setStatus('idle');
      }
    };

    recognition.start();
  }, [stopAudio, chat, transcript]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const handleMicClick = useCallback(() => {
    if (status === 'listening') {
      stopListening();
    } else if (status === 'speaking') {
      stopAudio();
      setStatus('idle');
    } else if (status === 'idle') {
      startListening();
    }
  }, [status, startListening, stopListening, stopAudio]);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      stopAudio();
      recognitionRef.current?.stop();
      setStatus('idle');
    }
    setIsOpen(!isOpen);
  }, [isOpen, stopAudio]);

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={toggleOpen}
        className="voice-agent-bubble"
        aria-label="Voice assistant"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
        {!isOpen && status === 'idle' && (
          <span className="voice-agent-badge">Talk to us</span>
        )}
      </button>

      {/* Chat panel */}
      <div className={`voice-agent-panel ${isOpen ? 'voice-agent-panel-open' : ''}`}>
        {/* Header */}
        <div className="voice-agent-header">
          <div className="flex items-center gap-3">
            <div className="voice-agent-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-bold text-[14px] text-[#0a0a0a] tracking-[-0.02em] leading-tight">SeekerLabs Voice</p>
              <p className="text-[11px] text-neutral-500 font-medium tracking-wide uppercase">
                {status === 'idle' && 'Ready to chat'}
                {status === 'listening' && 'Listening...'}
                {status === 'thinking' && 'Thinking...'}
                {status === 'speaking' && 'Speaking...'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="voice-agent-messages">
          {messages.length === 0 && (
            <div className="voice-agent-welcome">
              <div className="voice-agent-welcome-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DDFC6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <p className="font-heading font-bold text-[15px] text-[#0a0a0a]">Hey there!</p>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                Tap the mic and ask me anything about SeekerLabs — our services, tech stack, or how to get started.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`voice-agent-msg ${msg.role === 'user' ? 'voice-agent-msg-user' : 'voice-agent-msg-bot'}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Live transcript */}
        {(status === 'listening' || transcript) && (
          <div className="voice-agent-transcript">
            <p id="voice-transcript" className="text-[12px] text-neutral-600 italic">
              {transcript || 'Listening...'}
            </p>
          </div>
        )}

        {error && (
          <div className="voice-agent-error">
            <p className="text-[11px] text-red-600">{error}</p>
          </div>
        )}

        {/* Mic button */}
        <div className="voice-agent-controls">
          <button
            onClick={handleMicClick}
            disabled={status === 'thinking'}
            className={`voice-agent-mic ${status === 'listening' ? 'voice-agent-mic-active' : ''} ${status === 'thinking' ? 'voice-agent-mic-thinking' : ''} ${status === 'speaking' ? 'voice-agent-mic-speaking' : ''}`}
          >
            {status === 'thinking' ? (
              <div className="voice-agent-dots">
                <span /><span /><span />
              </div>
            ) : status === 'speaking' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>
          <p className="text-[11px] text-neutral-400 mt-2 font-medium tracking-wide">
            {status === 'idle' && 'TAP TO SPEAK'}
            {status === 'listening' && 'TAP TO STOP'}
            {status === 'thinking' && 'PROCESSING...'}
            {status === 'speaking' && 'TAP TO STOP'}
          </p>
        </div>
      </div>
    </>
  );
}

export default VoiceAgent;
