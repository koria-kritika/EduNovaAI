
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../config";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { FaPaperPlane, FaThumbsUp, FaCheckCircle, FaFilePdf, FaImage, FaPaperclip } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";

const CHANNELS = [
  { id: "general",       label: "General",       desc: "General discussion",   icon: "" },
  { id: "doubts",        label: "Doubts",         desc: "Ask questions",        icon: "" },
  { id: "notes",         label: "Notes",          desc: "Share notes & PDFs",   icon: "" },
  { id: "assignments",   label: "Assignments",    desc: "Assignment help",      icon: "" },
  { id: "announcements", label: "Announcements",  desc: "Important updates",    icon: "" },
];

// channels that allow file uploads
const FILE_ALLOWED = ["notes", "assignments", "doubts"];

// const socket = io(serverUrl);
import { socket } from "../App";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .classroom-root * { box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }

  .ch-scroll::-webkit-scrollbar { width: 3px; }
  .ch-scroll::-webkit-scrollbar-track { background: transparent; }
  .ch-scroll::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.2); border-radius: 99px; }

  .msg-actions { opacity: 0; transition: opacity 0.2s; }
  .msg-group:hover .msg-actions { opacity: 1; }

  .channel-btn { transition: all 0.18s; }
  .channel-btn:hover { background: rgba(59,130,246,0.1) !important; color: #E2E8F0 !important; }

  .chat-textarea { transition: border-color 0.2s; }
  .chat-textarea::placeholder { color: #475569; }
  .chat-textarea:focus { border-color: rgba(139,92,246,0.45) !important; outline: none; }

  .reply-input { transition: border-color 0.2s; }
  .reply-input::placeholder { color: #475569; }
  .reply-input:focus { border-color: rgba(139,92,246,0.45) !important; outline: none; }

  .upvote-btn:hover { color: #8B5CF6 !important; }
  .reply-btn:hover { color: #06B6D4 !important; }
`;

export default function Classroom({ courseId }) {
  const { userData } = useSelector(state => state.user);
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [warning, setWarning] = useState({ count: 0, isBanned: false });
  const [activeThread, setActiveThread] = useState(null);
  const [threadReplies, setThreadReplies] = useState([]);
  const [replyInput, setReplyInput] = useState("");
  const [file, setFile] = useState(null);
  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const fetchWarning = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/classroom/warnings/${courseId}`,
          { withCredentials: true }
        );
        setWarning({ count: data.warningCount, isBanned: data.isBanned });
      } catch {}
    };
    fetchWarning();
  }, [courseId]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/classroom/messages/${courseId}/${activeChannel}`,
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch {}
      setLoading(false);
    };

    fetchMessages();
    socket.emit("join_room", { courseId, channel: activeChannel });

    const handleReceive = (message) => {
      setMessages(prev => {
        const exists = prev.some(m => m._id === message._id);
        if (exists) return prev;
        return [...prev, message];
      });
    };

    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [activeChannel, courseId]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text && !file) return;
    setSending(true);

    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        if (text) formData.append("text", text);
        res = await axios.post(
          `${serverUrl}/api/classroom/upload/${courseId}/${activeChannel}`,
          formData,
          { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        res = await axios.post(
          `${serverUrl}/api/classroom/send/${courseId}/${activeChannel}`,
          { text },
          { withCredentials: true }
        );
      }

      socket.emit("new_message", { courseId, channel: activeChannel, message: res.data.message });
      setMessages(prev => [...prev, res.data.message]);
      setInput("");
      setFile(null);

    } catch (error) {
      const msg = error?.response?.data?.message;
      const isWarning = error?.response?.data?.warned;
      const isBanned = error?.response?.data?.banned;
      if (isWarning) {
        setWarning(prev => ({ ...prev, count: error.response.data.warningCount }));
        alert(msg);
      } else if (isBanned) {
        setWarning({ count: 3, isBanned: true });
        alert(msg);
      } else {
        alert(msg || "Failed to send message");
      }
    }
    setSending(false);
  };

  const handleUpvote = async (messageId) => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/classroom/upvote/${messageId}`,
        {}, { withCredentials: true }
      );
      setMessages(prev => prev.map(m =>
        m._id === messageId ? { ...m, upvotes: new Array(data.upvotes).fill(null) } : m
      ));
    } catch {}
  };

  const openThread = async (message) => {
    setActiveThread(message);
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/classroom/thread/${message._id}`,
        { withCredentials: true }
      );
      setThreadReplies(data.replies);
    } catch {}
  };

  const sendReply = async () => {
    if (!replyInput.trim()) return;
    try {
      const res = await axios.post(
        `${serverUrl}/api/classroom/send/${courseId}/${activeChannel}`,
        { text: replyInput, parentId: activeThread._id },
        { withCredentials: true }
      );
      setThreadReplies(prev => [...prev, res.data.message]);
      setReplyInput("");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to send reply");
    }
  };

  const markBest = async (messageId) => {
    try {
      await axios.post(
        `${serverUrl}/api/classroom/bestanswer/${messageId}`,
        {}, { withCredentials: true }
      );
      setThreadReplies(prev => prev.map(r =>
        r._id === messageId ? { ...r, isBestAnswer: true } : r
      ));
    } catch {}
  };

  const activeCh = CHANNELS.find(c => c.id === activeChannel);
  const canUploadFile = FILE_ALLOWED.includes(activeChannel);

  return (
    <>
      <style>{css}</style>
      <div className="classroom-root" style={{
        display: 'flex', height: 700,
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: 18, overflow: 'hidden',
        background: '#111827',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>

        {/* ── Sidebar ── */}
        <div style={{
          width: 200, background: '#0F172A',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
          borderRight: '1px solid rgba(59,130,246,0.1)',
        }}>
          {/* Sidebar header */}
          <div style={{
            padding: '16px 14px',
            borderBottom: '1px solid rgba(59,130,246,0.1)',
            background: 'rgba(15,23,42,0.8)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0,
              }}>C</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', margin: 0 }}>Classroom</p>
                <p style={{ fontSize: 10, color: '#94A3B8', margin: 0 }}>Course Community</p>
              </div>
            </div>
          </div>

          {/* Channel list */}
          <div className="ch-scroll" style={{ flex: 1, padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
            {CHANNELS.map(ch => (
              <button
                key={ch.id}
                className="channel-btn"
                onClick={() => { setActiveChannel(ch.id); setActiveThread(null); }}
                style={{
                  textAlign: 'left', padding: '9px 10px',
                  borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: activeChannel === ch.id ? 'rgba(59,130,246,0.15)' : 'transparent',
                  color: activeChannel === ch.id ? '#E2E8F0' : '#94A3B8',
                  borderLeft: activeChannel === ch.id ? '3px solid #3B82F6' : '3px solid transparent',
                  transition: 'all 0.18s',
                }}
              >
                <span style={{ fontSize: 14 }}>{ch.icon}</span>
                {ch.label}
              </button>
            ))}
          </div>

          {/* Warning badge */}
          {warning.count > 0 && (
            <div style={{
              margin: '10px 10px',
              padding: '8px 10px',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 600,
              background: warning.isBanned ? 'rgba(239,68,68,0.12)' : 'rgba(251,191,36,0.1)',
              border: `1px solid ${warning.isBanned ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.25)'}`,
              color: warning.isBanned ? '#FCA5A5' : '#FCD34D',
            }}>
              <FaTriangleExclamation style={{ flexShrink: 0 }} />
              {warning.isBanned ? 'You are banned' : `${warning.count}/3 warnings`}
            </div>
          )}
        </div>

        {/* ── Main Chat ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Channel header */}
          <div style={{
            padding: '12px 18px',
            borderBottom: '1px solid rgba(59,130,246,0.1)',
            background: 'rgba(15,23,42,0.6)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>{activeCh?.icon}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', margin: 0 }}>{activeCh?.label}</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{activeCh?.desc}</p>
            </div>
            {canUploadFile && (
              <span style={{
                marginLeft: 'auto', fontSize: 10, fontWeight: 600,
                padding: '3px 10px', borderRadius: 99,
                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
                color: '#06B6D4', letterSpacing: '0.3px',
              }}>
                📎 File uploads on
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="ch-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 13, marginTop: 40 }}>
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 13, marginTop: 40 }}>
               Be respectful and helpful to others.Avoid spamming or sharing inappropriate content. You will be banned from classroom after 3 warnings!
              </div>
            ) : (
              messages.map(msg => (
                <MessageBubble
                  key={msg._id}
                  msg={msg}
                  currentUserId={userData?._id}
                  onUpvote={handleUpvote}
                  onOpenThread={openThread}
                />
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Banned notice */}
          {warning.isBanned ? (
            <div style={{
              padding: '14px', textAlign: 'center', fontSize: 13, fontWeight: 600,
              background: 'rgba(239,68,68,0.08)', borderTop: '1px solid rgba(239,68,68,0.2)',
              color: '#FCA5A5',
            }}>
              🚫 You have been removed from this classroom due to repeated violations.
            </div>
          ) : (
            <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(59,130,246,0.1)', background: 'rgba(15,23,42,0.5)' }}>

              {/* File preview */}
              {file && (
                <div style={{
                  marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, color: '#94A3B8',
                  background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
                  padding: '6px 12px', borderRadius: 8,
                }}>
                  <FaFilePdf style={{ color: '#EF4444', flexShrink: 0 }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                  <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 13, padding: 0 }}>✕</button>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                {/* File upload button */}
                {canUploadFile && (
                  <>
                    <button
                      onClick={() => fileRef.current.click()}
                      title={`Attach file (${activeChannel})`}
                      style={{
                        width: 34, height: 34, borderRadius: '50%', cursor: 'pointer',
                        background: file ? 'rgba(6,182,212,0.2)' : 'rgba(59,130,246,0.1)',
                        border: file ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(59,130,246,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: file ? '#06B6D4' : '#3B82F6', fontSize: 13, flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                    >
                      <FaPaperclip />
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,image/*"
                      style={{ display: 'none' }}
                      onChange={e => setFile(e.target.files[0])}
                    />
                  </>
                )}

                <textarea
                  className="chat-textarea"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={`Message ${activeCh?.label}...`}
                  rows={1}
                  style={{
                    flex: 1, resize: 'none',
                    background: 'rgba(15,23,42,0.7)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: 12, padding: '9px 14px',
                    fontSize: 13, color: '#E2E8F0',
                    fontFamily: 'inherit', maxHeight: 80, lineHeight: 1.5,
                  }}
                  onInput={e => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
                  }}
                />

                <button
                  onClick={sendMessage}
                  disabled={sending || (!input.trim() && !file)}
                  style={{
                    width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: (sending || (!input.trim() && !file))
                      ? 'rgba(255,255,255,0.06)'
                      : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.2s',
                    boxShadow: (sending || (!input.trim() && !file)) ? 'none' : '0 4px 12px rgba(59,130,246,0.4)',
                  }}
                >
                  <FaPaperPlane style={{ color: 'white', fontSize: 12 }} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Thread Panel ── */}
        {activeThread && (
          <div style={{
            width: 280, flexShrink: 0,
            borderLeft: '1px solid rgba(59,130,246,0.1)',
            display: 'flex', flexDirection: 'column',
            background: '#0F172A',
          }}>
            {/* Thread header */}
            <div style={{
              padding: '12px 14px',
              borderBottom: '1px solid rgba(59,130,246,0.1)',
              background: 'rgba(15,23,42,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', margin: 0 }}>Thread</p>
              <button onClick={() => setActiveThread(null)} style={{
                background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer',
                fontSize: 16, lineHeight: 1, padding: 0, transition: 'color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#E2E8F0'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >✕</button>
            </div>

            {/* Original message */}
            <div style={{
              padding: '12px', borderBottom: '1px solid rgba(59,130,246,0.08)',
              background: 'rgba(59,130,246,0.04)',
            }}>
              <MessageBubble msg={activeThread} currentUserId={userData?._id} isThread />
            </div>

            {/* Replies */}
            <div className="ch-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {threadReplies.map(reply => (
                <div key={reply._id} style={{ position: 'relative' }}>
                  {reply.isBestAnswer && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 600, color: '#34D399', marginBottom: 4,
                    }}>
                      <FaCheckCircle style={{ fontSize: 11 }} /> Best Answer
                    </div>
                  )}
                  <MessageBubble msg={reply} currentUserId={userData?._id} isThread />
                  {activeThread?.userId?._id === userData?._id && !reply.isBestAnswer && (
                    <button
                      onClick={() => markBest(reply._id)}
                      style={{
                        fontSize: 11, fontWeight: 600, color: '#34D399',
                        background: 'none', border: 'none', cursor: 'pointer',
                        marginTop: 3, marginLeft: 34, padding: 0, fontFamily: 'inherit',
                        transition: 'opacity 0.15s',
                      }}
                    >
                      ✓ Mark as best answer
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Reply input */}
            <div style={{
              padding: '10px 12px', borderTop: '1px solid rgba(59,130,246,0.1)',
              display: 'flex', gap: 8, alignItems: 'center',
              background: 'rgba(15,23,42,0.5)',
            }}>
              <input
                className="reply-input"
                value={replyInput}
                onChange={e => setReplyInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendReply(); }}
                placeholder="Reply..."
                style={{
                  flex: 1,
                  background: 'rgba(15,23,42,0.7)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  borderRadius: 10, padding: '8px 12px',
                  fontSize: 12, color: '#E2E8F0', fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <button
                onClick={sendReply}
                style={{
                  width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(59,130,246,0.35)', transition: 'all 0.2s',
                }}
              >
                <FaPaperPlane style={{ color: 'white', fontSize: 11 }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── Message Bubble ──
function MessageBubble({ msg, currentUserId, onUpvote, onOpenThread, isThread = false }) {
  const isOwn = msg.userId?._id === currentUserId;

  return (
    <div className="msg-group" style={{
      display: 'flex', gap: 8, flexDirection: isOwn ? 'row-reverse' : 'row',
    }}>
      {/* Avatar */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
        background: isOwn
          ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
          : 'linear-gradient(135deg, #1E293B, #334155)',
        border: isOwn ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(59,130,246,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800, color: isOwn ? 'white' : '#94A3B8',
      }}>
        {msg.userId?.name?.charAt(0)?.toUpperCase() || "?"}
      </div>

      <div style={{ maxWidth: '75%' }}>
        {/* Name + time */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3,
          flexDirection: isOwn ? 'row-reverse' : 'row',
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: isOwn ? '#C4B5FD' : '#94A3B8' }}>
            {msg.userId?.name}
          </span>
          <span style={{ fontSize: 10, color: '#475569' }}>
            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* Bubble */}
        <div style={{
          padding: '9px 13px',
          borderRadius: isOwn ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
          fontSize: 13, lineHeight: 1.6,
          background: isOwn
            ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))'
            : 'rgba(30,41,59,0.9)',
          border: isOwn
            ? '1px solid rgba(139,92,246,0.25)'
            : '1px solid rgba(59,130,246,0.1)',
          color: '#E2E8F0',
        }}>
          {msg.text && <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-words' }}>{msg.text}</p>}

          {/* File attachment */}
          {msg.fileUrl && (
            <a href={msg.fileUrl} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginTop: msg.text ? 6 : 0,
              fontSize: 12, fontWeight: 500,
              color: '#06B6D4', textDecoration: 'none',
            }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              {msg.fileType === "pdf"
                ? <FaFilePdf style={{ color: '#EF4444', fontSize: 14 }} />
                : <FaImage style={{ color: '#3B82F6', fontSize: 14 }} />}
              {msg.fileName || "View file"}
            </a>
          )}
        </div>

        {/* Actions */}
        {!isThread && (
          <div className="msg-actions" style={{
            display: 'flex', gap: 10, marginTop: 4,
            flexDirection: isOwn ? 'row-reverse' : 'row',
          }}>
            <button
              className="upvote-btn"
              onClick={() => onUpvote?.(msg._id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 11, color: '#94A3B8', background: 'none',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                padding: 0, transition: 'color 0.15s',
              }}
            >
              <FaThumbsUp style={{ fontSize: 10 }} />
              {msg.upvotes?.length || 0}
            </button>
            <button
              className="reply-btn"
              onClick={() => onOpenThread?.(msg)}
              style={{
                fontSize: 11, color: '#94A3B8', background: 'none',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                padding: 0, transition: 'color 0.15s',
              }}
            >
              Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}