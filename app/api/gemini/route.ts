import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SANDBOX_SYSTEM_PROMPT = "Bạn là một chuyên gia đánh giá prompt (câu lệnh AI). Nhiệm vụ của bạn là nhận một prompt từ người dùng và nhận xét xem nó đã đủ tốt chưa dựa trên 4 tiêu chí: Ngữ cảnh (Context), Vai trò (Role), Yêu cầu (Instruction), và Định dạng (Format). Hãy nhận xét ngắn gọn, súc tích bằng tiếng Việt (tối đa 3-4 câu). Bắt đầu bằng một biểu tượng cảm xúc (✅ nếu tốt, ⚠️ nếu cần cải thiện, ❌ nếu quá tệ) kèm theo đánh giá tóm tắt trong ngoặc vuông, ví dụ: ✅ [Đánh giá: Đầy đủ cấu trúc]. Sau đó đưa ra nhận xét chi tiết. Đừng dùng markdown phức tạp.";

const CHAT_SYSTEM_PROMPT = "Bạn là một Smart AI-Learner, một trợ lý học tập xuất sắc và an toàn cho học sinh, sinh viên và phụ huynh. Bạn CHỈ trả lời các câu hỏi liên quan đến giáo dục, học tập, AI, lập trình, viết prompt, bảo mật và an toàn thông tin gia đình. Nếu người dùng hỏi về nấu ăn, chơi game, giải trí, tình cảm không liên quan đến học tập, bạn phải TỪ CHỐI một cách lịch sự. Luôn trả lời bằng tiếng Việt, súc tích, thân thiện và chính xác.";

export async function POST(request: Request) {
  try {
    const { prompt, messages } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("GROQ_API_KEY is not defined.");
      return NextResponse.json(
        { error: "Cấu hình Groq API chưa hoàn tất trên Netlify. Vui lòng thiết lập GROQ_API_KEY trong Environment variables." },
        { status: 500 }
      );
    }

    let systemInstruction = CHAT_SYSTEM_PROMPT;
    let formattedMessages: { role: string; content: string }[] = [];

    if (messages && Array.isArray(messages)) {
      systemInstruction = CHAT_SYSTEM_PROMPT;
      formattedMessages = messages.map((m: { role: string; content?: string }) => ({
        role: m.role === 'model' || m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content || ""
      }));
    } else if (prompt) {
      systemInstruction = SANDBOX_SYSTEM_PROMPT;
      formattedMessages = [
        {
          role: 'user',
          content: prompt
        }
      ];
    } else {
      return NextResponse.json({ error: "Missing prompt or messages" }, { status: 400 });
    }

    const groqMessages = [
      { role: 'system', content: systemInstruction },
      ...formattedMessages
    ];

    let groqModel = "llama-3.3-70b-versatile";
    let response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: groqModel,
        messages: groqMessages,
        temperature: 0.6,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      console.warn(`Groq model ${groqModel} failed (${response.status}). Trying fallback model llama-3.1-8b-instant...`);
      groqModel = "llama-3.1-8b-instant";
      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: groqModel,
          messages: groqMessages,
          temperature: 0.6,
          max_tokens: 2048
        })
      });
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      throw new Error(`Failed to fetch from Groq API: ${errText}`);
    }

    const groqData = await response.json();
    const resultText = groqData.choices?.[0]?.message?.content || "";

    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    console.error("Internal Groq API error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi kết nối với AI Groq. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
