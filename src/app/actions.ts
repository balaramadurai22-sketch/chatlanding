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

interface ChatMessage {
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
  // Simulate an AI response. In a real app, this would be an API call to an LLM.
  // e.g., const response = await run("gemini-pro", { messages: [...history, newMessage] });
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

  const userMessage = newMessage.content.toLowerCase();
  let responseContent = "That's a fascinating question. Could you tell me more about your goals?";

  if (userMessage.includes("project")) {
    responseContent = "Our projects focus on cutting-edge AI and automation. You can explore them in the Projects section of our website. Do you have a specific area of interest?";
  } else if (userMessage.includes("about")) {
    responseContent = "TECHismust Innovation Lab is dedicated to pushing the boundaries of digital experiences through creative AI. What part of our mission excites you the most?";
  } else if (userMessage.includes("contact")) {
    responseContent = "You can reach out to our team via the contact form on our website. We're always open to new collaborations and ideas.";
  }

  return {
    success: true,
    response: { role: "assistant", content: responseContent } as ChatMessage,
  };
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
