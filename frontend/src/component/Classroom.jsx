
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { serverUrl } from "../config";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { FaPaperPlane, FaThumbsUp, FaCheckCircle, FaFilePdf, FaImage, FaPaperclip } from "react-icons/fa";
// import { FaTriangleExclamation } from "react-icons/fa6";

// const CHANNELS = [
//   { id: "general",       label: "General",       desc: "General discussion",   icon: "" },
//   { id: "doubts",        label: "Doubts",         desc: "Ask questions",        icon: "" },
//   { id: "notes",         label: "Notes",          desc: "Share notes & PDFs",   icon: "" },
//   { id: "assignments",   label: "Assignments",    desc: "Assignment help",      icon: "" },
//   { id: "announcements", label: "Announcements",  desc: "Important updates",    icon: "" },
// ];


// const FILE_ALLOWED = ["notes", "assignments", "doubts"];

// import { socket } from "../App";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');
//   .classroom-root * { box-sizing: border-box; font-family: 'Roboto', sans-serif; }

//   .ch-scroll::-webkit-scrollbar { width: 3px; }
//   .ch-scroll::-webkit-scrollbar-track { background: transparent; }
//   .ch-scroll::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 4px; }

//   .msg-actions { opacity: 0; transition: opacity 0.2s; }
//   .msg-group:hover .msg-actions { opacity: 1; }

//   .channel-btn { transition: all 0.18s; }
//   .channel-btn:hover { background: rgba(124,58,237,0.1) !important; color: #1F2937 !important; }

//   .chat-textarea { transition: border-color 0.2s; }
//   .chat-textarea::placeholder { color: #9CA3AF; }
//   .chat-textarea:focus { border-color: #7C3AED !important; outline: none; }

//   .reply-input { transition: border-color 0.2s; }
//   .reply-input::placeholder { color: #9CA3AF; }
//   .reply-input:focus { border-color: #7C3AED !important; outline: none; }

//   .upvote-btn:hover { color: #7C3AED !important; }
//   .reply-btn:hover { color: #10B981 !important; }
// `;

// export default function Classroom({ courseId }) {
//   const { userData } = useSelector(state => state.user);
//   const [activeChannel, setActiveChannel] = useState("general");
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sending, setSending] = useState(false);
//   const [warning, setWarning] = useState({ count: 0, isBanned: false });
//   const [activeThread, setActiveThread] = useState(null);
//   const [threadReplies, setThreadReplies] = useState([]);
//   const [replyInput, setReplyInput] = useState("");
//   const [file, setFile] = useState(null);
//   const bottomRef = useRef(null);
//   const fileRef = useRef(null);

//   useEffect(() => {
//     const fetchWarning = async () => {
//       try {
//         const { data } = await axios.get(
//           `${serverUrl}/api/classroom/warnings/${courseId}`,
//           { withCredentials: true }
//         );
//         setWarning({ count: data.warningCount, isBanned: data.isBanned });
//       } catch {}
//     };
//     fetchWarning();
//   }, [courseId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `${serverUrl}/api/classroom/messages/${courseId}/${activeChannel}`,
//           { withCredentials: true }
//         );
//         setMessages(data.messages);
//       } catch {}
//       setLoading(false);
//     };

//     fetchMessages();
//     socket.emit("join_room", { courseId, channel: activeChannel });

//     const handleReceive = (message) => {
//       setMessages(prev => {
//         const exists = prev.some(m => m._id === message._id);
//         if (exists) return prev;
//         return [...prev, message];
//       });
//     };

//     socket.on("receive_message", handleReceive);
//     return () => socket.off("receive_message", handleReceive);
//   }, [activeChannel, courseId]);

//   const sendMessage = async () => {
//     const text = input.trim();
//     if (!text && !file) return;
//     setSending(true);

//     try {
//       let res;
//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         if (text) formData.append("text", text);
//         res = await axios.post(
//           `${serverUrl}/api/classroom/upload/${courseId}/${activeChannel}`,
//           formData,
//           { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
//         );
//       } else {
//         res = await axios.post(
//           `${serverUrl}/api/classroom/send/${courseId}/${activeChannel}`,
//           { text },
//           { withCredentials: true }
//         );
//       }

//       socket.emit("new_message", { courseId, channel: activeChannel, message: res.data.message });
//       setMessages(prev => [...prev, res.data.message]);
//       setInput("");
//       setFile(null);

//     } catch (error) {
//       const msg = error?.response?.data?.message;
//       const isWarning = error?.response?.data?.warned;
//       const isBanned = error?.response?.data?.banned;
//       if (isWarning) {
//         setWarning(prev => ({ ...prev, count: error.response.data.warningCount }));
//         alert(msg);
//       } else if (isBanned) {
//         setWarning({ count: 3, isBanned: true });
//         alert(msg);
//       } else {
//         alert(msg || "Failed to send message");
//       }
//     }
//     setSending(false);
//   };

//   const handleUpvote = async (messageId) => {
//     try {
//       const { data } = await axios.post(
//         `${serverUrl}/api/classroom/upvote/${messageId}`,
//         {}, { withCredentials: true }
//       );
//       setMessages(prev => prev.map(m =>
//         m._id === messageId ? { ...m, upvotes: new Array(data.upvotes).fill(null) } : m
//       ));
//     } catch {}
//   };

//   const openThread = async (message) => {
//     setActiveThread(message);
//     try {
//       const { data } = await axios.get(
//         `${serverUrl}/api/classroom/thread/${message._id}`,
//         { withCredentials: true }
//       );
//       setThreadReplies(data.replies);
//     } catch {}
//   };

//   const sendReply = async () => {
//     if (!replyInput.trim()) return;
//     try {
//       const res = await axios.post(
//         `${serverUrl}/api/classroom/send/${courseId}/${activeChannel}`,
//         { text: replyInput, parentId: activeThread._id },
//         { withCredentials: true }
//       );
//       setThreadReplies(prev => [...prev, res.data.message]);
//       setReplyInput("");
//     } catch (error) {
//       alert(error?.response?.data?.message || "Failed to send reply");
//     }
//   };

//   const markBest = async (messageId) => {
//     try {
//       await axios.post(
//         `${serverUrl}/api/classroom/bestanswer/${messageId}`,
//         {}, { withCredentials: true }
//       );
//       setThreadReplies(prev => prev.map(r =>
//         r._id === messageId ? { ...r, isBestAnswer: true } : r
//       ));
//     } catch {}
//   };

//   const activeCh = CHANNELS.find(c => c.id === activeChannel);
//   const canUploadFile = FILE_ALLOWED.includes(activeChannel);

//   return (
//     <>
//       <style>{css}</style>
//       <div className="classroom-root" style={{
//         display: 'flex', height: 700,
//         border: '1px solid rgba(124,58,237,0.18)',
//         borderRadius: 12, overflow: 'hidden',
//         background: '#FFFFFF',
//         boxShadow: '0 20px 60px rgba(124,58,237,0.1)',
//       }}>

//         {/* ── Sidebar ── */}
//         <div style={{
//           width: 200, background: '#F9FAFB',
//           display: 'flex', flexDirection: 'column', flexShrink: 0,
//           borderRight: '1px solid rgba(124,58,237,0.12)',
//         }}>
//           {/* Sidebar header */}
//           <div style={{
//             padding: '16px 14px',
//             borderBottom: '1px solid rgba(124,58,237,0.12)',
//             background: '#FFFFFF',
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <div style={{
//                 width: 28, height: 28, borderRadius: 6,
//                 background: 'linear-gradient(135deg, #7C3AED, #10B981)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0,
//               }}>C</div>
//               <div>
//                 <p style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', margin: 0 }}>Classroom</p>
//                 <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Course Community</p>
//               </div>
//             </div>
//           </div>

//           {/* Channel list */}
//           <div className="ch-scroll" style={{ flex: 1, padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
//             {CHANNELS.map(ch => (
//               <button
//                 key={ch.id}
//                 className="channel-btn"
//                 onClick={() => { setActiveChannel(ch.id); setActiveThread(null); }}
//                 style={{
//                   textAlign: 'left', padding: '9px 10px',
//                   borderRadius: 6, border: 'none', cursor: 'pointer',
//                   fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
//                   display: 'flex', alignItems: 'center', gap: 8,
//                   background: activeChannel === ch.id ? 'rgba(124,58,237,0.12)' : 'transparent',
//                   color: activeChannel === ch.id ? '#1F2937' : '#6B7280',
//                   borderLeft: activeChannel === ch.id ? '3px solid #7C3AED' : '3px solid transparent',
//                   transition: 'all 0.18s',
//                 }}
//               >
//                 <span style={{ fontSize: 14 }}>{ch.icon}</span>
//                 {ch.label}
//               </button>
//             ))}
//           </div>

//           {/* Warning badge */}
//           {warning.count > 0 && (
//             <div style={{
//               margin: '10px 10px',
//               padding: '8px 10px',
//               borderRadius: 6,
//               display: 'flex', alignItems: 'center', gap: 6,
//               fontSize: 11, fontWeight: 600,
//               background: warning.isBanned ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.12)',
//               border: `2px solid ${warning.isBanned ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'}`,
//               color: warning.isBanned ? '#DC2626' : '#D97706',
//             }}>
//               <FaTriangleExclamation style={{ flexShrink: 0 }} />
//               {warning.isBanned ? 'You are banned' : `${warning.count}/3 warnings`}
//             </div>
//           )}
//         </div>

//         {/* ── Main Chat ── */}
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

//           {/* Channel header */}
//           <div style={{
//             padding: '12px 18px',
//             borderBottom: '1px solid rgba(124,58,237,0.12)',
//             background: '#F9FAFB',
//             display: 'flex', alignItems: 'center', gap: 10,
//           }}>
//             <span style={{ fontSize: 19 }}>{activeCh?.icon}</span>
//             <div>
//               <p style={{ fontSize: 17, fontWeight: 700, color: '#1F2937', margin: 0 }}>{activeCh?.label}</p>
//               <p style={{ fontSize: 15, color: '#6B7280', margin: 0 }}>{activeCh?.desc}</p>
//             </div>
//             {canUploadFile && (
//               <span style={{
//                 marginLeft: 'auto', fontSize: 10, fontWeight: 600,
//                 padding: '3px 10px', borderRadius: 6,
//                 background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)',
//                 color: '#047857', letterSpacing: '0.3px',
//               }}>
//                 📎 File uploads on
//               </span>
//             )}
//           </div>

//           {/* Messages */}
//           <div className="ch-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
//             {loading ? (
//               <div style={{ textAlign: 'center', color: '#6B7280', fontSize: 15, marginTop: 40 }}>
//                 Loading messages...
//               </div>
//             ) : messages.length === 0 ? (
//               <div style={{ textAlign: 'center', color: '#6B7280', fontSize: 15, marginTop: 40 }}>
//                Be respectful and helpful to others.Avoid spamming or sharing inappropriate content. You will be banned from classroom after 3 warnings!
//               </div>
//             ) : (
//               messages.map(msg => (
//                 <MessageBubble
//                   key={msg._id}
//                   msg={msg}
//                   currentUserId={userData?._id}
//                   onUpvote={handleUpvote}
//                   onOpenThread={openThread}
//                 />
//               ))
//             )}
//             <div ref={bottomRef} />
//           </div>

//           {/* Banned notice */}
//           {warning.isBanned ? (
//             <div style={{
//               padding: '14px', textAlign: 'center', fontSize: 16, fontWeight: 600,
//               background: 'rgba(239,68,68,0.08)', borderTop: '2px solid rgba(239,68,68,0.25)',
//               color: '#DC2626',
//             }}>
//               🚫 You have been removed from this classroom due to repeated violations.
//             </div>
//           ) : (
//             <div style={{ padding: '10px 14px 14px', borderTop: '2px solid rgba(124,58,237,0.12)', background: '#FFFFFF' }}>

//               {/* File preview */}
//               {file && (
//                 <div style={{
//                   marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
//                   fontSize: 12, color: '#6B7280',
//                   background: 'rgba(124,58,237,0.06)', border: '2px solid rgba(124,58,237,0.2)',
//                   padding: '6px 12px', borderRadius: 6,
//                 }}>
//                   <FaFilePdf style={{ color: '#EF4444', flexShrink: 0 }} />
//                   <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
//                   <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 13, padding: 0 }}>✕</button>
//                 </div>
//               )}

//               <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
//                 {/* File upload button */}
//                 {canUploadFile && (
//                   <>
//                     <button
//                       onClick={() => fileRef.current.click()}
//                       title={`Attach file (${activeChannel})`}
//                       style={{
//                         width: 34, height: 34, borderRadius: 8, cursor: 'pointer',
//                         background: file ? 'rgba(16,185,129,0.15)' : 'rgba(124,58,237,0.08)',
//                         border: file ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(124,58,237,0.25)',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         color: file ? '#10B981' : '#7C3AED', fontSize: 13, flexShrink: 0,
//                         transition: 'all 0.2s',
//                       }}
//                     >
//                       <FaPaperclip />
//                     </button>
//                     <input
//                       ref={fileRef}
//                       type="file"
//                       accept=".pdf,image/*"
//                       style={{ display: 'none' }}
//                       onChange={e => setFile(e.target.files[0])}
//                     />
//                   </>
//                 )}

//                 <textarea
//                   className="chat-textarea"
//                   value={input}
//                   onChange={e => setInput(e.target.value)}
//                   onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
//                   placeholder={`Message ${activeCh?.label}...`}
//                   rows={1}
//                   style={{
//                     flex: 1, resize: 'none',
//                     background: '#FFFFFF',
//                     border: '1px solid rgba(124,58,237,0.25)',
//                     borderRadius: 8, padding: '9px 14px',
//                     fontSize: 13, color: '#1F2937',
//                     fontFamily: 'inherit', maxHeight: 80, lineHeight: 1.5,
//                   }}
//                   onInput={e => {
//                     e.target.style.height = "auto";
//                     e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
//                   }}
//                 />

//                 <button
//                   onClick={sendMessage}
//                   disabled={sending || (!input.trim() && !file)}
//                   style={{
//                     width: 34, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
//                     background: (sending || (!input.trim() && !file))
//                       ? 'rgba(0,0,0,0.06)'
//                       : 'linear-gradient(135deg, #7C3AED, #10B981)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     flexShrink: 0, transition: 'all 0.2s',
//                     boxShadow: (sending || (!input.trim() && !file)) ? 'none' : '0 4px 12px rgba(124,58,237,0.35)',
//                   }}
//                 >
//                   <FaPaperPlane style={{ color: 'white', fontSize: 12 }} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── Thread Panel ── */}
//         {activeThread && (
//           <div style={{
//             width: 280, flexShrink: 0,
//             borderLeft: '1px solid rgba(124,58,237,0.12)',
//             display: 'flex', flexDirection: 'column',
//             background: '#F9FAFB',
//           }}>
//             {/* Thread header */}
//             <div style={{
//               padding: '12px 14px',
//               borderBottom: '1px solid rgba(124,58,237,0.12)',
//               background: '#FFFFFF',
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             }}>
//               <p style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', margin: 0 }}>Thread</p>
//               <button onClick={() => setActiveThread(null)} style={{
//                 background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer',
//                 fontSize: 16, lineHeight: 1, padding: 0, transition: 'color 0.15s',
//               }}
//                 onMouseEnter={e => e.currentTarget.style.color = '#1F2937'}
//                 onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
//               >✕</button>
//             </div>

//             {/* Original message */}
//             <div style={{
//               padding: '12px', borderBottom: '1px solid rgba(124,58,237,0.1)',
//               background: 'rgba(124,58,237,0.04)',
//             }}>
//               <MessageBubble msg={activeThread} currentUserId={userData?._id} isThread />
//             </div>

//             {/* Replies */}
//             <div className="ch-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
//               {threadReplies.map(reply => (
//                 <div key={reply._id} style={{ position: 'relative' }}>
//                   {reply.isBestAnswer && (
//                     <div style={{
//                       display: 'flex', alignItems: 'center', gap: 5,
//                       fontSize: 11, fontWeight: 600, color: '#10B981', marginBottom: 4,
//                     }}>
//                       <FaCheckCircle style={{ fontSize: 11 }} /> Best Answer
//                     </div>
//                   )}
//                   <MessageBubble msg={reply} currentUserId={userData?._id} isThread />
//                   {activeThread?.userId?._id === userData?._id && !reply.isBestAnswer && (
//                     <button
//                       onClick={() => markBest(reply._id)}
//                       style={{
//                         fontSize: 11, fontWeight: 600, color: '#10B981',
//                         background: 'none', border: 'none', cursor: 'pointer',
//                         marginTop: 3, marginLeft: 34, padding: 0, fontFamily: 'inherit',
//                         transition: 'opacity 0.15s',
//                       }}
//                     >
//                       ✓ Mark as best answer
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Reply input */}
//             <div style={{
//               padding: '10px 12px', borderTop: '1px solid rgba(124,58,237,0.12)',
//               display: 'flex', gap: 8, alignItems: 'center',
//               background: '#FFFFFF',
//             }}>
//               <input
//                 className="reply-input"
//                 value={replyInput}
//                 onChange={e => setReplyInput(e.target.value)}
//                 onKeyDown={e => { if (e.key === "Enter") sendReply(); }}
//                 placeholder="Reply..."
//                 style={{
//                   flex: 1,
//                   background: '#FFFFFF',
//                   border: '1px solid rgba(124,58,237,0.25)',
//                   borderRadius: 6, padding: '8px 12px',
//                   fontSize: 12, color: '#1F2937', fontFamily: 'inherit',
//                   outline: 'none',
//                 }}
//               />
//               <button
//                 onClick={sendReply}
//                 style={{
//                   width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
//                   background: 'linear-gradient(135deg, #7C3AED, #10B981)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   boxShadow: '0 4px 10px rgba(124,58,237,0.3)', transition: 'all 0.2s',
//                 }}
//               >
//                 <FaPaperPlane style={{ color: 'white', fontSize: 11 }} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // ── Message Bubble ──
// function MessageBubble({ msg, currentUserId, onUpvote, onOpenThread, isThread = false }) {
//   const isOwn = msg.userId?._id === currentUserId;

//   return (
//     <div className="msg-group" style={{
//       display: 'flex', gap: 8, flexDirection: isOwn ? 'row-reverse' : 'row',
//     }}>
//       {/* Avatar */}
//       <div style={{
//         width: 28, height: 28, borderRadius: 6, flexShrink: 0, marginTop: 2,
//         background: isOwn
//           ? 'linear-gradient(135deg, #7C3AED, #10B981)'
//           : 'linear-gradient(135deg, #E5E7EB, #D1D5DB)',
//         border: isOwn ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(124,58,237,0.2)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         fontSize: 11, fontWeight: 800, color: isOwn ? 'white' : '#6B7280',
//       }}>
//         {msg.userId?.name?.charAt(0)?.toUpperCase() || "?"}
//       </div>

//       <div style={{ maxWidth: '75%' }}>
//         {/* Name + time */}
//         <div style={{
//           display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3,
//           flexDirection: isOwn ? 'row-reverse' : 'row',
//         }}>
//           <span style={{ fontSize: 11, fontWeight: 600, color: isOwn ? '#7C3AED' : '#6B7280' }}>
//             {msg.userId?.name}
//           </span>
//           <span style={{ fontSize: 10, color: '#9CA3AF' }}>
//             {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//           </span>
//         </div>

//         {/* Bubble */}
//         <div style={{
//           padding: '9px 13px',
//           borderRadius: 6,
//           fontSize: 13, lineHeight: 1.6,
//           background: isOwn
//             ? 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(16,185,129,0.12))'
//             : '#F9FAFB',
//           border: isOwn
//             ? '1px solid rgba(124,58,237,0.3)'
//             : '1px solid rgba(124,58,237,0.1)',
//           color: '#1F2937',
//         }}>
//           {msg.text && <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-words' }}>{msg.text}</p>}

//           {/* File attachment */}
//           {msg.fileUrl && (
//             <a href={msg.fileUrl} target="_blank" rel="noreferrer" style={{
//               display: 'flex', alignItems: 'center', gap: 6,
//               marginTop: msg.text ? 6 : 0,
//               fontSize: 12, fontWeight: 500,
//               color: '#10B981', textDecoration: 'none',
//             }}
//               onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
//               onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
//             >
//               {msg.fileType === "pdf"
//                 ? <FaFilePdf style={{ color: '#EF4444', fontSize: 14 }} />
//                 : <FaImage style={{ color: '#7C3AED', fontSize: 14 }} />}
//               {msg.fileName || "View file"}
//             </a>
//           )}
//         </div>

//         {/* Actions */}
//         {!isThread && (
//           <div className="msg-actions" style={{
//             display: 'flex', gap: 10, marginTop: 4,
//             flexDirection: isOwn ? 'row-reverse' : 'row',
//           }}>
//             <button
//               className="upvote-btn"
//               onClick={() => onUpvote?.(msg._id)}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 4,
//                 fontSize: 11, color: '#6B7280', background: 'none',
//                 border: 'none', cursor: 'pointer', fontFamily: 'inherit',
//                 padding: 0, transition: 'color 0.15s',
//               }}
//             >
//               <FaThumbsUp style={{ fontSize: 10 }} />
//               {msg.upvotes?.length || 0}
//             </button>
//             <button
//               className="reply-btn"
//               onClick={() => onOpenThread?.(msg)}
//               style={{
//                 fontSize: 11, color: '#6B7280', background: 'none',
//                 border: 'none', cursor: 'pointer', fontFamily: 'inherit',
//                 padding: 0, transition: 'color 0.15s',
//               }}
//             >
//               Reply
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
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


const FILE_ALLOWED = ["notes", "assignments", "doubts"];

import { socket } from "../App";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');
  .classroom-root * { box-sizing: border-box; font-family: 'Roboto', sans-serif; }

  .ch-scroll::-webkit-scrollbar { width: 3px; }
  .ch-scroll::-webkit-scrollbar-track { background: transparent; }
  .ch-scroll::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 4px; }

  .msg-actions { opacity: 0; transition: opacity 0.2s; }
  .msg-group:hover .msg-actions { opacity: 1; }

  /* On touch devices, always show msg-actions */
  @media (hover: none) {
    .msg-actions { opacity: 1; }
  }

  .channel-btn { transition: all 0.18s; }
  .channel-btn:hover { background: rgba(124,58,237,0.1) !important; color: #1F2937 !important; }

  .chat-textarea { transition: border-color 0.2s; }
  .chat-textarea::placeholder { color: #9CA3AF; }
  .chat-textarea:focus { border-color: #7C3AED !important; outline: none; }

  .reply-input { transition: border-color 0.2s; }
  .reply-input::placeholder { color: #9CA3AF; }
  .reply-input:focus { border-color: #7C3AED !important; outline: none; }

  .upvote-btn:hover { color: #7C3AED !important; }
  .reply-btn:hover { color: #10B981 !important; }

  /* ── Responsive: Sidebar overlay on mobile ── */
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 40;
  }
  .sidebar-overlay.open { display: block; }

  @media (max-width: 640px) {
    .classroom-sidebar {
      position: fixed !important;
      top: 0; left: 0; bottom: 0;
      z-index: 50;
      transform: translateX(-100%);
      transition: transform 0.25s ease;
      width: 220px !important;
      height: 100% !important;
      border-radius: 0 !important;
    }
    .classroom-sidebar.open {
      transform: translateX(0);
      box-shadow: 4px 0 24px rgba(124,58,237,0.18);
    }
    .classroom-root {
      height: 100svh !important;
      border-radius: 0 !important;
      border: none !important;
    }
    .thread-panel {
      position: fixed !important;
      top: 0; right: 0; bottom: 0;
      z-index: 50;
      width: 100vw !important;
      height: 100% !important;
      border-radius: 0 !important;
      transform: translateX(100%);
      transition: transform 0.25s ease;
    }
    .thread-panel.open {
      transform: translateX(0);
    }
  }

  @media (min-width: 641px) and (max-width: 900px) {
    .classroom-sidebar {
      width: 160px !important;
    }
    .thread-panel {
      width: 240px !important;
    }
  }

  /* Hamburger button — only visible on mobile */
  .hamburger-btn {
    display: none;
  }
  @media (max-width: 640px) {
    .hamburger-btn {
      display: flex;
    }
  }

  /* Hide "File uploads on" badge label on small screens */
  @media (max-width: 480px) {
    .file-upload-badge span { display: none; }
  }
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleChannelSelect = (id) => {
    setActiveChannel(id);
    setActiveThread(null);
    setSidebarOpen(false); // close sidebar on mobile after selecting
  };

  return (
    <>
      <style>{css}</style>

      {/* Overlay for mobile sidebar */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="classroom-root" style={{
        display: 'flex', height: 700,
        border: '1px solid rgba(124,58,237,0.18)',
        borderRadius: 12, overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: '0 20px 60px rgba(124,58,237,0.1)',
        position: 'relative',
      }}>

        {/* ── Sidebar ── */}
        <div className={`classroom-sidebar${sidebarOpen ? " open" : ""}`} style={{
          width: 200, background: '#F9FAFB',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
          borderRight: '1px solid rgba(124,58,237,0.12)',
        }}>
          {/* Sidebar header */}
          <div style={{
            padding: '16px 14px',
            borderBottom: '1px solid rgba(124,58,237,0.12)',
            background: '#FFFFFF',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: 'linear-gradient(135deg, #7C3AED, #10B981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0,
              }}>C</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', margin: 0 }}>Classroom</p>
                <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Course Community</p>
              </div>
            </div>
          </div>

          {/* Channel list */}
          <div className="ch-scroll" style={{ flex: 1, padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
            {CHANNELS.map(ch => (
              <button
                key={ch.id}
                className="channel-btn"
                onClick={() => handleChannelSelect(ch.id)}
                style={{
                  textAlign: 'left', padding: '9px 10px',
                  borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: activeChannel === ch.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                  color: activeChannel === ch.id ? '#1F2937' : '#6B7280',
                  borderLeft: activeChannel === ch.id ? '3px solid #7C3AED' : '3px solid transparent',
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
              borderRadius: 6,
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 600,
              background: warning.isBanned ? 'rgba(239,68,68,0.1)' : 'rgba(251,191,36,0.12)',
              border: `2px solid ${warning.isBanned ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'}`,
              color: warning.isBanned ? '#DC2626' : '#D97706',
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
            borderBottom: '1px solid rgba(124,58,237,0.12)',
            background: '#F9FAFB',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            {/* Hamburger — mobile only */}
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Open channels"
              style={{
                alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 6,
                border: '1px solid rgba(124,58,237,0.25)',
                background: 'rgba(124,58,237,0.06)',
                color: '#7C3AED', cursor: 'pointer',
                flexShrink: 0, gap: 0, padding: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect y="3" width="16" height="1.5" rx="1" fill="currentColor"/>
                <rect y="7.25" width="16" height="1.5" rx="1" fill="currentColor"/>
                <rect y="11.5" width="16" height="1.5" rx="1" fill="currentColor"/>
              </svg>
            </button>

            <span style={{ fontSize: 19 }}>{activeCh?.icon}</span>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#1F2937', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeCh?.label}</p>
              <p style={{ fontSize: 15, color: '#6B7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeCh?.desc}</p>
            </div>
            {canUploadFile && (
              <span className="file-upload-badge" style={{
                marginLeft: 'auto', fontSize: 10, fontWeight: 600,
                padding: '3px 10px', borderRadius: 6, flexShrink: 0,
                background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.3)',
                color: '#047857', letterSpacing: '0.3px',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                📎 <span>File uploads on</span>
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="ch-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: '#6B7280', fontSize: 15, marginTop: 40 }}>
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6B7280', fontSize: 15, marginTop: 40 }}>
               Be respectful and helpful to others. Avoid spamming or sharing inappropriate content. You will be banned from classroom after 3 warnings!
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
              padding: '14px', textAlign: 'center', fontSize: 16, fontWeight: 600,
              background: 'rgba(239,68,68,0.08)', borderTop: '2px solid rgba(239,68,68,0.25)',
              color: '#DC2626',
            }}>
              🚫 You have been removed from this classroom due to repeated violations.
            </div>
          ) : (
            <div style={{ padding: '10px 14px 14px', borderTop: '2px solid rgba(124,58,237,0.12)', background: '#FFFFFF' }}>

              {/* File preview */}
              {file && (
                <div style={{
                  marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, color: '#6B7280',
                  background: 'rgba(124,58,237,0.06)', border: '2px solid rgba(124,58,237,0.2)',
                  padding: '6px 12px', borderRadius: 6,
                }}>
                  <FaFilePdf style={{ color: '#EF4444', flexShrink: 0 }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                  <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 13, padding: 0 }}>✕</button>
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
                        width: 34, height: 34, borderRadius: 8, cursor: 'pointer',
                        background: file ? 'rgba(16,185,129,0.15)' : 'rgba(124,58,237,0.08)',
                        border: file ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(124,58,237,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: file ? '#10B981' : '#7C3AED', fontSize: 13, flexShrink: 0,
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
                    background: '#FFFFFF',
                    border: '1px solid rgba(124,58,237,0.25)',
                    borderRadius: 8, padding: '9px 14px',
                    fontSize: 13, color: '#1F2937',
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
                    width: 34, height: 34, borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: (sending || (!input.trim() && !file))
                      ? 'rgba(0,0,0,0.06)'
                      : 'linear-gradient(135deg, #7C3AED, #10B981)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.2s',
                    boxShadow: (sending || (!input.trim() && !file)) ? 'none' : '0 4px 12px rgba(124,58,237,0.35)',
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
          <div className={`thread-panel${activeThread ? " open" : ""}`} style={{
            width: 280, flexShrink: 0,
            borderLeft: '1px solid rgba(124,58,237,0.12)',
            display: 'flex', flexDirection: 'column',
            background: '#F9FAFB',
          }}>
            {/* Thread header */}
            <div style={{
              padding: '12px 14px',
              borderBottom: '1px solid rgba(124,58,237,0.12)',
              background: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', margin: 0 }}>Thread</p>
              <button onClick={() => setActiveThread(null)} style={{
                background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer',
                fontSize: 16, lineHeight: 1, padding: 0, transition: 'color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#1F2937'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
              >✕</button>
            </div>

            {/* Original message */}
            <div style={{
              padding: '12px', borderBottom: '1px solid rgba(124,58,237,0.1)',
              background: 'rgba(124,58,237,0.04)',
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
                      fontSize: 11, fontWeight: 600, color: '#10B981', marginBottom: 4,
                    }}>
                      <FaCheckCircle style={{ fontSize: 11 }} /> Best Answer
                    </div>
                  )}
                  <MessageBubble msg={reply} currentUserId={userData?._id} isThread />
                  {activeThread?.userId?._id === userData?._id && !reply.isBestAnswer && (
                    <button
                      onClick={() => markBest(reply._id)}
                      style={{
                        fontSize: 11, fontWeight: 600, color: '#10B981',
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
              padding: '10px 12px', borderTop: '1px solid rgba(124,58,237,0.12)',
              display: 'flex', gap: 8, alignItems: 'center',
              background: '#FFFFFF',
            }}>
              <input
                className="reply-input"
                value={replyInput}
                onChange={e => setReplyInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendReply(); }}
                placeholder="Reply..."
                style={{
                  flex: 1,
                  background: '#FFFFFF',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: 6, padding: '8px 12px',
                  fontSize: 12, color: '#1F2937', fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <button
                onClick={sendReply}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #7C3AED, #10B981)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(124,58,237,0.3)', transition: 'all 0.2s',
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
        width: 28, height: 28, borderRadius: 6, flexShrink: 0, marginTop: 2,
        background: isOwn
          ? 'linear-gradient(135deg, #7C3AED, #10B981)'
          : 'linear-gradient(135deg, #E5E7EB, #D1D5DB)',
        border: isOwn ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800, color: isOwn ? 'white' : '#6B7280',
      }}>
        {msg.userId?.name?.charAt(0)?.toUpperCase() || "?"}
      </div>

      <div style={{ maxWidth: '75%' }}>
        {/* Name + time */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3,
          flexDirection: isOwn ? 'row-reverse' : 'row',
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: isOwn ? '#7C3AED' : '#6B7280' }}>
            {msg.userId?.name}
          </span>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>
            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* Bubble */}
        <div style={{
          padding: '9px 13px',
          borderRadius: 6,
          fontSize: 13, lineHeight: 1.6,
          background: isOwn
            ? 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(16,185,129,0.12))'
            : '#F9FAFB',
          border: isOwn
            ? '1px solid rgba(124,58,237,0.3)'
            : '1px solid rgba(124,58,237,0.1)',
          color: '#1F2937',
        }}>
          {msg.text && <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-words' }}>{msg.text}</p>}

          {/* File attachment */}
          {msg.fileUrl && (
            <a href={msg.fileUrl} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginTop: msg.text ? 6 : 0,
              fontSize: 12, fontWeight: 500,
              color: '#10B981', textDecoration: 'none',
            }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              {msg.fileType === "pdf"
                ? <FaFilePdf style={{ color: '#EF4444', fontSize: 14 }} />
                : <FaImage style={{ color: '#7C3AED', fontSize: 14 }} />}
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
                fontSize: 11, color: '#6B7280', background: 'none',
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
                fontSize: 11, color: '#6B7280', background: 'none',
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