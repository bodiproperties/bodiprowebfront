import type { Language } from './i18n'

export const pagesContent = {
  EN: {
    nav: {
      about: 'ABOUT',
      services: 'SERVICES',
      projects: 'PROJECTS',
      news: 'NEWS',
      careers: 'CAREERS',
    },
    common: {
      backHome: 'BACK TO HOME',
      readMore: 'READ MORE',
      viewAll: 'VIEW ALL',
      getInTouch: 'GET IN TOUCH',
    },
    // ABOUT — Бидний тухай
    about: {
      eyebrow: 'ABOUT THE STUDIO',
      title: 'We shape\nspaces that\noutlive trends',
      intro:
        'Voss Architects is an award-winning practice working at the intersection of architecture, landscape, and human experience. For over two decades we have designed buildings that feel inevitable — quiet, durable, and deeply rooted in their place.',
      storyLabel: 'OUR STORY',
      story: [
        'Founded in Stockholm in 2003 by Erik Voss, the studio began with a single conviction: that thoughtful design transforms not just spaces, but the lives unfolding within them.',
        'Today we are a team of forty architects, designers, and thinkers working across Scandinavia and Northern Europe — from private residences to cultural institutions and urban masterplans.',
      ],
      timelineLabel: 'MILESTONES',
      timeline: [
        { year: '2003', title: 'Studio Founded', desc: 'Erik Voss opens the practice in a small Stockholm atelier.' },
        { year: '2009', title: 'First Major Award', desc: 'Nordic Architecture Prize for the Lund Pavilion.' },
        { year: '2015', title: 'Copenhagen Office', desc: 'Expansion into Denmark with a second studio.' },
        { year: '2021', title: 'Global Recognition', desc: 'Featured at the Venice Architecture Biennale.' },
        { year: '2026', title: 'Forty Strong', desc: 'A multidisciplinary team across two countries.' },
      ],
      teamLabel: 'THE PEOPLE',
      teamHeading: 'Led by people who care about the details',
      team: [
        { name: 'Erik Voss', role: 'Founding Partner' },
        { name: 'Astrid Lindqvist', role: 'Design Director' },
        { name: 'Mikael Sorensen', role: 'Partner, Urbanism' },
        { name: 'Johanna Berg', role: 'Head of Interiors' },
      ],
      stats: [
        { value: '23', label: 'YEARS OF PRACTICE' },
        { value: '87', label: 'PROJECTS COMPLETED' },
        { value: '14', label: 'INTERNATIONAL AWARDS' },
        { value: '40', label: 'TEAM MEMBERS' },
      ],
    },
    // SERVICES — Үйл ажиллагаа
    services: {
      eyebrow: 'WHAT WE DO',
      title: 'A complete\npractice, from\nsketch to key',
      intro:
        'We offer an integrated approach to design. Whether a private home or a city block, every commission moves through the same rigorous process — research, concept, craft, and care.',
      listLabel: 'OUR SERVICES',
      items: [
        {
          num: '01',
          title: 'Architecture',
          desc: 'Full architectural design for residential, cultural, and commercial buildings — from concept through construction administration.',
          tags: ['Concept Design', 'Technical Detailing', 'Site Supervision'],
        },
        {
          num: '02',
          title: 'Interior Design',
          desc: 'Considered interiors where every surface, joint, and fixture is part of a single coherent vision of how a space should feel.',
          tags: ['Spatial Planning', 'Material Selection', 'Custom Furniture'],
        },
        {
          num: '03',
          title: 'Urban Planning',
          desc: 'Masterplans and public spaces that balance density, daylight, and community — designed for how cities actually live.',
          tags: ['Masterplanning', 'Public Realm', 'Feasibility'],
        },
        {
          num: '04',
          title: 'Landscape',
          desc: 'Landscape architecture that blurs the line between building and ground, weaving structures into their natural setting.',
          tags: ['Garden Design', 'Topography', 'Ecology'],
        },
      ],
      processLabel: 'HOW WE WORK',
      processHeading: 'Four stages, one conversation',
      process: [
        { num: '01', title: 'Listen', desc: 'We begin with the site, the brief, and the people. Understanding precedes drawing.' },
        { num: '02', title: 'Explore', desc: 'Sketches, models, and studies. We test ideas openly until the right one emerges.' },
        { num: '03', title: 'Refine', desc: 'Concept becomes craft. Every detail is resolved with precision and intent.' },
        { num: '04', title: 'Realise', desc: 'We stay on site through completion, protecting the integrity of the design.' },
      ],
    },
    // PROJECTS — Төслүүд
    projects: {
      eyebrow: 'SELECTED WORK',
      title: 'Projects',
      intro:
        'A selection of completed and ongoing work across residential, cultural, and public architecture. Each project is a response to a specific place, brief, and moment.',
      filters: ['ALL', 'RESIDENTIAL', 'CULTURAL', 'COMMERCIAL'],
    },
    // NEWS — Мэдээ, мэдээлэл
    news: {
      eyebrow: 'NEWS & WRITING',
      title: 'Journal',
      intro:
        'Awards, press, essays, and dispatches from the studio. A record of what we are building, thinking, and reading.',
      featuredLabel: 'FEATURED',
      featured: {
        tag: 'NEWS',
        date: 'January 2026',
        title: 'Nordheim Residence Shortlisted for the Nordic Architecture Prize',
        excerpt:
          'Our cliffside residence in northern Norway has been recognised among five finalists for the regions most prestigious architecture award, celebrating its dialogue between structure and landscape.',
      },
      listLabel: 'LATEST',
      items: [
        { date: 'Dec 2025', tag: 'INTERVIEW', title: 'On Materiality: A Conversation with Studio Voss', excerpt: 'Design Director Astrid Lindqvist on honesty in concrete, timber, and time.' },
        { date: 'Nov 2025', tag: 'PRESS', title: 'The Lund Pavilion Published in Architectural Review', excerpt: 'A six-page feature on our award-winning cultural pavilion in southern Sweden.' },
        { date: 'Oct 2025', tag: 'ESSAY', title: 'Designing for Northern Light', excerpt: 'Lessons from twenty years of building under the low Scandinavian sun.' },
        { date: 'Sep 2025', tag: 'NEWS', title: 'Voss Opens New Workshop in Copenhagen', excerpt: 'A dedicated model-making and materials studio in the heart of the city.' },
        { date: 'Aug 2025', tag: 'PRESS', title: 'Erik Voss Named to the Wallpaper* Power List', excerpt: 'Recognition among the most influential figures shaping contemporary design.' },
        { date: 'Jul 2025', tag: 'ESSAY', title: 'The Case for Slow Architecture', excerpt: 'Why the best buildings refuse to be rushed.' },
      ],
    },
    // CAREERS — Хүний нөөц
    careers: {
      eyebrow: 'JOIN THE STUDIO',
      title: 'Build a\ncareer worth\nbuilding',
      intro:
        'We are always looking for curious, rigorous people who believe that architecture matters. If you care about craft and want to grow, we would love to hear from you.',
      cultureLabel: 'LIFE AT VOSS',
      cultureHeading: 'A studio built on craft, trust, and time',
      benefits: [
        { title: 'Studio Culture', desc: 'Flat hierarchy, open critique, and a shared library. Everyone has a voice in the work.' },
        { title: 'Growth', desc: 'Mentorship from senior partners, funded learning, and a clear path to leadership.' },
        { title: 'Balance', desc: 'Flexible hours, generous leave, and summer Fridays. We build for the long term.' },
        { title: 'Travel', desc: 'Site visits across Scandinavia and study trips to the worlds great buildings.' },
      ],
      openingsLabel: 'OPEN POSITIONS',
      openings: [
        { role: 'Senior Architect', location: 'Stockholm', type: 'Full-time' },
        { role: 'Junior Architect', location: 'Copenhagen', type: 'Full-time' },
        { role: 'Interior Designer', location: 'Stockholm', type: 'Full-time' },
        { role: 'Architectural Visualiser', location: 'Remote', type: 'Contract' },
        { role: 'Studio Internship', location: 'Stockholm', type: 'Internship' },
      ],
      ctaHeading: 'Don\u2019t see your role?',
      ctaText: 'We are always glad to meet talented people. Send us your portfolio.',
      apply: 'APPLY NOW',
      sendPortfolio: 'SEND PORTFOLIO',
    },
  },

  MN: {
    nav: {
      about: 'БИДНИЙ ТУХАЙ',
      services: 'ҮЙЛ АЖИЛЛАГАА',
      projects: 'ТӨСЛҮҮД',
      news: 'МЭДЭЭ',
      careers: 'ХҮНИЙ НӨӨЦ',
    },
    common: {
      backHome: 'НҮҮР ХУУДАС РУУ',
      readMore: 'ДЭЛГЭРЭНГҮЙ',
      viewAll: 'БҮГДИЙГ ХАРАХ',
      getInTouch: 'ХОЛБОО БАРИХ',
    },
    // Бидний тухай
    about: {
      eyebrow: 'СТУДИЙН ТУХАЙ',
      title: 'Бид цаг\nүеийг даван\nтуулах орон\nзайг бүтээдэг',
      intro:
        'Восс Архитекторс бол архитектур, ландшафт, хүний мэдрэмжийн уулзварт ажилладаг шагналт студи юм. Хорь гаруй жилийн турш бид зайлшгүй мэт санагдах — нам гүм, бат бөх, газартайгаа гүн уялдаатай барилгуудыг зохион бүтээж ирсэн.',
      storyLabel: 'БИДНИЙ ТҮҮХ',
      story: [
        '2003 онд Стокгольмд Эрик Восс үүсгэн байгуулсан студи нь нэг итгэл үнэмшлээс эхэлсэн: зохистой дизайн нь зөвхөн орон зайг бус, тэнд өрнөж буй амьдралыг өөрчилдөг.',
        'Өнөөдөр бид Скандинав болон Хойд Европ даяар — хувийн орон сууцнаас эхлээд соёлын байгууллага, хотын төлөвлөлт хүртэл ажилладаг дөчин архитектор, дизайнер, сэтгэгчдийн баг болсон.',
      ],
      timelineLabel: 'ЧУХАЛ ҮЕ ШАТУУД',
      timeline: [
        { year: '2003', title: 'Студи үүсгэн байгуулагдав', desc: 'Эрик Восс Стокгольмын жижиг ателье нээв.' },
        { year: '2009', title: 'Анхны том шагнал', desc: 'Лунд Павильоны төслөөр Нордик Архитектурын шагнал.' },
        { year: '2015', title: 'Копенгаген оффис', desc: 'Дани улсад хоёр дахь студиэ нээв.' },
        { year: '2021', title: 'Дэлхийн хүлээн зөвшөөрөл', desc: 'Венецийн Архитектурын Биеннальд оролцов.' },
        { year: '2026', title: 'Дөчин хүчтэй', desc: 'Хоёр улсыг хамарсан мультидисциплинар баг.' },
      ],
      teamLabel: 'ХҮМҮҮС',
      teamHeading: 'Нарийн ширийн зүйлд анхаардаг хүмүүс удирддаг',
      team: [
        { name: 'Эрик Восс', role: 'Үүсгэн байгуулагч' },
        { name: 'Астрид Линдквист', role: 'Дизайны захирал' },
        { name: 'Микаэл Соренсен', role: 'Хамтрагч, Урбанизм' },
        { name: 'Йоханна Берг', role: 'Интерьерийн дарга' },
      ],
      stats: [
        { value: '23', label: 'ТУРШЛАГЫН ЖИЛ' },
        { value: '87', label: 'ГҮЙЦЭТГЭСЭН ТӨСӨЛ' },
        { value: '14', label: 'ОЛОН УЛСЫН ШАГНАЛ' },
        { value: '40', label: 'БАГИЙН ГИШҮҮН' },
      ],
    },
    // Үйл ажиллагаа
    services: {
      eyebrow: 'БИДНИЙ ҮЙЛ АЖИЛЛАГАА',
      title: 'Ноороглосноос\nтүлхүүр хүртэл\nбүрэн үйлчилгээ',
      intro:
        'Бид дизайнд цогц хандлагыг санал болгодог. Хувийн байшин ч бай, хотын блок ч бай, бүх захиалга ижил нямбай үйл явцаар дамждаг — судалгаа, үзэл баримтлал, ур чадвар, анхаарал халамж.',
      listLabel: 'БИДНИЙ ҮЙЛЧИЛГЭЭ',
      items: [
        {
          num: '01',
          title: 'Архитектур',
          desc: 'Орон сууц, соёл, арилжааны барилгуудын бүрэн архитектурын дизайн — үзэл баримтлалаас барилгын удирдлага хүртэл.',
          tags: ['Үзэл баримтлал', 'Техникийн зураг', 'Талбайн хяналт'],
        },
        {
          num: '02',
          title: 'Интерьер дизайн',
          desc: 'Бүх гадаргуу, холболт, тоноглол нь орон зайн нэгдмэл үзэл баримтлалын хэсэг болсон бодолтой интерьер.',
          tags: ['Орон зайн төлөвлөлт', 'Материал сонголт', 'Тусгай тавилга'],
        },
        {
          num: '03',
          title: 'Хот төлөвлөлт',
          desc: 'Нягтрал, өдрийн гэрэл, олон нийтийг тэнцвэржүүлсэн хотын төлөвлөлт болон нийтийн орон зай.',
          tags: ['Ерөнхий төлөвлөгөө', 'Нийтийн орон зай', 'Боломжийн судалгаа'],
        },
        {
          num: '04',
          title: 'Ландшафт',
          desc: 'Барилга, газрын хоорондох зааг ялгааг бүдгэрүүлж, бүтцийг байгалийн орчинд нэхсэн ландшафтын архитектур.',
          tags: ['Цэцэрлэгийн дизайн', 'Газрын гадарга', 'Экологи'],
        },
      ],
      processLabel: 'БИД ХЭРХЭН АЖИЛЛАДАГ',
      processHeading: 'Дөрвөн үе шат, нэг яриа',
      process: [
        { num: '01', title: 'Сонсох', desc: 'Бид газар, даалгавар, хүмүүсээс эхэлдэг. Ойлголт зурахаас түрүүлдэг.' },
        { num: '02', title: 'Судлах', desc: 'Ноорог, загвар, судалгаа. Зөв санаа гарч иртэл бид санааг нээлттэй туршдаг.' },
        { num: '03', title: 'Боловсронгуй болгох', desc: 'Үзэл баримтлал ур чадвар болдог. Бүх нарийн ширийн зүйл нямбай шийдэгддэг.' },
        { num: '04', title: 'Хэрэгжүүлэх', desc: 'Бид дуусах хүртэл талбай дээр үлдэж, дизайны бүрэн бүтэн байдлыг хамгаалдаг.' },
      ],
    },
    // Төслүүд
    projects: {
      eyebrow: 'СОНГОСОН БҮТЭЭЛҮҮД',
      title: 'Төслүүд',
      intro:
        'Орон сууц, соёл, нийтийн архитектурын дуусгасан болон үргэлжилж буй бүтээлүүдийн түүвэр. Төсөл бүр нь тодорхой газар, даалгавар, цаг үед өгсөн хариулт юм.',
      filters: ['БҮГД', 'ОРОН СУУЦ', 'СОЁЛ', 'АРИЛЖАА'],
    },
    // Мэдээ, мэдээлэл
    news: {
      eyebrow: 'МЭДЭЭ & БИЧЛЭГҮҮД',
      title: 'Сэтгүүл',
      intro:
        'Шагнал, хэвлэл, эссе, студиэс ирсэн мэдээлэл. Бидний барьж, бодож, уншиж буй зүйлсийн тэмдэглэл.',
      featuredLabel: 'ОНЦЛОХ',
      featured: {
        tag: 'МЭДЭЭ',
        date: '2026 оны 1-р сар',
        title: 'Нордхейм Орон Сууц Нордик Архитектурын Шагналд Нэр Дэвшив',
        excerpt:
          'Хойд Норвегид байрлах хадан дээрх орон сууц маань тус бүс нутгийн хамгийн нэр хүндтэй архитектурын шагналын таван финалистын дунд багтаж, бүтэц ба ландшафтын хоорондын яриаг тэмдэглэв.',
      },
      listLabel: 'СҮҮЛИЙН ҮЕИЙН',
      items: [
        { date: '2025 12-р сар', tag: 'ЯРИЛЦЛАГА', title: 'Материал байдлын тухай: Студи Восстой ярилцлага', excerpt: 'Дизайны захирал Астрид Линдквист бетон, мод, цаг хугацааны шударга байдлын тухай.' },
        { date: '2025 11-р сар', tag: 'ХЭВЛЭЛ', title: 'Лунд Павильон Архитектурын Тоймд Нийтлэгдэв', excerpt: 'Өмнөд Шведэд байрлах шагналт соёлын павильоны тухай зургаан хуудас нийтлэл.' },
        { date: '2025 10-р сар', tag: 'ЭССЕ', title: 'Хойдын Гэрлийн Тухай Дизайн', excerpt: 'Намхан Скандинавын нарны дор хорин жил барьсан туршлагын сургамж.' },
        { date: '2025 9-р сар', tag: 'МЭДЭЭ', title: 'Восс Копенгагенд Шинэ Цех Нээв', excerpt: 'Хотын төвд загвар хийх, материалын тусгай студи.' },
        { date: '2025 8-р сар', tag: 'ХЭВЛЭЛ', title: 'Эрик Восс Wallpaper* Жагсаалтад Багтав', excerpt: 'Орчин үеийн дизайныг төлөвшүүлж буй хамгийн нөлөө бүхий хүмүүсийн дунд.' },
        { date: '2025 7-р сар', tag: 'ЭССЕ', title: 'Удаан Архитектурын Төлөө', excerpt: 'Хамгийн сайн барилгууд яагаад яаралтай байхыг татгалздаг вэ.' },
      ],
    },
    // Хүний нөөц
    careers: {
      eyebrow: 'СТУДИД НЭГДЭХ',
      title: 'Бүтээхэд\nзохистой\nкарьераа бүтээ',
      intro:
        'Бид архитектур чухал гэдэгт итгэдэг сониуч, нямбай хүмүүсийг үргэлж хайж байдаг. Хэрэв та ур чадварт анхаарч, өсөхийг хүсэж байвал бид таныг сонсохдоо баяртай байх болно.',
      cultureLabel: 'ВОСС ДАХЬ АМЬДРАЛ',
      cultureHeading: 'Ур чадвар, итгэл, цаг хугацаан дээр суурилсан студи',
      benefits: [
        { title: 'Студийн соёл', desc: 'Хавтгай шатлал, нээлттэй шүүмж, хуваалцсан номын сан. Хүн бүр ажилд дуу хоолойтой.' },
        { title: 'Хөгжил', desc: 'Ахлах хамтрагчдын зөвлөгөө, санхүүжүүлсэн сургалт, манлайллын тодорхой зам.' },
        { title: 'Тэнцвэр', desc: 'Уян хатан цаг, өгөөмөр чөлөө, зуны баасан гарагууд. Бид урт хугацаанд бүтээдэг.' },
        { title: 'Аялал', desc: 'Скандинав даяарх талбайн айлчлал, дэлхийн агуу барилгууд руу судалгааны аялал.' },
      ],
      openingsLabel: 'НЭЭЛТТЭЙ АЖЛЫН БАЙР',
      openings: [
        { role: 'Ахлах архитектор', location: 'Стокгольм', type: 'Бүтэн цаг' },
        { role: 'Бага архитектор', location: 'Копенгаген', type: 'Бүтэн цаг' },
        { role: 'Интерьер дизайнер', location: 'Стокгольм', type: 'Бүтэн цаг' },
        { role: 'Архитектурын визуализатор', location: 'Зайнаас', type: 'Гэрээт' },
        { role: 'Студийн дадлага', location: 'Стокгольм', type: 'Дадлага' },
      ],
      ctaHeading: 'Өөрийн байраа олсонгүй юу?',
      ctaText: 'Бид авьяаслаг хүмүүстэй уулзахдаа үргэлж баяртай байдаг. Портфолиогоо илгээгээрэй.',
      apply: 'ӨРГӨДӨЛ ГАРГАХ',
      sendPortfolio: 'ПОРТФОЛИО ИЛГЭЭХ',
    },
  },
} satisfies Record<Language, unknown>

export type PagesContent = typeof pagesContent['EN']
