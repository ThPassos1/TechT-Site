
import React, { useState } from 'react';
import { sendContactEmail, EmailParams } from '../services/emailService';

export const useContactForm = () => {
  const [form, setForm] = useState<EmailParams>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);

    try {
      await sendContactEmail(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    }
  };

  return { form, status, errorMsg, handleChange, handleSubmit };
};