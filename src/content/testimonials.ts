import type { Testimonial } from "@/types/content";

/**
 * Merges Home.html's 3 testimonials with Cases & Reviews.html's 8. The name
 * "Sarah M." appeared on both pages with two different quotes (a legacy
 * copy-paste collision) — renamed to "Samar M." here to avoid presenting two
 * different reviews under the same patient name.
 */
export const testimonials: Testimonial[] = [
  {
    id: "sarah-m",
    name: "Sarah M.",
    rating: 5,
    featuredOnHome: true,
    quote: {
      en: "Dr. Gamal's attention to detail is unmatched. He listened to exactly what I wanted and the results are more natural and beautiful than I could have imagined. Truly a master of his craft.",
      ar: "دقة الدكتور جمال في التفاصيل لا مثيل لها. لقد أصغى تمامًا لما أردته، وجاءت النتائج أكثر طبيعية وجمالًا مما تخيلت. إنه حقًا سيد في حرفته.",
    },
  },
  {
    id: "elena-r",
    name: "Elena R.",
    rating: 5,
    featuredOnHome: true,
    quote: {
      en: "From the initial consultation to post-op care, the entire team made me feel incredibly comfortable. The recovery was smooth, and I am absolutely thrilled with my new profile.",
      ar: "من الاستشارة الأولى وحتى الرعاية بعد العملية، جعلني الفريق بأكمله أشعر بارتياح كبير. كانت فترة التعافي سلسة، وأنا سعيدة للغاية بملامحي الجديدة.",
    },
  },
  {
    id: "victoria-h",
    name: "Victoria H.",
    rating: 5,
    featuredOnHome: true,
    quote: {
      en: "Choosing Dr. Gamal was the best decision I made for my confidence. The subtle rejuvenation took years off my appearance without making me look 'done'. Highly recommend his expertise.",
      ar: "كان اختيار الدكتور جمال أفضل قرار اتخذته من أجل ثقتي بنفسي. أعاد التجديد الدقيق لي سنوات من العمر دون أن يجعلني أبدو \"مصطنعة\". أنصح بخبرته بشدة.",
    },
  },
  {
    id: "samar-m",
    name: "Samar M.",
    rating: 5,
    quote: {
      en: "An absolute artist. The results exceeded my expectations and the care was unparalleled.",
      ar: "فنان حقيقي بكل معنى الكلمة. جاءت النتائج أفضل من توقعاتي، والرعاية التي حصلت عليها لا مثيل لها.",
    },
  },
  {
    id: "emily-r",
    name: "Emily R.",
    rating: 5,
    quote: {
      en: "I feel like myself again, but better. Dr. Gamal's precision is truly remarkable.",
      ar: "أشعر وكأنني عدت لنفسي، ولكن بنسخة أفضل. دقة الدكتور جمال مذهلة حقًا.",
    },
  },
  {
    id: "jessica-t",
    name: "Jessica T.",
    rating: 5,
    quote: {
      en: "The consultation was thorough, and the outcome is incredibly natural. Highly recommend.",
      ar: "كانت الاستشارة شاملة والنتيجة طبيعية بشكل مذهل. أنصح به بشدة.",
    },
  },
  {
    id: "amanda-l",
    name: "Amanda L.",
    rating: 5,
    quote: {
      en: "A seamless experience from start to finish. The clinic environment is as luxurious as the results.",
      ar: "تجربة سلسة من البداية إلى النهاية. بيئة العيادة فاخرة بقدر فخامة النتائج.",
    },
  },
  {
    id: "rachel-b",
    name: "Rachel B.",
    rating: 5,
    quote: {
      en: "Life-changing results. My confidence has skyrocketed since my procedure.",
      ar: "نتائج غيّرت حياتي. ثقتي بنفسي ارتفعت بشكل كبير منذ إجراء عمليتي.",
    },
  },
  {
    id: "maria-c",
    name: "Maria C.",
    rating: 5,
    quote: {
      en: "Professional, compassionate, and incredibly skilled. Truly a master of his craft.",
      ar: "محترف، متعاطف، وموهوب بشكل استثنائي. إنه حقًا سيد في حرفته.",
    },
  },
  {
    id: "lauren-k",
    name: "Lauren K.",
    rating: 5,
    quote: {
      en: "I traveled a long way just to see Dr. Gamal. Best decision I could have made.",
      ar: "سافرت مسافة طويلة لأرى الدكتور جمال فقط. كان أفضل قرار اتخذته.",
    },
  },
  {
    id: "nicole-s",
    name: "Nicole S.",
    rating: 5,
    quote: {
      en: "The attention to detail is unmatched. I felt safe and heard throughout the entire process.",
      ar: "الاهتمام بالتفاصيل لا مثيل له. شعرت بالأمان وأن صوتي مسموع طوال رحلتي العلاجية.",
    },
  },
];
