import { useState, useRef, useCallback, useEffect } from 'react';

const SYSTEM_PROMPT = `You are the friendly voice assistant for SeekerLabs (seekerlab.in) — a product engineering studio based in India. Keep responses concise (2-3 sentences max). Be warm, professional, and helpful.

About SeekerLabs:
- We build MVPs, full-stack web/mobile apps, AI/ML solutions, and cloud infrastructure
- Tech stack: React, Next.js, Node.js, Python, AWS, GCP, Flutter, React Native
- We've worked with startups and enterprises across healthcare, fintech, edtech, and more
- Contact: info@seekerlab.in | sales@seekerlab.in
- We turn bold ideas into production-grade products

If someone asks about pricing, tell them to reach out to sales@seekerlab.in for a custom quote.
If someone wants to start a project, ask what they're building and suggest they book a call.
Always be enthusiastic about technology and building great products.`;

function VoiceAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [textInput, setTextInput] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamTimerRef = useRef(null);
  const queueRef = useRef([]);
  const processingRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
  }, []);

  const streamWords = useCallback((fullText) => {
    return new Promise((resolve) => {
      const words = fullText.split(' ');
      let index = 0;
      setStreamingText('');
      setIsStreaming(true);

      const msPerWord = Math.max(80, Math.min(360, (fullText.length / words.length) * 25));

      streamTimerRef.current = setInterval(() => {
        index++;
        if (index >= words.length) {
          clearInterval(streamTimerRef.current);
          streamTimerRef.current = null;
          setStreamingText('');
          setIsStreaming(false);
          resolve();
          return;
        }
        setStreamingText(words.slice(0, index + 1).join(' '));
      }, msPerWord);

      setStreamingText(words[0]);
    });
  }, []);

  const speak = useCallback(async (text) => {
    setStatus('speaking');
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.slice(0, 2400),
          target_language_code: 'en-IN',
          model: 'bulbul:v3',
          speaker: 'priya',
          pace: 1.1,
        }),
      });

      const data = await res.json();
      if (data.error || !res.ok) throw new Error(data.error?.message || 'TTS failed');
      const audioBase64 = data.audios?.[0];
      if (!audioBase64) throw new Error('No audio returned');

      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      audioRef.current = audio;

      // Wait for both audio and streaming to finish
      const audioPromise = new Promise((resolve) => {
        audio.onended = resolve;
        audio.onerror = resolve;
      });

      // Start audio and word streaming together
      audio.play().catch(() => {});
      const streamPromise = streamWords(text);

      await Promise.all([audioPromise, streamPromise]);

      // Clean up
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }
      setStreamingText('');
      setIsStreaming(false);
      setStatus('idle');
    } catch {
      setStreamingText('');
      setIsStreaming(false);
      setStatus('idle');
    }
  }, [streamWords]);

  const processOne = useCallback(async (userText, messagesSnapshot) => {
    setStatus('thinking');

    // Add user message
    const newMessages = [...messagesSnapshot, { role: 'user', content: userText }];
    setMessages(newMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'sarvam-m',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.slice(-10),
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!res.ok) throw new Error('Chat failed');

      const data = await res.json();
      const rawText = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
      let cleaned = rawText.replace(/<think>[\s\S]*?<\/think>/g, '');
      cleaned = cleaned.replace(/<\/?think>/g, '');
      const assistantText = cleaned.trim() || rawText.replace(/<\/?think>/g, '').trim();

      // Add a placeholder message (hidden until voice starts)
      const withAssistant = [...newMessages, { role: 'assistant', content: assistantText, hidden: true }];
      setMessages(withAssistant);

      // Speak — streaming words will show progressively
      await speak(assistantText);

      // After speaking, reveal the full message
      setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, hidden: false } : m));

      return withAssistant;
    } catch {
      const fallback = "I'm having trouble connecting right now. Please email us at info@seekerlab.in!";
      const withFallback = [...newMessages, { role: 'assistant', content: fallback }];
      setMessages(withFallback);
      setStatus('idle');
      return withFallback;
    }
  }, [speak]);

  // Queue processor — handles messages one by one
  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    while (queueRef.current.length > 0) {
      const userText = queueRef.current.shift();
      // Get latest messages from state
      const currentMessages = await new Promise(resolve => {
        setMessages(prev => { resolve(prev); return prev; });
      });
      await processOne(userText, currentMessages);
    }

    processingRef.current = false;
  }, [processOne]);

  const enqueueMessage = useCallback((text) => {
    queueRef.current.push(text);
    processQueue();
  }, [processQueue]);

  const handleSendText = useCallback((e) => {
    e?.preventDefault();
    const text = textInput.trim();
    if (!text) return;
    setTextInput('');
    setTranscript('');
    enqueueMessage(text);
  }, [textInput, enqueueMessage]);

  const startListening = useCallback(() => {
    setError('');
    stopAudio();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not supported. Try typing instead!');
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
      setTimeout(() => {
        const el = document.getElementById('voice-transcript');
        const text = el?.textContent?.trim();
        if (text && text !== 'Listening...') {
          enqueueMessage(text);
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
  }, [stopAudio, enqueueMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const handleMicClick = useCallback(() => {
    if (status === 'listening') {
      stopListening();
    } else if (status === 'speaking') {
      stopAudio();
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }
      setStreamingText('');
      setIsStreaming(false);
      // Reveal the hidden message
      setMessages(prev => prev.map(m => m.hidden ? { ...m, hidden: false } : m));
      setStatus('idle');
    } else if (status === 'idle') {
      startListening();
    }
  }, [status, startListening, stopListening, stopAudio]);

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      stopAudio();
      recognitionRef.current?.stop();
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }
      setStreamingText('');
      setIsStreaming(false);
      setStatus('idle');
    }
    setIsOpen(!isOpen);
  }, [isOpen, stopAudio]);

  const isBusy = status === 'thinking' || status === 'speaking';

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
          {messages.length === 0 && !isStreaming && (
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
                Tap the mic or type below to ask me anything about SeekerLabs — our services, tech stack, or how to get started.
              </p>
            </div>
          )}

          {messages.map((msg, i) => {
            // Hide assistant message until voice starts streaming
            if (msg.hidden && !isStreaming) return null;

            const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1;
            const showStreaming = isStreaming && isLastAssistant;

            return (
              <div key={i} className={`voice-agent-msg ${msg.role === 'user' ? 'voice-agent-msg-user' : 'voice-agent-msg-bot'}`}>
                <p>
                  {showStreaming ? (
                    <>
                      {streamingText}
                      <span className="voice-agent-cursor">|</span>
                    </>
                  ) : (
                    msg.content
                  )}
                </p>
              </div>
            );
          })}
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

        {/* Text input + mic */}
        <div className="voice-agent-controls">
          <form onSubmit={handleSendText} className="voice-agent-input-row">
            <input
              ref={inputRef}
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={isBusy ? 'Wait for response...' : 'Type a message...'}
              className="voice-agent-text-input"
              disabled={status === 'listening'}
            />
            {textInput.trim() ? (
              <button
                type="submit"
                className="voice-agent-send-btn"
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleMicClick}
                disabled={status === 'thinking'}
                className={`voice-agent-mic-btn ${status === 'listening' ? 'voice-agent-mic-btn-active' : ''} ${status === 'thinking' ? 'voice-agent-mic-btn-thinking' : ''} ${status === 'speaking' ? 'voice-agent-mic-btn-speaking' : ''}`}
                aria-label={status === 'listening' ? 'Stop listening' : 'Start voice input'}
              >
                {status === 'thinking' ? (
                  <div className="voice-agent-dots">
                    <span /><span /><span />
                  </div>
                ) : status === 'speaking' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                )}
              </button>
            )}
          </form>
          <p className="text-[10px] text-neutral-400 mt-2 font-medium tracking-wide text-center">
            {status === 'idle' && 'TYPE OR TAP MIC TO SPEAK'}
            {status === 'listening' && 'LISTENING... TAP TO STOP'}
            {status === 'thinking' && 'PROCESSING...'}
            {status === 'speaking' && 'SPEAKING... TAP TO STOP'}
          </p>
        </div>
      </div>
    </>
  );
}

export default VoiceAgent;
