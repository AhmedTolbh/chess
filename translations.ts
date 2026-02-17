
export type Language = 'en' | 'ar';

export const translations = {
  en: {
    nav: {
      methodology: "Methodology",
      whyUs: "Why Us",
      curriculum: "Curriculum",
      pricing: "Pricing",
      join: "Join Pioneers"
    },
    hero: {
      badge: "Building Strategic Minds",
      headline_1: "The Best",
      headline_accent: "Investment",
      headline_2: "is Your Child’s",
      headline_3: "Mind",
      subheadline: "Start your investment journey today with Pioneers. Building thinking skills through professional chess training.",
      cta_join: "Join Pioneers Now",
      cta_programs: "View Programs",
      trusted: "Join 1,200+ Parents"
    },
    methodology: {
      title: "A Graduated",
      title_accent: "Training Curriculum",
      desc: "Our methodology is built on pedagogical principles that prioritize cognitive development. We don't just teach moves; we build thinking structures that last a lifetime.",
      stats: [
        { label: "Levels", value: "4" },
        { label: "Sessions", value: "10" },
        { label: "Frequency", value: "1/wk" },
        { label: "Duration", value: "1 hr" }
      ],
      why_title: "Why Graduated",
      why_accent: "Training?",
      why_desc: "Children learn best when information is layered. Each session at Pioneers introduces a new concept that builds directly on the previous one.",
      benefits: ["Cognitive Agility", "Critical Reasoning", "Stress Management", "Visual Memory"],
      growth: "Growth Focus"
    },
    features: {
      title: "Why Choose",
      title_accent: "Pioneers?",
      desc: "We've redesigned the chess learning experience from the ground up to fit a child's natural curiosity.",
      items: [
        { title: "Direct Training", desc: "100% live interaction with specialized instructors. No pre-recorded videos." },
        { title: "Small Groups", desc: "Focus is guaranteed with groups limited to 6 or individual sessions." },
        { title: "Accredited Curriculum", desc: "Graduated syllabus suitable for every age and skill level." },
        { title: "Real Follow-up", desc: "Continuous evaluation and comprehensive progress reports after each level." },
        { title: "Fun Education", desc: "Learning without pressure. We make chess an exciting game of strategy." },
        { title: "Certification", desc: "Official Pioneers certificates awarded for every milestone achieved." }
      ]
    },
    curriculum: {
      title: "Level-Based",
      title_accent: "Mastery",
      desc: "A structured path from curious beginner to competitive master.",
      levels: [
        { id: 1, title: "Beginner", phase: "Foundations", desc: "Focus on basics, rules, piece movement, and developing correct thinking patterns." },
        { id: 2, title: "Intermediate", phase: "Tactical Growth", desc: "Developing tactical skills and introducing simplified strategic thinking concepts." },
        { id: 3, title: "Advanced", phase: "Mastery", desc: "In-depth focus on advanced strategy, endgame techniques, and complex decision-making." }
      ],
      cert_title: "Graduation Certificate",
      cert_desc: "Upon the successful completion of every 4 training levels, students are awarded a prestigious Certificate of Achievement."
    },
    pricing: {
      title: "Choose Your",
      title_accent: "Path",
      desc: "Flexible plans designed to fit your child's schedule and learning style.",
      sar: "SAR",
      per_level: "/ Level",
      rec: "Recommended",
      cta: "Select This Plan",
      plans: [
        {
          name: "Group Training",
          price: "250",
          desc: "Social and competitive environment perfect for peers.",
          features: ["Groups of 4-6 children", "1 Live session per week", "Curriculum focused training", "Monthly tournament access", "Group progress tracking"]
        },
        {
          name: "Private Training",
          price: "400",
          desc: "Maximum attention and customized pace for rapid growth.",
          features: ["1-on-1 private coach", "1 or 2 sessions per week", "Fully tailored curriculum", "Comprehensive level reports", "Tournament coaching & analysis", "Direct coach support via chat"]
        }
      ]
    },
    champions: {
      title: "Our",
      title_accent: "Champions",
      desc: "Celebrating our students who have achieved exceptional milestones in their chess journey.",
      students: [
        { name: "Sarah Ahmed", level: "Advanced Level", achievement: "1st Place - Riyadh Juniors" },
        { name: "Omar Khaled", level: "Intermediate Level", achievement: "Most Promising Player 2025" },
        { name: "Leen Mohammed", level: "Advanced Level", achievement: "Gold Medal - School Championship" },
        { name: "Yousef Ali", level: "Intermediate Level", achievement: "Fastest Rating Growth" }
      ]
    },
    testimonials: {
      title: "What Our",
      title_accent: "Clients",
      desc: "Join hundreds of satisfied families building brighter futures.",
      reviews: [
        { quote: "The change in my son's logical thinking after just two levels was remarkable. Ebtehal and the team are true professionals.", author: "Ebtehal", role: "Parent" },
        { quote: "Our students love the 'Future Heroes' approach. It's not just about winning; it's about the beauty of the strategy.", author: "Future Heroes", role: "Sports Org" },
        { quote: "Finally a program that doesn't feel like school. My daughter looks forward to her Pioneers session every week.", author: "Ahmed S.", role: "Parent" }
      ]
    },
    tutorials: {
      title: "Master Chess",
      title_accent: "Video Library",
      desc: "Watch our curated collection of high-quality tutorials designed to boost your skills.",
      categories: {
        all: "All Videos",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      duration: "min",
      play: "Watch Now"
    },
    footer: {
      desc: "Empowering the next generation of strategic thinkers through the art and science of chess. Join the pioneers today.",
      links: "Quick Links",
      contact: "Contact Us",
      newsletter: "Newsletter",
      placeholder: "Your email address",
      rights: "All rights reserved."
    },
    faq: {
      badge: "Got Questions?",
      title: "Frequently Asked",
      title_accent: "Questions",
      desc: "Everything you need to know about Pioneers Chess Academy and our programs.",
      cta_title: "Still have questions?",
      cta_desc: "Our team is happy to help you anytime.",
      cta_button: "Chat on WhatsApp",
      items: [
        { q: "How do I register my child at Pioneers?", a: "Registration is simple! Click 'Join Pioneers' on our website, fill in your child's details, and choose your preferred plan. Our team will reach out within 24 hours to schedule a free assessment session and place your child in the appropriate level." },
        { q: "What age range do you accept?", a: "We welcome students from ages 5 to 18. Our curriculum is carefully designed with age-appropriate content for each group: 5-7 (Little Knights), 8-12 (Rising Stars), and 13-18 (Future Masters). Each age group has tailored teaching methods and difficulty levels." },
        { q: "What does the curriculum look like?", a: "Our curriculum consists of 4 graduated levels, each with 10 sessions. Students progress from basic piece movement and rules to advanced strategy, tournament preparation, and endgame mastery. Each level ends with an assessment and a certificate of completion." },
        { q: "Can I reschedule a session?", a: "Yes! You can reschedule up to 24 hours before the session through your parent dashboard or by contacting your child's instructor directly. We offer flexible make-up sessions to ensure no learning time is lost." },
        { q: "What's the difference between Group and Private training?", a: "Group training (4-6 students) provides a social, competitive environment at 250 SAR/level. Private training offers 1-on-1 coaching with a personalized curriculum at 400 SAR/level. Both include live sessions, progress reports, and tournament access." },
        { q: "How are sessions conducted?", a: "All sessions are conducted live via Google Meet with interactive screen sharing. Students need a device (tablet, laptop, or PC) with a stable internet connection. Sessions are 60 minutes long, and recordings are available for review." },
        { q: "Do you offer trial sessions?", a: "Yes! We offer a free 30-minute assessment and trial session for every new student. This helps us evaluate your child's current level and gives them a taste of our teaching style before committing to a plan." },
        { q: "What is your refund policy?", a: "We offer a full refund within the first 7 days if you're not satisfied. After the first session, we provide a pro-rated refund for any remaining sessions. Our goal is your complete satisfaction with our program." }
      ]
    },
    registration: {
      title: "Register Your",
      title_accent: "Child",
      subtitle: "Fill in the details below and we'll contact you within 24 hours.",
      child_name: "Child's Full Name",
      child_name_placeholder: "Enter your child's full name",
      age: "Age",
      age_placeholder: "5-18",
      level: "Chess Level",
      level_placeholder: "Select level",
      level_beginner: "Beginner",
      level_intermediate: "Intermediate",
      level_advanced: "Advanced",
      plan: "Preferred Plan",
      plan_placeholder: "Select plan",
      plan_group: "Group Training (250 SAR/Level)",
      plan_private: "Private Training (400 SAR/Level)",
      parent_name: "Parent's Name",
      parent_name_placeholder: "Enter parent's full name",
      phone: "Phone Number",
      phone_placeholder: "5XXXXXXXX",
      search_country: "Search country...",
      detected: "Auto-detected",
      notes: "Notes (Optional)",
      notes_placeholder: "Any special requests or questions?",
      submit: "Submit Registration",
      submitting: "Submitting...",
      success_title: "Registration Submitted!",
      success_desc: "Thank you! Our team will contact you within 24 hours to schedule a free assessment session.",
      success_close: "Done",
      error_generic: "Something went wrong. Please try again.",
      error_network: "Network error. Please check your connection and try again."
    }
  },
  ar: {
    nav: {
      methodology: "المنهجية",
      whyUs: "لماذا نحن",
      curriculum: "المنهج",
      pricing: "الأسعار",
      join: "انضم إلينا"
    },
    hero: {
      badge: "بناء العقول الاستراتيجية",
      headline_1: "أفضل",
      headline_accent: "استثمار",
      headline_2: "هو عقل",
      headline_3: "طفلك",
      subheadline: "ابدأ رحلة الاستثمار اليوم مع رواد. بناء مهارات التفكير من خلال تدريب الشطرنج الاحترافي.",
      cta_join: "انضم إلى رواد الآن",
      cta_programs: "عرض البرامج",
      trusted: "انضم إلينا أكثر من 1,200 أب وأم"
    },
    methodology: {
      title: "منهج تدريبي",
      title_accent: "متدرج",
      desc: "مبني على أسس تعليمية تعطي الأولوية للتطوير المعرفي. نحن لا نعلم الحركات فحسب، بل نبني هياكل تفكير تدوم مدى الحياة.",
      stats: [
        { label: "مستويات", value: "4" },
        { label: "جلسات", value: "10" },
        { label: "التكرار", value: "1/أسبوع" },
        { label: "المدة", value: "1 ساعة" }
      ],
      why_title: "لماذا التدريب",
      why_accent: "المتدرج؟",
      why_desc: "يتعلم الأطفال بشكل أفضل عندما تكون المعلومات تدريجية. كل جلسة في رواد تقدم مفهوماً جديداً يبني مباشرة على المفهوم السابق.",
      benefits: ["المرونة المعرفية", "التفكير النقدي", "إدارة الضغوط", "الذاكرة البصرية"],
      growth: "تركيز على النمو"
    },
    features: {
      title: "لماذا تختار",
      title_accent: "رواد؟",
      desc: "لقد أعدنا تصميم تجربة تعلم الشطرنج من الألف إلى الياء لتناسب الفضول الطبيعي للطفل.",
      items: [
        { title: "تدريب مباشر", desc: "تفاعل مباشر بنسبة 100% مع مدربين متخصصين. لا توجد فيديوهات مسجلة." },
        { title: "مجموعات صغيرة", desc: "التركيز مضمون مع مجموعات تقتصر على 6 طلاب أو جلسات فردية." },
        { title: "منهج معتمد", desc: "منهج متدرج مناسب لكل عمر ومستوى مهارة." },
        { title: "متابعة حقيقية", desc: "تقييم مستمر وتقارير تقدم شاملة بعد كل مستوى." },
        { title: "تعليم ممتع", desc: "التعلم بدون ضغوط. نجعل الشطرنج لعبة استراتيجية مثيرة." },
        { title: "شهادات معتمدة", desc: "شهادات رسمية من رواد تمنح لكل إنجاز يتحقق." }
      ]
    },
    curriculum: {
      title: "الإتقان القائم على",
      title_accent: "المستويات",
      desc: "مسار منظم من مبتدئ فضولي إلى محترف منافس.",
      levels: [
        { id: 1, title: "مبتدئ", phase: "التأسيس", desc: "التركيز على الأساسيات، القواعد، حركة القطع، وتطوير أنماط التفكير الصحيحة." },
        { id: 2, title: "متوسط", phase: "النمو التكتيكي", desc: "تطوير المهارات التكتيكية وتقديم مفاهيم التفكير الاستراتيجي المبسطة." },
        { id: 3, title: "متقدم", phase: "الإتقان", desc: "تركيز معمق على الاستراتيجية المتقدمة، تقنيات النهايات، وصنع القرار المعقد." }
      ],
      cert_title: "شهادة تخرج",
      cert_desc: "عند إتمام كل 4 مستويات تدريبية بنجاح، يمنح الطلاب شهادة إنجاز مرموقة."
    },
    pricing: {
      title: "اختر",
      title_accent: "مسارك",
      desc: "خطط مرنة مصممة لتناسب جدول طفلك وأسلوب تعلمه.",
      sar: "ريال",
      per_level: "/ مستوى",
      rec: "موصى به",
      cta: "اختر هذه الخطة",
      plans: [
        {
          name: "تدريب مجموعات",
          price: "250",
          desc: "بيئة اجتماعية وتنافسية مثالية للأقران.",
          features: ["مجموعات من 4-6 أطفال", "1 جلسة مباشرة أسبوعياً", "تدريب مركز على المنهج", "دخول البطولات الشهرية", "تتبع تقدم المجموعة"]
        },
        {
          name: "تدريب خاص",
          price: "400",
          desc: "أقصى قدر من الاهتمام ووتيرة مخصصة للنمو السريع.",
          features: ["مدرب خاص 1 لـ 1", "1 أو 2 جلسة أسبوعياً", "منهج مخصص بالكامل", "تقارير مستويات شاملة", "تحليل وتدريب البطولات", "دعم مباشر مع المدرب"]
        }
      ]
    },
    champions: {
      title: "أبطالنا",
      title_accent: "المتميزين",
      desc: "نحتفل بطلابنا الذين حققوا إنجازات استثنائية في رحلتهم الشطرنجية.",
      students: [
        { name: "سارة أحمد", level: "المستوى المتقدم", achievement: "المركز الأول - بطولة الرياض للناشئين" },
        { name: "عمر خالد", level: "المستوى المتوسط", achievement: "أفضل لاعب واعد 2025" },
        { name: "ليين محمد", level: "المستوى المتقدم", achievement: "ميدالية ذهبية - البطولة المدرسية" },
        { name: "يوسف علي", level: "المستوى المتوسط", achievement: "أسرع تقدم في التصنيف" }
      ]
    },
    testimonials: {
      title: "ماذا يقول",
      title_accent: "عملاؤنا",
      desc: "انضم إلى مئات العائلات الراضية التي تبني مستقبلاً أكثر إشراقاً.",
      reviews: [
        { quote: "التغيير في التفكير المنطقي لابني بعد مستويين فقط كان ملحوظاً. ابتهال والفريق محترفون حقاً.", author: "ابتهال", role: "ولي أمر" },
        { quote: "طلابنا يحبون نهج 'أبطال المستقبل'. الأمر لا يتعلق فقط بالفوز؛ بل بجمال الاستراتيجية.", author: "أبطال المستقبل", role: "منظمة رياضية" },
        { quote: "أخيراً برنامج لا يشعرك وكأنه مدرسة. ابنتي تتطلع لجلسة رواد كل أسبوع.", author: "أحمد س.", role: "ولي أمر" }
      ]
    },
    tutorials: {
      title: "أتقن الشطرنج",
      title_accent: "مكتبة الفيديو",
      desc: "شاهد مجموعتنا المختارة من الدروس عالية الجودة المصممة لتعزيز مهاراتك.",
      categories: {
        all: "الكل",
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم"
      },
      duration: "دقيقة",
      play: "شاهد الآن"
    },
    footer: {
      desc: "تمكين الجيل القادم من المفكرين الاستراتيجيين من خلال فن وعلم الشطرنج. انضم إلى الرواد اليوم.",
      links: "روابط سريعة",
      contact: "اتصل بنا",
      newsletter: "النشرة الإخبارية",
      placeholder: "بريدك الإلكتروني",
      rights: "جميع الحقوق محفوظة."
    },
    faq: {
      badge: "عندك أسئلة؟",
      title: "الأسئلة",
      title_accent: "الشائعة",
      desc: "كل ما تحتاج معرفته عن أكاديمية رواد الشطرنج وبرامجنا.",
      cta_title: "لا زال عندك أسئلة؟",
      cta_desc: "فريقنا سعيد بمساعدتك في أي وقت.",
      cta_button: "تواصل عبر واتساب",
      items: [
        { q: "كيف أسجل طفلي في رواد؟", a: "التسجيل بسيط! اضغط على 'انضم إلى رواد' في موقعنا، أدخل بيانات طفلك، واختر الخطة المناسبة. فريقنا سيتواصل معك خلال 24 ساعة لحجز جلسة تقييم مجانية وتحديد المستوى المناسب لطفلك." },
        { q: "ما الفئة العمرية المقبولة؟", a: "نرحب بالطلاب من عمر 5 إلى 18 سنة. منهجنا مصمم بعناية لكل فئة عمرية: 5-7 (الفرسان الصغار)، 8-12 (النجوم الصاعدة)، و13-18 (أساتذة المستقبل). كل فئة لها أساليب تدريس ومستويات صعوبة مخصصة." },
        { q: "كيف يبدو المنهج الدراسي؟", a: "يتكون منهجنا من 4 مستويات متدرجة، كل مستوى يحتوي على 10 جلسات. يتقدم الطلاب من حركة القطع الأساسية والقواعد إلى الاستراتيجية المتقدمة والتحضير للبطولات وإتقان نهاية اللعبة. كل مستوى ينتهي بتقييم وشهادة إتمام." },
        { q: "هل يمكنني إعادة جدولة جلسة؟", a: "نعم! يمكنك إعادة الجدولة قبل 24 ساعة من الجلسة من خلال لوحة تحكم ولي الأمر أو بالتواصل مباشرة مع مدرب طفلك. نقدم جلسات تعويضية مرنة لضمان عدم ضياع أي وقت تعليمي." },
        { q: "ما الفرق بين التدريب الجماعي والخاص؟", a: "التدريب الجماعي (4-6 طلاب) يوفر بيئة اجتماعية تنافسية بسعر 250 ريال/مستوى. التدريب الخاص يقدم تدريب 1 لـ 1 بمنهج مخصص بسعر 400 ريال/مستوى. كلاهما يشمل جلسات مباشرة وتقارير تقدم ودخول البطولات." },
        { q: "كيف تتم الجلسات؟", a: "جميع الجلسات تتم مباشرة عبر Google Meet مع مشاركة تفاعلية للشاشة. يحتاج الطلاب إلى جهاز (تابلت، لابتوب، أو كمبيوتر) مع اتصال إنترنت مستقر. مدة الجلسة 60 دقيقة، والتسجيلات متاحة للمراجعة." },
        { q: "هل تقدمون جلسات تجريبية؟", a: "نعم! نقدم جلسة تقييم وتجربة مجانية لمدة 30 دقيقة لكل طالب جديد. هذا يساعدنا على تقييم مستوى طفلك الحالي ويمنحه تجربة لأسلوبنا التعليمي قبل الالتزام بخطة." },
        { q: "ما هي سياسة الاسترجاع؟", a: "نقدم استرجاع كامل خلال أول 7 أيام إذا لم تكن راضياً. بعد الجلسة الأولى، نقدم استرجاع نسبي لأي جلسات متبقية. هدفنا رضاكم الكامل عن برنامجنا." }
      ]
    },
    registration: {
      title: "سجّل",
      title_accent: "طفلك",
      subtitle: "املأ البيانات أدناه وسنتواصل معك خلال 24 ساعة.",
      child_name: "اسم الطفل الكامل",
      child_name_placeholder: "أدخل اسم الطفل الكامل",
      age: "العمر",
      age_placeholder: "5-18",
      level: "مستوى الشطرنج",
      level_placeholder: "اختر المستوى",
      level_beginner: "مبتدئ",
      level_intermediate: "متوسط",
      level_advanced: "متقدم",
      plan: "الخطة المفضلة",
      plan_placeholder: "اختر الخطة",
      plan_group: "تدريب مجموعات (250 ريال/مستوى)",
      plan_private: "تدريب خاص (400 ريال/مستوى)",
      parent_name: "اسم ولي الأمر",
      parent_name_placeholder: "أدخل اسم ولي الأمر",
      phone: "رقم الهاتف",
      phone_placeholder: "5XXXXXXXX",
      search_country: "ابحث عن دولة...",
      detected: "تم الكشف تلقائياً",
      notes: "ملاحظات (اختياري)",
      notes_placeholder: "أي طلبات خاصة أو أسئلة؟",
      submit: "إرسال التسجيل",
      submitting: "جاري الإرسال...",
      success_title: "تم إرسال التسجيل!",
      success_desc: "شكراً لك! فريقنا سيتواصل معك خلال 24 ساعة لحجز جلسة تقييم مجانية.",
      success_close: "تم",
      error_generic: "حدث خطأ. حاول مرة أخرى.",
      error_network: "خطأ في الاتصال. تحقق من اتصالك وحاول مرة أخرى."
    }
  }
};
