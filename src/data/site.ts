// Everything the page says lives here. To add a project, add one entry to `projects`;
// to log a release, add a line at the top of `shipped`.
import type { ImageMetadata } from 'astro';

import vbNote from '../assets/vetbuddy/note.jpg';
import vbRecord from '../assets/vetbuddy/record.jpg';
import vbInbox from '../assets/vetbuddy/inbox.jpg';
import vbCalendar from '../assets/vetbuddy/calendar.jpg';
import vbFilmPoster from '../assets/vetbuddy/film-poster.jpg';
import vbLaunchPoster from '../assets/vetbuddy/launch-poster.jpg';
import vbWebsitePoster from '../assets/vetbuddy/website-poster.jpg';
import vbMobile from '../assets/sites/vetbuddy-mobile.jpg';
import jkWeb from '../assets/sites/jyotikul-web.jpg';
import jkWelcome from '../assets/apps/jk-welcome.png';
import jkHome from '../assets/apps/jk-home.png';
import jkChat from '../assets/apps/jk-chat.png';
import jkPanchang from '../assets/apps/jk-panchang.png';
import astroWeb from '../assets/sites/astrodya-web.jpg';
import astroMobile from '../assets/sites/astrodya-mobile.jpg';
import duetWeb from '../assets/sites/duet-web.jpg';
import duetPoster from '../assets/tools/duet-poster.jpg';
import awLight from '../assets/tools/aw-light.png';
import awDark from '../assets/tools/aw-dark.png';
import smWeb from '../assets/sites/sortmoney-web.jpg';
import smHome from '../assets/apps/sm-home.png';
import smActivity from '../assets/apps/sm-activity.png';
import smHabits from '../assets/apps/sm-habits.png';
import smPayment from '../assets/apps/sm-payment.png';
import p2048Home from '../assets/apps/p2048-home.png';
import p2048Levels from '../assets/apps/p2048-levels.png';
import p2048Playing from '../assets/apps/p2048-playing.png';

export type Shot = { src: ImageMetadata; srcDark?: ImageMetadata; alt: string };
export type Phone = Shot & { shape: 'tall' | 'classic'; caption?: string };
export type Link = { label: string; href: string };
export type Video = { src: string; poster: ImageMetadata; captions?: string; title: string; note: string; loop?: boolean };

export type Media =
  | { kind: 'phones'; phones: Phone[] }
  | { kind: 'screens'; main: { url: string; shot: Shot; caption: string }; screens: (Shot & { caption: string })[]; videos: Video[] }
  | { kind: 'video'; video: Video }
  | { kind: 'browser'; url: string; shot: Shot }
  | { kind: 'diagram' };

export type Project = {
  id: string;
  name: string;
  role: string;
  line: string;
  status: string;
  short: string;
  links: Link[];
  scene: { url?: string; web?: Shot; phone?: Phone };
  facts: string[];
  install?: string;
  stack: string;
  media: Media;
};

export const person = {
  name: 'Aditya Singh',
  title: 'Full-stack engineer',
  place: 'Gurugram, India',
  email: 'adityasinghuo@gmail.com',
  github: 'https://github.com/AdityaSingh-byte',
  linkedin: 'https://www.linkedin.com/in/aditya-singh-84747a269/',
  npm: 'https://www.npmjs.com/~adityasinghbyte',
  updated: '19 October 2026',
};

export const projects: Project[] = [
  {
    id: 'vetbuddy',
    name: 'VetBuddy',
    role: 'Co-founder and CTO, since August 2025',
    line: 'An AI scribe and clinic assistant for vets in Singapore. It records the consult, writes the clinical note and answers the clinic’s WhatsApp.',
    status: 'Live at app.myvetbuddy.com',
    short: 'Co-founder, CTO',
    links: [
      { label: 'myvetbuddy.com', href: 'https://myvetbuddy.com' },
      { label: 'Watch the film', href: '#vetbuddy-film' },
    ],
    scene: {
      url: 'app.myvetbuddy.com',
      web: { src: vbNote, alt: 'VetBuddy consultation note for Bruno, a Labrador, with the transcript beside it' },
      phone: { src: vbMobile, alt: 'The myVetbuddy website on a phone: The AI scribe for veterinary clinics', shape: 'tall' },
    },
    facts: [
      'Turns a recorded consult into a structured clinical note in about 30 seconds. Every section shows the words in the transcript it came from.',
      'Client Chats: the clinic’s WhatsApp and SMS in one shared inbox, with an assistant that answers from the clinic’s own profile and hands anything about a pet’s health to the vet.',
      'Audited 37 screens and 198 issues, then redesigned the whole web app around a calmer, faster layout.',
      'A Chrome extension that pastes finished notes into ezyVet, and a practice-management system built on OpenVPM.',
      'Built the new website, its animated hero and both films. The motion scenes are written in HTML and CSS, then rendered to video.',
    ],
    stack: 'React, TypeScript, Node, PostgreSQL, Twilio, Google Cloud, AWS, Astro',
    media: {
      kind: 'screens',
      main: {
        url: 'app.myvetbuddy.com',
        shot: { src: vbInbox, alt: 'Client Chats inbox: a client asks about a Saturday nail trim and the assistant suggests three replies from the clinic profile' },
        caption: 'Client Chats in the redesigned app: suggested replies come from the clinic’s own profile, and nothing is sent until someone presses Send.',
      },
      screens: [
        { src: vbRecord, alt: 'Recording a consult: clip saved and transcribed', caption: 'Record the consult' },
        { src: vbNote, alt: 'Clinical note drafted from the consult, with quote counts per section', caption: 'Check the note' },
        { src: vbCalendar, alt: 'Appointments calendar for two vets on one day', caption: 'Run the day' },
      ],
      videos: [
        { src: '/media/vetbuddy-film.mp4', poster: vbFilmPoster, captions: '/media/vetbuddy-film.en.vtt', title: 'Product film', note: '3 minutes, with captions' },
        { src: '/media/vetbuddy-launch.mp4', poster: vbLaunchPoster, title: 'Client Chats launch film', note: '90 seconds, with voiceover' },
        { src: '/media/vetbuddy-website.mp4', poster: vbWebsitePoster, title: 'Website hero', note: 'The line draws itself in, 6 seconds', loop: true },
      ],
    },
  },
  {
    id: 'jyotikul',
    name: 'JyotiKul',
    role: 'Built at Astrodya, since September 2026',
    line: 'A community app for astrologers: live webinars, chat, a daily panchang and a shared library, in Hindi and English.',
    status: 'On Google Play. iOS is in App Store review.',
    short: 'Google Play, iOS soon',
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=in.astrodya.community' },
      { label: 'jyotikul.com', href: 'https://jyotikul.com' },
    ],
    scene: {
      url: 'jyotikul.com',
      web: { src: jkWeb, alt: 'jyotikul.com sign-up, choosing English or Hindi' },
      phone: { src: jkHome, alt: 'JyotiKul home screen with today’s panchang and community circles', shape: 'tall' },
    },
    facts: [
      'Built the Android and iOS app, the website, the staff console, the API and the background services: five repos, about 1,500 commits since 10 September.',
      'Live webinars on LiveKit with co-hosts, screen sharing from a phone, and joining from up to three devices.',
      'Every webinar is recorded twice, by LiveKit and by a recorder I built on AWS Fargate. Recording stops only when the last person leaves.',
      'Push to Android and iOS, phone sign-in, chat with voice notes and reactions, scheduled broadcasts and a forced-update gate.',
      'About 1,500 backend tests. One feature per release, behind a flag.',
    ],
    stack: 'Expo and React Native, NestJS with Fastify, Next.js, PostgreSQL, AWS',
    media: {
      kind: 'phones',
      phones: [
        { src: jkWelcome, alt: 'JyotiKul welcome screen in English with a Hindi switch', shape: 'tall', caption: 'Welcome' },
        { src: jkChat, alt: 'A JyotiKul community chat about planetary transits, in Hindi and English', shape: 'tall', caption: 'Community chat' },
        { src: jkPanchang, alt: 'JyotiKul daily panchang: sunrise, sunset, tithi and nakshatra', shape: 'tall', caption: 'Daily panchang' },
      ],
    },
  },
  {
    id: 'astrodya',
    name: 'Astrodya platform',
    role: 'Full-stack developer, since January 2026',
    line: 'The CRM, calling and consultation system behind astrodya.com. The whole team works in it every day.',
    status: 'Private. The public side is astrodya.com.',
    short: 'Used every day',
    links: [{ label: 'astrodya.com', href: 'https://www.astrodya.com' }],
    scene: {
      url: 'astrodya.com',
      web: { src: astroWeb, alt: 'astrodya.com home page' },
      phone: { src: astroMobile, alt: 'astrodya.com on a phone', shape: 'tall' },
    },
    facts: [
      'WhatsApp across five providers behind one inbox, with failover, a daily limit per number and opt-out handling.',
      'A browser dialer and a call center for cold callers: a line per agent, recordings, transcripts and call outcomes.',
      'Every Facebook ad traced to the lead it brought in, across three repos, and reported back through the Conversions API.',
      'Video consultations on LiveKit with multi-part recording, so 100-minute sessions are kept whole. Calls become Hinglish transcripts, client dossiers and PDF reports.',
      'An event-driven task engine with 29 tasks, and an MCP server that lets AI agents work with the CRM.',
    ],
    stack: 'Node, TypeScript, Express, Supabase and PostgreSQL, React, LiveKit, Capacitor',
    media: { kind: 'diagram' },
  },
  {
    id: 'duet',
    name: 'duet',
    role: 'Open source, October 2026',
    line: 'Lets an AI coding agent test a feature on a real Android phone and in a browser at the same time, while you watch.',
    status: 'npm duet-qa 0.1.1',
    short: 'npm 0.1.1',
    links: [
      { label: 'GitHub', href: 'https://github.com/AdityaSingh-byte/duet' },
      { label: 'npm', href: 'https://www.npmjs.com/package/duet-qa' },
      { label: 'Demos', href: 'https://adityasingh-byte.github.io/duet/' },
    ],
    scene: {
      url: 'adityasingh-byte.github.io/duet',
      web: { src: duetWeb, alt: 'The duet website with a recorded phone and browser test' },
    },
    facts: [
      'An MCP server with 34 tools. Screenshots go back to the model as images, and its taps are mapped back to the real screen.',
      'Safe on someone’s own phone: a guard that fails closed, and it never uninstalls an app.',
      'Scenarios with several actors, say a host in Chrome and a viewer on a phone, with a report and a video of every run.',
      'It started when an agent caught a rotation-only bug in a live-video feature that unit tests had missed. 87 tests.',
    ],
    install: 'npm install -g duet-qa',
    stack: 'TypeScript, Node, adb, Puppeteer, MCP',
    media: {
      kind: 'video',
      video: { src: '/media/duet-demo.mp4', poster: duetPoster, title: 'A comment shows its author’s new name', note: 'Recorded by duet on a Galaxy S24 FE' },
    },
  },
  {
    id: 'agent-watch',
    name: 'agent-watch',
    role: 'Open source, October 2026',
    line: 'A Claude Code plugin that shows every session on your machine in one place: which one is working, which is waiting on you, and what each one shipped.',
    status: 'Version 0.2.1 on GitHub',
    short: 'Claude Code plugin',
    links: [{ label: 'GitHub', href: 'https://github.com/AdityaSingh-byte/agent-watch' }],
    scene: {
      url: 'agent-watch, on your machine',
      web: { src: awLight, srcDark: awDark, alt: 'agent-watch listing five sessions, with the details of one that is adding Apple Pay' },
    },
    facts: [
      'A console and a browser page over every live session: files changed, test runs, issues, commits, tokens and subagents.',
      'Press r for an AI review that checks a session’s claims against what actually ran.',
      'Its router sends each delegated task to the cheapest model that can do it, and retries a tier up when it fails.',
      'No server and no open port. Two adversarial audits and 45 tests.',
    ],
    install: '/plugin install agent-watch --marketplace AdityaSingh-byte/agent-watch',
    stack: 'Claude Code plugin, Node',
    media: {
      kind: 'browser',
      url: 'agent-watch, on your machine',
      shot: { src: awLight, srcDark: awDark, alt: 'agent-watch listing five sessions, with the details of one that is adding Apple Pay' },
    },
  },
  {
    id: 'sort-money',
    name: 'Sort Money',
    role: 'My own app, October 2026',
    line: 'Your month of spending, read from the texts your bank already sends. Nothing leaves the phone.',
    status: 'Android, in testing on Google Play',
    short: 'Android, in testing',
    links: [{ label: 'sortmoney.in', href: 'https://sortmoney.in' }],
    scene: {
      url: 'sortmoney.in',
      web: { src: smWeb, alt: 'sortmoney.in: your spending is split across many apps' },
      phone: { src: smHome, alt: 'Sort Money home: money spent this month against a limit', shape: 'classic' },
    },
    facts: [
      'Reads bank and UPI messages on the phone and remembers which message every amount came from.',
      'Teach it one message it missed and it learns the pattern for that sender.',
      'Finds duplicates, transfers between your own accounts, and bills.',
      'Encrypted backups, and a website with no JavaScript at all.',
    ],
    stack: 'Kotlin, Jetpack Compose, SQLite',
    media: {
      kind: 'phones',
      phones: [
        { src: smPayment, alt: 'Sort Money: one payment and the bank text it came from', shape: 'classic', caption: 'Where it came from' },
        { src: smActivity, alt: 'Sort Money activity list of payments', shape: 'classic', caption: 'Every payment' },
        { src: smHabits, alt: 'Sort Money spending habits by category', shape: 'classic', caption: 'Habits' },
      ],
    },
  },
  {
    id: '2048',
    name: '2048 Puzzle',
    role: 'My own game, 2026',
    line: '60 handmade levels, power-ups and an endless mode.',
    status: 'On Google Play',
    short: 'Google Play',
    links: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.aditya.puzzle2048' }],
    scene: {
      phone: { src: p2048Playing, alt: '2048 Puzzle level in progress', shape: 'classic' },
    },
    facts: [
      'Every level is checked by an expectimax solver before it ships.',
      'A headless simulator runs about 88,000 checks on the game rules.',
      'A closed test with 14 testers came back 100% crash-free.',
    ],
    stack: 'Java, Android, AdMob, Firebase',
    media: {
      kind: 'phones',
      phones: [
        { src: p2048Home, alt: '2048 Puzzle home screen', shape: 'classic', caption: 'Home' },
        { src: p2048Levels, alt: '2048 Puzzle level map', shape: 'classic', caption: 'Levels' },
        { src: p2048Playing, alt: '2048 Puzzle level in progress', shape: 'classic', caption: 'Playing' },
      ],
    },
  },
];

export const shipped: { date: string; iso: string; id: string; text: string }[] = [
  { date: '19 Oct', iso: '2026-10-19', id: 'duet', text: 'duet 0.1.1 published on npm and GitHub Packages.' },
  { date: '19 Oct', iso: '2026-10-19', id: 'jyotikul', text: 'JyotiKul for iOS sent to App Store review.' },
  { date: '19 Oct', iso: '2026-10-19', id: 'astrodya', text: 'A call center for the cold-calling team went live, with a line per agent.' },
  { date: '19 Oct', iso: '2026-10-19', id: 'sort-money', text: 'sortmoney.in went live.' },
  { date: '16 Oct', iso: '2026-10-16', id: 'jyotikul', text: 'JyotiKul 2.6.8 on Google Play: join a live room from up to three devices, and pin a speaker.' },
  { date: '16 Oct', iso: '2026-10-16', id: 'agent-watch', text: 'agent-watch 0.2.1 released, with the model router.' },
  { date: '16 Oct', iso: '2026-10-16', id: 'duet', text: 'duet made public, with its site and three recorded demos.' },
  { date: '13 Oct', iso: '2026-10-13', id: 'jyotikul', text: 'Push notifications reach iPhones directly through Apple.' },
  { date: '9 Oct', iso: '2026-10-09', id: 'vetbuddy', text: 'Built the new myVetbuddy website, with an animated hero and a product film.' },
  { date: '8 Oct', iso: '2026-10-08', id: 'jyotikul', text: 'Webinars now record until the last person leaves the room.' },
  { date: '7 Oct', iso: '2026-10-07', id: 'jyotikul', text: 'jyotikul.com launched on AWS.' },
  { date: '7 Oct', iso: '2026-10-07', id: 'vetbuddy', text: 'The redesigned VetBuddy app merged: 37 screens.' },
  { date: '6 Oct', iso: '2026-10-06', id: 'vetbuddy', text: 'Rendered the 90-second launch film for Client Chats.' },
  { date: '5 Oct', iso: '2026-10-05', id: 'astrodya', text: 'Sinch became the main WhatsApp provider, without dropping the other four.' },
  { date: '1 Oct', iso: '2026-10-01', id: 'jyotikul', text: 'Daily panchang in the app, with a card members can share.' },
  { date: '23 Sep', iso: '2026-09-23', id: '2048', text: '2048 Puzzle finished a 14-tester closed test, 100% crash-free.' },
  { date: '17 Sep', iso: '2026-09-17', id: 'astrodya', text: 'A browser phone for the CRM, with recordings and transcripts.' },
  { date: '10 Sep', iso: '2026-09-10', id: 'jyotikul', text: 'Started JyotiKul: five repos, from an empty folder.' },
  { date: '25 Aug', iso: '2026-08-25', id: 'astrodya', text: 'Consultations transcribed automatically, per speaker, into Hinglish.' },
  { date: '31 Jul', iso: '2026-07-31', id: 'astrodya', text: 'A 31-screen mobile CRM for the sales team.' },
];

export const alsoBuilt: { name: string; text: string }[] = [
  { name: 'Spine and pContext', text: 'Local memory for coding agents, with a desktop app. Answers in under 50 ms.' },
  { name: 'Puzzlebox', text: 'Five logic-puzzle games from one Unity project.' },
  { name: 'Chain Pop Blast', text: 'A block breaker with its own ball physics: 120 balls at 120 fps on a phone.' },
  { name: 'Runner Obstacle Kit', text: '16 low-poly models for the Unity Asset Store, made with Blender scripts.' },
  { name: 'netmon', text: 'A macOS Wi-Fi monitor that tells router lag from internet lag.' },
];

export const jobs: { org: string; role: string; when: string; text: string }[] = [
  { org: 'myVetbuddy', role: 'Co-founder and CTO', when: 'Aug 2025 to now', text: 'VetBuddy, from the AI scribe to the website and films.' },
  { org: 'Astrodya', role: 'Full-stack developer', when: 'Jan 2026 to now', text: 'JyotiKul, the CRM, messaging, calling and live video.' },
  { org: 'Yellow Owl Publisher', role: 'Full-stack developer', when: 'Jul 2024 to Dec 2025', text: 'HireGlint, AI interviews with live proctoring, and Skill Builder Magazine for 1,000+ learners. Made the APIs 60% faster with Redis and better indexes.' },
  { org: 'MJP Rohilkhand University', role: 'BSc, Computer Science', when: '2020 to 2023', text: 'Bareilly, Uttar Pradesh.' },
];

// The hero's feed: real events from the last few days.
export const feed: { id: string; title: string; when: string }[] = [
  { id: 'jyotikul', title: 'JyotiKul for iOS sent to App Store review', when: '19 Oct · build 8' },
  { id: 'duet', title: 'Published duet-qa 0.1.1 to npm', when: '19 Oct · npm' },
  { id: 'astrodya', title: 'Call center live for the sales team', when: '19 Oct · Astrodya CRM' },
  { id: 'vetbuddy', title: 'Clinical note drafted from a consult', when: 'about 30 s · VetBuddy' },
  { id: 'sort-money', title: 'sortmoney.in went live', when: '19 Oct · Cloudflare' },
  { id: 'agent-watch', title: 'agent-watch 0.2.1 released', when: '16 Oct · GitHub' },
];

// Two labels on each project's stage in the tour.
export const callouts: Record<string, string[]> = {
  vetbuddy: ['Every line linked to the transcript', 'A draft note in about 30 s'],
  jyotikul: ['Hindi and English', 'Live on Google Play'],
  astrodya: ['Every WhatsApp lead traced to its ad', 'Five WhatsApp providers'],
  duet: ['A phone and a browser in one test', 'npm install -g duet-qa'],
  'agent-watch': ['Which session is waiting on you', 'No server, no open port'],
  'sort-money': ['Read from your bank’s texts', 'Nothing leaves the phone'],
  '2048': ['60 solver-checked levels', 'On Google Play'],
};

// The engraved band: figures, then versions.
export const band: { figures: [string, string][]; versions: [string, string][] } = {
  figures: [
    ['2,394', 'commits since July'],
    ['1,500', 'backend tests, JyotiKul'],
    ['88,000', 'checks, 2048 Puzzle'],
    ['34', 'MCP tools, duet'],
    ['5', 'WhatsApp providers, Astrodya'],
    ['30 s', 'to a draft note, VetBuddy'],
  ],
  versions: [
    ['2.6.8', 'JyotiKul on Google Play'],
    ['0.1.1', 'duet on npm'],
    ['0.2.1', 'agent-watch'],
    ['1.78.0', 'Astrodya CRM'],
    ['1.73.0', 'Astrodya API'],
    ['v13', '2048 Puzzle'],
  ],
};
