export type Language = 'EN' | 'MN'

const en = {
  nav: {
    brand: 'BODI PROPERTIES',
    projects: 'PROJECTS',
    studio: 'STUDIO',
    approach: 'APPROACH',
    journal: 'JOURNAL',
    contact: 'CONTACT',
  },

  hero: {
    tagline: 'EST. 2003 — STOCKHOLM & COPENHAGEN',
    heading: 'Architecture that shapes\nhow we experience\nthe world',
    scroll: 'SCROLL TO EXPLORE',
  },

  projects: {
    label: 'SELECTED WORK',
    heading: 'Projects',
    count: '(04) Projects',
    viewProject: 'VIEW PROJECT',
    close: 'CLOSE',

    modal: {
      type: 'TYPE',
      location: 'LOCATION',
      year: 'YEAR',
      description: 'DESCRIPTION',
      overview: 'OVERVIEW',
      client: 'CLIENT',
      area: 'AREA',
      status: 'STATUS',
      services: 'SERVICES',
      gallery: 'GALLERY',
      next: 'NEXT PROJECT',
    },
  },

  quote: {
    text: '"Architecture should speak of its time and place, but yearn for timelessness."',
    author: 'ERIK VOSS, FOUNDING PARTNER',
  },

  studio: {
    label: 'ABOUT THE STUDIO',
    heading:
      'We believe architecture is the most intimate form of public art',

    p1: 'Founded in Stockholm in 2003, Voss Architects is a practice built on thoughtful design.',

    p2: 'Every project begins with listening. We study the site and craft timeless architecture.',

    stats: {
      projects: 'PROJECTS COMPLETED',
      awards: 'INTERNATIONAL AWARDS',
      years: 'YEARS OF PRACTICE',
    },
  },

  approach: {
    label: 'OUR PHILOSOPHY',
    heading: 'Approach',

    items: [
      {
        num: '01',
        title: 'Context First',
        desc: 'Every design responds to its environment.',
      },
      {
        num: '02',
        title: 'Material Honesty',
        desc: 'Concrete, timber, glass and stone are used with respect.',
      },
      {
        num: '03',
        title: 'Light as Material',
        desc: 'Natural light is our most important building material.',
      },
      {
        num: '04',
        title: 'Enduring Design',
        desc: 'Architecture designed to last generations.',
      },
    ],
  },

  journal: {
    label: 'NEWS & WRITING',
    heading: 'Journal',

    items: [
      {
        date: 'Jan 2026',
        title: 'Nordheim Residence Shortlisted',
        tag: 'NEWS',
      },
    ],
  },

  contact: {
    label: 'GET IN TOUCH',
    heading: "Let's discuss your\nnext project",

    email: 'studio@vossarchitects.com',

    offices: [
      {
        city: 'STOCKHOLM',
        address: 'Strandvagen 7B\n11456 Stockholm\nSweden',
        phone: '+46 8 123 456 78',
      },
    ],
  },

  footer: {
    tagline:
      'Award-winning architecture studio based in Stockholm and Copenhagen.',

    navigation: 'NAVIGATION',

    social: 'SOCIAL',

    navLinks: [
      'Projects',
      'Studio',
      'Approach',
      'Journal',
      'Contact',
    ],

    socialLinks: [
      'Instagram',
      'LinkedIn',
      'Pinterest',
    ],

    rights: '@2026 Bodi Properties. All rights reserved.',

    location: 'Stockholm & Copenhagen',
  },
}

export type Translations = typeof en

export const translations: Record<Language, Translations> = {
  EN: en,

  MN: {
    ...en,

    nav: {
      brand: 'БОДЬ ПРОПЕРТИЙЗ',
      projects: 'ТӨСЛҮҮД',
      studio: 'СТУДИ',
      approach: 'ХАНДЛАГА',
      journal: 'СЭТГҮҮЛ',
      contact: 'ХОЛБОО БАРИХ',
    },

    hero: {
      tagline: '2003 ОН',
      heading: 'Орчныг бүтээх архитектур',
      scroll: 'ДООШ ГҮЙЛГЭХ',
    },

    projects: {
      ...en.projects,

      label: 'СОНГОСОН ТӨСЛҮҮД',
      heading: 'Төслүүд',
      count: '(04) Төсөл',
      viewProject: 'ТӨСӨЛ ҮЗЭХ',
      close: 'ХААХ',
    },

    quote: {
      text: 'Архитектур нь цаг хугацааг даван туулах ёстой.',
      author: 'ҮҮСГЭН БАЙГУУЛАГЧ',
    },

    studio: {
      ...en.studio,

      label: 'КОМПАНИЙН ТУХАЙ',

      heading:
        'Архитектур бол олон нийтийн урлагийн хамгийн дотно хэлбэр',

      p1: 'Бодь Пропертийз нь чанартай орон зай бүтээх зорилготой байгуулагдсан.',

      p2: 'Бид орчин, гэрэл, хүний хэрэглээг судалж архитектур бүтээдэг.',

      stats: {
        projects: 'ХЭРЭГЖҮҮЛСЭН ТӨСӨЛ',
        awards: 'ШАГНАЛ',
        years: 'ТУРШЛАГА',
      },
    },

    contact: {
      ...en.contact,

      label: 'ХОЛБОО БАРИХ',

      heading: 'Дараагийн төслийн\nтухай ярилцъя',
    },

    footer: {
      ...en.footer,

      navigation: 'ЦЭС',

      social: 'СОШИАЛ',

      rights: '©2026 Бодь Пропертийз. Бүх эрх хуулиар хамгаалагдсан.',

      location: 'Улаанбаатар',
    },
  },
}