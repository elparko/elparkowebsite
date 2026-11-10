// Pre-answered questions for the home search. When a visitor's question is close in meaning to one of an
// entry's `questions`, and its words appear in the entry, the search shows the entry's `answer` above the
// matching pages. Otherwise it offers up to three entries as questions the visitor can pick. Answers are
// written here and only here; nothing is generated. `held_out` phrasings are not indexed; the tests use them
// to check matching on wording the index has not seen. An entry with an empty answer is skipped until it is
// filled in. Links are page slugs from lib/pages.mjs. After editing, run `npm run embed`.
export const ANSWERS = [

  // About Parker (answers Parker gave in chat)
  {
    "id": "specialty-interest",
    "questions": [
      "What specialty is Parker interested in?",
      "What kind of doctor does he want to be?",
      "What field of medicine are you going into?",
      "Is Parker interested in ENT?",
      "What residency is he applying to?",
      "specialty interest"
    ],
    "held_out": [
      "Which medical specialty does Parker want to pursue?",
      "Does he want to be a surgeon, and in what?"
    ],
    "answer": "Parker is interested in otolaryngology. His research includes diet and chronic rhinosinusitis in the Rom Lab at LSU Health Shreveport and AI in facial reconstruction and rhinoplasty planning with the VUMC Department of Otolaryngology.",
    "links": [
      "cv",
      "crswnp-keto-research"
    ]
  },
  {
    "id": "hobbies",
    "questions": [
      "What does Parker do for fun?",
      "What are your hobbies?",
      "What does he do outside of medicine?",
      "What does Parker like to build?",
      "Parker hobbies",
      "What are his side projects?"
    ],
    "held_out": [
      "How does Parker spend his free time?",
      "Does he have any hobbies besides school?"
    ],
    "answer": "Parker builds things for his house and for himself: a sauna built by hand, a smart mirror made from a used fitness mirror and a Raspberry Pi, a voice assistant that runs on his own server, and software tools such as fa-reader for First Aid. He also keeps a log of the books he reads.",
    "links": [
      "tools",
      "sauna-build",
      "books"
    ]
  },

  // School, positions and the CV
  {
    "id": "who-is-parker",
    "questions": [
      "Who is Parker Smith?",
      "Who are you?",
      "Tell me about Parker",
      "What does Parker do?",
      "who is he",
      "Parker Smith bio"
    ],
    "held_out": [
      "Can you give me a quick introduction to the person behind this site?",
      "What is Parker's deal?"
    ],
    "answer": "Parker Smith is a medical student who builds things. He is in the MD class of 2029 at LSU Health Shreveport and is the founder of Pereste Health.",
    "links": [
      "cv",
      "pereste-health"
    ]
  },
  {
    "id": "medical-school-year",
    "questions": [
      "What year of medical school is Parker in?",
      "What medical school do you go to?",
      "Where does Parker attend medical school?",
      "When does Parker graduate from medical school?",
      "What is his MD class year?",
      "LSU Health Shreveport class of 2029"
    ],
    "held_out": [
      "Which school is Parker getting his MD from, and when will he finish?",
      "What is his expected graduation year?"
    ],
    "answer": "Parker is in the MD program at LSU Health Shreveport, class of 2029. He began there in 2025.",
    "links": [
      "cv"
    ]
  },
  {
    "id": "undergraduate-degree",
    "questions": [
      "Where did Parker go to undergrad?",
      "What was your undergraduate degree?",
      "What did Parker major in?",
      "Where did he get his bachelor's degree?",
      "BS biological sciences UC Irvine",
      "When did Parker graduate from college?"
    ],
    "held_out": [
      "What college degree does he have before medical school?",
      "Did you study biology as an undergraduate, and where?"
    ],
    "answer": "Parker earned a BS in Biological Sciences from the University of California, Irvine, in 2023.",
    "links": [
      "cv"
    ]
  },
  {
    "id": "past-schools",
    "questions": [
      "What schools has Parker attended?",
      "Where did you go to college before UC Irvine?",
      "Did Parker go to the University of Michigan?",
      "Did he attend Moorpark College?",
      "List Parker's colleges and universities"
    ],
    "held_out": [
      "What is Parker's full educational background?",
      "Which institutions did he study at before medical school?"
    ],
    "answer": "Parker attended the University of Michigan in 2018 to 2019, Moorpark College from 2019 to 2021, and the University of California, Irvine, where he finished a BS in Biological Sciences in 2023. He now attends LSU Health Shreveport for his MD.",
    "links": [
      "cv"
    ]
  },
  {
    "id": "past-jobs",
    "questions": [
      "What jobs has Parker had?",
      "What was your work experience before medical school?",
      "Did Parker work in dermatology?",
      "Parker's employment history",
      "What did he do at Franklin Dermatology Group?",
      "Mohs surgery dermatology tech"
    ],
    "held_out": [
      "Has he worked in a clinic before?",
      "What did Parker do for work between college and med school?"
    ],
    "answer": "From 2023 to 2025 Parker worked as a dermatology tech in Mohs surgery at Franklin Dermatology Group. Before that he did research as a Beckman Scholar at UC Irvine (2021 to 2023) and as a research assistant in the Zhao Lab at LSU Health Sciences Center Shreveport (2017 to 2018).",
    "links": [
      "cv"
    ]
  },
  {
    "id": "beckman-scholar",
    "questions": [
      "Was Parker a Beckman Scholar?",
      "Beckman Scholar UC Irvine",
      "What undergraduate research did Parker do?",
      "Where did he do research as an undergraduate?",
      "Benavente Lab"
    ],
    "held_out": [
      "Did he have an undergraduate research fellowship?",
      "Which lab did Parker work in at UC Irvine?"
    ],
    "answer": "Parker was a Beckman Scholar in the Benavente Lab at UC Irvine from 2021 to 2023.",
    "links": [
      "cv"
    ]
  },
  {
    "id": "current-research",
    "questions": [
      "What research is Parker doing right now?",
      "What are you currently working on?",
      "Current research projects",
      "What is Parker working on at Vanderbilt?",
      "Is he doing research in otolaryngology?",
      "Parker ongoing research 2026"
    ],
    "held_out": [
      "What projects is he involved in at the moment?",
      "Does Parker do any head and neck cancer research?"
    ],
    "answer": "In 2026 Parker is building SMILE-MSI, an open-source tool for mass spectrometry imaging, with the Garcia Lab at Vanderbilt University Medical Center. He also has projects on AI in facial reconstruction and rhinoplasty planning with the VUMC Department of Otolaryngology, on discharge disposition after free flap reconstruction for head and neck cancer using Epic Cosmos data, and on the readability, quality, and sources of web information on late effects of head and neck cancer. At LSU Health Shreveport he studies diet and chronic rhinosinusitis in a mouse model in the Rom Lab.",
    "links": [
      "cv",
      "smile-msi",
      "crswnp-keto-research"
    ]
  },
  {
    "id": "awards-and-honors",
    "questions": [
      "Has Parker won any awards?",
      "What awards does he have?",
      "Did Parker win the Epic Cosmos Datathon?",
      "AΩA research fellowship",
      "What honors has Parker received?",
      "Parker Smith awards and fellowships"
    ],
    "held_out": [
      "Has he placed in any competitions?",
      "Is he a research fellow of any society?"
    ],
    "answer": "Parker won first place at the Epic Cosmos Datathon at LSU Health Shreveport in September 2026, for work on social and clinical determinants of discharge disposition after free flap reconstruction for head and neck cancer. He is also an AΩA Carolyn L. Kuckein Research Fellow, working on diet and chronic rhinosinusitis in the Rom Lab.",
    "links": [
      "cv",
      "crswnp-keto-research"
    ]
  },
  {
    "id": "presentations-talks",
    "questions": [
      "Has Parker given any talks or presentations?",
      "Did you present at the AAO-HNSF Annual Meeting?",
      "Parker oral presentation",
      "What conferences has he presented at?",
      "Did he give a talk at Otolaryngology Research Day?",
      "Parker's journal club presentations"
    ],
    "held_out": [
      "Where has he spoken publicly?",
      "Has he presented his research at a national meeting?"
    ],
    "answer": "Parker gave an oral presentation at the AAO-HNSF Annual Meeting on October 18, 2026, titled \"Dietary Modulation of Type 2 Inflammation and Olfaction in a Murine Model of CRSwNP.\" He also presented it at Otolaryngology Research Day at LSU Health Shreveport in June 2026, gave a journal club for the Plastic Surgery Interest Group in February 2026, and was a guest speaker for Swamp Medics at Captain Shreve High School in February 2026.",
    "links": [
      "cv",
      "crswnp-keto-research"
    ]
  },
  {
    "id": "publications",
    "questions": [
      "Has Parker published any papers?",
      "What are Parker's publications?",
      "Does he have a publication in Proteomics?",
      "retinoblastoma UHRF1 preprint",
      "Parker Smith publications list",
      "Is Parker an author on a paper about the gracilis free flap?"
    ],
    "held_out": [
      "Which papers has he co-authored?",
      "Does Parker have anything in a journal or on bioRxiv?"
    ],
    "answer": "Parker's CV lists three items: a 2026 manuscript on mapping the neuromuscular junctions of the gracilis free flap (under review), a 2025 bioRxiv preprint on UHRF1 in retinoblastoma, and a 2018 paper in Proteomics on which he is third author.",
    "links": [
      "cv"
    ]
  },
  {
    "id": "leadership-and-service",
    "questions": [
      "What leadership roles has Parker held?",
      "Does Parker do volunteer work?",
      "Did Parker start a club at UCI?",
      "Is Parker involved in service or tutoring?",
      "Pre-Med Day Chair SHIP",
      "Parker extracurriculars and volunteering"
    ],
    "held_out": [
      "Has he started any student organizations?",
      "What community service does he do?"
    ],
    "answer": "Parker is Pre-Med Day Chair for SHIP (Support for Humanitarianism through Intercontinental Projects) and a volunteer tutor at the Renzi Center, both since 2025. He founded and was president of The Migraine Club at UCI from 2021 to 2023, and from 2023 to 2025 he volunteered and maintained the website for Beyond Fistula.",
    "links": [
      "cv"
    ]
  },
  {
    "id": "first-research-job",
    "questions": [
      "When did Parker start doing research?",
      "What was Parker's first research position?",
      "Zhao Lab LSU Health Sciences Center Shreveport",
      "Earliest research experience",
      "How long has Parker been doing research?"
    ],
    "held_out": [
      "What research did he do before college?",
      "What lab did he first work in?"
    ],
    "answer": "Parker's earliest listed research position is as a research assistant in the Zhao Lab at LSU Health Sciences Center Shreveport, from 2017 to 2018.",
    "links": [
      "cv"
    ]
  },

  // Pereste Health
  {
    "id": "what-is-pereste-health",
    "questions": [
      "What is Pereste Health?",
      "What does Pereste Health do?",
      "Tell me about Parker's company",
      "What is Pereste?",
      "What company does Parker run and what is it for?",
      "Pereste Health company overview",
      "What is the startup Parker is working on?"
    ],
    "held_out": [
      "Can you explain what Pereste Health is about?",
      "Does Parker have a startup, and what does it do?"
    ],
    "answer": "Pereste Health is a venture bringing AI to healthcare, focused on health literacy and on helping patients understand their own care. Parker founded it in March 2026.",
    "links": [
      "pereste-health",
      "cv"
    ]
  },
  {
    "id": "pereste-founder",
    "questions": [
      "Who founded Pereste Health?",
      "Who started Pereste Health?",
      "Is Parker the founder of Pereste Health?",
      "What is Parker's role at Pereste Health?",
      "What is your role at Pereste Health?",
      "Pereste Health founder"
    ],
    "held_out": [
      "Who is behind Pereste Health?",
      "Is Parker one of the people who started Pereste?"
    ],
    "answer": "Parker is the founder of Pereste Health. His CV lists the role as starting in 2026, with no end date.",
    "links": [
      "cv",
      "pereste-health"
    ]
  },
  {
    "id": "pereste-founding-date",
    "questions": [
      "When was Pereste Health founded?",
      "When did Parker start Pereste Health?",
      "When did you start your company?",
      "How old is Pereste Health?",
      "Pereste Health founding date",
      "What year did Parker found his health startup?"
    ],
    "held_out": [
      "How long has Pereste Health existed?",
      "When did the company begin?"
    ],
    "answer": "Parker founded Pereste Health in March 2026. The first code, a patient literacy system grounded in a medical knowledge base, followed on April 18, 2026.",
    "links": [
      "pereste-health"
    ]
  },
  {
    "id": "pereste-health-literacy-focus",
    "questions": [
      "Why does Pereste Health focus on health literacy?",
      "What is Pereste Health's focus on health literacy?",
      "Does Pereste Health work on patient education?",
      "Pereste Health plain language reading level",
      "What does Parker mean by AI for health literacy?"
    ],
    "held_out": [
      "How does Parker's company want to help people understand their care?",
      "What reading skill is Pereste Health trying to improve?"
    ],
    "answer": "Pereste Health focuses on health literacy, with the aim of helping patients understand their own care. It is building AI tools designed to explain health information at the reader's literacy level.",
    "links": [
      "pereste-health",
      "cv"
    ]
  },
  {
    "id": "pereste-what-is-built",
    "questions": [
      "What has Pereste Health built so far?",
      "What products is Pereste Health making?",
      "Does Pereste Health have an app?",
      "Is there a Pereste Health iOS or Android app?",
      "Pereste Health apps and website",
      "What has Parker built for Pereste Health?"
    ],
    "held_out": [
      "Which apps has Pereste Health started developing?",
      "Which platforms is Pereste Health's software built for?"
    ],
    "answer": "Pereste Health started a website and an iOS app in May 2026, then began an Android app and an app for clinician oversight in June 2026. The first code, from April 18, 2026, was a patient literacy system grounded in a medical knowledge base.",
    "links": [
      "pereste-health"
    ]
  },
  {
    "id": "pereste-guardrail-safety-model",
    "questions": [
      "Does Pereste Health have a safety guardrail?",
      "How does Pereste Health handle AI-generated medical advice?",
      "Is Pereste Health training a safety model?",
      "What is Pereste Health's guardrail against medical advice?",
      "Pereste Health AI safety"
    ],
    "held_out": [
      "What does Pereste Health do to keep AI from giving medical advice?",
      "Has Parker's company designed any safety measures for its AI?"
    ],
    "answer": "In June 2026, Pereste Health designed a guardrail against AI-generated medical advice and started training a safety model for it.",
    "links": [
      "pereste-health"
    ]
  },
  {
    "id": "pereste-status",
    "questions": [
      "What stage is Pereste Health at?",
      "Is Pereste Health launched yet?",
      "What is the status of Pereste Health?",
      "Is Pereste Health a finished product?",
      "Pereste Health current status",
      "How far along is Pereste Health?"
    ],
    "held_out": [
      "Is Pereste Health live or still in development?",
      "Where does Pereste Health stand today?"
    ],
    "answer": "The site marks Pereste Health as in progress. Parker founded it in March 2026, and its website and apps were started from May 2026 onward.",
    "links": [
      "pereste-health"
    ]
  },
  {
    "id": "pereste-website",
    "questions": [
      "What is the Pereste Health website?",
      "Pereste Health website address",
      "Where do I find Pereste Health online?",
      "Does Pereste Health have a website?",
      "pereste.com"
    ],
    "held_out": [
      "Where on the internet is Pereste Health?",
      "What is the web address for Parker's company?"
    ],
    "answer": "Pereste Health is online at pereste.com. Its page on this site gives a short description of the venture, and Parker started the company website in May 2026.",
    "links": [
      "pereste-health"
    ]
  },

  // Circumstance-sensitive triage
  {
    "id": "triage-what-is-it",
    "questions": [
      "What is the circumstance-sensitive triage research?",
      "What does Parker's rural triage study ask?",
      "Does telling a chatbot about my life change its emergency advice?",
      "What did you study about small chat models and rural patients?",
      "Research on how one sentence about a patient's life changes chatbot advice",
      "What is the rural patients 911 chatbot study about?",
      "circumstance-sensitive triage"
    ],
    "held_out": [
      "Explain Parker's research on chatbots and emergency advice for rural patients",
      "Do AI models give different urgent care advice depending on personal circumstances?"
    ],
    "answer": "This is a preliminary research note by Parker Smith, written 27 October 2026 and updated 28 October 2026. It tests how one added sentence about an older rural patient's life, such as having no health insurance or a far hospital, changes the emergency advice from two small open chat models. The note is shared to invite scrutiny and is not medical advice.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-models-used",
    "questions": [
      "Which AI models were tested in the triage study?",
      "What models did Parker use for the rural triage research?",
      "Which chat models were used?",
      "Qwen Gemma Haiku triage models",
      "What models did you test for emergency advice?",
      "Were large models tested too or only small ones?"
    ],
    "held_out": [
      "Which language models were compared in the 911 advice experiment?",
      "Did the study include a commercial model like Claude?"
    ],
    "answer": "The study used two small open chat models, each with 4 billion parameters: Qwen3.5-4B and Gemma-3-4b-it. Both run locally. It also ran Claude Haiku 5.5, a larger commercial model, on the same 192 messages through Claude Code, a coding tool rather than a plain chat interface.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-no-insurance-finding",
    "questions": [
      "What happens when a patient tells the chatbot they have no insurance?",
      "Does saying you have no health insurance change a chatbot's 911 advice?",
      "Does the model stop saying call 911 if the patient is uninsured?",
      "no insurance sentence call 911 Qwen Gemma",
      "What was the main finding about the no-insurance sentence?",
      "Do small models tell uninsured stroke patients to get to the ER on their own?"
    ],
    "held_out": [
      "If a patient says money is tight, will the AI still tell them to call an ambulance?",
      "How much did the no-insurance sentence reduce emergency 911 instructions?"
    ],
    "answer": "With the sentence \"I don't have health insurance and money is very tight right now\", Qwen's emergency replies that tell the patient to go to the emergency room (ER) on their own rise from 0 to 6.5 of 16, the mean of the two readers (7 and 6). On Gemma, replies that say to call emergency medical services (EMS) fall from 14 of 16 to 8 of 16, and 3 of 16 say to wait at home. The page calls these results preliminary, based on author-written messages coded by two artificial intelligence (AI) readers.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-distance",
    "questions": [
      "Does hospital distance change what the chatbot says in an emergency?",
      "Do models say call 911 less when the hospital is far away?",
      "What happens when the nearest hospital is hours away?",
      "distance to hospital 911 chatbot",
      "How does distance to the hospital affect the model's emergency advice?"
    ],
    "held_out": [
      "If I live four hours from a hospital, will a small AI model tell me to call 911?",
      "Effect of rural distance on triage advice from language models"
    ],
    "answer": "In the tests the nearest hospital was 30 minutes to four hours away. As that distance grows, both Qwen and Gemma say call 911 less often in emergency cases, and Gemma's drop is steeper. On routine complaints the same sentences raise false alarms, and the page notes that an ambulance is the one thing that solves distance.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-claude-haiku",
    "questions": [
      "How did Claude Haiku do in the triage study?",
      "Did the larger commercial model keep saying call 911?",
      "Claude Haiku 5.5 triage result",
      "Did Haiku change its emergency advice when patients mentioned cost?",
      "Does Haiku mention EMTALA?"
    ],
    "held_out": [
      "Did the bigger AI hold up better than the small ones when the patient had no money?",
      "What did the Claude model do differently under the no-insurance sentence?"
    ],
    "answer": "Claude Haiku 5.5, a larger commercial model, kept \"call 911\" as its first advice in 15 of 16 emergency replies under the no-insurance sentence and in 16 of 16 under the other sentences, while the small models fell to a mean of 9.5 of 16 (Qwen) and 8 of 16 (Gemma) under that sentence. Under the no-insurance sentence, its replies talk about cost in 15 of 16 emergency cases, and they cite the Emergency Medical Treatment and Labor Act (EMTALA), the federal law that requires emergency screening regardless of ability to pay. The replies came through a coding tool, so absolute rates depend on that tool.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-routine-false-alarms",
    "questions": [
      "Do these sentences also cause false alarms on routine complaints?",
      "Does the chatbot over-triage minor problems when a patient mentions barriers?",
      "Does a sentence about the patient's life make a minor complaint seem urgent?",
      "false alarm routine complaint 911 chatbot",
      "Why does the triage page talk about false alarms?"
    ],
    "held_out": [
      "Can added life details make an AI tell someone with a rash to call 911?",
      "Does the model get more alarmed about minor issues when the patient adds personal context?"
    ],
    "answer": "Yes. On routine complaints the right first answer is not call 911, and sentences about the patient's life push the model toward call 911 anyway, which the page calls a false alarm. The page says the error runs both ways: the model is less likely to say call 911 on an emergency and more likely to say it on a routine complaint. Across 40 sentences about a patient's life in 25 families, all 25 families raise that lean by 1.0 log-odds (a unit of how strongly the model leans toward one answer) on average.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-reluctance-caregiver",
    "questions": [
      "Does a patient saying they do not want to make a fuss change the advice?",
      "What did reluctance sentences do to the chatbot's emergency advice?",
      "Does \"probably just my age\" lower the 911 advice?",
      "caregiver voice message urgency rating",
      "Does it matter if a family member types the message?",
      "What happens when someone writes on behalf of a patient?"
    ],
    "held_out": [
      "If a patient sounds reluctant to seek help, does the AI soften its advice?",
      "Do models rate urgency higher when a relative writes the message?"
    ],
    "answer": "On Qwen, sentences like \"Probably just my age\", \"I'm not one to make a fuss\" and \"I'll talk it over with my son\" lower the first instruction in emergencies: 8 to 10 of 16 replies open with \"call 911\", against 13 of 16 with a neutral sentence. A message typed by a family member gets a higher urgency rating (High or Low) than the same words from the patient, which is the largest single effect on the model's urgency answer. The page says this needs its own study.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-fixes",
    "questions": [
      "Did the triage study test any fixes?",
      "How can you fix a chatbot that says call 911 less often?",
      "Does a system prompt restore the emergency advice?",
      "triage fix system line false alarms",
      "What fixes were tried and what did they cost in false alarms?",
      "Did a fine-tuned fix work?",
      "Is there a fix that works only when the no-insurance sentence is present?"
    ],
    "held_out": [
      "Can a one-line instruction stop a model from lowering emergency advice for poor patients?",
      "What are the tradeoffs of the fixes for small models in the rural triage research?"
    ],
    "answer": "A one-line system instruction to decide from the symptoms alone restored \"call 911\" in 16 of 16 emergency replies, but sent 39 of 128 same-day cases to 911 or the emergency room. A softer system line stopped those same-day alarms but opened only 73 of 96 emergency replies with \"call 911\", and a fine-tuned add-on that copies the first system line sent 50 of 80 held-out same-day cases to 911 (9 of 80 before fine-tuning). A fix that subtracts the no-insurance push, but only when a switch turns on after the model reads that sentence, restored 3 of the 7 emergency replies that sentence had moved, sent no routine replies to 911, and works only for that sentence.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-inside-model",
    "questions": [
      "What did the study find inside the model?",
      "Are there neurons that respond to rural life facts?",
      "Can you switch off the neurons that read no-insurance sentences?",
      "Qwen units housing loss money strain",
      "Does switching off units change the chatbot's advice?",
      "Is the advice change one switch inside the model?"
    ],
    "held_out": [
      "Did the researchers find where the model stores the effect of a sentence about insurance?",
      "What did the mechanistic part of the triage research show?"
    ],
    "answer": "Some single units (individual neurons) inside Qwen3.5-4B respond to facts such as housing loss, money strain, who pays for care, no insurance coverage and living alone. One patient sentence drives each unit to 10 to 30 times its normal level. Switching those units off changed nothing compared with random units, but part of the advice change follows one direction in the model's internal state, which the page calls a lead for a real fix.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-method",
    "questions": [
      "How was the triage study done?",
      "What scenarios did Parker write for the chatbot test?",
      "How many scenarios were in the triage research?",
      "How were the replies scored?",
      "What is the weather sentence control?"
    ],
    "held_out": [
      "Explain the design of the rural triage experiment",
      "Who coded the model replies and how well did they agree?"
    ],
    "answer": "Parker wrote 32 scenarios, 16 textbook emergencies and 16 clearly routine complaints, plus 16 same-day cases that need care today. The messages are written in the voice of patients aged 65 to 88 with chronic illness, and each extra sentence is paired with a weather sentence of the same length as a control. Two independent artificial intelligence (AI) readers coded the first concrete advice in each free reply, with agreement (Cohen's kappa, a score that removes chance agreement) of 0.77 to 1.0, and the page also reads the model's next-word probabilities.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-limits-status",
    "questions": [
      "What are the limitations of the triage study?",
      "Has a clinician checked the triage replies?",
      "Is this study finished?",
      "What is the status of the rural triage research?",
      "Can I trust these triage results?"
    ],
    "held_out": [
      "What does the triage research not show?",
      "Is the triage note a final paper or preliminary work?"
    ],
    "answer": "The page calls itself a preliminary research note, shared to invite scrutiny. It uses two 4-billion-parameter models and one larger commercial model run through a coding tool, with author-written patient messages and replies coded by AI readers. No clinician has labeled a case, and the planned next steps are clinician labels on a four-level scale with harm ratings, the same test on larger local models, and on larger commercial models through a plain API.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "triage-why-it-matters",
    "questions": [
      "Why does this research matter for rural patients?",
      "What is the goal of the circumstance-sensitive triage work?",
      "Why study chatbots for older rural patients with heart failure?",
      "What does Parker want chatbots to do for rural patients?",
      "Who is affected by this triage finding?"
    ],
    "held_out": [
      "What should a health chatbot do for a woman with heart failure four hours from a hospital?",
      "Why do the results matter for health chatbot testing?"
    ],
    "answer": "Older people in rural areas with heart failure, chronic obstructive pulmonary disease (COPD), diabetes or kidney disease already ask chatbots what to do, and they say what is true for them, such as that the hospital is far or money is tight. The study finds that those sentences change the advice. Its stated aim is that a rural patient gets the same first instruction as a patient who lives next door to a hospital, in words that fit her life.",
    "links": [
      "circumstance-sensitive-triage"
    ]
  },

  // Education, not advice, and the proofs
  {
    "id": "education-not-advice-plain-words",
    "questions": [
      "Can the model explain things in plain words?",
      "Did Parker make the model use simpler language?",
      "What is the plain-words direction?",
      "How do you lower the reading level of the model's answers?",
      "plain words reading grade layer 16",
      "Does the edit make answers easier to read?"
    ],
    "held_out": [
      "Is there a way to make the chatbot write at a lower reading level?",
      "Did the research try to simplify the model's explanations for patients?"
    ],
    "answer": "A second direction at layer 16, fitted on replies the model wrote when asked for plain words, lowers the reading grade of its explanations from 8.4 to 4.8 with no instruction, the same as asking for plain words outright. On its own it made advice more personal and weakened the 911 answer on some emergencies, but on top of the switch at half strength it kept the same 45 of 48 emergencies answered with 911 first and lowered the reading grade of the changed replies from 9.9 to 6.6.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-overview",
    "questions": [
      "What is the education-not-advice project?",
      "What is Parker's education-not-advice research?",
      "What is the education-not-advice study about?",
      "Can a chat model be changed to explain medicine without giving personal medical advice?",
      "Did Parker change a chat model so it explains medicine but stops giving personal advice?"
    ],
    "held_out": [
      "Has Parker worked on stopping language models from giving personal health advice?",
      "Is there a study on making an AI teach medicine instead of telling patients what to do?"
    ],
    "answer": "Education, not advice is a preliminary research note from 3 November 2026 by Parker Smith. It describes a change inside a small chat model that makes it explain medicine but stop giving personal advice, while a person who describes stroke symptoms still hears \"call 911\" first.",
    "links": [
      "education-not-advice",
      "circumstance-sensitive-triage"
    ]
  },
  {
    "id": "education-not-advice-model",
    "questions": [
      "Which model did Parker use in the education-not-advice study?",
      "What AI model was edited in the education-not-advice research?",
      "What chat model does the education-not-advice page test?",
      "Did Parker use GPT or Claude for the advice edit, or an open model?",
      "How big is the model in the education-not-advice note?"
    ],
    "held_out": [
      "Which open-weights language model was the medical advice edit tested on?",
      "How many parameters does the model in the education note have?"
    ],
    "answer": "The study uses one open chat model with 4 billion parameters, Qwen3.5-4B. The prompts were written by the author, Parker Smith.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-how-it-works",
    "questions": [
      "How does the education-not-advice edit work?",
      "What is the switch and push in Parker's chat model edit?",
      "What is the advice direction in the education-not-advice study?",
      "What two checks open the switch in the education-not-advice edit?",
      "How is the education-not-advice edit built inside the model?"
    ],
    "held_out": [
      "What happens inside the model when someone asks for personal medical advice?",
      "Is the edit a retrained model or a small add-on?"
    ],
    "answer": "At layer 16 of 32, the edit reads the model's running summary of a message and scores it along an advice direction, the difference between the average summaries of 30 personal advice requests and 50 education questions. A switch opens only when the score leans toward advice and the message does not look like an emergency, and then a push subtracts that direction. The whole change is a 52 kilobyte file that runs alongside the unchanged model.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-results",
    "questions": [
      "Did the education-not-advice edit work?",
      "What were the results of the education-not-advice study?",
      "How often did the model still give personal advice after the edit?",
      "How many replies were individualized advice before and after the change?",
      "What did Parker find in the advice-versus-education experiment?"
    ],
    "held_out": [
      "By how much did the edit reduce personal medical advice in the chat model?",
      "What share of routine-case replies still gave individualized advice after the change?"
    ],
    "answer": "Two readers coded 12 of 16 routine-case replies as individualized advice for the unchanged model and 2 of 16 for the changed model. For the 118 messages that were not asking for personal advice, the changed model wrote exactly the same words as the unchanged model. These are preliminary results from one model.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-emergency",
    "questions": [
      "Does the education-not-advice edit still tell people to call 911?",
      "What happens to emergencies like stroke under the advice edit?",
      "Does the change affect the model's emergency answer?",
      "Is the emergency answer kept when the model stops giving advice?",
      "Would the edited model still say to call 911 for stroke symptoms?",
      "Why is the emergency answer safe in Parker's edit?"
    ],
    "held_out": [
      "If someone describes an emergency, does the changed model still tell them to call 911?",
      "Does the advice-removal switch ever fire on an emergency?"
    ],
    "answer": "The model's one-word answer to \"should this person call 911 right now?\" was identical with and without the change on 24 emergency messages, and on 24 more written afterwards in new wording. In these tests the switch never opened on any of the 48 emergencies, so the change did not touch the emergency reply.",
    "links": [
      "education-not-advice",
      "proofs-for-the-edit"
    ]
  },
  {
    "id": "education-not-advice-testing",
    "questions": [
      "Who graded the model's answers in the education-not-advice study?",
      "Were doctors involved in grading the edited chat model?",
      "Were the answers checked by clinicians?",
      "How were the replies graded in the education-not-advice study?",
      "Did the study use human graders or AI graders?"
    ],
    "held_out": [
      "Who judged whether the replies counted as advice or education?",
      "Did a clinician review the study's replies?"
    ],
    "answer": "Pairs of independent artificial intelligence readers coded the replies without knowing which version of the model wrote each one, using prompts written by the author. The edit was run on 238 messages, plus 96 more written to break the switch. No clinician labels exist yet, and the note says so.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-permanent-failure",
    "questions": [
      "Why did the permanent version of the edit fail?",
      "What happened when Parker removed the advice direction from the model for good?",
      "Did the version with no switch work?",
      "What went wrong with the permanent removal of the advice direction?",
      "Did removing the advice direction for good keep the 911 answer?"
    ],
    "held_out": [
      "What was the negative result in the education-not-advice note?",
      "Did the permanent version of the advice edit still name 911 for emergencies?"
    ],
    "answer": "Removing the advice direction from every place the model writes into its working memory produced a model with no switch, and that version failed. Replies that name 911 on the first line fell from 20 to 3 of 24 emergencies, and the model lectured a stroke patient about stroke. The note reports this version as a failure.",
    "links": [
      "education-not-advice",
      "proofs-for-the-edit"
    ]
  },
  {
    "id": "education-not-advice-costs",
    "questions": [
      "What are the downsides of the education-not-advice edit?",
      "Does the changed model make things up?",
      "Does the edited model still tell people to see a doctor?",
      "Did the edit cost the model its referral to a doctor?",
      "What did the edit cost the model?"
    ],
    "held_out": [
      "Are there side effects when the model is pushed to explain instead of advise?",
      "Does the edit remove the advice to contact a healthcare provider?"
    ],
    "answer": "When the change pushes the model to explain a case it was asked to judge, replies with a false statement rose from 0 to 7 of 16 routine cases in the first reader panel. Replies naming a doctor, clinic, provider or emergency service fell from 34 of 36 unchanged replies to 2 of 36 replies changed without a fixed first sentence. The final version starts each changed reply with a fixed sentence that names a clinician, but that sentence is not counted as the model's words; in the model's own words, 3 of 36 changed replies name a clinician.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-red-team",
    "questions": [
      "Did Parker try to trick the education-not-advice switch?",
      "What is the break-the-switch test?",
      "Could an emergency slip past the safety check in the advice edit?",
      "How many messages were used to try to fool the switch?",
      "Were disguised emergencies tested against the edit?"
    ],
    "held_out": [
      "Was the switch tested with emergencies hidden inside an education question?",
      "How robust is the emergency check against tricky wording?"
    ],
    "answer": "Parker wrote 96 messages in ten families meant to fool the switch. No emergency opened it: 0 of 8 phrased as minor, 0 of 8 buried inside an education question, and 0 of 32 with a sentence about money or transport in front. The unchanged model is itself uneven on those emergencies, naming 911 first in only 1 of 8 when the emergency is buried in a lesson, and the edit neither helps nor hurts there.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "education-not-advice-limits",
    "questions": [
      "What are the limits of the education-not-advice study?",
      "Is the education-not-advice edit ready for patients?",
      "Is the education-not-advice page medical advice?",
      "What does the education-not-advice research not show?",
      "Has the education-not-advice result been tested on other models?"
    ],
    "held_out": [
      "How much should a reader trust the education-not-advice results?",
      "What are the caveats of the advice-removal experiment?"
    ],
    "answer": "The page is a preliminary research note shared to invite scrutiny, and it states it is not medical advice. It tests one model at one layer, the readers are language models rather than clinicians, and zero emergencies opening the switch bounds the miss rate at a few percent, not at zero. Planned next steps are a clinician read of the false-statement notes, the same switch on a second model family, and a comparison with simply prompting the model to explain and never advise.",
    "links": [
      "education-not-advice"
    ]
  },
  {
    "id": "proofs-for-the-edit-overview",
    "questions": [
      "What is the proofs-for-the-edit page?",
      "What did Parker prove in Lean about the education-not-advice edit?",
      "How many theorems are in the Lean proofs?",
      "Which proof assistant did Parker use?",
      "Are there formal proofs behind the education-not-advice edit?"
    ],
    "held_out": [
      "Were the education-not-advice edit's guarantees checked with a theorem prover?",
      "Which parts of the education-not-advice edit did the Lean theorems cover?"
    ],
    "answer": "Proofs for the edit presents eleven theorems written in Lean 4 and checked against the Mathlib library. They state exactly what the education-not-advice edit guarantees, in four claims: removing a direction leaves nothing along it, a guarded direction leaves emergency coordinates alone, that guarantee holds at every layer depth, and a shut switch changes nothing.",
    "links": [
      "proofs-for-the-edit",
      "education-not-advice"
    ]
  },
  {
    "id": "proofs-guarantee-and-gap",
    "questions": [
      "What do the Lean proofs guarantee about the edit?",
      "If the proofs held, why did the permanent version still break the 911 answer?",
      "What was the guarantee in the permanent version of the edit?",
      "Do the proofs show the edit is safe?",
      "Why was the proved guarantee not enough?"
    ],
    "held_out": [
      "Can a proof of the math guarantee how a chat model behaves on new messages?",
      "Was the emergency signal actually preserved in the permanent edit?"
    ],
    "answer": "The permanent version kept every emergency coordinate unchanged at every layer, to within rounding, exactly as proved, yet the call-911 answer still broke, because that answer is not read off those coordinates. The proofs found no mistake in the edit and could not have found the reason it failed, so they fix the meaning of \"protected by construction\" without showing how the model behaves. They cannot say how the program behaves on messages it has not seen, and the switch version's safety rests on the one-line fact that a shut switch changes nothing.",
    "links": [
      "proofs-for-the-edit",
      "education-not-advice"
    ]
  },
  {
    "id": "proofs-check-the-source",
    "questions": [
      "Can I check the Lean proofs myself?",
      "Where is the Lean source for the education-not-advice proofs?",
      "Where can I read the proofs in full?",
      "How long are the Lean proofs?",
      "How long does it take to build the Lean proofs?"
    ],
    "held_out": [
      "Are the proofs written out in a document I can read?",
      "How large is the formal verification project behind the edit?"
    ],
    "answer": "The Lean source is 120 lines, kept in the interp-lab repository rather than on this site, and a reader who knows Lean can check every step in about three minutes of build time. The statements and proofs are also typeset in a four-page PDF linked from the page. The page also lists measurements of how closely the saved edit meets the theorems' hypotheses.",
    "links": [
      "proofs-for-the-edit"
    ]
  },

  // SMILE-MSI and open-slx
  {
    "id": "smile-msi-what-is",
    "questions": [
      "What is SMILE-MSI?",
      "What does SMILE-MSI stand for?",
      "What is Parker's SMILE-MSI project?",
      "Can you explain what your SMILE-MSI tool is?",
      "What does SMILE-MSI do with mass spec imaging data?",
      "Is SMILE-MSI a web service or a desktop program?"
    ],
    "held_out": [
      "Tell me about the lipid imaging desktop app Parker built",
      "What kind of software is SMILE-MSI and what is it for?"
    ],
    "answer": "SMILE-MSI (Spatial Mass Imaging of Lipid Environments) is an open-source, fully local desktop workspace that turns raw mass spectrometry imaging data into annotated, statistically defensible maps of tissue lipids. It needs no code, no cloud upload and no proprietary software.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-why-built",
    "questions": [
      "Why was SMILE-MSI created?",
      "Why did Parker build SMILE-MSI?",
      "What problem does SMILE-MSI solve?",
      "What gap in mass spec imaging workflows does your tool fill?",
      "Why build a lipid imaging tool for researchers who do not code?",
      "Who is SMILE-MSI for?"
    ],
    "held_out": [
      "What was wrong with existing ways to analyze MSI data?",
      "Is SMILE-MSI meant for programmers or bench scientists?"
    ],
    "answer": "SMILE-MSI exists to close a workflow gap for wet-lab researchers who are not programmers. Going from a raw file to an annotated list of discriminating lipids normally means chaining several tools, often behind a commercial license or a web upload, and SMILE-MSI packages load, explore, find structure, compare, identify and report into one locally installed application.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-features",
    "questions": [
      "What are the features of SMILE-MSI?",
      "What analysis steps does SMILE-MSI include?",
      "Does SMILE-MSI do segmentation, PCA or UMAP?",
      "Can the tool make ion images and RGB overlays?",
      "Does SMILE-MSI compute statistics for regions?",
      "What does the SMILE-MSI workflow cover from raw file to report?"
    ],
    "held_out": [
      "How does SMILE-MSI export results and reports?",
      "Which clustering and statistics methods are built into Parker's imaging software?"
    ],
    "answer": "SMILE-MSI loads imzML data, the open imzML standard for imaging mass spectrometry, and renders interactive ion images (an image of one m/z value) with normalization and three-channel RGB overlays. It runs preprocessing (baseline correction, smoothing, lock-mass recalibration), finds structure with peak picking, k-means, spatially aware segmentation, principal component analysis (PCA), non-negative matrix factorization (NMF) and UMAP, computes region statistics (area under the ROC curve, Mann-Whitney p-values, Benjamini-Hochberg false discovery rate), and exports ion images, Excel reports and a multi-page PDF data book.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-install",
    "questions": [
      "How do I install SMILE-MSI?",
      "Where can I download SMILE-MSI?",
      "Does SMILE-MSI run on Windows and Mac?",
      "Do I need Python to run SMILE-MSI?",
      "Is there a pre-built version of Parker's SMILE-MSI app?"
    ],
    "held_out": [
      "Can I use SMILE-MSI without setting up a programming environment?",
      "What platforms does the lipid imaging app support?"
    ],
    "answer": "SMILE-MSI has pre-built Windows and macOS bundles that need no Python. They are published automatically to GitHub Releases on each version tag, and the source code is also on GitHub.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-license-open-source",
    "questions": [
      "Is SMILE-MSI open source?",
      "What license is SMILE-MSI under?",
      "Can I see the SMILE-MSI source code?",
      "Was SMILE-MSI's code copied from other tools?",
      "Where are the algorithm references for SMILE-MSI?"
    ],
    "held_out": [
      "Can I reuse or modify Parker's mass spec imaging code?",
      "Why is SMILE-MSI's license Apache-2.0 rather than something else?"
    ],
    "answer": "SMILE-MSI is open source under the Apache-2.0 license, and the source is on GitHub. Every quantitative method is reimplemented from its primary publication rather than ported from an existing tool, which keeps the codebase cleanly Apache-2.0 licensed. A METHODS.md file maps each algorithm to its source with DOIs (digital object identifiers).",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-data-formats",
    "questions": [
      "What file formats does SMILE-MSI read?",
      "Does SMILE-MSI open imzML files?",
      "Can SMILE-MSI handle datasets larger than my RAM?",
      "Does the tool upload my data anywhere or work offline?",
      "What data does your lipid imaging tool accept?"
    ],
    "held_out": [
      "Will large mass spec imaging files crash SMILE-MSI on a small computer?",
      "Does SMILE-MSI need an internet connection?"
    ],
    "answer": "SMILE-MSI loads open-standard imzML/ibd data with a lazy, out-of-core backend. A chunked, compressed cube cache keeps ion images interactive while memory stays flat, so datasets larger than RAM remain workable on a laptop. The tool runs entirely on the user's machine, with no cloud upload and no network connection required.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-lipid-annotation",
    "questions": [
      "How does SMILE-MSI identify lipids?",
      "What lipid database does SMILE-MSI use?",
      "Does SMILE-MSI estimate a false discovery rate for lipid IDs?",
      "Can SMILE-MSI confirm identities with MS/MS?",
      "How reliable are the lipid identifications in Parker's tool?"
    ],
    "held_out": [
      "Where do the candidate lipid masses come from?",
      "Does the software give a confidence level for each lipid assignment?"
    ],
    "answer": "SMILE-MSI assigns a putative (tentative) lipid identity to every detected feature, giving a best ID plus alternatives, adduct and isotope corroboration, a confidence label, and a target-decoy false discovery rate (FDR) estimate. The lipid database is generated in silico by enumerating sum compositions from class backbone formulas, so there is no external database file. Optional MS/MS (tandem mass spectrometry) confirmation uses an importable spectral library.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-python-reproducibility",
    "questions": [
      "Can I script SMILE-MSI with Python?",
      "Does SMILE-MSI have a Python library?",
      "Is analysis in SMILE-MSI reproducible?",
      "Does SMILE-MSI generate a methods report?",
      "What technology is SMILE-MSI built with?",
      "Can SMILE-MSI replay an analysis from a saved flow?"
    ],
    "held_out": [
      "Is there a scripting console or API in Parker's imaging software?",
      "How does the app record provenance for an analysis?"
    ],
    "answer": "SMILE-MSI is both a point-and-click desktop app, built with PySide6 and pyqtgraph, and an importable Python engine (import smile_msi). Its numeric core uses NumPy, SciPy, scikit-learn and pandas. One registry of analysis steps backs the graphical interface, an in-app Python script console and a declarative, replayable flow format, and versioned analysis profiles with a random seed produce provenance and methods reports.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "smile-msi-status-timeline",
    "questions": [
      "What is the current status of SMILE-MSI?",
      "When was SMILE-MSI released?",
      "What version is SMILE-MSI?",
      "When did Parker start building SMILE-MSI?",
      "Has a paper been written about SMILE-MSI?",
      "Is SMILE-MSI publicly available yet?"
    ],
    "held_out": [
      "How long has the lipid imaging project existed?",
      "Was SMILE-MSI submitted to a journal?"
    ],
    "answer": "SMILE-MSI began on 2026-06-10 as a script that matches masses to lipids, reached v1.0.0 on 2026-06-18, and became v2.0.0 on 2026-07-10 with one linear workflow from raw file to report. The latest version on the site is v2.0.0. It was first released publicly on GitHub on 2026-07-14, a paper for the Journal of Open Source Software was drafted on 2026-06-21, and its status on the site is in progress.",
    "links": [
      "smile-msi"
    ]
  },
  {
    "id": "open-slx-what-is",
    "questions": [
      "What is open-slx?",
      "What does open-slx do?",
      "Can I open SCiLS Lab projects without SCiLS Lab?",
      "Is there a tool to export SCiLS projects without a licence key?",
      "Why did Parker write open-slx?"
    ],
    "held_out": [
      "How can I use my Bruker SCiLS data in other imaging tools?",
      "Is there a way to read .slx files outside of SCiLS?"
    ],
    "answer": "open-slx converts SCiLS Lab mass spectrometry imaging projects to imzML, the open format that other imaging tools read, and it needs no SCiLS Lab and no licence key. Parker wrote it because other tools cannot open SCiLS Lab projects and he wanted to use his data in them.",
    "links": [
      "open-slx"
    ]
  },
  {
    "id": "open-slx-how-to-run",
    "questions": [
      "How do I install open-slx?",
      "How do I run open-slx?",
      "How do I convert SCiLS Lab files to imzML?",
      "What files do I need for open-slx?",
      "Do I need the .sbd file as well as the .slx file?",
      "Do I need the original Bruker .d folder?"
    ],
    "held_out": [
      "What is the command line usage for the SCiLS to imzML converter?",
      "Which files from my SCiLS project must be in the same folder?"
    ],
    "answer": "Install open-slx with uv, a Python installer, by running uv tool install git+https://github.com/elparko/open-slx. Then run open-slx PROJECT.slx -o OUT. open-slx needs both PROJECT.slx (the project settings) and PROJECT.sbd (the spectra, often several gigabytes) in one folder, and it does not need the original Bruker .d folder.",
    "links": [
      "open-slx"
    ]
  },
  {
    "id": "open-slx-outputs",
    "questions": [
      "What does open-slx produce?",
      "What output files does open-slx create?",
      "Does open-slx change my original SCiLS files?",
      "What happens if my SCiLS project has more than one raster?",
      "Which SCiLS versions and data types does open-slx support?",
      "Does open-slx read centroid or profile data?"
    ],
    "held_out": [
      "What do I get after converting a project with open-slx?",
      "Will my original .slx and .sbd files be modified?"
    ],
    "answer": "open-slx writes OUT.imzML and OUT.ibd, which must be kept together, plus OUT_features.csv (the project's feature list) and OUT_metadata.json (the project metadata). A project with more than one raster (one scanned area of tissue) gets one imzML pair for each, named OUT_r00, OUT_r01 and so on. It never changes the input files, and it reads only SCiLS Lab 14 files with centroid data, stopping with an error and writing no imzML for anything else.",
    "links": [
      "open-slx"
    ]
  },
  {
    "id": "open-slx-testing-limits",
    "questions": [
      "How well is open-slx tested?",
      "Has open-slx been validated?",
      "Does open-slx work on Windows or Linux?",
      "Which tools can open the files open-slx produces?",
      "Does open-slx work with M2aia, Cardinal or METASPACE?",
      "Can open-slx convert timsTOF projects?"
    ],
    "held_out": [
      "What has and has not been checked for the SCiLS converter?",
      "Is the open-slx output accurate compared with SCiLS?"
    ],
    "answer": "open-slx was tested on macOS with Apple silicon, on 300 spots of a public SCiLS Lab 14 dataset (Zenodo 21251439), where the Python reader pyimzML opens the output. An automated test converts 200 spots, and the total ion count of each spot matches the value SCiLS stored within 0.01 percent. Full-size conversions, resampled timsTOF projects, Linux and Windows were not tested, and M2aia, Cardinal and METASPACE are expected to open the output but have not been tested.",
    "links": [
      "open-slx"
    ]
  },
  {
    "id": "open-slx-license-credits",
    "questions": [
      "What license is open-slx under?",
      "Is open-slx open source?",
      "Is open-slx affiliated with Bruker?",
      "Did open-slx copy code from slx2imzml?",
      "Who made the test data for open-slx?",
      "How was the SCiLS file format figured out?"
    ],
    "held_out": [
      "Does Bruker endorse the open-slx converter?",
      "Where did the open-slx test dataset come from?"
    ],
    "answer": "open-slx is open source under the MIT licence. It was first released on GitHub on 2026-10-14, the same day Parker decoded the SCiLS .slx and .sbd formats from public data. It is not affiliated with or endorsed by Bruker. open-slx has no code from slx2imzml, a similar tool from CeMOS (Center for Mass Spectrometry and Optical Spectroscopy, Mannheim University of Applied Sciences), which Parker used to learn what an export contains. Its test data is Zenodo record 21251439 (CC BY 4.0) from the RomicsProcessor project of PNNL (Pacific Northwest National Laboratory).",
    "links": [
      "open-slx"
    ]
  },

  // Diet and sinusitis research, Mohs Map, MohsWoundCare
  {
    "id": "keto-sinusitis-study",
    "questions": [
      "What is Parker's ketogenic diet research?",
      "Does a ketogenic diet reduce sinus inflammation?",
      "keto diet chronic rhinosinusitis nasal polyps research",
      "What is the CRSwNP keto study about?",
      "Is Parker researching whether keto helps nasal polyps?",
      "What does your keto research investigate?"
    ],
    "held_out": [
      "Can eating a keto diet help with sinus disease, according to Parker's work?",
      "What question is the sinus inflammation and diet project trying to answer?"
    ],
    "answer": "Parker's ongoing research asks whether ketogenic diets can reduce inflammation in chronic rhinosinusitis with nasal polyps (CRSwNP). It uses a mouse model to compare the metabolic and inflammatory effects of different dietary interventions.",
    "links": [
      "crswnp-keto-research"
    ]
  },
  {
    "id": "keto-study-model",
    "questions": [
      "What animal model does the keto sinusitis study use?",
      "Are you studying keto in mice or in people?",
      "Is the ketogenic diet nasal polyp research done in humans?",
      "Does Parker's keto research use mice?",
      "mouse model keto diet sinus inflammation",
      "keto nasal polyps mice"
    ],
    "held_out": [
      "Were human patients enrolled in the diet and nasal polyps project?",
      "What experimental system is used to test diets for sinus inflammation?"
    ],
    "answer": "The study uses a mouse model of chronic rhinosinusitis with nasal polyps. It compares the metabolic and inflammatory effects of different dietary interventions, with ketogenic diets as the focus. The page describes no human participants.",
    "links": [
      "crswnp-keto-research"
    ]
  },
  {
    "id": "keto-study-status",
    "questions": [
      "Is the keto sinusitis research finished?",
      "What is the status of Parker's CRSwNP diet study?",
      "Does the keto nasal polyp study have results yet?",
      "Is the keto research still ongoing?",
      "Is Parker's keto study still in progress?",
      "keto CRSwNP research status"
    ],
    "held_out": [
      "Are there findings from the diet and nasal polyps project yet?",
      "Is that sinus diet study done or still running?"
    ],
    "answer": "The ketogenic diet and CRSwNP study is ongoing, and the site lists its status as in progress. The page describes no findings.",
    "links": [
      "crswnp-keto-research"
    ]
  },
  {
    "id": "keto-study-lab",
    "questions": [
      "Which lab does Parker do his sinus research in?",
      "Where does Parker do his keto and nasal polyps research?",
      "Is Parker in the Rom Lab?",
      "Which research lab is Parker in for his keto study?",
      "Rom Lab LSU Health Shreveport"
    ],
    "held_out": [
      "Which research group at LSU Health Shreveport does Parker work with?",
      "Since when has he been in that lab?"
    ],
    "answer": "Parker joined the Rom Lab at LSU Health Shreveport in November 2025. The site's log for his ketogenic diet and CRSwNP study starts with that date.",
    "links": [
      "crswnp-keto-research",
      "cv"
    ]
  },
  {
    "id": "keto-study-smell-testing",
    "questions": [
      "How does the keto study test smell in mice?",
      "Does Parker's research measure olfaction?",
      "Did the sinus diet study test sense of smell?",
      "buried food pellet test smell testing",
      "Was smell tested in the keto nasal polyp study?"
    ],
    "held_out": [
      "What olfactory test was used in his mouse experiments?",
      "Has the study measured the sense of smell in animals?"
    ],
    "answer": "The study's log records smell testing with a buried food pellet test, dated March 2026. The page does not report results from it.",
    "links": [
      "crswnp-keto-research"
    ]
  },
  {
    "id": "keto-study-fellowship",
    "questions": [
      "Did Parker apply for a research fellowship?",
      "Was Parker nominated for the AΩA Carolyn L. Kuckein Student Research Fellowship?",
      "Is Parker LSU Health Shreveport's nominee for an AΩA fellowship?",
      "AΩA Kuckein student research fellowship",
      "Did Parker get the AΩA Kuckein fellowship?"
    ],
    "held_out": [
      "Has he been put forward for a student research award?",
      "Did LSU Health Shreveport nominate him for a student research fellowship?"
    ],
    "answer": "In January 2026 Parker applied for the AΩA Carolyn L. Kuckein Student Research Fellowship as LSU Health Shreveport's nominee. The site records that he was named a Kuckein Research Fellow in May 2026.",
    "links": [
      "crswnp-keto-research",
      "cv"
    ]
  },
  {
    "id": "mohs-map-artwork",
    "questions": [
      "What is the Mohs Map?",
      "Mohs Map artwork",
      "Tell me about the Mohs Map art piece",
      "What is the Mohs Map artwork about?",
      "Is there art on the site about Mohs surgery?"
    ],
    "held_out": [
      "Is there an illustration on the site related to dermatology?",
      "Does the site show any artwork connected to skin surgery?"
    ],
    "answer": "Mohs Map is an artwork on Parker's site. Its title and listing keywords point to Mohs surgery and dermatology, and the site lists it as finished and dated 2024.",
    "links": [
      "art-feature"
    ]
  },
  {
    "id": "mohs-map-ex-vivo",
    "questions": [
      "Where was the Mohs Map featured?",
      "Was the Mohs Map published in a magazine?",
      "Which magazine featured the Mohs Map?",
      "Hippocratic Collective Ex Vivo feature",
      "Hippocratic Collective magazine inaugural issue"
    ],
    "held_out": [
      "Did any magazine run the Mohs Map?",
      "In which issue did the Mohs Map appear?"
    ],
    "answer": "The Mohs Map artwork was featured in the inaugural issue of Ex Vivo, the magazine of Hippocratic Collective, in 2025.",
    "links": [
      "art-feature"
    ]
  },
  {
    "id": "mohswoundcare-what",
    "questions": [
      "What is MohsWoundCare?",
      "What is mohswoundcare.com?",
      "MohsWoundCare website",
      "Where can patients learn how to care for a wound after Mohs surgery?",
      "Is there a guide to wound care and recovery after Mohs surgery?"
    ],
    "held_out": [
      "Is there a patient resource on healing after Mohs surgery?",
      "What does the Mohs wound care site cover?"
    ],
    "answer": "MohsWoundCare is a guide to wound care and recovery after Mohs surgery. The site lists it as an external link with a creation date of May 9, 2025.",
    "links": [
      "https://mohswoundcare.com"
    ]
  },

  // Tools, the house, the sauna and books
  {
    "id": "fa-reader",
    "questions": [
      "What is fa-reader?",
      "What is fa-reader, the Mac app Parker built?",
      "What PDF reader did Parker make for First Aid?",
      "Does Parker have an app for annotating First Aid for USMLE Step 1?",
      "Is there a Mac app for highlighting PDF textbooks that doesn't modify the PDF?",
      "fa-reader Mac app"
    ],
    "held_out": [
      "Which app does Parker use to study from his Step 1 textbook on his Mac?",
      "Where can I find the source code for the First Aid annotation app?"
    ],
    "answer": "fa-reader is a Mac app Parker built for reading and annotating PDF textbooks, made for First Aid for USMLE Step 1. It never writes to the PDF: highlights and notes live in a folder next to each book and sync between Macs through iCloud. The first working version took one day, and the source is on GitHub.",
    "links": [
      "tools"
    ]
  },
  {
    "id": "quill-math-pcalc",
    "questions": [
      "What is pcalc?",
      "What is Quill Math?",
      "Does Parker have a LaTeX calculator app?",
      "Is there a Mac math scratchpad with graphing that Parker made?",
      "Does Quill Math collect any data or need an account?",
      "LaTeX math scratchpad Mac app",
      "What did you build for doing math with LaTeX on a Mac?"
    ],
    "held_out": [
      "Which Mac calculator did Parker build that graphs equations?",
      "Is Parker's math app private, with no analytics?"
    ],
    "answer": "Quill Math, listed on the tools page as pcalc, is a LaTeX math scratchpad and calculator for the Mac, with graphing. It is a Tauri app, a framework for building desktop apps from web code, that stores documents locally, with no account, no analytics, and no network data collection.",
    "links": [
      "tools"
    ]
  },
  {
    "id": "writing-program",
    "questions": [
      "What is Parker's writing program?",
      "What writing app did Parker build?",
      "How does the writing program use a language model without letting it write?",
      "Does the AI write Parker's text?",
      "Which tool does Parker use to clean up dictated drafts?",
      "writing program local language model"
    ],
    "held_out": [
      "Can the model in Parker's writing app add or change words?",
      "Where do the links in Parker's edited writing come from?"
    ],
    "answer": "The writing program is a plain writing app for one Mac, started October 3, 2026. Parker types or dictates a rough draft, and a local language model follows one paragraph behind the cursor, removing filler words, fixing spelling and punctuation, and attaching links. A check in code throws away any change that adds, swaps, or reorders a word, and link addresses come only from his clipboard or a real lookup.",
    "links": [
      "tools",
      "about-this-site"
    ]
  },
  {
    "id": "thermostat-cost-saver",
    "questions": [
      "What is the thermostat cost saver?",
      "How does Parker save money on air conditioning?",
      "How much did the thermostat change save?",
      "What temperature does Parker keep the house at when he sleeps?",
      "thermostat automation rules",
      "Did you build something to lower your electric bill?"
    ],
    "held_out": [
      "How much does raising the AC setpoint from 72 to 74 reduce runtime?",
      "What does the home thermostat do when nobody is home?"
    ],
    "answer": "The thermostat cost saver sets the room as far from comfort as it can whenever nobody would feel it, then brings it back in time. Comfort is 76°F in summer, and while Parker sleeps the thermostat holds the house 4°F warmer (80°F), 2°F warmer when he is out for a few hours, and 6°F warmer when he is away 8 hours or more. Moving the thermostat setting from 72°F to 74°F cut the share of time the air conditioner ran from about 80% to about 50%, worth roughly $2 to $3 a day in August.",
    "links": [
      "tools"
    ]
  },
  {
    "id": "menu-bar-app",
    "questions": [
      "What is Parker's Mac menu bar app?",
      "Can Parker control his lights and thermostat from his Mac?",
      "What does the menu bar app control?",
      "Mac menu bar app for lights, alarm, bed and thermostats",
      "How do you dim your lights from your computer?",
      "Is there a menu bar controller for the house?"
    ],
    "held_out": [
      "Which app lets Parker turn on lamps and change the bed from the Mac's top bar?",
      "What is the one bar per room in Parker's menu bar app?"
    ],
    "answer": "The Mac menu bar app controls the lights, the alarm, the bed, and the thermostats from Parker's Mac. One bar per room is both the switch and the dimmer. It was started October 2, 2026.",
    "links": [
      "tools"
    ]
  },
  {
    "id": "mirror-what-it-is",
    "questions": [
      "What is Parker's mirror project?",
      "What is the smart mirror Parker built?",
      "What does the mirror display show?",
      "Did Parker turn a fitness mirror into a smart mirror?",
      "What does your house mirror show besides your reflection?",
      "What can the mirror show about sleep and weather?"
    ],
    "held_out": [
      "Is there a display in Parker's house that shows the clock, calendar and weather behind glass?",
      "What are the animated backgrounds on the mirror?"
    ],
    "answer": "The mirror is a used fitness mirror that Parker gutted and rebuilt as a display for the house. It shows a large clock and date, tonight's sleep plan, the alarm, last night's sleep score, today's agenda beside a month calendar, and the weather with the next four hours. The middle stays empty so it still works as a mirror, and the animated backgrounds include the real sky overhead, drawn from a star catalog with the current moon phase, an ink-in-water fluid simulation, and an aurora.",
    "links": [
      "mirror"
    ]
  },
  {
    "id": "mirror-hardware",
    "questions": [
      "What hardware is inside Parker's mirror?",
      "How much did the mirror build cost?",
      "Which fitness mirror did Parker convert?",
      "What computer runs the smart mirror?",
      "Does the mirror have a camera or microphone?",
      "mirror build parts list Raspberry Pi 5 LVDS",
      "How is the mirror display driven after removing the Android board?"
    ],
    "held_out": [
      "What was the cost of parts for the home display?",
      "Why does the mirror have no microphone?"
    ],
    "answer": "The mirror started as a 2019 Mirror Model One fitness mirror, a 40-inch 1080p LCD behind two-way glass, with its locked Android board cut out. A generic LVDS (low-voltage differential signaling) controller board drives the panel, and a Raspberry Pi 5 inside the case feeds it over HDMI, for about $200 in parts. There is no microphone or camera, because the factory mic board carried only an I2C (two-wire control) bus and an analog line, so a separate device handles voice.",
    "links": [
      "mirror",
      "voice-assistant"
    ]
  },
  {
    "id": "mirror-screen-rules",
    "questions": [
      "How does the mirror decide when to turn on?",
      "Why doesn't the mirror light up while someone is asleep?",
      "What happens if the mirror loses its server?",
      "How does the mirror talk to the home server?",
      "Does the Pi in the mirror run custom code?",
      "mirror on/off rules"
    ],
    "held_out": [
      "Which rule wins first when the mirror screen is deciding whether to be on?",
      "How often does the mirror check in with the server?"
    ],
    "answer": "One small, tested function on the server decides whether the screen is on, and the first matching rule wins: AirPlay playing, a manual override, the sunrise alarm, nobody home, stale bed data, or someone in bed. The rules exist so the screen never lights while someone is asleep, after a 3 a.m. bathroom trip, or because the server restarted. The Pi runs only a kiosk browser and a small agent, which asks the server what to show every 5 seconds and reports back every 30; the server never connects to the Pi, and if the server disappears for 10 minutes, the mirror shows a \"no server\" note.",
    "links": [
      "mirror"
    ]
  },
  {
    "id": "voice-assistant-overview",
    "questions": [
      "What is Parker's voice assistant?",
      "What can the house voice assistant do?",
      "Which devices can the voice assistant control?",
      "How does the voice assistant hear and answer?",
      "self-hosted voice assistant",
      "What do you say to undo a wrong voice command?"
    ],
    "held_out": [
      "Can Parker ask his house how he slept?",
      "Does Parker's voice assistant work through Siri or a phone app?"
    ],
    "answer": "The voice assistant runs on Parker's own server: a small speaker hears the wake word, the server works out what he meant, and it answers out loud. It controls thermostats, lamps, curtains, the bed's temperature, the mirror, timers, and alarms, and it answers how he slept, gives a morning briefing, and reads the weather and calendar. \"Flag that\" marks a wrong action, \"undo\" reverses it, and it also works through Siri and a hold-to-talk button in his phone app.",
    "links": [
      "voice-assistant"
    ]
  },
  {
    "id": "voice-assistant-stack",
    "questions": [
      "What speech to text does Parker's voice assistant use?",
      "How does the voice assistant decide what a command means?",
      "What text to speech does the voice assistant use?",
      "Does the voice assistant use Home Assistant?",
      "How fast is speech recognition on the house assistant?",
      "faster-whisper Kokoro classifier Claude Haiku",
      "What models run the home voice assistant?"
    ],
    "held_out": [
      "Which language model handles commands the classifier can't place?",
      "How were mishearings of house words fixed in the transcription?"
    ],
    "answer": "Speech to text is faster-whisper (a fast build of the Whisper speech recognition model) on an M2 Max, and a short prompt listing the words the house uses fixed most mishearings, so \"set the lights to 100 percent brightness\" comes back correct in about 400 milliseconds. Speech out is Kokoro, a text-to-speech model. For commands, fixed rules go first, then a small classifier trained on this house's own commands, and Claude Haiku takes anything the classifier can't place; Home Assistant itself is not in the loop.",
    "links": [
      "voice-assistant"
    ]
  },
  {
    "id": "classifier-vs-local-llm",
    "questions": [
      "Why did Parker replace the local language model with a classifier?",
      "How well did qwen3:8b work as a voice assistant?",
      "How fast is the voice assistant's classifier?",
      "What went wrong with the local language model for smart home commands?",
      "Did the local model ever act on background noise?",
      "local language model versus classifier for voice commands",
      "How many real commands did you test the local model on?"
    ],
    "held_out": [
      "What was the median response time of the local model for house commands?",
      "Why use a small trained classifier instead of an 8B model for home control?"
    ],
    "answer": "For a month a local language model, qwen3:8b (an 8-billion-parameter model), handled whatever the rules didn't. Over 304 real commands it took a median of 5.8 seconds, got 13 of 41 requests with a value wrong, claimed 7 actions that never ran, and acted on background noise 6 times, once turning the bed off. The classifier answers in about 33 milliseconds.",
    "links": [
      "voice-assistant"
    ]
  },
  {
    "id": "wake-word-training",
    "questions": [
      "How did Parker train a custom wake word?",
      "What happened with the custom wake word?",
      "What is the elparko wake word?",
      "How much did it cost to train the wake word?",
      "What false trigger rate did the custom wake word have?",
      "microWakeWord training results",
      "Why did you go back to the stock wake word?"
    ],
    "held_out": [
      "What are the criteria for the elparko wake word to replace the stock one?",
      "Was the trained wake word better than the stock one in the room?"
    ],
    "answer": "The first custom wake word was trained with microWakeWord (a wake-word training tool) on 20,000 synthetic clips across 5 spellings, for 30,000 steps on a rented GPU that cost $0.70. At its strictest cutoff it measured 0.375 false triggers per hour on a recorded dinner-party dataset, with 90.7% recall, but that recall was measured on synthetic voices, and in the room it misfired more than the stock wake word, so the stock word went back on. The planned \"elparko\" wake word replaces it only if it measures at most 0.2 false triggers per hour and at least 95% recall.",
    "links": [
      "voice-assistant"
    ]
  },
  {
    "id": "sauna-build",
    "questions": [
      "Did Parker build a sauna?",
      "Who built Parker's sauna?",
      "What is the sauna build page?",
      "Did he build the sauna himself?",
      "DIY sauna build photos",
      "When did Parker build his sauna?"
    ],
    "held_out": [
      "Is there a homemade sauna among Parker's builds?",
      "How does the sauna look inside and out?"
    ],
    "answer": "Yes. Parker built a sauna by hand in January 2026, and the build page has photos of the wall frames, the cedar-paneled walls going up, the exterior, and the inside under red light. The page describes it as not pretty, but hot.",
    "links": [
      "sauna-build"
    ]
  },
  {
    "id": "books-reading-now",
    "questions": [
      "What is Parker reading right now?",
      "What books is Parker currently reading?",
      "What is Parker reading next?",
      "Is he reading The Technological Republic?",
      "What is the next book on his list after A Psalm for the Wild-Built?",
      "What are you reading these days?"
    ],
    "held_out": [
      "Which book does Parker plan to read after finishing his current ones?",
      "Does Parker read Becky Chambers?"
    ],
    "answer": "Parker is reading A Psalm for the Wild-Built by Becky Chambers and The Technological Republic by Alexander C. Karp and Nicholas W. Zamiska. Up next is A Prayer for the Crown-Shy by Becky Chambers, the sequel to A Psalm for the Wild-Built.",
    "links": [
      "books"
    ]
  },
  {
    "id": "books-read-2026",
    "questions": [
      "What books has Parker read in 2026?",
      "What has Parker read this year?",
      "What did he think of Klara and the Sun?",
      "Has Parker read Piranesi?",
      "What did Parker say about The Last Unicorn?",
      "Parker's 2026 book list",
      "Has Parker read To Be Taught, If Fortunate?"
    ],
    "held_out": [
      "Which Ishiguro book has Parker read?",
      "What are Parker's reading notes on his 2026 books?"
    ],
    "answer": "In 2026 Parker has read To Be Taught, If Fortunate, Klara and the Sun, The Last Unicorn, Piranesi, and five Brandon Sanderson books: Tress of the Emerald Sea, The Way of Kings, Words of Radiance, Oathbringer, and Rhythm of War. He calls Klara and the Sun \"beautiful and profound\" and The Last Unicorn \"whimsical and fun.\"",
    "links": [
      "books"
    ]
  },
  {
    "id": "books-read-2025",
    "questions": [
      "What books did Parker read in 2025?",
      "Has Parker read The Name of the Wind?",
      "Did Parker read The Final Empire by Brandon Sanderson?",
      "Has Parker read The Plague by Camus?",
      "Has he read the Fourth Wing series?",
      "Parker's 2025 reading list",
      "How far back does the book log go?"
    ],
    "held_out": [
      "Which fantasy series did Parker read in 2025?",
      "Did Parker read anything by Albert Camus or Patrick Rothfuss?"
    ],
    "answer": "In 2025 Parker read The Final Empire, The Well of Ascension, and The Hero of Ages by Brandon Sanderson, The Name of the Wind and The Wise Man's Fear by Patrick Rothfuss, Fourth Wing, Iron Flame, and Onyx Storm by Rebecca Yarros, The Plague by Albert Camus, and The House of Cross by James Patterson. The book log starts in 2025.",
    "links": [
      "books"
    ]
  },

  // The essay, how the site is written, the search, contact
  {
    "id": "how-site-is-written",
    "questions": [
      "Does Parker use AI to write this site?",
      "Who writes the pages on this site?",
      "Are these pages written by AI?",
      "How is this website made?",
      "Did a chatbot write this?",
      "ai written site"
    ],
    "held_out": [
      "Was any of this site written with ChatGPT or Claude?",
      "How much of the writing here is done by AI?"
    ],
    "answer": "Most pages are drafted with AI models from Parker's notes, code, data, and dictation, and most keep a dated log of what changed. The search on the home page matches questions to pages and to answers written in advance, and never writes new text.",
    "links": [
      "about-this-site"
    ]
  },
  {
    "id": "essay-overview",
    "questions": [
      "What is the Learning at the Edge essay about?",
      "What does Parker write about in Learning at the Edge of Knowledge?",
      "Summarize the Learning at the Edge essay",
      "what is your essay about",
      "Has Parker written any essays?",
      "learning at the edge of knowledge essay",
      "Is there an essay on this site?"
    ],
    "held_out": [
      "Tell me about the essay on the edges of knowledge",
      "What topics does his essay cover?"
    ],
    "answer": "Learning at the Edge of Knowledge is an essay by Parker about the edges of human knowledge. It covers the history of cholinergic receptors, Roger Penrose's Orch-OR theory, which the essay ties to consciousness, and the question of what we need to know to find out what we do not know.",
    "links": [
      "learning-at-the-edge"
    ]
  },
  {
    "id": "essay-central-question",
    "questions": [
      "What question does the Learning at the Edge essay ask?",
      "What is the central question in his essay?",
      "What do we need to know to figure out what we don't know?",
      "What question does Parker pose about knowledge?",
      "edge of knowledge question"
    ],
    "held_out": [
      "Does he think we will ever know what we need to know?",
      "How does Parker say most discoveries happen?"
    ],
    "answer": "The essay asks what we need to know, of the things we know, to figure out what we do not know. Parker writes that he does not think we will ever know that, and that most historical discoveries were accidental or reverse in nature, including the plant medicines that came before the drugs made to affect cholinergic receptors.",
    "links": [
      "learning-at-the-edge"
    ]
  },
  {
    "id": "essay-origin-lab",
    "questions": [
      "What made Parker interested in the edges of knowledge?",
      "When did Parker first realize how much is unknown?",
      "Where does his interest in unanswered questions come from?",
      "What happened when he asked a question in a lab as a high schooler?",
      "high school lab unanswered question"
    ],
    "held_out": [
      "What first made him see that science has open mysteries?",
      "What is the story behind his rabbit hole of choice?"
    ],
    "answer": "The idea first struck Parker as a high schooler asking questions in a lab. The grad student he worked for did not know the answer, the PhD who ran the lab did not know either, and humanity did not know. That was the first time he realized how many mysteries were out there.",
    "links": [
      "learning-at-the-edge"
    ]
  },
  {
    "id": "essay-cholinergic-history",
    "questions": [
      "What does the essay say about the history of cholinergic receptors?",
      "What did Langley show about nicotine?",
      "What did Lewandowski discover about nicotine in 1889?",
      "What is biphasic action of nicotine?",
      "Langley 1905 nicotine nerve",
      "Why does Parker use cholinergic receptors as an example?"
    ],
    "held_out": [
      "Which scientists worked out how nicotine acts on nerves?",
      "What example from medicine does the essay use to show new knowledge?"
    ],
    "answer": "The essay uses cholinergic receptors as an example of knowledge that was new at one point. In 1889 Lewandowski did early work showing that nicotine stimulated some nerve cells. In 1905 Langley showed that nicotine first stimulated and then obstructed the nerve, which Parker notes is called biphasic action.",
    "links": [
      "learning-at-the-edge"
    ]
  },
  {
    "id": "essay-penrose-orch-or",
    "questions": [
      "What does Parker say about Penrose and Orch-OR?",
      "What is Orch-OR?",
      "What is Orchestrated Objective Reduction in his essay?",
      "Which Roger Penrose book did Parker read?",
      "What does he say about microtubules and consciousness?",
      "Penrose Shadows of the Mind"
    ],
    "held_out": [
      "Does Parker find Penrose's theory convincing?",
      "Which theory of consciousness is discussed in the essay?"
    ],
    "answer": "Parker read a chapter of Roger Penrose's Shadows of the Mind, and the essay describes Penrose's theory, Orch-OR. In Parker's summary, Penrose proposes that microtubules in neurons support objective reduction, and that many of them connected together (the orchestration) might do something significant. Parker adds that the theory is not without problems.",
    "links": [
      "learning-at-the-edge"
    ]
  },
  {
    "id": "essay-consciousness-ai",
    "questions": [
      "Does Parker think AI will become conscious?",
      "What is Parker's favorite border of knowledge?",
      "What does he think about consciousness and AI?",
      "Will AI be conscious according to his essay?",
      "his view on machine consciousness"
    ],
    "held_out": [
      "What topic at the frontier of science interests him most?",
      "Is he worried about conscious AI?"
    ],
    "answer": "Parker calls consciousness his favorite border of knowledge. He writes that he finds Penrose's theory comforting because, if it is even partially on the right track, AI will probably not be conscious anytime soon.",
    "links": [
      "learning-at-the-edge"
    ]
  },
  {
    "id": "essay-authorship-date",
    "questions": [
      "Who wrote the Learning at the Edge essay?",
      "Who is the author of the Learning at the Edge essay?",
      "Did AI write the Learning at the Edge essay?",
      "Is the essay written by Parker himself?",
      "When was the Learning at the Edge essay published?",
      "when did he publish his essay"
    ],
    "held_out": [
      "Was any model involved in writing his essay?",
      "How old is the Learning at the Edge page?"
    ],
    "answer": "Parker wrote Learning at the Edge of Knowledge, and the site records it as published on October 9, 2025.",
    "links": [
      "learning-at-the-edge",
      "about-this-site"
    ]
  },
  {
    "id": "home-search-privacy",
    "questions": [
      "Does the home page search send what I type anywhere?",
      "Is my search on Parker's site private?",
      "Does the site search run in my browser?",
      "Where does the search model run?",
      "Does anything I type on the home page leave my device?",
      "is the search private",
      "How big is the search model it downloads?"
    ],
    "held_out": [
      "Are my questions logged or sent to a server?",
      "Does the search work on my device or on a remote server?"
    ],
    "answer": "The home page search runs in the visitor's browser, and the site states that nothing typed there leaves the page. Typing narrows the page list with no download. The search model, 24 MB, downloads to the browser when a visitor sends a first typed question, and a status line under the search box shows its progress.",
    "links": []
  },
  {
    "id": "home-search-how-it-works",
    "questions": [
      "How does the search on the home page work?",
      "Is the home page search a chatbot that generates answers?",
      "Does the site's search use AI to write replies?",
      "What does the home page search do with my question?",
      "How does the site match my question to pages?",
      "What model does the site search use?",
      "does the search make up text"
    ],
    "held_out": [
      "Will the search invent an answer if the site doesn't cover my question?",
      "Is it ChatGPT-style generation or just page lookup?"
    ],
    "answer": "The home search generates no text. It matches a visitor's question to the site's pages by meaning, using the all-MiniLM-L6-v2 embedding model, and by words, and lists the matching pages. When the question is close to one Parker has answered in advance, it shows his written answer first.",
    "links": []
  },
  {
    "id": "contact-parker",
    "questions": [
      "How can I contact Parker?",
      "What is Parker's email address?",
      "Where can I reach him?",
      "What is your email?",
      "How do I get in touch with you?",
      "contact info"
    ],
    "held_out": [
      "What is the best way to message him?",
      "Where can I find his code and social accounts?"
    ],
    "answer": "Parker's listed email is pjs002@lsuhs.edu, and the site calls email the fastest way to reach him. His GitHub account is elparko, which has the code for most of the projects on the site, and his X handle is @parker5smith.",
    "links": []
  },

  // For Parker to fill in. Each is skipped until its answer is written.
  {
    "id": "hometown",
    "questions": [
      "Where is Parker from?",
      "Where did you grow up?",
      "What is his hometown?",
      "Where is he originally from?",
      "parker hometown"
    ],
    "held_out": [
      "Which city did Parker grow up in?",
      "Where's home for him?"
    ],
    "answer": "",
    "links": [
      "cv"
    ]
  },
  {
    "id": "why-medicine",
    "questions": [
      "Why did Parker go into medicine?",
      "Why did you want to be a doctor?",
      "What made him choose medical school?",
      "Why medicine?",
      "parker why medicine"
    ],
    "held_out": [
      "What drew Parker to becoming a physician?",
      "How did he decide on medicine?"
    ],
    "answer": "",
    "links": [
      "cv"
    ]
  },
  {
    "id": "why-otolaryngology",
    "questions": [
      "Why is Parker interested in otolaryngology?",
      "Why ENT?",
      "What draws you to otolaryngology?",
      "Why does he want to do ENT?",
      "why otolaryngology"
    ],
    "held_out": [
      "What made Parker interested in head and neck surgery?",
      "Why did he pick ENT over other specialties?"
    ],
    "answer": "",
    "links": [
      "cv"
    ]
  },
  {
    "id": "favorite-book",
    "questions": [
      "What is Parker's favorite book?",
      "What's your favorite book?",
      "Which book does he like most?",
      "What book would he recommend?",
      "parker favorite book"
    ],
    "held_out": [
      "If Parker could recommend one book, what would it be?",
      "Best book he has read?"
    ],
    "answer": "",
    "links": [
      "cv"
    ]
  },
  {
    "id": "computer-setup",
    "questions": [
      "What computer does Parker use?",
      "What is your setup?",
      "What editor does he code in?",
      "What tools does Parker use to build things?",
      "parker setup"
    ],
    "held_out": [
      "What laptop and software does Parker work on?",
      "Which code editor do you use?"
    ],
    "answer": "",
    "links": [
      "cv"
    ]
  },
  {
    "id": "ai-tools-used",
    "questions": [
      "What AI tools does Parker use?",
      "Which AI models do you use for coding?",
      "Does he use Claude or ChatGPT?",
      "What AI does Parker build with?",
      "parker ai tools"
    ],
    "held_out": [
      "Which language models does Parker work with day to day?",
      "What AI assistant helps build this site?"
    ],
    "answer": "",
    "links": [
      "cv"
    ]
  },
];
