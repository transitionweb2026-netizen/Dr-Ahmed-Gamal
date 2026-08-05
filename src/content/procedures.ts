import type { Procedure } from "@/types/content";

const IMG_RHINOPLASTY =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAB0RvD_wR00R1UKFT4sbotiDBe-4gDlNC0TXksUryKkCvfQFeqGoKjckFREwa8NBT1mHNu_5cPc8-PiwxI7QAZ8b_OAUFwdIE_b2jfFUzWAEIxxuqUJFxR0dIvrs1qqCZ-E2uX3zXhDa8WysfXe2fafewqa-1veqDemv8kphtYLiIvDSpMM9_vQDGCOn_o6P-gnlpbNyFtAUrH1-N21MrwDBaeTO3jaU5Cq4pdY6DF3KSzbTk7LnEEhw";
const IMG_FACE_NECK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAEJR5L-t8jc4vh5jK4iK1RLdvcUfjsgQIz4UMZLhG5juoRhYwfG4L5KeB48qXPLH0ES_Q3KNmBj3MC5sJSrh7wrKmQfzhQdirFGz0D79nHN9SQhEAVlEdplUpAnRJ3JjplbCSKFaRerIfA2yVwyZYNis9U8D8u_Fx0SuC8-ktPVHAiQZ6a6hWBEMj3qF1KPphOLdoVmAmgLLBhKUDaaaIdnG9mAsgaJnJI2t01gJeGgYmiajxNUPce8A";
const IMG_BODY_CONTOURING =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTKU68wWuLn1AkvsDtfkkLupEgq7eS6kMoHPm8Qkyxo7FXdxYT60W2cDmZXvjjJvtBPiJqtsLW8nJLuYwvACb-SUr-vx1ji0dli_C_681AEDVjFfTMTaO6mNkRHee36ZiwAGQQcE73PYB3WIQQbbKknDzhRrY9N8RyEXgM_pSayUwOL4ZJNs-pIIvxy_3RWRsNpf14a9nk0CU6-s4aFWqNfrkouhYoZuCl0jOuAlqASnG5r8oCto-k2g";
const IMG_BREAST =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDISZ3dymHm-bSB98xjy4B7V4IJwnPDGO8X66Q55oC_hvyqY-Ati2KN3tOEysDJz1l_HFWkQWRhlPhEdblFOiheXKkecCAfKpGdDKuFX4wWukYkSXnw78guAIY2SEVKjXPDiVic71UFzWszSp55SSbP8KhHCgZNhM8EQ9XAhODj0-kEmlkzG1HKJlf6kNG26OraJmffIkRuxyGPYUwlrbTsHoZX86BARRsS2QC7TmcTpWX8Gu3PMU9xrA";
const IMG_GENERIC =
  "https://lh3.googleusercontent.com/aida/AP1WRLv-aFu0cVb0z4Zfe4ddhB-fBgUNy2BLMhf0C9v2eCsakN-4C5DTKj2VjDLyKQwmtpFPWGya6110eao1BgjMJ-pes4Uh0KeUB5nQ19D_gQlGCSSxcYCw2I35N8VBStZlpqMF6cRcPzw1rqAgPvl8-Q7oNr5Wag_eMArnUqgKu7y6DiP-eUYecdnZBjYSjVKbQcPey8vuHBmTFnW315d6CkJFTR1ucjtmdBBMgeD3fZAC_S1AVdpO0bOtjE0n";

export const procedures: Procedure[] = [
  {
    slug: "rhinoplasty",
    name: { en: "Rhinoplasty", ar: "تجميل الأنف" },
    shortDescription: {
      en: "Refine facial harmony with precision nasal reshaping tailored to your unique profile.",
      ar: "تنسيق ملامح الوجه من خلال إعادة تشكيل دقيقة للأنف تناسب ملامحك الفريدة.",
    },
    category: "face",
    icon: "face",
    image: IMG_RHINOPLASTY,
    featuredOnHome: true,
    order: 1,
    detail: {
      overview: {
        en: "Rhinoplasty is a highly personalized procedure designed to harmonize your facial features by reshaping the nose. Dr. Gamal focuses on preserving breathing function while achieving aesthetically pleasing, natural-looking results.",
        ar: "تجميل الأنف إجراء مخصص بدرجة عالية يهدف إلى تنسيق ملامح وجهك من خلال إعادة تشكيل الأنف. يحرص الدكتور جمال على الحفاظ على وظيفة التنفس مع تحقيق نتائج جمالية طبيعية المظهر.",
      },
      recovery: {
        en: "Most patients return to light activities within a week. Initial swelling subsides significantly after 2-3 weeks, with final refined results becoming apparent over the following months.",
        ar: "يعود معظم المرضى لأنشطتهم الخفيفة خلال أسبوع. يتراجع التورم الأولي بشكل ملحوظ بعد 2-3 أسابيع، وتظهر النتائج النهائية الدقيقة تدريجيًا خلال الأشهر التالية.",
      },
      faq: [
        {
          question: { en: "How long does the surgery take?", ar: "كم تستغرق مدة العملية؟" },
          answer: { en: "Typically 2-3 hours.", ar: "عادةً ما بين 2 إلى 3 ساعات." },
        },
        {
          question: { en: "Will there be visible scars?", ar: "هل ستظهر ندبات واضحة؟" },
          answer: {
            en: "Closed rhinoplasty incisions are hidden inside the nose.",
            ar: "في تجميل الأنف المغلق، تكون الشقوق الجراحية مخفية بالكامل داخل الأنف.",
          },
        },
      ],
    },
  },
  {
    slug: "facelift",
    name: { en: "Facelift", ar: "شد الوجه" },
    shortDescription: {
      en: "Restore youthful contours with advanced lifting techniques for a natural rejuvenation.",
      ar: "استعادة ملامح الشباب من خلال تقنيات شد متقدمة لتجديد طبيعي المظهر.",
    },
    category: "face",
    icon: "face",
    image: IMG_FACE_NECK,
    featuredOnHome: true,
    order: 2,
    detail: {
      overview: {
        en: "A facelift addresses signs of aging in the lower face and neck by repositioning underlying tissues and removing excess skin. The goal is a refreshed, rested appearance — never a 'pulled' or overdone look.",
        ar: "يعالج شد الوجه علامات التقدم في العمر في الجزء السفلي من الوجه والرقبة عن طريق إعادة ترتيب الأنسجة العميقة وإزالة الجلد الزائد. الهدف هو الحصول على مظهر منتعش ومرتاح، وليس مظهرًا \"مشدودًا\" أو مبالغًا فيه.",
      },
      recovery: {
        en: "Initial social recovery typically takes 10 to 14 days, with residual swelling settling gradually over the following weeks as your natural contours emerge.",
        ar: "تستغرق فترة التعافي الاجتماعي الأولية عادةً من 10 إلى 14 يومًا، مع تراجع تدريجي للتورم المتبقي خلال الأسابيع التالية حتى تظهر ملامحك الطبيعية.",
      },
      faq: [
        {
          question: { en: "What is a deep plane facelift?", ar: "ما هو شد الوجه بتقنية Deep Plane؟" },
          answer: {
            en: "An advanced technique that lifts deeper tissues for longer-lasting, natural results.",
            ar: "تقنية متقدمة تشد الأنسجة العميقة لتحقيق نتائج طبيعية أطول أمدًا.",
          },
        },
        {
          question: { en: "Can this be combined with eyelid surgery?", ar: "هل يمكن دمجه مع جراحة الجفون؟" },
          answer: {
            en: "Yes, combination procedures are common and can be performed efficiently in a single session.",
            ar: "نعم، الجمع بين الإجراءين شائع ويمكن إجراؤه بكفاءة في جلسة واحدة.",
          },
        },
      ],
    },
  },
  {
    slug: "blepharoplasty",
    name: { en: "Blepharoplasty", ar: "جراحة تجميل الجفون" },
    shortDescription: {
      en: "Awaken your gaze by removing excess skin and fat from the upper and lower eyelids.",
      ar: "إحياء نظرتك من خلال إزالة الجلد والدهون الزائدة من الجفنين العلوي والسفلي.",
    },
    category: "face",
    icon: "face",
    image: IMG_FACE_NECK,
    order: 3,
    detail: {
      overview: {
        en: "Blepharoplasty rejuvenates tired-looking eyes by removing excess skin, muscle, and fat from the upper and/or lower eyelids, restoring a more alert and youthful appearance while preserving natural eye shape.",
        ar: "تعيد جراحة الجفون الحيوية للعينين المتعبتين عبر إزالة الجلد والعضلات والدهون الزائدة من الجفن العلوي و/أو السفلي، لاستعادة مظهر أكثر يقظة وشبابًا مع الحفاظ على الشكل الطبيعي للعين.",
      },
      recovery: {
        en: "Most patients feel comfortable returning to light daily activities within 5 to 7 days, once initial bruising and swelling around the eyes have subsided.",
        ar: "يشعر معظم المرضى بالراحة الكافية للعودة إلى أنشطتهم اليومية الخفيفة خلال 5 إلى 7 أيام، بعد تراجع الكدمات والتورم الأولي حول العينين.",
      },
      faq: [
        {
          question: { en: "Will this change my eye shape?", ar: "هل سيتغير شكل عيني؟" },
          answer: {
            en: "No — the goal is to remove excess tissue while preserving your natural eye shape and expression.",
            ar: "لا — الهدف هو إزالة الأنسجة الزائدة مع الحفاظ على شكل عينك وتعابيرها الطبيعية.",
          },
        },
        {
          question: { en: "Can it be combined with a brow lift?", ar: "هل يمكن دمجها مع شد الحاجب؟" },
          answer: {
            en: "Yes, many patients combine eyelid surgery with a brow lift for a more comprehensive upper-face refresh.",
            ar: "نعم، يجمع كثير من المرضى بين جراحة الجفون وشد الحاجب لتجديد شامل للجزء العلوي من الوجه.",
          },
        },
      ],
    },
  },
  {
    slug: "liposuction",
    name: { en: "Liposuction", ar: "شفط الدهون" },
    shortDescription: {
      en: "Sculpt and refine body contours by removing stubborn fat deposits with precision.",
      ar: "نحت وتنسيق قوام الجسم من خلال إزالة دقيقة للدهون العنيدة.",
    },
    category: "body",
    icon: "body_fat",
    image: IMG_BODY_CONTOURING,
    order: 4,
    detail: {
      overview: {
        en: "Liposuction removes localized, diet-and-exercise-resistant fat deposits to refine body contours. It is a contouring procedure, not a weight-loss treatment, and works best on patients close to a stable, healthy weight.",
        ar: "يعمل شفط الدهون على إزالة الدهون الموضعية التي تقاوم الحمية الغذائية والرياضة، لتنسيق قوام الجسم. هذا إجراء لتحسين الشكل وليس علاجًا لفقدان الوزن، ويحقق أفضل النتائج للمرضى القريبين من وزن صحي ومستقر.",
      },
      recovery: {
        en: "Most patients resume light activity within a few days and return to normal routines within 1 to 2 weeks, wearing a compression garment to support healing and optimize results.",
        ar: "يستأنف معظم المرضى النشاط الخفيف خلال أيام قليلة ويعودون لروتينهم الطبيعي خلال 1-2 أسبوع، مع ارتداء ملابس ضاغطة لدعم التعافي وتحسين النتائج.",
      },
      faq: [
        {
          question: { en: "Is liposuction a weight-loss procedure?", ar: "هل شفط الدهون إجراء لفقدان الوزن؟" },
          answer: {
            en: "No — it is designed to refine shape and proportion, not to treat obesity or replace weight loss.",
            ar: "لا — يهدف الإجراء إلى تحسين الشكل والتناسق، وليس علاج السمنة أو بديلاً عن فقدان الوزن.",
          },
        },
        {
          question: { en: "Are the results permanent?", ar: "هل النتائج دائمة؟" },
          answer: {
            en: "The fat cells removed are gone permanently, though maintaining a stable weight is key to preserving your results.",
            ar: "الخلايا الدهنية التي تتم إزالتها لا تعود، لكن الحفاظ على وزن مستقر أساسي للحفاظ على نتائجك.",
          },
        },
      ],
    },
  },
  {
    slug: "tummy-tuck",
    name: { en: "Tummy Tuck", ar: "شد البطن" },
    shortDescription: {
      en: "Achieve a firmer, flatter abdominal profile through skin and muscle tightening.",
      ar: "الحصول على قوام بطن أكثر شدًا واستقامة من خلال شد الجلد والعضلات.",
    },
    category: "body",
    icon: "body_fat",
    image: IMG_GENERIC,
    order: 5,
    detail: {
      overview: {
        en: "A tummy tuck (abdominoplasty) removes excess skin and tightens weakened abdominal muscles, addressing changes from pregnancy, weight fluctuation, or aging that diet and exercise alone cannot correct.",
        ar: "يعمل شد البطن على إزالة الجلد الزائد وشد عضلات البطن المرتخية، لمعالجة التغيرات الناتجة عن الحمل أو تقلبات الوزن أو التقدم في العمر التي لا يمكن للحمية والرياضة وحدهما تصحيحها.",
      },
      recovery: {
        en: "Most patients take 1 to 3 weeks off work and wear a compression garment for several weeks, with strenuous exercise reintroduced gradually under your surgeon's guidance.",
        ar: "يأخذ معظم المرضى إجازة من العمل لمدة 1-3 أسابيع، مع ارتداء ملابس ضاغطة لعدة أسابيع، مع العودة التدريجية للرياضة الشاقة وفقًا لتوجيهات الجراح.",
      },
      faq: [
        {
          question: { en: "Will I have a visible scar?", ar: "هل ستظهر ندبة واضحة؟" },
          answer: {
            en: "The incision is placed low on the abdomen, designed to be easily concealed beneath most clothing and swimwear.",
            ar: "يتم وضع الشق الجراحي في أسفل البطن، بحيث يسهل إخفاؤه أسفل معظم الملابس والملابس الرياضية.",
          },
        },
        {
          question: { en: "Can this be combined with liposuction?", ar: "هل يمكن دمجه مع شفط الدهون؟" },
          answer: {
            en: "Yes, combining a tummy tuck with liposuction is common for more comprehensive body contouring.",
            ar: "نعم، الجمع بين شد البطن وشفط الدهون شائع لتحقيق نحت شامل للجسم.",
          },
        },
      ],
    },
  },
  {
    slug: "breast-augmentation",
    name: { en: "Breast Augmentation", ar: "تكبير الثدي" },
    shortDescription: {
      en: "Enhance volume and shape with premium implants or fat transfer techniques.",
      ar: "تعزيز الحجم والشكل باستخدام حشوات عالية الجودة أو تقنيات نقل الدهون.",
    },
    category: "breast",
    icon: "spa",
    image: IMG_BREAST,
    featuredOnHome: true,
    order: 6,
    detail: {
      overview: {
        en: "Breast augmentation enhances volume and shape using implants or your own natural fat, tailored to complement your body's proportions and your personal aesthetic goals.",
        ar: "يعزز تكبير الثدي الحجم والشكل باستخدام الحشوات أو دهون الجسم الطبيعية، بما يتناسب مع تناسق جسمك وأهدافك الجمالية الشخصية.",
      },
      recovery: {
        en: "Most patients resume normal, non-strenuous activities within a week, with a full return to vigorous exercise typically around 6 weeks post-surgery.",
        ar: "يستأنف معظم المرضى أنشطتهم العادية غير المجهدة خلال أسبوع، مع عودة كاملة للرياضة المكثفة عادةً بعد حوالي 6 أسابيع من الجراحة.",
      },
      faq: [
        {
          question: { en: "What types of implants are available?", ar: "ما أنواع الحشوات المتاحة؟" },
          answer: {
            en: "We discuss silicone and saline options in detail during your consultation, based on your goals and anatomy.",
            ar: "نناقش خيارات السيليكون والمحلول الملحي بالتفصيل خلال استشارتك، بناءً على أهدافك وتكوين جسمك.",
          },
        },
        {
          question: { en: "Will augmentation affect breastfeeding?", ar: "هل يؤثر التكبير على الرضاعة الطبيعية؟" },
          answer: {
            en: "Most patients retain the ability to breastfeed; this is discussed individually based on incision placement and technique.",
            ar: "يحتفظ معظم المرضى بالقدرة على الرضاعة الطبيعية؛ ويتم مناقشة ذلك بشكل فردي بناءً على موضع الشق والتقنية المستخدمة.",
          },
        },
      ],
    },
  },
  {
    slug: "breast-reduction",
    name: { en: "Breast Reduction", ar: "تصغير الثدي" },
    shortDescription: {
      en: "Alleviate discomfort and achieve a balanced silhouette with surgical reduction.",
      ar: "تخفيف الانزعاج وتحقيق قوام متناسق من خلال التصغير الجراحي.",
    },
    category: "breast",
    icon: "spa",
    image: IMG_GENERIC,
    order: 7,
    detail: {
      overview: {
        en: "Breast reduction removes excess breast tissue, fat, and skin to relieve physical discomfort and achieve a size and shape that is better proportioned to your body.",
        ar: "يعمل تصغير الثدي على إزالة الأنسجة والدهون والجلد الزائد، لتخفيف الانزعاج الجسدي وتحقيق حجم وشكل أكثر تناسبًا مع جسمك.",
      },
      recovery: {
        en: "Most patients return to non-strenuous work within 1 to 2 weeks, with full recovery and settling of final results over the following months.",
        ar: "يعود معظم المرضى للعمل غير المجهد خلال 1-2 أسبوع، مع اكتمال التعافي واستقرار النتائج النهائية خلال الأشهر التالية.",
      },
      faq: [
        {
          question: { en: "Will insurance cover this procedure?", ar: "هل يغطي التأمين هذا الإجراء؟" },
          answer: {
            en: "Coverage varies by provider and is typically considered when the procedure addresses documented physical discomfort — this can be discussed at consultation.",
            ar: "تختلف التغطية حسب جهة التأمين، وعادةً ما تُؤخذ بعين الاعتبار عندما يعالج الإجراء انزعاجًا جسديًا موثقًا — يمكن مناقشة ذلك خلال الاستشارة.",
          },
        },
        {
          question: { en: "Will I lose sensation?", ar: "هل سأفقد الإحساس؟" },
          answer: {
            en: "Temporary changes in sensation are common after surgery; most patients regain normal sensation over time.",
            ar: "التغيرات المؤقتة في الإحساس شائعة بعد الجراحة؛ ويستعيد معظم المرضى الإحساس الطبيعي مع مرور الوقت.",
          },
        },
      ],
    },
  },
  {
    slug: "gynecomastia",
    name: { en: "Gynecomastia", ar: "علاج تثدي الرجال" },
    shortDescription: {
      en: "Correct enlarged male breast tissue for a more masculine chest contour.",
      ar: "تصحيح تضخم أنسجة الثدي لدى الرجال للحصول على قوام صدر أكثر رجولة.",
    },
    category: "breast",
    icon: "spa",
    image: IMG_BREAST,
    order: 8,
    detail: {
      overview: {
        en: "Gynecomastia surgery addresses enlarged male breast tissue through liposuction, direct excision, or a combination of both, restoring a flatter, more contoured chest.",
        ar: "تعالج جراحة تثدي الرجال تضخم أنسجة الثدي لدى الرجال من خلال شفط الدهون أو الاستئصال المباشر أو مزيج من الاثنين، لاستعادة صدر أكثر استواءً وتناسقًا.",
      },
      recovery: {
        en: "Most patients return to desk-based work within a few days and resume full activity, including exercise, within 3 to 4 weeks.",
        ar: "يعود معظم المرضى للعمل المكتبي خلال أيام قليلة، ويستأنفون النشاط الكامل، بما في ذلك الرياضة، خلال 3-4 أسابيع.",
      },
      faq: [
        {
          question: { en: "What causes gynecomastia?", ar: "ما سبب تثدي الرجال؟" },
          answer: {
            en: "It can result from hormonal changes, genetics, certain medications, or other factors — your consultation will help identify the best surgical approach.",
            ar: "قد ينتج عن تغيرات هرمونية أو عوامل وراثية أو أدوية معينة أو عوامل أخرى — تساعد استشارتك في تحديد أفضل نهج جراحي.",
          },
        },
        {
          question: { en: "Will results be permanent?", ar: "هل ستكون النتائج دائمة؟" },
          answer: {
            en: "Yes, tissue removed during surgery does not return, though maintaining a stable weight helps preserve results.",
            ar: "نعم، الأنسجة التي تتم إزالتها أثناء الجراحة لا تعود، مع أن الحفاظ على وزن مستقر يساعد في الحفاظ على النتائج.",
          },
        },
      ],
    },
  },
  {
    slug: "arm-lift",
    name: { en: "Arm Lift", ar: "شد الذراعين" },
    shortDescription: {
      en: "Remove excess skin and fat from the upper arms for a toned, sleek appearance.",
      ar: "إزالة الجلد والدهون الزائدة من أعلى الذراعين للحصول على مظهر مشدود وأنيق.",
    },
    category: "body",
    icon: "body_fat",
    image: IMG_BODY_CONTOURING,
    order: 9,
    detail: {
      overview: {
        en: "An arm lift (brachioplasty) removes excess skin and fat from the upper arms, addressing laxity often caused by significant weight loss or the natural aging process.",
        ar: "يعمل شد الذراعين على إزالة الجلد والدهون الزائدة من أعلى الذراعين، لمعالجة الترهل الناتج غالبًا عن فقدان وزن كبير أو التقدم الطبيعي في العمر.",
      },
      recovery: {
        en: "Most patients take about 1 to 2 weeks off work, with scars fading gradually over several months as arms heal and settle into their new contour.",
        ar: "يأخذ معظم المرضى إجازة من العمل لمدة 1-2 أسبوع تقريبًا، مع تلاشي الندبات تدريجيًا على مدار عدة أشهر مع تعافي الذراعين واستقرار قوامهما الجديد.",
      },
      faq: [
        {
          question: { en: "Where is the incision placed?", ar: "أين يوضع الشق الجراحي؟" },
          answer: {
            en: "Typically along the inner or back of the upper arm, positioned to be as inconspicuous as possible.",
            ar: "عادةً على الجانب الداخلي أو الخلفي من أعلى الذراع، بحيث يكون أقل وضوحًا قدر الإمكان.",
          },
        },
        {
          question: { en: "Is this suitable after major weight loss?", ar: "هل هذا الإجراء مناسب بعد فقدان وزن كبير؟" },
          answer: {
            en: "Yes, an arm lift is commonly performed to address skin laxity following significant weight loss.",
            ar: "نعم، يُجرى شد الذراعين عادةً لمعالجة ترهل الجلد بعد فقدان وزن كبير.",
          },
        },
      ],
    },
  },
  {
    slug: "thigh-lift",
    name: { en: "Thigh Lift", ar: "شد الفخذين" },
    shortDescription: {
      en: "Reshape the thighs by reducing excess skin and fat for smoother skin contours.",
      ar: "إعادة تشكيل الفخذين من خلال تقليل الجلد والدهون الزائدة لملمس أكثر انسيابية.",
    },
    category: "body",
    icon: "body_fat",
    image: IMG_GENERIC,
    order: 10,
    detail: {
      overview: {
        en: "A thigh lift removes excess skin and fat from the inner or outer thighs, creating smoother contours and a more proportionate silhouette, often following weight loss or as part of an aging-related change in skin elasticity.",
        ar: "يعمل شد الفخذين على إزالة الجلد والدهون الزائدة من الجزء الداخلي أو الخارجي للفخذين، لخلق قوام أكثر انسيابية وتناسقًا، غالبًا بعد فقدان الوزن أو كجزء من التغيرات المرتبطة بمرونة الجلد مع التقدم في العمر.",
      },
      recovery: {
        en: "Most patients require 2 to 3 weeks before returning to normal activity, wearing compression garments to support healing during this period.",
        ar: "يحتاج معظم المرضى إلى 2-3 أسابيع قبل العودة للنشاط الطبيعي، مع ارتداء ملابس ضاغطة لدعم التعافي خلال هذه الفترة.",
      },
      faq: [
        {
          question: { en: "Can this be combined with liposuction?", ar: "هل يمكن دمجه مع شفط الدهون؟" },
          answer: {
            en: "Yes, thigh lifts are frequently combined with liposuction for more refined contouring.",
            ar: "نعم، غالبًا ما يُدمج شد الفخذين مع شفط الدهون لتحقيق نحت أكثر دقة.",
          },
        },
        {
          question: { en: "Will scars be visible?", ar: "هل ستكون الندبات ظاهرة؟" },
          answer: {
            en: "Incisions are placed strategically in natural skin folds or the inner thigh crease to minimize visibility.",
            ar: "توضع الشقوق الجراحية بعناية في ثنايا الجلد الطبيعية أو ثنية الفخذ الداخلية لتقليل ظهورها.",
          },
        },
      ],
    },
  },
  {
    slug: "chin-contouring",
    name: { en: "Chin Contouring", ar: "نحت الذقن" },
    shortDescription: {
      en: "Define your jawline and profile with surgical or non-surgical chin enhancement.",
      ar: "تحديد خط الفك والملامح الجانبية من خلال تحسين الذقن جراحيًا أو غير جراحي.",
    },
    category: "face",
    icon: "face",
    image: IMG_RHINOPLASTY,
    order: 11,
    detail: {
      overview: {
        en: "Chin contouring enhances facial balance and profile harmony through implants, reshaping, or non-surgical filler techniques, tailored to complement your existing facial structure.",
        ar: "يعزز نحت الذقن توازن ملامح الوجه وانسجام الملف الجانبي من خلال الحشوات أو إعادة التشكيل أو تقنيات الحشو غير الجراحية، بما يتناسب مع تركيب وجهك الحالي.",
      },
      recovery: {
        en: "Surgical chin contouring typically involves 1 to 2 weeks of initial recovery; non-surgical options involve little to no downtime.",
        ar: "يتطلب نحت الذقن الجراحي عادةً فترة تعافي أولية من 1-2 أسبوع؛ بينما لا تتطلب الخيارات غير الجراحية أي وقت تعافٍ يُذكر.",
      },
      faq: [
        {
          question: { en: "Is chin contouring surgical or non-surgical?", ar: "هل نحت الذقن جراحي أم غير جراحي؟" },
          answer: {
            en: "Both options exist — your consultation will help determine which approach best suits your goals.",
            ar: "يتوفر كلا الخيارين — تساعدك استشارتك في تحديد النهج الأنسب لأهدافك.",
          },
        },
        {
          question: { en: "How long do results last?", ar: "إلى متى تدوم النتائج؟" },
          answer: {
            en: "Surgical results are long-lasting; non-surgical filler results typically last 12-18 months depending on the product used.",
            ar: "النتائج الجراحية طويلة الأمد؛ بينما تدوم نتائج الحشو غير الجراحي عادةً من 12 إلى 18 شهرًا حسب المنتج المستخدم.",
          },
        },
      ],
    },
  },
  {
    slug: "body-contouring",
    name: { en: "Body Contouring", ar: "نحت الجسم" },
    shortDescription: {
      en: "Comprehensive transformation combining multiple techniques for total body harmony.",
      ar: "تحول شامل يجمع بين عدة تقنيات لتحقيق انسجام كامل للجسم.",
    },
    category: "body",
    icon: "body_fat",
    image: IMG_BODY_CONTOURING,
    featuredOnHome: true,
    order: 12,
    detail: {
      overview: {
        en: "Body contouring combines procedures like liposuction, tummy tucks, and skin tightening to remove stubborn fat and excess skin, creating a firmer, more sculpted physique tailored to your goals.",
        ar: "يجمع نحت الجسم بين إجراءات مثل شفط الدهون وشد البطن وشد الجلد لإزالة الدهون العنيدة والجلد الزائد، لتحقيق قوام أكثر شدًا ونحتًا يناسب أهدافك.",
      },
      recovery: {
        en: "Recovery depends on the combination and extent of procedures performed. Most patients require 1 to 3 weeks off work and wear compression garments for several weeks to support optimal results.",
        ar: "تعتمد فترة التعافي على مزيج ونطاق الإجراءات المنفذة. يحتاج معظم المرضى إجازة من العمل لمدة 1-3 أسابيع، مع ارتداء ملابس ضاغطة لعدة أسابيع لدعم أفضل النتائج.",
      },
      faq: [
        {
          question: { en: "Is this a weight-loss procedure?", ar: "هل هذا إجراء لفقدان الوزن؟" },
          answer: {
            en: "No, body contouring refines shape and proportion after your weight has stabilized — it is not a substitute for weight loss.",
            ar: "لا، يهدف نحت الجسم إلى تحسين الشكل والتناسق بعد استقرار وزنك — وليس بديلاً عن فقدان الوزن.",
          },
        },
        {
          question: { en: "Are results permanent?", ar: "هل النتائج دائمة؟" },
          answer: {
            en: "Fat cells removed are gone permanently, but maintaining a stable weight is key to preserving your results long-term.",
            ar: "الخلايا الدهنية التي تتم إزالتها لا تعود بشكل دائم، لكن الحفاظ على وزن مستقر أمر أساسي للحفاظ على نتائجك على المدى الطويل.",
          },
        },
      ],
    },
  },
];
