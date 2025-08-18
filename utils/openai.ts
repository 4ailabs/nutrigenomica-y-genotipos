import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
});

const ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID || 'asst_9kVz1JdQkkFN7icyLPjbYRs3';

export async function createThread() {
  try {
    const thread = await (openai as any).beta.threads.create();
    return thread.id;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw new Error('No se pudo crear el hilo de conversación');
  }
}

export async function sendMessage(threadId: string, message: string) {
  try {
    const messageResponse = await (openai as any).beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });
    return messageResponse;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('No se pudo enviar el mensaje');
  }
}

export async function runAssistant(threadId: string) {
  try {
    const run = await (openai as any).beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });
    return run.id;
  } catch (error) {
    console.error('Error running assistant:', error);
    throw new Error('No se pudo ejecutar el asistente');
  }
}

export async function checkRunStatus(threadId: string, runId: string) {
  try {
    const run = await (openai as any).beta.threads.runs.retrieve(threadId, runId);
    return run.status;
  } catch (error) {
    console.error('Error checking run status:', error);
    throw new Error('No se pudo verificar el estado del asistente');
  }
}

export async function getMessages(threadId: string) {
  try {
    const messages = await (openai as any).beta.threads.messages.list(threadId);
    return messages.data;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw new Error('No se pudo obtener los mensajes');
  }
}

export async function generateChatResponse(
  history: { role: 'user' | 'assistant'; content: string }[],
  genotypeId: number | null
): Promise<string> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return "Lo siento, la IA no está disponible por falta de credenciales. Configura VITE_OPENAI_API_KEY.";
  }

  try {
    const threadId = await createThread();

    await sendMessage(threadId, history[history.length - 1].content);

    const runId = await runAssistant(threadId);

    let status: string = 'queued';
    while (status === 'queued' || status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      status = await checkRunStatus(threadId, runId);
    }

    if (status === 'failed') {
      throw new Error('El asistente falló al procesar la solicitud');
    }

    const messages = await getMessages(threadId);
    const lastMessage = messages[0];

    if (lastMessage && lastMessage.content[0]?.type === 'text') {
      return lastMessage.content[0].text.value;
    } else {
      return "Lo siento, no pude generar una respuesta clara. Por favor, intenta de nuevo.";
    }

  } catch (error: any) {
    console.error('Error in OpenAI chat:', error);
    if (typeof error?.message === 'string' && error.message.includes('API key')) {
      return "Lo siento, la clave de API de OpenAI no es válida. Por favor, verifica la configuración.";
    }
    return "Lo siento, tuve un problema para procesar tu pregunta. Por favor, intenta de nuevo.";
  }
}
