
"use server";

import { z } from "zod";
import { aiChat } from "@/ai/ai-chat-interface";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function continueChat(history: ChatMessage[]) {
  try {
    const response = await aiChat({ history });

    return {
      success: true,
      response: { role: "assistant", content: response.response } as ChatMessage,
    };
  } catch (error) {
    console.error("Failed to call Genkit flow:", error);
    return {
      success: false,
      response: {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to my brain right now.",
      } as ChatMessage,
    };
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
