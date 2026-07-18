/**
 * faqs.ts — Policies & FAQ content (docs/CONTENT.md).
 *
 * IMPORTANT: Every policy here is UNCONFIRMED. Recommended defaults are drafted
 * but must render with visible 【CONFIRM】 tokens and must NOT be presented as
 * final. The `confirm` array marks which fragments render as CONFIRM tokens.
 * (See docs/CONFIRM.md.)
 */

export type Faq = {
  id: string;
  question: string;
  /** Answer split into parts; `confirm: true` parts render as visible 【CONFIRM】 tokens. */
  answer: { text: string; confirm?: boolean }[];
  teaser?: boolean; // surfaces in the Home FAQ teaser
};

export const faqs: Faq[] = [
  {
    id: "consultations",
    question: "Do I need a consultation?",
    answer: [
      {
        text: "New or complex? Book a $25 loc consultation first so we plan the right service.",
      },
    ],
    teaser: true,
  },
  {
    id: "new-clients",
    question: "Am I a new client?",
    answer: [
      { text: "Please book under the \"New Client\" services so I schedule enough time. Unsure of your loc size or count? Book a consultation instead of guessing." },
    ],
    teaser: true,
  },
  {
    id: "deposits",
    question: "Do I need a deposit?",
    answer: [
      {
        text: "A deposit holds your appointment and applies to your total. You'll see the amount when you book.",
      },
    ],
    teaser: true,
  },
  {
    id: "cancellation",
    question: "What's the cancellation / reschedule policy?",
    answer: [
      { text: "Please give " },
      { text: "48", confirm: true },
      { text: " hours' notice. Late cancellations / no-shows may forfeit the deposit. " },
      { text: "Exact window pending owner confirmation", confirm: true },
      { text: "" },
    ],
  },
  {
    id: "after-hours",
    question: "Do you offer after-hours or off-day appointments?",
    answer: [
      { text: "Friday evenings and off-day appointments are available for retwist only (no braids / styles) at the posted after-hours rate. Call to schedule." },
    ],
  },
  {
    id: "returning",
    question: "I haven't maintained my locs in 6+ months — what should I book?",
    answer: [
      { text: "An additional fee applies for locs not maintained in 6+ months, due to extra detangling / detox time. Book \"Returning After 6+ Months\" or a consultation." },
    ],
  },
  {
    id: "prep",
    question: "How should I prep for my appointment?",
    answer: [
      { text: "Come with hair " },
      { text: "washed & dry / as booked — prep varies per service", confirm: true },
      { text: ". Add a shampoo service if you need it." },
    ],
  },
  {
    id: "how-long",
    question: "How long will my appointment take?",
    answer: [
      { text: "Each service lists a duration, from a 30-minute consultation to full-day installs. You'll see the estimate when you book, and I never rush your hair." },
    ],
    teaser: true,
  },
];

export const teaserFaqs = faqs.filter((f) => f.teaser).slice(0, 3);
