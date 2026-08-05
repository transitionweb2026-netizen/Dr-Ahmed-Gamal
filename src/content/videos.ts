import type { Video } from "@/types/content";

// All thumbnails below have no real video source yet (youtubeId/vimeoId
// intentionally omitted) — VideoModal shows a "coming soon" state until
// real links are supplied. Deduplicated from ~27 legacy cards (many sharing
// titles/images across Home, About, Videos.html's two grids, and Patient
// Stories' 9 identical "My Rhinoplasty Journey N" cards) down to 12 real
// educational topics + 9 distinct patient-story entries.

const T = "https://lh3.googleusercontent.com/aida-public/";

const THUMB_INTRO = `${T}AB6AXuDcV0vbvQje3-P9bA5CHxztUL1YLIOFZQooHr4HmwSvcdYBR8yyB4zmjdPZgexBLlsrBN83doUN-8GADg3NMq9KQlv_1zMFntc8faWUaFADcupPCs28fZLbcYQ5xwQ6_g4t4z3q2OViQ_ul9bkqg_3Hvq_zXq7L3N4fZ7nTlxWnx4l12HbeqISkNhuhYG0J3o6eA47f0pSFGJHV_klo8XXkpdLuT7kWJaXzU6N6wnySJyD1rw97YVJmyw`;
const THUMB_CLINIC = `${T}AB6AXuB4iLCApbgxorz0O9XzZAaEllbJ5NWmQaI2XAB5XDFX05_1Efd5Ir1HCBxPH1eA-5VY0PJkyy29dnl5ZJxHJabaYp068eNu-TuEMVXcbUivqRYma7Fp4fPJ5CrClYSUFVLk_lJjZvtezIqKavSNPv9JYdpc-97HX8jWraWUNgvOurl2hMh6KmOce_B-aZBNmNc7_-ljBeHMVYaqFaCbSJElAfyC7oWwZJ4mH_r_eBYIEstKIFwW7AA5BQ`;
const THUMB_JOURNEY = `${T}AB6AXuDSOIJ4zwwy6i3NMkgY3oKvMsZ9Uzb9542TDA_iR-9TQXDtETg0FswlTd1YoDB2_gx7mOXYBdtwT3lHQhwvOCL8vrMwvcOc8EYOgz_WCZl_czEihtPRRuDgddJ3RFyh_5fUY5-IyEfNw6sMMvZOKdA8SWTq9-z08vAAAMjK4uXpL8dkSi-lWgQPwh8uspT5yi8CxUQfquEJ0XOILKUR9A_SSHfvnidacFNr7UKX0Vy1fSM3OyrarkSqbA`;
const THUMB_PREP_A = `${T}AB6AXuDv0sSTVYX-CVB1qDny1oNG1CR5Z1eeQKZrmcsnAubKMI8c_7dVDKrw3T7SRTO4ob4f7FFklNWtlHSQkdAKWMlT597vejx5ATsl8AbugB8gg8ghS5OMuQlKivruKHODGTCfbGyxPvOaRzsPr0BvQAbtFkqMvKDy-X7gDccJOZ3hcjnFQsQ8zIfhu1BR8TDg-xy8y0GmrBhpD117yxzYkI6p8YRkYJDZCjmw26JzNF6tR3SMPJ9m7Xuzsw`;
const THUMB_ARTISTRY = `${T}AB6AXuDh1jbI2Guh5NoVlhXqzF8kKTPOWrMjHYHaxlDehAVjFzBBfo67wOT6RBSG3r3eUO8uLG02z4L25w0SPSglLt-4bMNJaWDjZfQWq4cSw0tAAY6qu-h9wU3ZEk32kkXi0_fVIdBPVCllXhNoAkskn6jjtevgc6EiS4QyfNDKPaWzBrwEKeYqL_z25o2TyhqUJNPfN0ESZI66grpWtVybnsBMwhe1a45tGVmGoXfDPyQwqmCBiYPid2qwHA`;
const THUMB_SAFETY = `${T}AB6AXuBY3fb2_z8X-833ZoXVl4ogb37Dp2pOkY7N8ibEEi1PR8pLjJfeuD9qDtPzDfnn7GRp3J2bznNaC7txXfe_0FBIwNb1sfA_Pt6mYIAgD_8KabpSr_mJ_acpCWVabN_rXgL2J0EGUiR-GukWBvm7ZoML_Lser6zxp5FFh1x70imJjWFmo9ze713KyKadAH4Ms6lbjFmV82LuiAigQ7aGdbTX3v0OUpjmumyG3i-YP6LNthRXh2Flj-Tlbg`;
const THUMB_QA = `${T}AB6AXuBmjoQS8n1_yLn19lOqlvPTgiLy_7-chfk0CGIaBmWAoarH1xOYCGPAUuMKkBksL_jtInQo_l5frQ794ZkBWjSo83kry9I-8Zeg6XinCBR8ExmLAA3PpqK3n4mdGEKo4KH1L_9AuewQrTfLK2auy_HXLtm-3utB3VefM_dyFEd8K_fm3QKApFVp164hLRfkMJGnj0pmWIbnaSkCzlede2cPUfa0u8-eAyjs-2msmlnk74fRDuwCf_zy5w`;
const THUMB_FIRST_VISIT = `${T}AB6AXuC5umJ1zGKAIujyBe1Xa7lhL3duzAexncviPlx7dVUQ5Lt-IcYlAseV1I8Sm8lRyHdhWCzpRrRnxXzzZU-oOo4fZc-Wo-nd8PBUQCvrROWVMtkiPPQ43Ol47bARn-2UtpxSNaTJSOq8JG4ui9vva7vjBBxnKmM6QXluTnLBM0XcSOVeqNylj8643z1rWcK8ZSX-qPtlpZaLhm6fgQLs5DikFPmDnEt1gyANgcwGsG0dJOTd6bSJUYm60w`;
const THUMB_HARMONY = `${T}AB6AXuA8FNnGO9WDo7U5nRH2fLgzP9jdufr9JkMt-KSd1Jtob6vAbLSkOhg02UIhmGrkPFDakiFYMmkzvzbgFlevXZTBfIzV5H9jMGp3rFQvwj9sOY8U_dY2W6VVoN-2lsS9XkvpfWYw1jCggjyeBcchFiQfNvE0SKlauHnF79RIbemlwcnsqWMkLU5iuqaqRF2LS8wKsY5ihpFxCOtkPVBFpygIfuj0ybNtsYhXpP1DHLaqMdVBxKcinvqQOw`;
const THUMB_STEPS = `${T}AB6AXuCKYyAI-Hln693GWiG4P8S3ARXja1aK-BCWQ3mAdxuWCNLVN77zwXWLiiLpX7GV8-C-ObvKejRCh9GZ_QMv7VWU74vmUql05NKzjMDNwkyqxcDmQ8eMRC76m97oF-yJkZpJvPo9LXUBNLKYdlPH_WGbYjDOhkZ1ZwO1j2wK35NK7kyspeTSWVIObykLHQLicEpMrlgTj_G-MgO9F21YEsajOry5N8iog4QHhiNWNCjkCrnPob_kx372UQ`;
const THUMB_RECOVERY_B = `${T}AB6AXuDClptQ5j6Sry0nzrxlOECwvGuq1FvtGBVxBXUusvj8-q6WdA5vfhACxA-3PovdIXRgUzkObOarENT4d_WJdLeT-THS7LkHzQ6Sm5-YVnHnEPNZhS56NOrDxSt1rPxflf4eGCJP2x9qwG_Q_HsHtnNnc1IM4v3Lsrdy6rnl019CPpPshJfzqD7a-Y7sbr5712s1p_KPE-nM8A_cXObIdZvZ-PY77im6eBzKrdyD6qpABBbtgO2Y4-oELA`;
const THUMB_BODY_B = `${T}AB6AXuBP6Tsk8sNh36hQNxcWtba9GACXKlzali8EiX0RQQZbbmslfPbjxv8N2tE6HaB_D1Gf2kTope4TadaOqA0adJ4unQBBKvcurw7JATuYo8ocwsQ--ks_AUEzL5KEXB-sRG2xA1yQs6uKqzQbZ0a4bwmqiTXkIvMH4LHW0NOVIGFn12iA9xFTJ--jcaWSfOIpz3GfKF_oXEs_bJ91xGBCZKZnaI5BGw-Nk8kCcBdWbYXsDL_kSjdSaYqS4Q`;
const THUMB_RESULTS_B = `${T}AB6AXuBfBuTJg-w1WMgT_yb-Z6L1TxYxRQ0b4HuDzIZRHms9V3LhCuF4hEzhYnANZo27yfIsbtg9rwyshNpFHRY1q3Jpt08jPRmea1yKzJdy9FYAc06KphyaG4tDMU9gQ432Wa0g7HXQ-IeOwIOH69kM4nUBQze9ASlLZCFo-0r83ES6bnsNSgBj_1eyuC8lFLm1o9uzei6DdZ2y4zxlBcLrmGc83FafOOnX7o7A4ZaE0SJShAqKXM8E7mU-2A`;
const THUMB_SAFETY_B = `${T}AB6AXuAKaQOGoWvWOJhgzyBLBGDzKNUTtluGVGA-OofRsXvoAW7Cy6WJnmeYj2kqVWy643MMlA0dvECce1Y0HbiqRYJ1qhDg605YdMgBcDVjV6Y3GA59lUlDqbGlBG6zC3G1FCB-RzMwhIsdriOoatpng15BuO7-baBO3KJjhd49ToL5F90co1mpM4UTfH8-j4G6LVuQZv8fwMweZdbH5uX0efMMWI9unspX1tGy9iMZ0-OjIalBImLtMEaT3Q`;
const THUMB_QA_B = `${T}AB6AXuAXiRCAlswWGxdPcd45fBs-vz-q0bgTPfqI8brkCAPQf6hjlq_OZDf15u-Qw9SYp5GWUaSUIHgFe6RLZjY33e0ZAWfO3DunBxU5Hobc0_hBVR_v0T_x9M5L58VOtFkcrurvxQI4gXnETtxEQpFdNStdkhm7NSRMJi_Nh6F3L_S3tSK0MKAv-tL8xuLzPqRLjcE9uZm9xQF4uBH90gD_s2MHrACRQi5tcwa0dieeY3lbFvjoClW33FNTvA`;
const THUMB_PATIENT_STORIES_HERO =
  "https://lh3.googleusercontent.com/aida/AP1WRLs7JGqjVEkh-UYy-fHLzZvDwKy_VFdbH9qjvgO1_FDrKAhZpW-rqaQqsINVDbsYtpu2lJI9APGpbFpS0UQwAqiFZSyQq-_hYBlLoI3058MDrhqo4NcZC124V6PcMw6Q654UjCwkTnSigmTh18nJbNZ0bv_pR7dCGqeyUqkALVX6gDKybS7OxdA3txiLgqxGBKrhGN0CSignxOf3E_kHZ6YtMm7djV13AorO4s-1Ik7GiTfWRv6XI1YcnL4";

export const videos: Video[] = [
  // --- Educational videos (Videos page) ---
  {
    id: "meet-dr-ahmed",
    title: { en: "Meet Dr. Ahmed Gamal", ar: "تعرف على الدكتور أحمد جمال" },
    category: { en: "Introduction", ar: "تعريفي" },
    thumbnail: THUMB_INTRO,
    aspect: "9:16",
  },
  {
    id: "clinic-tour",
    title: { en: "A Tour of Our Elite Clinic", ar: "جولة داخل عيادتنا الفاخرة" },
    category: { en: "Facility", ar: "المنشأة" },
    thumbnail: THUMB_CLINIC,
    aspect: "9:16",
  },
  {
    id: "patient-journey",
    title: { en: "The Patient Journey", ar: "رحلة المريض" },
    category: { en: "Experience", ar: "التجربة" },
    thumbnail: THUMB_JOURNEY,
    aspect: "9:16",
  },
  {
    id: "first-visit",
    title: { en: "What to Expect During Your First Visit", ar: "ماذا تتوقع في زيارتك الأولى" },
    category: { en: "Consultation", ar: "الاستشارة" },
    thumbnail: THUMB_FIRST_VISIT,
    aspect: "9:16",
  },
  {
    id: "facial-harmony",
    title: { en: "Understanding Facial Harmony & Angles", ar: "فهم تناسق ملامح الوجه وزواياه" },
    category: { en: "Rhinoplasty", ar: "تجميل الأنف" },
    thumbnail: THUMB_HARMONY,
    aspect: "9:16",
  },
  {
    id: "steps-before-procedure",
    title: { en: "Essential Steps Before Your Procedure", ar: "خطوات أساسية قبل إجراء عمليتك" },
    category: { en: "Preparation", ar: "التحضير" },
    thumbnail: THUMB_STEPS,
    aspect: "9:16",
  },
  {
    id: "preparing-for-surgery",
    title: { en: "Preparing for Plastic Surgery", ar: "التحضير لجراحة التجميل" },
    category: { en: "Preparation", ar: "التحضير" },
    thumbnail: THUMB_PREP_A,
    aspect: "9:16",
  },
  {
    id: "recovery-after-surgery",
    title: { en: "Recovery After Surgery", ar: "التعافي بعد الجراحة" },
    category: { en: "Recovery", ar: "التعافي" },
    thumbnail: THUMB_RECOVERY_B,
    aspect: "9:16",
  },
  {
    id: "body-contouring-explained",
    title: { en: "Body Contouring Explained", ar: "شرح نحت الجسم" },
    category: { en: "Body", ar: "الجسم" },
    thumbnail: THUMB_ARTISTRY,
    aspect: "9:16",
  },
  {
    id: "natural-looking-results",
    title: { en: "How to Achieve Natural-Looking Results", ar: "كيف تحصل على نتائج طبيعية المظهر" },
    category: { en: "Artistry", ar: "الحرفية الفنية" },
    thumbnail: THUMB_RESULTS_B,
    aspect: "9:16",
  },
  {
    id: "plastic-surgery-safety",
    title: { en: "Plastic Surgery Safety", ar: "سلامة جراحات التجميل" },
    category: { en: "Safety", ar: "السلامة" },
    thumbnail: THUMB_SAFETY,
    aspect: "9:16",
  },
  {
    id: "common-patient-questions",
    title: { en: "Common Patient Questions", ar: "أسئلة شائعة من المرضى" },
    category: { en: "FAQ", ar: "الأسئلة الشائعة" },
    thumbnail: THUMB_QA,
    aspect: "9:16",
  },

  // --- Patient story videos (Patient Stories page) ---
  {
    id: "story-nour-rhinoplasty",
    title: { en: "Nour's Rhinoplasty Journey", ar: "رحلة نور مع تجميل الأنف" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_QA_B,
    aspect: "9:16",
  },
  {
    id: "story-mariam-facelift",
    title: { en: "Mariam's Facelift Journey", ar: "رحلة مريم مع شد الوجه" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_RESULTS_B,
    aspect: "9:16",
  },
  {
    id: "story-yasmin-body-contouring",
    title: { en: "Yasmin's Body Contouring Journey", ar: "رحلة ياسمين مع نحت الجسم" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_BODY_B,
    aspect: "9:16",
  },
  {
    id: "story-farida-rhinoplasty",
    title: { en: "Farida's Rhinoplasty Journey", ar: "رحلة فريدة مع تجميل الأنف" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_SAFETY_B,
    aspect: "9:16",
  },
  {
    id: "story-salma-breast-augmentation",
    title: { en: "Salma's Breast Augmentation Journey", ar: "رحلة سلمى مع تكبير الثدي" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_PATIENT_STORIES_HERO,
    aspect: "9:16",
  },
  {
    id: "story-heba-tummy-tuck",
    title: { en: "Heba's Tummy Tuck Journey", ar: "رحلة هبة مع شد البطن" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_INTRO,
    aspect: "9:16",
  },
  {
    id: "story-layla-rhinoplasty",
    title: { en: "Layla's Rhinoplasty Journey", ar: "رحلة ليلى مع تجميل الأنف" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_CLINIC,
    aspect: "9:16",
  },
  {
    id: "story-mona-facial-rejuvenation",
    title: { en: "Mona's Facial Rejuvenation Journey", ar: "رحلة منى مع تجديد نضارة الوجه" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_JOURNEY,
    aspect: "9:16",
  },
  {
    id: "story-rania-transformation",
    title: { en: "Rania's Transformation Journey", ar: "رحلة رانيا مع التحول الكامل" },
    category: { en: "Patient Story", ar: "قصة مريضة" },
    thumbnail: THUMB_FIRST_VISIT,
    aspect: "9:16",
  },
];
