
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { IoBookSharp } from "react-icons/io5";
const LANGUAGES = [
  { code: 'english',   label: 'English',   flag: '🇬🇧', script: 'Latin',     instruction: 'Respond in clear, natural English.' },
  { code: 'hinglish',  label: 'Hinglish',  flag: '🇮🇳', script: 'Roman/Mix', instruction: 'Respond in Hinglish — a natural mix of Hindi and English in Roman script. Example: "Yeh concept basically aise kaam karta hai, samjhe?"' },
  { code: 'hindi',     label: 'Hindi',     flag: '🇮🇳', script: 'हिंदी',     instruction: 'Respond entirely in Hindi using Devanagari script.' },
  { code: 'tamil',     label: 'Tamil',     flag: '🇮🇳', script: 'தமிழ்',     instruction: 'Respond entirely in Tamil script.' },
  { code: 'telugu',    label: 'Telugu',    flag: '🇮🇳', script: 'తెలుగు',    instruction: 'Respond entirely in Telugu script.' },
  { code: 'bengali',   label: 'Bengali',   flag: '🇧🇩', script: 'বাংলা',     instruction: 'Respond entirely in Bengali script.' },
  { code: 'marathi',   label: 'Marathi',   flag: '🇮🇳', script: 'मराठी',     instruction: 'Respond entirely in Marathi using Devanagari script.' },
  { code: 'gujarati',  label: 'Gujarati',  flag: '🇮🇳', script: 'ગુજરાતી',  instruction: 'Respond entirely in Gujarati script.' },
  { code: 'punjabi',   label: 'Punjabi',   flag: '🇮🇳', script: 'ਪੰਜਾਬੀ',    instruction: 'Respond entirely in Punjabi using Gurmukhi script.' },
  { code: 'kannada',   label: 'Kannada',   flag: '🇮🇳', script: 'ಕನ್ನಡ',     instruction: 'Respond entirely in Kannada script.' },
  { code: 'malayalam', label: 'Malayalam', flag: '🇮🇳', script: 'മലയാളം',   instruction: 'Respond entirely in Malayalam script.' },
  { code: 'urdu',      label: 'Urdu',      flag: '🇵🇰', script: 'اردو',      instruction: 'Respond entirely in Urdu using Nastaliq script (right-to-left).', rtl: true },
  { code: 'spanish',   label: 'Spanish',   flag: '🇪🇸', script: 'Español',   instruction: 'Respond entirely in Spanish.' },
  { code: 'french',    label: 'French',    flag: '🇫🇷', script: 'Français',  instruction: 'Respond entirely in French.' },
];

const MODES = [
  { code: 'beginner', label: 'Beginner',   instruction: 'Explain in very simple language, avoid jargon, use relatable everyday examples. Assume zero prior knowledge.' },
  { code: 'advanced', label: 'Advanced',   instruction: 'Use technical terminology, go deep into internals and edge cases, assume strong prior knowledge.' },
  { code: 'exam',     label: 'Exam Mode',  instruction: 'Focus on exam-important points only. Use bullet points. Highlight key definitions, formulas, and common tricks.' },
  { code: 'analogy',  label: 'Analogy',    instruction: 'Use creative, memorable real-world analogies and metaphors to explain every concept.' },
];

const QUICK_ACTIONS = [
  { label: 'Simplify',  prompt: 'Explain this topic in the simplest way possible' },
  { label: 'Notes',    prompt: 'Create short revision notes for this topic' },
  { label: 'Viva Qs',   prompt: 'Generate 5 viva/interview questions on this topic' },
  { label: 'Analogy',   prompt: 'Give me a creative analogy to understand this better' },
  { label: 'Exam tips', prompt: 'What are the most important exam points for this topic?' },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  .chatbot-root * {
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .chatbot-root {
    --blue: #3B82F6;
    --purple: #8B5CF6;
    --cyan: #06B6D4;
    --navy: #0F172A;
    --bg2: #111827;
    --card: #1E293B;
    --text: #E2E8F0;
    --muted: #94A3B8;
    --border: rgba(59,130,246,0.15);
    --border-purple: rgba(139,92,246,0.2);
  }

  .chatbot-scrollbar::-webkit-scrollbar { width: 4px; }
  .chatbot-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .chatbot-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59,130,246,0.25);
    border-radius: 99px;
  }

  .lang-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    width: 240px;
    background: #1E293B;
    border: 1px solid rgba(139,92,246,0.25);
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.6);
    z-index: 50;
    overflow: hidden;
  }

  .lang-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px;
    padding: 8px;
    max-height: 260px;
    overflow-y: auto;
  }

  .lang-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: background 0.15s;
    color: #94A3B8;
  }
  .lang-btn:hover { background: rgba(59,130,246,0.1); color: #E2E8F0; }
  .lang-btn.active { background: rgba(139,92,246,0.18); color: #E2E8F0; }

  .mode-pill {
    font-size: 14px;
    padding: 4px 12px;
    border-radius: 99px;
    border: 1px solid rgba(255,255,255,0.08);
    background: transparent;
    color: #94A3B8;
    cursor: pointer;
    font-weight: 500;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.2s;
    letter-spacing: 0.2px;
  }
  .mode-pill:hover { border-color: rgba(139,92,246,0.4); color: #E2E8F0; }
  .mode-pill.active {
    background: rgba(139,92,246,0.18);
    border-color: rgba(139,92,246,0.5);
    color: #C4B5FD;
  }

  .quick-pill {
    font-size: 14px;
    padding: 5px 12px;
    border-radius: 99px;
    border: 1px solid rgba(59,130,246,0.18);
    background: rgba(59,130,246,0.06);
    color: #94A3B8;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .quick-pill:hover {
    background: rgba(59,130,246,0.15);
    border-color: rgba(59,130,246,0.4);
    color: #E2E8F0;
  }
  .quick-pill:disabled { opacity: 0.35; cursor: not-allowed; }

  .dot-bounce {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3B82F6, #8B5CF6);
    animation: bounce-dot 1.2s ease-in-out infinite;
  }
  @keyframes bounce-dot {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
    40% { transform: translateY(-5px); opacity: 1; }
  }

  .send-btn {
    width: 38px; height: 38px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #3B82F6, #8B5CF6);
    color: white;
    font-size: 15px;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(59,130,246,0.4);
    transition: all 0.2s;
  }
  .send-btn:hover { transform: scale(1.07); box-shadow: 0 6px 20px rgba(59,130,246,0.55); }
  .send-btn:disabled {
    background: rgba(255,255,255,0.07);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }

  .chat-textarea {
    flex: 1;
    resize: none;
    border: 1px solid rgba(59,130,246,0.2);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none;
    background: rgba(15,23,42,0.7);
    color: #E2E8F0;
    transition: border-color 0.2s;
    line-height: 1.5;
    max-height: 90px;
  }
  .chat-textarea::placeholder { color: #475569; }
  .chat-textarea:focus { border-color: rgba(139,92,246,0.5); }

  .warn-banner {
    margin: 10px 14px 0;
    padding: 10px 14px;
    background: rgba(251,191,36,0.07);
    border: 1px solid rgba(251,191,36,0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: #FF0000;
    flex-shrink: 0;
  }
  .warn-learn-btn {
    margin-left: auto;
    background: rgba(251,191,36,0.15);
    border: 1px solid rgba(251,191,36,0.35);
    color: #FF0000;
    padding: 4px 12px;
    border-radius: 99px;
    font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .warn-learn-btn:hover { background: rgba(251,191,36,0.25); }
  .warn-close-btn {
    background: none;
    border: none;
    color: #94A3B8;
    cursor: pointer;
    font-size: 14px;
    padding: 0 2px;
    transition: color 0.15s;
  }
  .warn-close-btn:hover { color: #E2E8F0; }
`;

export default function CourseChatbot({ courseId, wrongTopics = [] }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your personal AI tutor for this course. Ask me anything — I'll explain concepts, make notes, generate viva questions, and more! " }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(MODES[0]);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongBarVisible, setWrongBarVisible] = useState(wrongTopics.length > 0);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/course/chat/${courseId}`,
        { message: trimmed, mode: mode.code, language: selectedLang.code },
        { withCredentials: true }
      );
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (error) {
      console.log(error);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Too many requests. please try after sometime.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLearnWrongTopics = () => {
    setWrongBarVisible(false);
    sendMessage(`Please explain these topics I got wrong in my quiz: ${wrongTopics.join(', ')}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{css}</style>

      <div
        className="chatbot-root"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 600,
          background: '#111827',
          border: '1px solid rgba(59,130,246,0.18)',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >

        {/* ── Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          background: 'rgba(15,23,42,0.85)',
          borderBottom: '1px solid rgba(59,130,246,0.12)',
          flexShrink: 0,
        }}>
          {/* Avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: '800', color: 'white',
            boxShadow: '0 0 12px rgba(139,92,246,0.4)',
          }}>
            AI
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: '700', fontSize: '25px', color: '#E2E8F0', margin: 0, letterSpacing: '0.2px' }}>
               AI Course Tutor
            </p>
            <p style={{ fontSize: '15px', color: '#94A3B8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Responding in {selectedLang.flag} {selectedLang.label}
            </p>
          </div>

          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                borderRadius: '99px',
                border: '1px solid rgba(139,92,246,0.3)',
                background: 'rgba(139,92,246,0.1)',
                color: '#C4B5FD',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {selectedLang.flag} {selectedLang.label}
              <span style={{ fontSize: '10px', color: '#8B5CF6' }}>▾</span>
            </button>

            {langOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setLangOpen(false)} />
                <div className="lang-dropdown">
                  <p style={{
                    fontSize: '15px', color: '#94A3B8', padding: '10px 12px 6px',
                    textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600', margin: 0,
                  }}>
                    Choose Language
                  </p>
                  <div className="lang-grid chatbot-scrollbar">
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        className={`lang-btn ${selectedLang.code === l.code ? 'active' : ''}`}
                        onClick={() => { setSelectedLang(l); setLangOpen(false); }}
                      >
                        <span style={{ fontSize: '16px', lineHeight: 1 }}>{l.flag}</span>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: '600' }}>{l.label}</div>
                          <div style={{ fontSize: '10px', color: '#64748B' }}>{l.script}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Mode Selector ── */}
        <div style={{
          display: 'flex', gap: '6px', padding: '10px 14px 8px', fontSize: '14px',
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(15,23,42,0.4)',
          flexShrink: 0,
        }}>
          {MODES.map(m => (
            <button
              key={m.code}
              className={`mode-pill ${mode.code === m.code ? 'active' : ''}`}
              onClick={() => setMode(m)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* ── Wrong Topics Banner ── */}
        {wrongBarVisible && (
          <div className="warn-banner">
            <span style={{ fontSize: '17px' }}>⚠️</span>
            <span style={{ fontWeight: '500' }}>
              You got <strong style={{ color: '#FF0000' }}>{wrongTopics.length}</strong> topics wrong in your quiz
            </span>
            <button className="warn-learn-btn" onClick={handleLearnWrongTopics}>Learn now</button>
            <button className="warn-close-btn" onClick={() => setWrongBarVisible(false)}>✕</button>
          </div>
        )}

        {/* ── Messages ── */}
        <div
          className="chatbot-scrollbar"
          style={{
            flex: 1, overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '8px',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                maxWidth: msg.role === 'user' ? '85%' : '90%',
              }}
            >
              {/* Bot avatar dot */}
              {msg.role === 'bot' && (
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: '800', color: 'white',
                  marginTop: '2px',
                }}>
                  AI
                </div>
              )}

              <div
                dir={selectedLang.rtl && msg.role === 'bot' ? 'rtl' : 'ltr'}
                style={{
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontWeight: '400',
                  ...(msg.role === 'user'
                    ? {
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))',
                        border: '1px solid rgba(139,92,246,0.3)',
                        color: '#E2E8F0',
                      }
                    : {
                        background: 'rgba(30,41,59,0.9)',
                        border: '1px solid rgba(59,130,246,0.12)',
                        color: '#CBD5E1',
                      }
                  ),
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', gap: '8px', maxWidth: '90%' }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px', fontWeight: '800', color: 'white', marginTop: '2px',
              }}>
                AI
              </div>
              <div style={{
                background: 'rgba(30,41,59,0.9)',
                border: '1px solid rgba(59,130,246,0.12)',
                padding: '12px 16px',
                borderRadius: '4px 14px 14px 14px',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="dot-bounce"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div style={{
          padding: '8px 14px',
          display: 'flex', gap: '6px', flexWrap: 'wrap',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(15,23,42,0.4)',
          flexShrink: 0,
        }}>
          {QUICK_ACTIONS.map(({ label, prompt }) => (
            <button
              key={label}
              className="quick-pill"
              onClick={() => sendMessage(prompt)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Input ── */}
        <div style={{
          padding: '10px 14px 14px',
          display: 'flex', gap: '8px', alignItems: 'flex-end',
          borderTop: '1px solid rgba(59,130,246,0.1)',
          background: 'rgba(15,23,42,0.6)',
          flexShrink: 0,
        }}>
          <textarea
            className="chat-textarea"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            dir={selectedLang.rtl ? 'rtl' : 'ltr'}
            placeholder="Ask anything about your course..."
            rows={1}
            onInput={e => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px';
            }}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            title="Send"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}