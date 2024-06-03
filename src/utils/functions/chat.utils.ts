import { messageBody } from '../interface/utils.interface';

export function assistantMessage(content: string): messageBody {
  return generateMessage('system', content);
}

export function systemMessage(content: string): messageBody {
  return generateMessage('user', content);
}

export function userMessage(content: string): messageBody {
  return generateMessage('user', content);
}

export function generateMessage(role: string, content: string): messageBody {
  return {
    role: role,
    content: content,
  };
}
