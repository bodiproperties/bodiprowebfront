export type Language = "EN" | "MN";

const en = {
  nav: {
    brand: "BODI PROPERTIES",
    about: "ABOUT US",
    services: "SERVICES",
    projects: "PROJECTS",
    news: "NEWS",
    careers: "CAREERS",
  },

  hero: {
    tagline: "2026",
    heading: "A Leader in the\nConstruction\nIndustry",
    outlineIndex: 1,
    scroll: "SCROLL TO EXPLORE",
    serv1: "ARCHITECTURE",
    serv2: "INTERIOR DESIGN",
    serv3: "CONSTRUCTION",
    serv4: "PROJECT MANAGEMENT",
    serv5: "RENOVATION",
    serv6: "CONSULTING",
    partners: "OUR PARTNERS",
  },

  about: {
    label: "ABOUT US",
    name: "БОДЬ ПРОПЕРТИЙЗ",
    since: "ABOUT 2026",
    heading: "We are a team of architects, designers and builders",
    slogan: "BUILDING THE FUTURE THROUGH DEVELOPMENT",
    decs: "Since 1997, we have remained committed to excellence, innovation, and sustainable development.",
    p1: "Building the future",
    p2: "through development",

    // About page
    heroPill: "Bodi Properties · About 2026",
    heroCta: "Learn more",
    valuesTitle: "Our Values",
    intro:
      "Bodi Properties LLC began operating in 1997 as a project organization delivering real estate and construction projects end to end — from planning and financing to execution. Since its founding, the company has successfully completed many projects that have made a real contribution to the construction sector and to the development and character of the nation and its capital.",
    missionTitle: "Mission",
    mission:
      "Guided by quality, innovation and sustainable development, we deliver safe, valuable developments that meet our clients' needs and expectations, creating comfortable places to live and work.",
    visionTitle: "Vision",
    vision:
      "To be the leading company in construction and real estate — setting the standard for innovation, quality and sustainability, and building Mongolia's valuable spaces of the future.",
    stats: [
      { num: "60+", label: "Project management & consulting" },
      { num: "122+", label: "Employees" },
      { num: "140+", label: "International-standard operations" },
      { num: "31+", label: "Completed developments" },
    ],
    ctaTitle: "Let's build something timeless together",
    ctaBtn: "Contact us",
    form: {
      label: "Contact Us",
      title: "Start Your Project",
      name: "Full name",
      phone: "Phone number",
      email: "Email address",
      message: "Tell us about your project...",
      submit: "Send message",
      close: "Close",
      mailSubject: "Project inquiry",
    },
  },

  projects: {
    label: "SELECTED WORK",
    heading: "Projects",
    count: "(04) Projects",
    viewProject: "VIEW PROJECT",
    close: "CLOSE",
    projectcounts: "PROJECTS",
    projectsince: "SINCE",
    projetlocation: "LOCATION",
    notAvailable: "This project is not available in English.",
    allProjects: "All projects",

    // Projects hero
    heroPill: "Bodi Properties · Projects 2026",
    heroLabel: "Completed Projects",
    heroTitle1: "Built to stand",
    heroTitle2: "the test of time",
    heroDesc:
      "Combining quality, design and innovation, we deliver valuable developments and projects that earn our clients' trust.",
    heroCta: "View projects",

    // Projects page
    stats: [
      { num: "80+", label: "Projects" },
      { num: "12", label: "Years Experience" },
      { num: "25+", label: "Clients" },
      { num: "10+", label: "Awards" },
    ],
    portfolio: "Portfolio",
    featuredTitle: "Featured Projects",
    tabs: {
      All: "All",
      Interior: "Interior",
      Apartment: "Apartment",
      Office: "Office",
      Garden: "Garden",
      Construction: "Construction",
    },
    quote: "Architecture begins where engineering ends and emotion begins.",
    quoteAuthor: "Studio Philosophy",
    ctaTitle: "Have a project in mind?",
    ctaDesc: "Let's create spaces that inspire and endure.",
    ctaBtn: "Start a project",

    modal: {
      type: "TYPE",
      location: "LOCATION",
      year: "YEAR",
      description: "DESCRIPTION",
      overview: "OVERVIEW",
      client: "CLIENT",
      area: "AREA",
      status: "STATUS",
      services: "SERVICES",
      gallery: "GALLERY",
      next: "NEXT PROJECT",
    },
  },

  news: {
    label: "Insights, ideas and",
    heading: "stories from our studio",
    badge: "NEWS",
    desc: "We are a team of architects, designers and builders. We create architecture by studying the environment, light, and the way people experience and use space.",
    stat1: "PROJECTS COMPLETED",
    stat2: "NATIONAL AWARDS",
    stat3: "YEARS OF PRACTICE",
    stat4: "YEARS OF PRACTICE",
    newsbadge: "NEWS",
    title1: "Nordheim Residence Shortlisted",
    title2: "Nordheim Residence Shortlisted",
    desc1:
      "We are a team of architects, designers and builders. We create architecture by studying the environment, light, and the way people experience and use space.",

    // News hero
    heroPill: "Bodi Properties · Journal 2026",
    heroLabel: "Journal",
    heroDesc:
      "Exploring architecture, material, light and human experience through essays and research.",
    heroCta: "View articles",

    // News page
    pageStats: [
      { num: "120+", label: "Articles" },
      { num: "8", label: "Categories" },
      { num: "50K+", label: "Readers" },
      { num: "2026", label: "Latest Edition" },
    ],
    latest: "Latest Articles",
    sectionTitle: "News & Insights",
    sectionDesc:
      "Exploring architecture, material, light and human experience.",
    searchPlaceholder: "Search articles...",
    categories: {
      all: "All",
      insights: "Insights",
      essay: "Essay",
      research: "Research",
    },
    featured: "Featured",
    readMore: "Read Article",
    empty: "No articles found matching your filter criteria.",
    clearFilters: "Clear search filters",
    quote:
      "Architecture is the learned game, correct and magnificent, of forms assembled in light.",
    quoteAuthor: "Le Corbusier",
    ctaTitle: "Stay informed.",
    ctaDesc: "Discover our latest articles, ideas and studio updates.",
    subscribe: "Subscribe",

    // News detail page
    detail: {
      label: "News / Article",
      published: "Published",
      minRead: "min read",
      category: "Category",
      categoryValue: "News",
      author: "Author",
      authorValue: "Studio Team",
      readingTime: "Reading Time",
      min: "min",
      share: "Share",
      copyLink: "Copy link",
      copied: "Link copied",
      nextArticle: "Next article",
      allArticles: "All Articles",
      notAvailable: "This article is not available in English.",
    },
  },

  services: {
    heroPill: "Bodi Properties · Services 2026",
    heroLabel: "Services",
    heroTitle1: "The perfect balance",
    heroTitle2: "of form and feeling",
    heroDesc:
      "Bodi Properties LLC delivers quality construction in step with the growth of Mongolia's building industry.",
    heroCta: "View services",

    items: [
      {
        slug: "architecture",
        title: "Architectural Design",
        desc: "We follow a clear sequence: planning and research, concept design, technical drawings, permitting, and the start of construction.",
      },
      {
        slug: "interior",
        title: "Geodetic Survey & Mapping",
        desc: "Geodetic surveying is essential throughout construction, operation and maintenance — precisely setting out building axes and elevations, producing site plans, and locating engineering utility networks.",
      },
      {
        slug: "urban",
        title: "Construction Management",
        desc: "Successful construction depends on effective project management, so we use every available means to keep each project on track and profitable.",
      },
      {
        slug: "consulting",
        title: "Consulting Services",
        desc: "We provide professional advice and support at every stage of a construction project — design development, construction, site supervision and project documentation — from the first day to the last.",
      },
    ],
    viewDetails: "View details",
    stripTitle: "Design is not what it looks like.",
    stripDesc: "It is how it works and how it feels.",
    ctaTitle: "Let's build something meaningful together.",
  },

  hr: {
    label: "Why Bodi Properties",
    heading: "Great places begin with great people.",
    desc: "At Bodi Properties, we believe our people are at the heart of everything we build. We foster a collaborative and professional environment where talented individuals can grow, contribute, and build meaningful careers.",
    desc1:
      "We bring together diverse expertise, encourage new ideas, and support continuous learning — creating opportunities for our people to grow together with the company.",
    benetitle: "Benefits",
    benefits: [
      "Professional Development",
      "Competitive Compensation",
      "Flexible Work Environment",
      "Career Growth Opportunities",
    ],
    openPositions: "Open Positions",
    hiringProcess: "Current Opportunities",
    testimonials:
      "Join an innovative team committed to architectural excellence and personal growth.",
    roadmap: "Roadmap to Join Us",
    hiringProc: "Hiring Process",
    hiringDesc:
      "Our hiring process is transparent, efficient, and designed to understand your unique strengths.",
    interest: "Interested in joining our team?",
    sent: "Send your portfolio and CV to careers@bodiproperties.mn",
    btn: "Apply Now",
    life: "Life at Bodi Properties",
    team: "Team Voices",
  },

  quote: {
    text: '"Architecture should speak of its time and place, but yearn for timelessness."',
    author: "BODI PROPERTIES LLC CEO",
  },

  studio: {
    label: "ABOUT COMPANY",
    heading: "We believe architecture is the most intimate form of public art",
    p1: "Bodi Properties was established with the purpose of creating high-quality spaces.",
    p2: "We create architecture by studying the environment, light, and the way people experience and use space.",
    stats: {
      projects: "PROJECTS COMPLETED",
      awards: "NATIONAL AWARDS",
      years: "YEARS OF PRACTICE",
    },
  },

  approach: {
    label: "OUR APPROACH",
    heading: "Approach",
    items: [
      {
        num: "01",
        title: "Context First",
        desc: "Every design responds to its environment.",
      },
      {
        num: "02",
        title: "Material Honesty",
        desc: "Concrete, timber, glass and stone are used with respect.",
      },
      {
        num: "03",
        title: "Light as Material",
        desc: "Natural light is our most important building material.",
      },
      {
        num: "04",
        title: "Enduring Design",
        desc: "Architecture designed to last generations.",
      },
    ],
  },

  journal: {
    label: "NEWS & WRITING",
    heading: "Journal",
    items: [
      {
        date: "Jan 2026",
        title: "Nordheim Residence Shortlisted",
        tag: "NEWS",
      },
    ],
  },

  contact: {
    label: "GET IN TOUCH",
    heading: "Let's discuss your\nnext project",
    email: "info@bodiproperties.mn",
    offices: [
      {
        city: "MONGOLIA",
        address:
          "Extension of Building No. 33, Ikh Toiruu Street, 7th Khoroo, Bayanzürkh District, Ulaanbaatar, Mongolia",
        phone: "+976 77722727",
      },
    ],
  },

  footer: {
    tagline: "Бодит Амжилтын Төлөө",
    navigation: "NAVIGATION",
    social: "SOCIAL",
    navLinks: ["Projects", "Studio", "Approach", "Journal", "Contact"],
    socialLinks: ["Instagram", "LinkedIn", "Pinterest"],
    rights: "©2026 Bodi Properties. All rights reserved.",
    location:
      "Extension of Building No. 33, Ikh Toiruu Street, 7th Khoroo, Bayanzürkh District, Ulaanbaatar, Mongolia",
  },
};

export type Translations = typeof en;

// MN-д top-level `...en` spread байхгүй — ингэснээр аль нэг section
// орчуулагдаагүй үлдвэл TypeScript шууд алдаа заана (англи текст чимээгүй гарахгүй).
const mn: Translations = {
  nav: {
    brand: "БОДЬ ПРОПЕРТИЙЗ",
    about: "БИДНИЙ ТУХАЙ",
    services: "ҮЙЛ АЖИЛЛАГАА",
    projects: "ТӨСЛҮҮД",
    news: "МЭДЭЭ",
    careers: "ХҮНИЙ НӨӨЦ",
  },

  hero: {
    tagline: "2026",
    heading: "БАРИЛГЫН\nСАЛБАРТАА\nМАНЛАЙЛАГЧ",
    outlineIndex: 2,
    scroll: "Доош",
    serv1: "АРХИТЕКТУР",
    serv2: "ДОТОР ЗАСАЛ",
    serv3: "БАРИЛГА",
    serv4: "ТӨСЛИЙН УДИРДЛАГА",
    serv5: "ЗАСВАР ШИНЭЧЛЭЛ",
    serv6: "ЗӨВЛӨГӨӨ",
    partners: "Манай хамтрагчид",
  },

  about: {
    label: "БИДНИЙ ТУХАЙ",
    name: "БОДЬ ПРОПЕРТИЙЗ",
    since: "БИДНИЙ ТУХАЙ 2026",
    heading: "Бид архитектор, дизайнер, барилгачдын нэгдсэн баг",
    slogan: "БҮТЭЭН БАЙГУУЛАЛТААР ИРЭЭДҮЙГ БҮТЭЭНЭ",
    decs: "1997 оноос хойш бид чанар, инноваци, тогтвортой хөгжлийг эрхэмлэсээр ирсэн.",
    p1: "Бүтээн байгуулалтаар",
    p2: "ирээдүйг бүтээнэ",

    // About page
    heroPill: "Бодь Пропертийз · Бидний тухай 2026",
    heroCta: "Дэлгэрэнгүй",
    valuesTitle: "Үнэт зүйл",
    intro:
      "“Бодь Пропертийз” ХХК нь анх 1997 онд үл хөдлөх хөрөнгө, барилга угсралтын ажлын төлөвлөлт, санхүүжилт, хэрэгжилтийг иж бүрнээр нь гүйцэтгэгч төслийн байгууллагын хэлбэрээр үйл ажиллагаа явуулж эхэлсэн. Байгуулагдсанаас хойш барилгын салбар цаашлаад улс, нийслэлийн их бүтээн байгуулалт, өнгө төрхөд бодитой хувь нэмэр оруулсан олон төслийг амжилттай хэрэгжүүлсэн.",
    missionTitle: "Эрхэм зорилго",
    mission:
      "Бид чанар, инноваци, тогтвортой хөгжлийг эрхэмлэн, хэрэглэгчдийн хэрэгцээ, хүлээлтэд нийцсэн аюулгүй, үнэ цэнтэй бүтээн байгуулалтыг хэрэгжүүлж, амьдрах болон ажиллах таатай орчныг бүрдүүлэхийг зорьдог.",
    visionTitle: "Алсын хараа",
    vision:
      "Барилга, үл хөдлөх хөрөнгийн салбарт инноваци, чанар, тогтвортой хөгжлөөр манлайлан, Монголын ирээдүйн үнэ цэнтэй орон зайг бүтээх тэргүүлэгч компани байна.",
    stats: [
      { num: "60+", label: "Төслийн удирдлага, зөвлөх үйлчилгээ" },
      { num: "122+", label: "Манай ажилтнууд" },
      { num: "140+", label: "Олон улсын стандарт хангасан ажиллагаа" },
      { num: "31+", label: "Бодит бүтээн байгуулалтууд" },
    ],
    ctaTitle: "Цаг хугацааг давах бүтээлийг хамтдаа туурвья",
    ctaBtn: "Холбоо барих",
    form: {
      label: "Холбоо барих",
      title: "Төслөө эхлүүлэх",
      name: "Овог нэр",
      phone: "Утасны дугаар",
      email: "И-мэйл хаяг",
      message: "Төслийнхөө талаар бидэнд хэлнэ үү...",
      submit: "Илгээх",
      close: "Хаах",
      mailSubject: "Төслийн хүсэлт",
    },
  },

  projects: {
    label: "Шинэ Төслүүд",
    heading: "Төслүүд",
    count: "(04) Төсөл",
    viewProject: "ТӨСӨЛ ҮЗЭХ",
    close: "ХААХ",
    projectcounts: "ТӨСЛҮҮД",
    projectsince: "Оноос хойш",
    projetlocation: "БАЙРШИЛ",
    notAvailable: "Энэ төсөл монгол хэл дээр байхгүй байна.",
    allProjects: "Бүх төсөл",

    // Projects hero
    heroPill: "Бодь Пропертийз · Төслүүд 2026",
    heroLabel: "Хэрэгжүүлсэн төслүүд",
    heroTitle1: "Цаг хугацааны",
    heroTitle2: "шалгуурыг давах",
    heroDesc:
      "Чанар, дизайн, инновацыг хослуулан үнэ цэнтэй бүтээн байгуулалтыг бий болгож, харилцагчдынхаа итгэлийг даасан төслүүдийг хэрэгжүүлж байна.",
    heroCta: "Төслүүдийг үзэх",

    // Projects page
    stats: [
      { num: "80+", label: "Төсөл" },
      { num: "12", label: "Жилийн туршлага" },
      { num: "25+", label: "Харилцагч" },
      { num: "10+", label: "Шагнал" },
    ],
    portfolio: "Портфолио",
    featuredTitle: "Онцлох төслүүд",
    tabs: {
      All: "Бүгд",
      Interior: "Дотор засал",
      Apartment: "Орон сууц",
      Office: "Оффис",
      Garden: "Ландшафт",
      Construction: "Барилга",
    },
    quote: "Архитектур нь инженерчлэл дуусч, мэдрэмж эхэлдэг газраас эхэлдэг.",
    quoteAuthor: "Студийн философи",
    ctaTitle: "Төслийн санаа байна уу?",
    ctaDesc: "Урам зориг өгөх, удаан эдлэгдэх орон зайг хамтдаа бүтээе.",
    ctaBtn: "Төсөл эхлүүлэх",

    modal: {
      type: "ТӨРӨЛ",
      location: "БАЙРШИЛ",
      year: "ОН",
      description: "ТАЙЛБАР",
      overview: "ЕРӨНХИЙ ТОЙМ",
      client: "ЗАХИАЛАГЧ",
      area: "ТАЛБАЙ",
      status: "ТӨЛӨВ",
      services: "ҮЙЛЧИЛГЭЭ",
      gallery: "ЗУРГИЙН ЦОМОГ",
      next: "ДАРААГИЙН ТӨСӨЛ",
    },
  },

  news: {
    label: "Орон зай, архитектур",
    heading: "бүтээлийн цаадах түүх",
    badge: "МЭДЭЭ",
    desc: "Архитектур, үл хөдлөх хөрөнгө, бүтээн байгуулалт болон орон зайн шинэ хандлагын талаарх бидний мэдлэг, санаа, туршлага.",
    stat1: "ХЭРЭГЖҮҮЛСЭН ТӨСӨЛ",
    stat2: "ҮНДЭСНИЙ ШАГНАЛ",
    stat3: "ЖИЛИЙН ТУРШЛАГА",
    stat4: "ЖИЛИЙН ТУРШЛАГА",
    newsbadge: "МЭДЭЭ",
    title1: "Nordheim Residence Shortlisted",
    title2: "Nordheim Residence Shortlisted",
    desc1:
      "Бид архитектор, дизайнер, барилгачдаас бүрдсэн баг. Орчин, гэрэл, хүмүүс орон зайг хэрхэн мэдэрч ашигладгийг судалж архитектурыг бүтээдэг.",

    // News hero
    heroPill: "Бодь Пропертийз · Сэтгүүл 2026",
    heroLabel: "Сэтгүүл",
    heroDesc:
      "Архитектур, материал, гэрэл болон хүний мэдрэмжийг эссэ, судалгаагаар дамжуулан нээн харуулна.",
    heroCta: "Нийтлэлүүдийг үзэх",

    // News page
    pageStats: [
      { num: "120+", label: "Нийтлэл" },
      { num: "8", label: "Ангилал" },
      { num: "50K+", label: "Уншигч" },
      { num: "2026", label: "Сүүлийн дугаар" },
    ],
    latest: "Шинэ нийтлэлүүд",
    sectionTitle: "Мэдээ & мэдээлэл",
    sectionDesc: "Архитектур, материал, гэрэл болон хүний мэдрэмжийн тухай.",
    searchPlaceholder: "Нийтлэл хайх...",
    categories: {
      all: "Бүгд",
      insights: "Тойм",
      essay: "Эссэ",
      research: "Судалгаа",
    },
    featured: "Онцлох",
    readMore: "Дэлгэрэнгүй унших",
    empty: "Хайлтад тохирох нийтлэл олдсонгүй.",
    clearFilters: "Шүүлтүүрийг цэвэрлэх",
    quote:
      "Архитектур бол гэрэлд угсрагдсан хэлбэрүүдийн мэдлэгтэй, оновчтой бөгөөд сүрлэг тоглоом юм.",
    quoteAuthor: "Ле Корбюзье",
    ctaTitle: "Мэдээллээс бүү хоцроорой.",
    ctaDesc: "Манай шинэ нийтлэл, санаа, студийн мэдээг цаг алдалгүй аваарай.",
    subscribe: "Бүртгүүлэх",

    // News detail page
    detail: {
      label: "Мэдээ / Нийтлэл",
      published: "Нийтэлсэн:",
      minRead: "мин унших",
      category: "Ангилал",
      categoryValue: "Мэдээ",
      author: "Нийтлэгч",
      authorValue: "Бодь Пропертийз",
      readingTime: "Унших хугацаа",
      min: "мин",
      share: "Хуваалцах",
      copyLink: "Холбоос хуулах",
      copied: "Хуулагдлаа",
      nextArticle: "Дараагийн нийтлэл",
      allArticles: "Бүх нийтлэл",
      notAvailable: "Энэ мэдээ монгол хэл дээр байхгүй байна.",
    },
  },

  services: {
    heroPill: "Бодь Пропертийз · Үйл ажиллагаа 2026",
    heroLabel: "Үйл ажиллагаа",
    heroTitle1: "Хэлбэр, мэдрэмжийн",
    heroTitle2: "төгс тэнцвэр",
    heroDesc:
      "“Бодь Пропертийз” ХХК нь Монгол Улсын барилгын салбарын хөгжилтэй хөл нийлүүлэн, чанартай бүтээн байгуулалтыг хэрэгжүүлэн ажиллаж байна.",
    heroCta: "Үйл ажиллагааг үзэх",

    items: [
      {
        slug: "architecture",
        title: "Барилгын зураг төсөл",
        desc: "Манай компани нь төлөвлөлт ба судалгаа, эх загвар боловсруулах, техникийн зураг төсөл, зөвшөөрөл авах, барилгын ажил эхлүүлэх гэсэн дарааллыг баримталдаг.",
      },
      {
        slug: "interior",
        title: "Геодезийн хэмжилт, зураглал",
        desc: "Барилгын геодезийн хэмжилт, зураглал нь барилга байгууламжийн угсралт, ашиглалт, засварын үе шатанд хийгддэг чухал ажил юм. Энэ нь барилгын тэнхлэг, өндрийг нарийвчлалтайгаар тодорхойлох, талбайн дэвсгэр зураг гаргах, инженерийн шугам сүлжээний байршлыг тодорхойлох зэрэг ажлыг хамардаг.",
      },
      {
        slug: "urban",
        title: "Барилгын менежмент",
        desc: "Барилга угсралтын аливаа ажлыг амжилттай дуусгах нь төслийн үр дүнтэй менежментээр хэрэгждэг тул бид төслийг ашигтай байлгах зорилгоор бүх боломжийг ашиглан хэрэгжүүлдэг.",
      },
      {
        slug: "consulting",
        title: "Зөвлөх үйлчилгээ",
        desc: "Бид барилгын төслийн бүх үе шатанд мэргэжлийн зөвлөгөө, дэмжлэг үзүүлдэг. Үүнд зураг төсөл боловсруулах, угсралтын ажил гүйцэтгэх, талбайн хяналт хийх, төслийн баримт бичиг боловсруулах ажил багтана. Барилгын үйл ажиллагааны эхнээс эцэс хүртэл хамт байдаг.",
      },
    ],
    viewDetails: "Дэлгэрэнгүй",
    stripTitle: "Дизайн бол зөвхөн гадаад төрх биш.",
    stripDesc: "Энэ нь хэрхэн ажиллаж, хэрхэн мэдрэгдэхийн тухай юм.",
    ctaTitle: "Утга учиртай зүйлийг хамтдаа бүтээе.",
  },

  hr: {
    label: "Яагаад Бодь Пропертийз",
    heading: "Сайн бүтээн байгуулалтын үндэс нь сайн хүмүүс.",
    desc: "Бодь Пропертийз амжилтын үндэс нь бидний хүмүүс юм. Бид авьяас чадвараа хөгжүүлж, өөрийн хувь нэмрээ оруулж, урт хугацааны карьер бүтээх боломжтой мэргэжлийн, хамтын ажиллагаанд суурилсан орчныг бүрдүүлдэг.",
    desc1:
      "Бид олон талын мэдлэг, туршлагыг нэгтгэж, шинэ санааг дэмжин, тасралтгүй суралцах, хөгжих боломжийг олгон хүн бүрийг компанитайгаа хамт өсөж хөгжихийг дэмждэг.",
    benetitle: "Ажилтанд олгох боломжууд",
    benefits: [
      "Мэргэжлийн хөгжил",
      "Өрсөлдөхүйц цалин, урамшуулал",
      "Хамтын ажиллагаанд суурилсан орчин",
      "Карьерын өсөлт",
    ],
    openPositions: "Нээлттэй ажлын байр",
    hiringProcess: "Сонгон шалгаруулалт",
    testimonials:
      "Архитектурын шилдэг шийдэл, мэргэжлийн өсөлт хөгжилд тэмүүлсэн хамт олонтой нэгдээрэй.",
    roadmap: "Манай багт нэгдэх замнал",
    hiringProc: "Сонгон шалгаруулалтын үе шат",
    hiringDesc:
      "Бидний сонгон шалгаруулалтын үйл явц нээлттэй, шуурхай бөгөөд таны мэдлэг, ур чадвар, давуу талыг таньж мэдэхэд чиглэдэг.",
    interest: "Манай багт нэгдэх сонирхолтой байна уу?",
    sent: "CV болон портфолиогоо careers@bodiproperties.mn хаягаар илгээнэ үү.",
    btn: "Анкет илгээх",
    life: "Бодь Пропертийз-ийн ажиллах орчин",
    team: "Хамт олны дуу хоолой",
  },

  quote: {
    text: "Архитектур нь цаг хугацааг даван туулах ёстой.",
    author: "ҮҮСГЭН БАЙГУУЛАГЧ",
  },

  studio: {
    label: "КОМПАНИЙН ТУХАЙ",
    heading: "Архитектур бол олон нийтийн урлагийн хамгийн дотно хэлбэр",
    p1: "Бодь Пропертийз нь чанартай орон зай бүтээх зорилготой байгуулагдсан.",
    p2: "Бид орчин, гэрэл, хүний хэрэглээг судалж архитектур бүтээдэг.",
    stats: {
      projects: "ХЭРЭГЖҮҮЛСЭН ТӨСӨЛ",
      awards: "ШАГНАЛ",
      years: "ТУРШЛАГА",
    },
  },

  approach: {
    label: "БИДНИЙ ФИЛОСОФИ",
    heading: "ХАНДЛАГА",
    items: [
      {
        num: "01",
        title: "Орчин нөхцөл нэгдүгээрт",
        desc: "Бид архитектурыг тухайн газрын онцлог, орчин, уур амьсгал болон хүний хэрэгцээнээс эхлүүлдэг.",
      },
      {
        num: "02",
        title: "Материалын үнэн чанар",
        desc: "Бид материалын төрөлхийн чанар, бүтэц, өнгө, мэдрэмжийг хүндэтгэж, цаг хугацааны явцад үнэ цэнээ хадгалах шийдлийг сонгодог.",
      },
      {
        num: "03",
        title: "Гэрэл бол архитектурын нэг хэсэг",
        desc: "Гэрэл, сүүдэр, орон зайн харилцан үйлчлэлийг ашиглан архитектурт уур амьсгал, мэдрэмж, амьд чанарыг бий болгодог.",
      },
      {
        num: "04",
        title: "Цаг хугацааг давах дизайн",
        desc: "Түр зуурын чиг хандлагыг дагахаас илүү олон үеийн турш үнэ цэнээ хадгалах, мөн чанараа алдахгүй архитектурыг бүтээхийг зорьдог.",
      },
    ],
  },

  journal: {
    label: "СҮҮЛИЙН ҮЕИЙН",
    heading: "МЭДЭЭ МЭДЭЭЛЭЛ",
    items: [
      {
        date: "2026.01",
        title: "Nordheim Residence Shortlisted",
        tag: "МЭДЭЭ",
      },
    ],
  },

  contact: {
    label: "ХОЛБОО БАРИХ",
    heading: "Дараагийн төслийн\nтухай ярилцъя",
    email: "info@bodiproperties.mn",
    offices: [
      {
        city: "МОНГОЛ УЛС",
        address:
          "Монгол Улс, Улаанбаатар хот, Баянзүрх дүүрэг, 7-р хороо, Их тойруу, 33-р байрны өргөтгөл",
        phone: "+976 77722727",
      },
    ],
  },

  footer: {
    tagline: "Бодит Амжилтын Төлөө",
    navigation: "ЦЭС",
    social: "СОШИАЛ",
    navLinks: ["Төслүүд", "Студи", "Хандлага", "Мэдээ", "Холбоо барих"],
    socialLinks: ["Instagram", "LinkedIn", "Pinterest"],
    rights: "©2026 Бодь Пропертийз. Бүх эрх хуулиар хамгаалагдсан.",
    location:
      "Монгол Улс, Улаанбаатар хот, Баянзүрх дүүрэг, 7-р хороо, Их тойруу, 33-р байрны өргөтгөл",
  },
};

export const translations: Record<Language, Translations> = {
  EN: en,
  MN: mn,
};
