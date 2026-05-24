import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { RiLockPasswordLine } from "react-icons/ri"


function ForgetPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleSendOtp = async () => {
    if (!email) { toast.error('Please enter your email.'); return }
    setLoading(true)
    try {
      await axios.post(serverUrl + '/api/auth/sendotp', { email })
      toast.success('OTP sent to your email!')
      setStep(2)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }


  const handleVerifyOtp = async () => {
    if (!otp) { toast.error('Please enter the OTP.'); return }
    setLoading(true)
    try {
      await axios.post(serverUrl + '/api/auth/verifyotp', { email, otp })
      toast.success('OTP verified!')
      setStep(3)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Invalid or expired OTP.')
    } finally {
      setLoading(false)
    }
  }


  const handleResetPassword = async () => {
    if (!password) { toast.error('Please enter a new password.'); return }
    if (password.length < 8) { toast.error('Password must be at least 8 characters.'); return }
    if (password !== confirmPassword) { toast.error('Passwords do not match.'); return }
    setLoading(true)
    try {
      await axios.post(serverUrl + '/api/auth/resetpassword', { email, password })
      toast.success('Password reset successfully! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#0F172A',
    border: '1px solid rgba(59,130,246,0.2)',
    borderRadius: 10,
    padding: '12px 16px',
    color: '#E2E8F0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s',
    boxSizing: 'border-box',
  }

  const stepLabels = ['Enter Email', 'Verify OTP', 'New Password']

  return (
    <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'
      style={{ background: '#0F172A' }}>

      {/* glow orbs */}
      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.08] rounded-full blur-[140px] pointer-events-none' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.08] rounded-full blur-[140px] pointer-events-none' />

      <div className='w-full max-w-md rounded-2xl p-8 relative z-10'
        style={{ background: '#111827', border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div className='text-center mb-8'>
        <div className='w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl'
  style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', boxShadow: '0 0 24px rgba(59,130,246,0.4)' }}>
  <RiLockPasswordLine className="text-white text-3xl" />
</div>
          <h1 className='text-2xl font-bold mb-1' style={{
            background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            Reset Password
          </h1>
          <p className='text-sm' style={{ color: '#94A3B8' }}>
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && `OTP sent to ${email}`}
            {step === 3 && "Set your new password"}
          </p>
        </div>

        {/* Step indicator */}
        <div className='flex items-center justify-center gap-2 mb-8'>
          {stepLabels.map((label, i) => (
            <React.Fragment key={i}>
              <div className='flex flex-col items-center gap-1'>
                <div className='w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300'
                  style={{
                    background: step > i + 1 ? '#22C55E' : step === i + 1 ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)' : 'rgba(59,130,246,0.1)',
                    color: step >= i + 1 ? '#fff' : '#64748B',
                    border: step === i + 1 ? 'none' : '1px solid rgba(59,130,246,0.2)',
                    boxShadow: step === i + 1 ? '0 0 16px rgba(59,130,246,0.4)' : 'none'
                  }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className='text-xs' style={{ color: step === i + 1 ? '#3B82F6' : '#475569' }}>{label}</span>
              </div>
              {i < 2 && (
                <div className='w-8 h-[2px] mb-4 rounded-full transition-all duration-300'
                  style={{ background: step > i + 1 ? '#22C55E' : 'rgba(59,130,246,0.15)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        
        {step === 1 && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold mb-2' style={{ color: '#94A3B8' }}>Email Address</label>
              <input
                type='email'
                placeholder='Enter your registered email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.border = '1px solid #3B82F6'}
                onBlur={e => e.target.style.border = '1px solid rgba(59,130,246,0.2)'}
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
              />
            </div>
            <button onClick={handleSendOtp} disabled={loading}
              className='w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50'
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}>
              {loading ? <ClipLoader size={20} color='white' /> : 'Send OTP →'}
            </button>
          </div>
        )}

        
        {step === 2 && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold mb-2' style={{ color: '#94A3B8' }}>Enter OTP</label>
              <input
                type='text'
                placeholder='Enter 4-digit OTP'
                value={otp}
                maxLength={4}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ ...inputStyle, textAlign: 'center', fontSize: '28px', letterSpacing: '12px', fontWeight: '800' }}
                onFocus={e => e.target.style.border = '1px solid #3B82F6'}
                onBlur={e => e.target.style.border = '1px solid rgba(59,130,246,0.2)'}
                onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
              />
              <p className='text-xs mt-2' style={{ color: '#475569' }}>OTP expires in 5 minutes</p>
            </div>

            <button onClick={handleVerifyOtp} disabled={loading}
              className='w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50'
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}>
              {loading ? <ClipLoader size={20} color='white' /> : 'Verify OTP →'}
            </button>

           
            <button onClick={handleSendOtp} disabled={loading}
              className='w-full py-2 text-sm font-medium transition-colors'
              style={{ background: 'transparent', border: 'none', color: '#3B82F6', cursor: 'pointer' }}>
              Didn't receive it? Resend OTP
            </button>
          </div>
        )}

       
        {step === 3 && (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold mb-2' style={{ color: '#94A3B8' }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Min 8 characters'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={e => e.target.style.border = '1px solid #3B82F6'}
                  onBlur={e => e.target.style.border = '1px solid rgba(59,130,246,0.2)'}
                />
                <button onClick={() => setShowPassword(p => !p)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '16px' }}>
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2' style={{ color: '#94A3B8' }}>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Re-enter new password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                style={{
                  ...inputStyle,
                  border: confirmPassword && password !== confirmPassword
                    ? '1px solid rgba(239,68,68,0.5)'
                    : confirmPassword && password === confirmPassword
                    ? '1px solid rgba(34,197,94,0.5)'
                    : '1px solid rgba(59,130,246,0.2)'
                }}
                onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
              />
              {confirmPassword && password !== confirmPassword && (
                <p className='text-xs mt-1' style={{ color: '#F87171' }}>Passwords do not match</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className='text-xs mt-1' style={{ color: '#4ADE80' }}>Passwords match ✓</p>
              )}
            </div>

            <button onClick={handleResetPassword} disabled={loading}
              className='w-full py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50'
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}>
              {loading ? <ClipLoader size={20} color='white' /> : 'Reset Password ✓'}
            </button>
          </div>
        )}

        
        <div className='text-center mt-6'>
          <span className='text-sm' style={{ color: '#475569' }}>Remember your password? </span>
          <button onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            Log in
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword