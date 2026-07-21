export interface EducationalLevel {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  giantBgText: string; // Chữ nền khổng lồ chạy phía sau riêng cho từng thẻ
  textInstructions: string[];
  promptExample: {
    title: string;
    description: string;
    badPrompt: string;
    goodPrompt: string;
    simulatedResponse: string;
  };
}

export interface PromptComparison {
  id: string;
  category: string;
  bad: string;
  good: string;
  explanation: string;
}

export interface SafetyScenario {
  id: string;
  title: string;
  description: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const educationalLevels: EducationalLevel[] = [
  {
    id: "thcs",
    badge: "THCS",
    title: "Làm quen với AI học tập",
    subtitle: "Khám phá thế giới AI an toàn (Lớp 6 - Lớp 9)",
    desc: "Bước đầu tiên để biến trí tuệ nhân tạo thành người bạn đồng hành thú vị. Học cách đặt những câu hỏi đơn giản để giải thích công thức khó hiểu, gợi ý ý tưởng viết văn mà vẫn giữ vững tư duy tự lập, không phụ thuộc.",
    giantBgText: "EXPLORE",
    textInstructions: [
      "Hiểu đúng bản chất: AI là trợ lý hỗ trợ gợi ý ý tưởng, không phải công cụ làm hộ bài tập.",
      "Kỹ năng đặt câu hỏi 5W1H đơn giản để AI không trả lời lan man, lạc đề.",
      "Ứng dụng thực tế: Giải thích thuật ngữ khoa học, tạo thẻ ghi nhớ (flashcard) để học từ vựng tiếng Anh.",
      "Nguyên tắc vàng: Luôn nghi ngờ và đối chiếu câu trả lời của AI với sách giáo khoa chuẩn."
    ],
    promptExample: {
      title: "Phương pháp hỏi giải thích Định lý Pythagore",
      description: "Thay vì yêu cầu AI giải hộ bài tập về nhà để đối phó, hãy biến AI thành một người thầy giảng bài vui tính sử dụng các hình ảnh ẩn dụ dễ nhớ.",
      badPrompt: "Giải bài tập toán hình lớp 8 trang 45 cho tôi.",
      goodPrompt: "Hãy đóng vai là một thầy giáo dạy Toán vui vẻ. Giải thích định lý Pythagore bằng ngôn ngữ cực kỳ dễ hiểu cho học sinh lớp 8, sử dụng một ví dụ thực tế liên quan đến chiếc bánh sandwich hoặc lát pizza hình tam giác vuông.",
      simulatedResponse: "Thầy chào em! Đừng lo lắng, hình học thực ra rất thú vị nếu em tưởng tượng đúng cách. Hãy nghĩ về một lát pizza hình tam giác vuông. Định lý Pythagore nói rằng: Bình phương độ dài cạnh dài nhất (cạnh huyền - phần viền bánh ngon lành) sẽ luôn bằng tổng phương của hai cạnh góc vuông còn lại. Công thức là a² + b² = c²."
    }
  },
  {
    id: "thpt",
    badge: "THPT",
    title: "Hỗ trợ ôn thi & Tư duy phản biện",
    subtitle: "Lập lộ trình và học sâu (Lớp 10 - Lớp 12)",
    desc: "Tối ưu hóa thời gian tự học trước áp lực thi cử. Học sinh cấp 3 sẽ học cách dùng AI để tóm tắt các tài liệu lịch sử, ngữ văn dài dằng dặc, đồng thời tập luyện khả năng phản biện bằng cách tranh biện trực tiếp với mô hình ngôn ngữ.",
    giantBgText: "ANALYZE",
    textInstructions: [
      "Kỹ năng viết Prompt cấu trúc: Xác định rõ [Vai trò] + [Ngữ cảnh] + [Nhiệm vụ cụ thể] + [Định dạng đầu ra].",
      "Xây dựng lộ trình ôn thi cá nhân hóa dựa trên học lực hiện tại và mục tiêu điểm số.",
      "Sử dụng AI như đối thủ tranh biện để phát triển tư duy phản biện (Critical Thinking) đa chiều.",
      "Nhận biết ranh giới đạo đức: Tuyệt đối không copy nguyên văn văn bản do AI viết vào bài kiểm tra."
    ],
    promptExample: {
      title: "Lập kế hoạch ôn tập môn Toán 30 ngày",
      description: "Biến AI thành cố vấn học tập riêng để sắp xếp lịch trình ôn luyện khoa học, tập trung vào phần kiến thức đang yếu nhất.",
      badPrompt: "Lên kế hoạch ôn thi toán THPT Quốc gia hộ cái.",
      goodPrompt: "Tôi là học sinh lớp 12 đang chuẩn bị thi THPT Quốc gia, học lực môn Toán ở mức Khá. Hãy lập cho tôi một kế hoạch ôn tập chi tiết trong 30 ngày, mỗi ngày dành 2 giờ tự học, tập trung trọng tâm vào chuyên đề Hình học không gian (tính thể tích và góc). Định dạng câu trả lời dưới dạng bảng biểu phân chia theo từng tuần.",
      simulatedResponse: "Chào bạn, dưới đây là lộ trình 30 ngày được thiết kế riêng giúp bạn bứt phá điểm số phần Hình Học Không Gian:\n\n*   **Tuần 1: Lấy lại gốc lý thuyết & Vẽ hình thuần thục (Ngày 1 - 7)**\n    *   *Nhiệm vụ:* Hệ thống hóa công thức tính thể tích khối chóp, khối lăng trụ. Tập vẽ hình nhanh bằng bút chì.\n    *   *Thời gian:* 2h/ngày (30 phút đọc lý thuyết, 90 phút giải bài tập cơ bản).\n\n*   **Tuần 2: Chinh phục chuyên đề Góc & Khoảng cách (Ngày 8 - 15)**\n    *   *Nhiệm vụ:* Xác định góc giữa đường thẳng và mặt phẳng, góc giữa hai mặt phẳng. Tính khoảng cách từ một điểm đến một mặt phẳng.\n    *   *Thời gian:* Luyện đề trắc nghiệm mức độ nhận biết - thông hiểu.\n\n*   **Tuần 3: Các bài toán thực tế & Vận dụng cao (Ngày 16 - 23)**\n    *   *Nhiệm vụ:* Giải các bài toán cực trị hình học không gian, toán ứng dụng thực tế.\n\n*   **Tuần 4: Luyện đề tổng hợp & Tối ưu thời gian (Ngày 24 - 30)**\n    *   *Nhiệm vụ:* Làm đề thi thử, chụp ảnh các câu làm sai và nhờ AI phân tích chi tiết bước giải bị nhầm lẫn."
    }
  },
  {
    id: "sinhvien",
    badge: "Sinh Viên",
    title: "Nghiên cứu khoa học & Đạo đức học thuật",
    subtitle: "Công cụ tối ưu hiệu suất nghiên cứu (Đại học)",
    desc: "Làm chủ công nghệ để dẫn đầu trong môi trường học thuật chuyên nghiệp. Sinh viên sẽ học cách sử dụng AI để tóm tắt các bài báo khoa học quốc tế, viết các đoạn mã lập trình thử nghiệm và đặc biệt là tuân thủ đạo đức học thuật, tránh lỗi đạo văn.",
    giantBgText: "RESEARCH",
    textInstructions: [
      "Ứng dụng AI để đọc hiểu nhanh, phân loại và tóm tắt các tài liệu nghiên cứu học thuật bằng tiếng Anh.",
      "Sử dụng AI hỗ trợ viết code, phân tích dữ liệu nghiên cứu sơ bộ và sửa lỗi lập trình (Debugging).",
      "Đạo đức học thuật: Kỹ năng trích dẫn nguồn (citation) khi sử dụng ý tưởng gợi ý bởi AI.",
      "Kiểm chứng chuyên sâu: Sử dụng Google Scholar để đối chiếu các nguồn tài liệu mà AI tự sinh ra."
    ],
    promptExample: {
      title: "Tóm tắt bài báo khoa học chuẩn quốc tế",
      description: "Tiết kiệm hàng giờ đồng hồ đọc tài liệu dài bằng cách yêu cầu AI trích lọc các cấu trúc cốt lõi của một bài nghiên cứu.",
      badPrompt: "Dịch và tóm tắt bài báo này.",
      goodPrompt: "Hãy đóng vai là một chuyên gia nghiên cứu khoa học. Hãy phân tích tài liệu sau và tóm tắt thành 5 luận điểm chính bao gồm: Mục tiêu nghiên cứu, Phương pháp thực hiện, Kết quả cốt lõi, Hạn chế của đề tài và Đề xuất hướng phát triển. Giải thích các thuật ngữ chuyên ngành bằng ngôn ngữ dễ hiểu đối với sinh viên năm nhất.",
      simulatedResponse: "Chào bạn đồng nghiệp trẻ, dưới đây là bản tóm tắt học thuật tinh gọn của nghiên cứu:\n\n1.  **Mục tiêu:** Đánh giá sự ảnh hưởng của Mô hình Ngôn ngữ Lớn (LLM) đối với tốc độ tự học của sinh viên ngành Công nghệ thông tin.\n2.  **Phương pháp:** Thử nghiệm ngẫu nhiên có kiểm soát (A/B Testing) trên nhóm 200 sinh viên trong vòng một học kỳ.\n3.  **Kết quả:** Nhóm sử dụng AI đúng cách có tốc độ hoàn thành bài tập lập trình nhanh hơn $42\\%$, điểm thi cuối kỳ tăng trung bình $1.5$ điểm.\n4.  **Hạn chế:** Sinh viên có xu hướng lười suy nghĩ thuật toán tối ưu nếu không được giám sát.\n5.  **Ứng dụng thực tế:** Khai báo đầy đủ việc sử dụng AI trong phần 'Phụ lục' của khóa luận tốt nghiệp để đảm bảo tính minh bạch học thuật."
    }
  }
];

export const promptComparisons: PromptComparison[] = [
  {
    id: "p1",
    category: "Phân tích dữ liệu",
    bad: "Viết báo cáo doanh thu tháng này",
    good: "Hãy đóng vai là chuyên gia phân tích dữ liệu (Data Analyst). Dựa trên dữ liệu doanh thu tháng này, hãy xác định 3 nguyên nhân cốt lõi dẫn đến sự sụt giảm ở khu vực APAC và đề xuất 2 phương án khắc phục dựa trên nguyên lý Pareto (80/20). Trình bày báo cáo dưới định dạng Markdown.",
    explanation: "Định rõ vai trò, bối cảnh dữ liệu cụ thể và yêu cầu cấu trúc đầu ra chuẩn xác, giúp AI cung cấp các insight mang tính chiến lược."
  },
  {
    id: "p2",
    category: "Lập kế hoạch Marketing",
    bad: "Tạo kế hoạch marketing cho sản phẩm mới",
    good: "Xây dựng chiến lược Go-To-Market (GTM) trong 3 tháng cho sản phẩm phần mềm SaaS B2B. Yêu cầu chi tiết các giai đoạn (Teasing, Launching, Scaling), ngân sách phân bổ dự kiến theo kênh (LinkedIn, Email, Webinar), và các chỉ số đo lường hiệu quả (KPIs) tương ứng.",
    explanation: "Cung cấp cấu trúc báo cáo mong muốn và chỉ tiêu cụ thể, giúp AI tạo ra một bản kế hoạch có tính ứng dụng cao cho doanh nghiệp."
  }
];

export const safetyScenarios: SafetyScenario[] = [
  {
    id: "s1",
    title: "[Phụ huynh] Cuộc gọi báo tin con bị tai nạn cấp cứu (Deepfake)",
    description: "Bố mẹ nhận được cuộc gọi video từ số lạ. Giọng nói và hình ảnh giống hệt con (hoặc thầy cô) khóc lóc báo tin con đang đi học thì bị tai nạn giao thông cấp cứu, yêu cầu phụ huynh chuyển gấp 50 triệu tiền viện phí.",
    options: [
      {
        label: "A",
        text: "Hoảng sợ và chuyển tiền ngay lập tức vào số tài khoản đối phương cung cấp vì quá lo lắng cho con.",
        isCorrect: false,
        feedback: "Sai lầm nguy hiểm! Kẻ xấu dùng AI Deepfake ghép mặt và giả giọng để đánh vào tâm lý hoảng sợ của cha mẹ nhằm chiếm đoạt tài sản."
      },
      {
        label: "B",
        text: "Bình tĩnh tắt máy, gọi điện ngay cho Giáo viên chủ nhiệm hoặc BGH nhà trường để xác minh tình hình thực tế của con.",
        isCorrect: true,
        feedback: "Xuất sắc! Luôn giữ bình tĩnh xác minh thông tin thông qua nhà trường hoặc số điện thoại quen thuộc của con trước khi chuyển tiền."
      },
      {
        label: "C",
        text: "Nhắn tin thương lượng với người gọi xin giảm số tiền viện phí xuống rồi mới chuyển.",
        isCorrect: false,
        feedback: "Không đúng! Dù chuyển ít hay nhiều thì bạn vẫn đang rơi vào bẫy lừa đảo của kẻ gian."
      },
      {
        label: "D",
        text: "Đăng thông báo lên hội nhóm phụ huynh của lớp để nhờ mọi người chuyển tiền hộ.",
        isCorrect: false,
        feedback: "Không nên! Việc này gây hoang mang dư luận và làm lộ thông tin cá nhân gia đình."
      }
    ]
  },
  {
    id: "s2",
    title: "[Học sinh / Sinh viên] Sao chép nguyên văn bài làm của AI vào bài nộp",
    description: "Học sinh/sinh viên nhờ AI gợi ý ý tưởng làm bài văn/tiểu luận. Thấy AI viết quá hay nên copy nguyên văn toàn bộ bài làm dán vào bài nộp cho giáo viên. Hành vi này dẫn đến rủi ro gì?",
    options: [
      {
        label: "A",
        text: "Hoàn toàn hợp lệ vì AI là công cụ hỗ trợ học tập miễn phí cho tất cả học sinh.",
        isCorrect: false,
        feedback: "Chưa đúng! Việc chép nguyên văn sản phẩm của AI là vi phạm đạo đức học thuật và khiến học sinh thụ động tư duy."
      },
      {
        label: "B",
        text: "Được giáo viên tuyên dương và cộng thêm điểm vì biết ứng dụng công nghệ hiện đại.",
        isCorrect: false,
        feedback: "Sai lầm! Các trường học và thầy cô đều có quy định nghiêm ngặt về việc nộp bài tự viết."
      },
      {
        label: "C",
        text: "Vi phạm đạo đức học thuật, khiến bản thân lười tư duy và có thể bị điểm 0 nếu giáo viên kiểm tra bằng phần mềm quét AI.",
        isCorrect: true,
        feedback: "Chính xác! AI chỉ nên dùng làm người gợi ý ý tưởng; học sinh/sinh viên cần tự tổng hợp và diễn đạt bằng tư duy của chính mình."
      },
      {
        label: "D",
        text: "Chỉ vi phạm nếu giáo viên phát hiện ra, còn không bị phát hiện thì bài làm vẫn hợp lệ.",
        isCorrect: false,
        feedback: "Tư tưởng sai lệch! Đạo đức học thuật đòi hỏi sự trung thực và tinh thần tự học của người học."
      }
    ]
  },
  {
    id: "s3",
    title: "[Phụ huynh] Con đang đi học xa nhắn tin mượn tiền đóng học phí gấp",
    description: "Phụ huynh nhận được tin nhắn thoại Messenger từ tài khoản của con đang học Đại học xa nhà, giọng nói giống hệt con nhờ bố mẹ chuyển gấp 10 triệu đóng học phí vào tài khoản lạ của 'Thầy chủ nhiệm'.",
    options: [
      {
        label: "A",
        text: "Gọi điện thoại trực tiếp vào số di động thường dùng của con hoặc hỏi bạn cùng phòng để kiểm tra.",
        isCorrect: true,
        feedback: "Rất tỉnh táo! Gọi điện trực tiếp vào số điện thoại truyền thống của con giúp phá vỡ hoàn toàn kịch bản lừa đảo mượn tiền."
      },
      {
        label: "B",
        text: "Chuyển tiền ngay vì nghe đúng giọng con mình rồi và không muốn con bị đình chỉ học.",
        isCorrect: false,
        feedback: "Cảnh báo! Kẻ gian chiếm đoạt tài khoản xã hội và dùng công nghệ Voice Cloning để giả giọng nói con bạn nhằm lừa tiền."
      },
      {
        label: "C",
        text: "Chuyển trước 5 triệu vào tài khoản lạ rồi bảo con tự xoay xở nấc tiền còn lại.",
        isCorrect: false,
        feedback: "Vẫn bị lừa tiền! Tuyệt đối không chuyển tiền vào tài khoản lạ khi chưa xác nhận trực tiếp với con."
      },
      {
        label: "D",
        text: "Nhắn tin hỏi con xem thầy giáo tên gì rồi tiến hành chuyển khoản ngay.",
        isCorrect: false,
        feedback: "Không an toàn! Kẻ gian chiếm đoạt tài khoản sẽ chuẩn bị sẵn câu trả lời giả mạo."
      }
    ]
  },
  {
    id: "s4",
    title: "[Học sinh / Sinh viên] Tin tưởng 100% vào bài giải Toán / Lý do AI làm",
    description: "Học sinh gặp bài toán khó, dán câu hỏi vào AI nhờ giải. AI đưa ra lời giải rất dài và tự tin. Học sinh chép ngay lời giải đó vào bài kiểm tra mà không kiểm tra lại.",
    options: [
      {
        label: "A",
        text: "Đúng đắn tuyệt đối vì AI là trí tuệ nhân tạo siêu việt không bao giờ giải sai toán.",
        isCorrect: false,
        feedback: "Sai lầm! AI thường gặp hiện tượng 'Ảo giác' (Hallucination) - tự bịa ra công thức hoặc tính toán nhầm lẫn."
      },
      {
        label: "B",
        text: "Chụp ảnh lời giải của AI gửi cho tất cả bạn bè trong lớp cùng chép theo.",
        isCorrect: false,
        feedback: "Không nên! Việc này làm cả nhóm bạn học sinh cùng làm sai bài giống nhau."
      },
      {
        label: "C",
        text: "Chỉ cần kiểm tra lại nếu bài toán đó chiếm trên 50% tổng số điểm của bài thi.",
        isCorrect: false,
        feedback: "Thiếu cẩn trọng! Bất kỳ bài tập nào cũng đòi hỏi thái độ học tập nghiêm túc."
      },
      {
        label: "D",
        text: "Rủi ro làm sai bài rất cao vì AI có thể bị ảo giác kiến thức. Luôn cần đối chiếu với SGK và tự giải lại.",
        isCorrect: true,
        feedback: "Chính xác! Hãy xem AI là nguồn tham khảo lời giải gợi ý, luôn phải dùng tư duy cá nhân để kiểm tra tính đúng đắn."
      }
    ]
  },
  {
    id: "s5",
    title: "[Sinh viên] Lừa đảo việc làm thêm 'Gõ văn bản / Gán nhãn AI online'",
    description: "Sinh viên tìm việc làm thêm online, thấy quảng cáo tuyển dụng 'Việc nhẹ lương cao: Đánh máy soạn thảo văn bản cho AI' lương 300k/ngày, nhưng yêu cầu sinh viên nộp 500k tiền cọc giữ chỗ và mua tài liệu.",
    options: [
      {
        label: "A",
        text: "Chuyển cọc ngay vì 300k/ngày là mức thu nhập làm thêm rất hấp dẫn với sinh viên.",
        isCorrect: false,
        feedback: "Bẫy lừa đảo việc làm! Không có doanh nghiệp uy tín nào bắt ứng viên sinh viên nộp tiền cọc trước khi nhận việc."
      },
      {
        label: "B",
        text: "Từ chối và cảnh giác lừa đảo. Quy tắc vàng là nhà tuyển dụng chân chính không bao giờ thu tiền cọc.",
        isCorrect: true,
        feedback: "Kỹ năng sống xuất sắc! Sinh viên cần nhớ quy tắc: Việc làm đòi nộp tiền cọc 99% là chiêu trò lừa đảo."
      },
      {
        label: "C",
        text: "Rủ thêm bạn cùng phòng nộp cọc chung để được ưu đãi giảm phí cọc.",
        isCorrect: false,
        feedback: "Nguy hiểm! Hành động này vô tình kéo thêm bạn bè mình vào vòng lừa đảo mất tiền."
      },
      {
        label: "D",
        text: "Xin làm thử 1 ngày không lương rồi mới nộp cọc sau.",
        isCorrect: false,
        feedback: "Đối tượng lừa đảo sẽ từ chối và tiếp tục ép buộc bạn phải chuyển khoản tiền cọc ngay."
      }
    ]
  },
  {
    id: "s6",
    title: "[Phụ huynh] Hỏi AI đơn thuốc khi con nhỏ bị sốt / ốm",
    description: "Con nhỏ bị sốt cao kèm đau bụng, phụ huynh ngại ra bệnh viện nên dùng AI hỏi bệnh. AI tự tin chẩn đoán bệnh và kê một đơn thuốc tây cụ thể. Phụ huynh nên làm gì?",
    options: [
      {
        label: "A",
        text: "Ra hiệu thuốc mua uống ngay theo đúng đơn AI kê vì AI có dữ liệu y khoa khổng lồ.",
        isCorrect: false,
        feedback: "Cực kỳ nguy hiểm! AI không phải là bác sĩ, có thể đưa ra đơn thuốc sai lệch gây ảnh hưởng nghiêm trọng đến sức khỏe của trẻ."
      },
      {
        label: "B",
        text: "Tìm thêm vài bài thuốc dân gian trên mạng rồi tự phối hợp cho con uống.",
        isCorrect: false,
        feedback: "Nguy hiểm! Việc tự ý phối hợp thuốc không có chỉ định y khoa có thể làm bệnh của con nặng hơn."
      },
      {
        label: "C",
        text: "Đưa con đến ngay cơ sở y tế hoặc khám bác sĩ chuyên khoa. AI chỉ là nguồn tham khảo thông tin chung.",
        isCorrect: true,
        feedback: "Đúng đắn tuyệt đối! Tư vấn y tế cho con trẻ nhất định phải do bác sĩ khám và kê đơn trực tiếp."
      },
      {
        label: "D",
        text: "Cho con uống tạm một nửa liều lượng thuốc AI gợi ý xem có bớt sốt không.",
        isCorrect: false,
        feedback: "Thiếu an toàn! Tuyệt đối không dùng sức khỏe của con làm nơi thử nghiệm đơn thuốc."
      }
    ]
  },
  {
    id: "s7",
    title: "[Học sinh / Phụ huynh] Đăng ảnh Thẻ học sinh & CCCD lên mạng nhờ giải bài",
    description: "Học sinh/phụ huynh chụp ảnh bài tập khó đăng lên các nhóm AI trên mạng xã hội nhờ giải hộ, nhưng tấm ảnh dính cả Thẻ học sinh, số CCCD, trường lớp và số điện thoại gia đình.",
    options: [
      {
        label: "A",
        text: "Cần che/xóa toàn bộ thông tin cá nhân (Họ tên, CCCD, Trường lớp, SĐT) trước khi chia sẻ ảnh lên mạng.",
        isCorrect: true,
        feedback: "Chính xác! Luôn chủ động bảo vệ dữ liệu định danh cá nhân và gia đình trước khi đăng tải bất kỳ hình ảnh nào công khai."
      },
      {
        label: "B",
        text: "Không sao cả vì mọi người trên hội nhóm đều đăng ảnh nhờ giải bài giống như vậy.",
        isCorrect: false,
        feedback: "Nguy cơ lộ thông tin! Kẻ xấu có thể thu thập thông tin thẻ học sinh, CCCD và số điện thoại để thực hiện chiêu trò lừa đảo."
      },
      {
        label: "C",
        text: "Chỉ nguy hiểm nếu tờ bài tập đó là bài thi học kỳ quan trọng.",
        isCorrect: false,
        feedback: "Không đúng! Nguy cơ rò rỉ dữ liệu cá nhân xảy ra ở bất kỳ tấm ảnh nào chứa thông tin riêng tư."
      },
      {
        label: "D",
        text: "Đăng ảnh xong nhờ giải bài xong rồi xóa bài viết sau 10 phút là hoàn toàn an toàn.",
        isCorrect: false,
        feedback: "Vẫn nguy hiểm! Các công cụ tự động trên mạng có thể lưu lại hình ảnh chỉ trong vài giây."
      }
    ]
  },
  {
    id: "s8",
    title: "[Phụ huynh / Sinh viên] Bẫy lừa đảo 'Học bổng du học AI / Khóa học miễn phí'",
    description: "Một tài khoản lạ gửi tin nhắn chúc mừng gia đình trúng 'Học bổng AI kỹ năng mềm toàn phần', yêu cầu nhấp vào đường link lạ và điền số CCCD cùng mã OTP ngân hàng của bố mẹ để nhận quà.",
    options: [
      {
        label: "A",
        text: "Điền ngay thông tin và mã OTP ngân hàng để con không mất cơ hội nhận học bổng giá trị.",
        isCorrect: false,
        feedback: "Bị lừa đảo ngân hàng! Cung cấp mã OTP đồng nghĩa với việc bạn trao quyền rút sạch tiền trong tài khoản cho kẻ gian."
      },
      {
        label: "B",
        text: "Chỉ điền số CCCD của bố mẹ còn mã OTP thì nhập sai 1 chữ số để thử.",
        isCorrect: false,
        feedback: "Không an toàn! Việc nhấp vào đường link lạ đã tiềm ẩn nguy cơ bị chiếm đoạt thông tin trình duyệt."
      },
      {
        label: "C",
        text: "Nhờ bạn bè đăng ký hộ tài khoản của họ xem có nhận được học bổng thật hay không.",
        isCorrect: false,
        feedback: "Không nên! Hành động này vô tình đẩy bạn bè mình vào nguy cơ bị lừa đảo."
      },
      {
        label: "D",
        text: "Cảnh giác Phishing! Tuyệt đối không bao giờ cung cấp mã OTP ngân hàng hay đăng nhập thông tin cá nhân vào link lạ.",
        isCorrect: true,
        feedback: "Kỹ năng an toàn xuất sắc! Mã OTP ngân hàng là mật khẩu tối mật, không có chương trình học bổng uy tín nào yêu cầu OTP."
      }
    ]
  },
  {
    id: "s9",
    title: "[Học sinh] Tâm sự chuyện riêng tư gia đình với Chatbot AI trôi nổi",
    description: "Học sinh buồn chuyện bạn bè/gia đình nên lên mạng tìm một Chatbot AI trôi nổi để tâm sự, chia sẻ hết tên tuổi, địa chỉ nhà, bí mật gia đình và tài khoản mạng xã hội.",
    options: [
      {
        label: "A",
        text: "Rất an toàn vì Chatbot AI là người bạn ảo không biết tiết lộ bí mật cho ai.",
        isCorrect: false,
        feedback: "Không an toàn! Các ứng dụng chatbot không rõ nguồn gốc có thể lưu trữ toàn bộ nội dung trò chuyện và bán dữ liệu."
      },
      {
        label: "B",
        text: "Cần cảnh giác! Không nên chia sẻ địa chỉ nhà, bí mật cá nhân hay tài khoản mạng xã hội cho các ứng dụng AI trôi nổi.",
        isCorrect: true,
        feedback: "Rất đúng đắn! Học sinh cần bảo vệ bí mật cá nhân và nên tìm sự tư vấn từ cha mẹ, thầy cô hoặc chuyên gia tâm lý thực sự."
      },
      {
        label: "C",
        text: "Chỉ an toàn nếu học sinh trò chuyện với Chatbot AI vào ban đêm.",
        isCorrect: false,
        feedback: "Không liên quan! Dữ liệu được lưu trên máy chủ bất kể thời gian trò chuyện."
      },
      {
        label: "D",
        text: "Nên chia sẻ thêm cả số tài khoản ngân hàng của cha mẹ để AI giữ hộ.",
        isCorrect: false,
        feedback: "Cực kỳ nguy hiểm! Việc này có thể khiến gia đình mất sạch tiền trong tài khoản."
      }
    ]
  },
  {
    id: "s10",
    title: "[Nguyên tắc chung] Ứng xử văn minh & an toàn khi đưa AI vào gia đình & học tập",
    description: "Gia đình bạn muốn thống nhất nguyên tắc vàng khi đưa các công cụ AI vào hỗ trợ con cái học tập. Nguyên tắc nào dưới đây là đúng đắn và chuẩn mực nhất?",
    options: [
      {
        label: "A",
        text: "Cấm hoàn toàn con cái chạm vào AI vì AI làm học sinh lười biếng tư duy.",
        isCorrect: false,
        feedback: "Cấm đoán không phải là giải pháp! Học sinh cần được hướng dẫn sử dụng AI đúng cách để nâng cao hiệu suất học tập."
      },
      {
        label: "B",
        text: "Cho phép con dùng AI làm hộ 100% bài tập về nhà để tiết kiệm thời gian vui chơi.",
        isCorrect: false,
        feedback: "Sai lầm! Ỷ lại vào AI khiến học sinh mất đi khả năng tự học, tư duy phản biện và sáng tạo."
      },
      {
        label: "C",
        text: "AI là người trợ lý gợi ý ý tưởng; học sinh phải tự mình tư duy, kiểm chứng thông tin và chịu trách nhiệm với bài làm.",
        isCorrect: true,
        feedback: "Chính xác tuyệt đối! Đây là nguyên tắc vàng giúp học sinh phát triển năng lực số văn minh, an toàn và hiệu quả."
      },
      {
        label: "D",
        text: "Chỉ cha mẹ mới được dùng AI, con cái tuyệt đối không được hỏi AI bất kỳ câu hỏi nào.",
        isCorrect: false,
        feedback: "Chưa hợp lý! Cả cha mẹ và con cái đều nên cùng học hỏi và xây dựng văn hóa ứng dụng công nghệ trong gia đình."
      }
    ]
  }
];
