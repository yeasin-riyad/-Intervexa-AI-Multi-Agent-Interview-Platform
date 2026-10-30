import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
});

export default llm;