"use server";

import { z } from "zod";

const chatSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  experience: z.string(),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function startChatSession(data: unknown) {
  const parsed = chatSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid data provided." };
  }

  const { name, experience } = parsed.data;

  // In a real app, you would use this data to initialize a chat session
  // with a tool or customized prompt for the LLM.
  // e.g., callGenkitTool(userInfo)

  const welcomeMessage = `Hello ${name}! I see you have ${experience} experience. How can I, as an AI from TECHismust, assist you today?`;

  return {
    success: true,
    initialMessage: { role: "assistant", content: welcomeMessage } as ChatMessage,
  };
}

export async function continueChat(
  history: ChatMessage[],
  newMessage: ChatMessage
) {
  const messages = [...history, newMessage].map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-medium",
        "messages": messages
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error:", errorBody);
      return { success: false, response: { role: "assistant", content: `An error occurred: ${response.statusText}` } as ChatMessage };
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return {
      success: true,
      response: { role: "assistant", content: aiMessage } as ChatMessage,
    };
  } catch (error) {
    console.error("Failed to fetch from OpenRouter:", error);
    return { success: false, response: { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain right now." } as ChatMessage };
  }
}


export async function submitContactForm(data: unknown) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(' ');
    return { success: false, error: `Invalid data: ${errorMessages}` };
  }
  
  console.log("New contact form submission:", parsed.data);
  
  // Simulate sending an email or saving to a database
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: "Your message has been sent successfully!" };
}
