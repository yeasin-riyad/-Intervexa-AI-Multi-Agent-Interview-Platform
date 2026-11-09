
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import llm from "../config/llm.js";

const resourceAgent = async (state) => {
  try {
    const roadmap = state.roadmap;

    if (!roadmap || !Array.isArray(roadmap.modules)) {
      throw new Error("Roadmap not found.");
    }

    const moduleTitles = roadmap.modules
      .map((module) => module.title)
      .join("\n");

    const docResponse = await llm.invoke([
      new SystemMessage(`
        You are an expert software engineer and technical learning resource researcher.

        For every module provided, find its official documentation URL.

        Rules:
        1. Prefer official documentation.
        2. If official documentation does not exist, provide the best trusted learning article.
        3. Return only valid JSON.
        4. Do not explain anything.
        5. Keep the exact same module titles.
        6. Every article must be a valid URL.
        7. Never invent URLs.
        8. If you cannot find a reliable resource, return an empty string.

        Return format:
        [
          {
            "title": "",
            "article": ""
          }
        ]
      `),

      new HumanMessage(`
        Find learning resources for these modules:

        ${moduleTitles}
      `),
    ]);

    // Extract LLM response
    let content = docResponse.content;

    if (Array.isArray(content)) {
      content = content
        .map((item) => item.text || "")
        .join("");
    }

    if (!content || typeof content !== "string") {
      throw new Error("LLM returned an empty documentation response.");
    }

    // Remove Markdown JSON code blocks
    const cleanedContent = content
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    // Parse JSON response
    let docs = JSON.parse(cleanedContent);

    if (!Array.isArray(docs)) {
      throw new Error("Invalid documentation response format.");
    }

    // Match documentation with original roadmap modules
    const updatedModules = roadmap.modules.map((module) => {
      const resource = docs.find(
        (doc) =>
          doc.title?.trim().toLowerCase() ===
          module.title.trim().toLowerCase()
      );

      return {
        ...module,
        article: resource?.article || "",
      };
    });

    return {
      roadmap: {
        ...roadmap,
        modules: updatedModules,
      },
      error: null,
    };

  } catch (error) {
    console.error("Resource Agent Error:", error);

    return {
      roadmap: state.roadmap || null,
      error: error.message || "Failed to attach learning resources.",
    };
  }
};

export default resourceAgent;
