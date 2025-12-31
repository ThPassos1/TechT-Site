
import { EMAIL_JS_CONFIG } from '../constants';

export interface EmailParams {
  name: string;
  email: string;
  message: string;
}

/**
 * Envia o formulário de contato via EmailJS REST API.
 */
export const sendContactEmail = async (params: EmailParams) => {
  const data = {
    service_id: EMAIL_JS_CONFIG.SERVICE_ID,
    template_id: EMAIL_JS_CONFIG.TEMPLATE_ID,
    user_id: EMAIL_JS_CONFIG.PUBLIC_KEY,
    template_params: {
      from_name: params.name,
      reply_to: params.email,
      message: params.message,
      to_email: EMAIL_JS_CONFIG.DESTINATION_EMAIL
    },
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar e-mail.');
  }

  return true;
};