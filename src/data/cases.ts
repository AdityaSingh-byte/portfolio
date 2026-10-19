// How each project works, written so a hiring manager can follow it and an engineer can check it.
// `how` is the step-by-step flow drawn as a diagram; `hard` is the one problem worth explaining;
// `numbers` are the three figures shown large. Keep every claim true to the code.

export type Step = { name: string; text: string; tech?: string };
export type Number = { value: string; label: string };
export type Case = {
  how: Step[];
  hard: { title: string; text: string; art: 'quotes' | 'room' | 'invisible' | 'taps' | 'reader' | 'twice' | 'solver' };
  numbers: Number[];
  more?: string[];
};

export const cases: Record<string, Case> = {
  vetbuddy: {
    how: [
      { name: 'Record', text: 'The vet records the consult in the browser. Each clip is saved as it ends, so a closed tab loses nothing.', tech: 'MediaRecorder, Firebase Storage' },
      { name: 'Transcribe', text: 'A speech service on Cloud Run turns each clip into text, in the language it was spoken.', tech: 'FastAPI, OpenAI gpt-4o-transcribe' },
      { name: 'Draft the note', text: 'A language model writes the clinical note in the clinic’s own template and tags every line with the words it came from.', tech: 'Node API, prompt templates' },
      { name: 'Check and send', text: 'The vet edits and completes the consult, pastes the note into ezyVet with the Chrome extension, and emails the owner a plain summary.', tech: 'React, Chrome extension' },
    ],
    hard: {
      title: 'Making a vet trust a note they did not write',
      text: 'A vet signs every note, so each section shows how many quotes from the consult support it, and those words are underlined in the transcript beside it. A line with no quote is a line to check.',
      art: 'quotes',
    },
    numbers: [
      { value: '~30 s', label: 'from the end of a consult to a draft note' },
      { value: '37', label: 'screens audited and redesigned' },
      { value: '198', label: 'issues found, each with its file and line' },
    ],
    more: [
      'Client Chats runs on Twilio: the clinic’s WhatsApp and SMS land in one inbox, an assistant drafts replies from the clinic profile, and anything about a pet’s health goes to the vet.',
      'The redesign kept the old app one link away, with its security fixes ported, so clinics could switch back.',
    ],
  },

  jyotikul: {
    how: [
      { name: 'Apps', text: 'Android and iOS, the website and the staff console all talk to one API.', tech: 'Expo, React Native, Next.js' },
      { name: 'API', text: 'Every route has one contract that validates requests and also generates the API docs, so app and server cannot drift apart.', tech: 'NestJS, Fastify, Zod, OpenAPI' },
      { name: 'Services', text: 'Background workers send push notifications, relay events from an outbox and run the webinar recorder.', tech: 'FCM, Apple push, Redis' },
      { name: 'Live rooms', text: 'LiveKit carries the video. The app joins through a web room, so there is no native video module to maintain.', tech: 'LiveKit Cloud, WebRTC' },
      { name: 'AWS', text: 'Postgres on RDS and Docker on EC2, deployed by GitHub Actions with short-lived credentials and no stored keys.', tech: 'CloudFormation, OIDC, Postgres 17' },
    ],
    hard: {
      title: 'Recording a webinar that nobody may stop',
      text: 'Recording starts when a host joins and stops only once the room is empty, 45 seconds after the last person leaves. Two recorders run side by side: LiveKit’s, and my own headless-Chrome bot on AWS Fargate. A single setting turns LiveKit’s share down to save money without ever losing a session.',
      art: 'room',
    },
    numbers: [
      { value: '~1,500', label: 'commits in five repos since 10 September' },
      { value: '~1,500', label: 'backend tests' },
      { value: '2', label: 'stores: Google Play now, the App Store in review' },
    ],
  },

  astrodya: {
    how: [
      { name: 'Ad click', text: 'A visitor arrives from a Facebook or Google ad. The site keeps the ad’s identifiers.', tech: 'UTM, fbc and fbp, gclid' },
      { name: 'WhatsApp', text: 'Tapping WhatsApp pre-fills a message that carries those identifiers as invisible characters.', tech: 'wa.me, zero-width encoding' },
      { name: 'CRM', text: 'The inbound webhook decodes them, so each chat becomes a lead tied to its exact ad, and the result is reported back to Meta.', tech: 'Express, Supabase, Conversions API' },
      { name: 'Talk', text: 'The team replies over five WhatsApp providers or calls from the browser. Consultations run on video.', tech: 'Twilio, Plivo, Sinch, LiveKit' },
      { name: 'After', text: 'Every call is transcribed per speaker and turned into Hinglish notes, a client dossier and PDF reports.', tech: 'Deepgram, ElevenLabs, LLM merge' },
    ],
    hard: {
      title: 'Knowing which ad a WhatsApp chat came from',
      text: 'WhatsApp passes on nothing about where a visitor came from, only the text they send. So the website appends the ad’s identifiers to the pre-filled message as zero-width characters. The visitor sees an ordinary message; the CRM reads the hidden tag and links the chat to the ad, the campaign and the click.',
      art: 'invisible',
    },
    numbers: [
      { value: '5', label: 'WhatsApp providers behind one inbox' },
      { value: '29', label: 'automated tasks in the workflow engine' },
      { value: '100+ min', label: 'consultations recorded whole, in parts stitched by timestamp' },
    ],
    more: [
      'Transcripts come from two engines per speaker: Deepgram for timing, ElevenLabs for Hindi and Sanskrit words, merged by a language model. Each person has their own audio track, so who said what is never guessed.',
      'Jobs are claimed with row locks and leases, so several workers never take the same call.',
    ],
  },

  duet: {
    how: [
      { name: 'Scenario', text: 'A short file lists the actors (a phone, one or more browsers) and the steps each one takes.', tech: 'YAML' },
      { name: 'Actors', text: 'The phone is driven over adb. Each browser is its own visible Chrome window.', tech: 'adb, Puppeteer' },
      { name: 'Agent', text: 'A coding agent runs the steps through 34 tools and sees every screenshot as an image.', tech: 'MCP, Claude Code' },
      { name: 'Evidence', text: 'Each run keeps a screenshot per step, the phone’s log, an HTML report and a video.', tech: 'ffmpeg' },
    ],
    hard: {
      title: 'Letting a model tap a real phone, safely',
      text: 'Phone screenshots are too big to send to a model, so duet scales them down, and every tap the model makes on the small image is mapped back to the real pixels. Before touching anything it checks which phone and which app it is on, and stops if it cannot be sure.',
      art: 'taps',
    },
    numbers: [
      { value: '34', label: 'tools for the agent' },
      { value: '87', label: 'tests' },
      { value: '0.1.1', label: 'on npm, as duet-qa' },
    ],
  },

  'agent-watch': {
    how: [
      { name: 'Sessions', text: 'Every Claude Code session writes its conversation to a file on your disk.', tech: '~/.claude/projects/*.jsonl' },
      { name: 'Read', text: 'agent-watch reads only what each file gained since the last look. It never writes to them.', tech: 'incremental reader' },
      { name: 'Show', text: 'One console, or a page in your browser, with every session’s state, files, tests and commits.', tech: 'terminal UI, static page' },
      { name: 'Route', text: 'Delegated tasks go to the cheapest model that can do them, and move up a tier when they fail.', tech: 'haiku, sonnet, opus' },
    ],
    hard: {
      title: 'Watching without touching',
      text: 'It only reads files, never sends anything to a session, and needs no server or open port. The browser page’s data file gets a new random name every run, so no other page on your disk can find it.',
      art: 'reader',
    },
    numbers: [
      { value: '0', label: 'servers and open ports' },
      { value: '45', label: 'tests' },
      { value: '2', label: 'adversarial audits, every finding fixed' },
    ],
  },

  'sort-money': {
    how: [
      { name: 'Your bank texts you', text: 'An alert arrives for every payment, from any bank, card or UPI app.', tech: 'Android SMS' },
      { name: 'Read on the phone', text: 'It pulls out the amount, who was paid and the account. OTPs and texts from people are skipped.', tech: 'Kotlin parser' },
      { name: 'One month', text: 'Duplicates and transfers between your own accounts are matched, so each rupee counts once.', tech: 'SQLite, Compose' },
    ],
    hard: {
      title: 'Counting money only once',
      text: 'Pay a ₹7,420 card bill through CRED and two texts arrive: the card spend and the bill. Most apps add both. Sort Money matches them and counts the money once.',
      art: 'twice',
    },
    numbers: [
      { value: '24', label: 'banks, cards and payment banks read' },
      { value: '120 days', label: 'of texts sorted the first time you open it' },
      { value: '0 bytes', label: 'leave your phone' },
    ],
  },

  '2048': {
    how: [
      { name: 'Design', text: '60 levels, each with its own board and target tile.', tech: 'Java' },
      { name: 'Prove', text: 'An expectimax solver plays every level before it ships.', tech: 'headless simulator' },
      { name: 'Test', text: 'A closed test with real players, then Google Play.', tech: 'Firebase Crashlytics' },
    ],
    hard: {
      title: 'Proving every level can be won',
      text: 'Random tiles make a hand-made level a gamble. A solver that weighs every possible next tile plays each level, so none ships unwinnable.',
      art: 'solver',
    },
    numbers: [
      { value: '60', label: 'levels, all solver-checked' },
      { value: '88,000', label: 'automated checks' },
      { value: '100%', label: 'crash-free in the closed test' },
    ],
  },
};
