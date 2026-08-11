import { HeroSlide, JobPosition, BenefitItem, HiringStep, Testimonial } from '@/types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    label: { mn: 'Карьер & Хөгжил', en: 'Careers & Growth' },
    title: { mn: 'Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг', en: 'Great developments originate from exceptional talent' },
    desc: { mn: 'Чадварлаг хүмүүсээс үнэ цэнтэй бүтээн байгуулалт эхэлдэг.', en: 'Great developments originate from exceptional talent.' },
    category: { mn: 'Архитектур & Барилга', en: 'Architecture & Construction' },
  },
  {
    id: 'hero-2',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    label: { mn: 'Инноваци & Загвар', en: 'Innovation & Design' },
    title: { mn: 'Ирээдүйн хот байгуулалтыг хамтдаа урлая', en: 'Crafting the future of urban architecture together' },
    desc: { mn: 'Олон улсын стандартад нийцсэн шилдэг архитектурын шийдлүүдийг Монголд.', en: 'Delivering world-class architectural solutions across Mongolia.' },
    category: { mn: 'Интерьер & Архитектур', en: 'Interior & Design' },
  },
  {
    id: 'hero-3',
    image: '/images/hr.jpg',
    label: { mn: 'Инженерчлэл', en: 'Engineering Excellence' },
    title: { mn: 'Тогтвортой хөгжил ба нарийн инженерчлэл', en: 'Sustainable infrastructure and precision engineering' },
    desc: { mn: 'Орчин үеийн инженерчлэлийн гайхамшгийг цогцлоох туршлагатай хамт олон.', en: 'Experienced teams driving modern engineering marvels.' },
    category: { mn: 'Иргэний Инженерчлэл', en: 'Civil Engineering' },
  },
  {
    id: 'hero-4',
    image: '/images/hr.jpg',
    label: { mn: 'Төслийн Менежмент', en: 'Project Excellence' },
    title: { mn: 'Цаг хугацаа, чанарын төгс зохицол', en: 'Mastering timeline, quality, and execution' },
    desc: { mn: 'Үнэ цэнэтэй томоохон төслүүдийг олон улсын түвшинд удирдаж хэрэгжүүлнэ.', en: 'Managing large-scale, high-value real estate projects flawlessly.' },
    category: { mn: 'Төслийн Баг', en: 'Project Leadership' },
  },
  {
    id: 'hero-5',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=2000&q=85',
    label: { mn: 'Тохижилт & Дизайн', en: 'Luxury Interior' },
    title: { mn: 'Амьдрах орчны тансаг зэрэглэлийн тав тух', en: 'Luxury comfort redefined for modern living' },
    desc: { mn: 'Хүний тав тух, гоо зүйн төгс шийдлийг хослуулсан орон зайг бүтээх.', en: 'Creating living spaces that seamlessly blend ergonomics and elegance.' },
    category: { mn: 'Интерьер Дизайн', en: 'Interior Architecture' },
  },
  {
    id: 'hero-6',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85',
    label: { mn: 'Нэгдсэн Соёл', en: 'Workplace Culture' },
    title: { mn: 'Тамхигүй, ногоон, таатай ажлын орчин', en: 'Healthy, collaborative, and inspiring culture' },
    desc: { mn: 'Мэргэжилтэн бүрийн өсөлт дэвшлийг дэмжсэн нээлттэй ажлын байр.', en: 'An inclusive workspace empowering every expert to thrive.' },
    category: { mn: 'Хамт Олон', en: 'Company Culture' },
  },
];

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: 'pos-1',
    title: { mn: 'Ахлах Архитектор (Senior Architect)', en: 'Senior Architect' },
    department: 'Architecture',
    location: { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar' },
    type: { mn: 'Бүрэн цаг', en: 'Full Time' },
    experience: { mn: '5+ жил', en: '5+ Years' },
    salaryRange: '₮5,000,000 - ₮8,000,000',
    featured: true,
    summary: {
      mn: 'Боди Пропертиз ХХК-ийн томоохон хот төлөвлөлт, орон сууц болон оффисын төслүүдийн концепци дизайн болон гүйцэтгэлийн зураг төслийг удирдаж ажиллах туршлагатай Ахлах архитектор хайж байна.',
      en: 'We are seeking an experienced Senior Architect to lead conceptual design, master planning, and detailed documentation for premier commercial and residential developments.',
    },
    responsibilities: {
      mn: [
        'Төслийн архитектур концепци, эскиз ба ажлын зураг төсөл боловсруулах',
        'Архитектурын багийг чиглүүлж, чанарын стандартын дагуу хяналт тавих',
        'Инженерчлэл болон барилгын гүйцэтгэгч багуудтай уялдаа холбоотой ажиллах',
        'Autodesk Revit, ArchiCAD болон 3D visualization программ дээр мэргэжлийн түвшинд ажиллах',
        'Байгаль орчинд ээлтэй, тогтвортой архитектурын шийдлүүдийг төсөлд нэвтрүүлэх',
      ],
      en: [
        'Develop architectural concepts, schematic designs, and execution blueprints',
        'Lead and mentor junior architects, maintaining rigorous quality standards',
        'Coordinate closely with structural, MEP engineers, and construction teams',
        'Utilize Revit, ArchiCAD, and advanced 3D visualization software',
        'Integrate sustainable and eco-friendly design principles into projects',
      ],
    },
    requirements: {
      mn: [
        'Архитектурын чиглэлээр Бакалавр эсвэл түүнээс дээш зэрэгтэй',
        'Мэргэжлээрээ 5-аас доошгүй жил ажилласан туршлагатай (Төсөл удирдсан туршлагатай бол давуу тал)',
        'BIM / Revit, AutoCAD, Rhino/Sketchup, V-Ray эсвэл Enscape чадварлаг эзэмшсэн',
        'Багаар ажиллах, удирдан зохион байгуулах болон харилцааны өндөр ур чадвартай',
      ],
      en: [
        'Bachelor or Master degree in Architecture',
        'Minimum 5 years of professional architectural design experience',
        'Proficiency in BIM/Revit, AutoCAD, 3D modeling, and rendering software',
        'Strong leadership, spatial problem-solving, and communication skills',
      ],
    },
    benefits: {
      mn: [
        'Салбартаа өрсөлдөхүйц өндөр цалин урамшуулал',
        'Жил бүрийн гүйцэтгэлийн бонус',
        'Гадаад, дотоодын мэргэжил дээшлүүлэх сургалтууд',
        'Эрүүл мэндийн цогц даатгал',
      ],
      en: [
        'Highly competitive industry salary and bonuses',
        'Annual performance bonuses',
        'International professional development opportunities',
        'Comprehensive health insurance package',
      ],
    },
  },
  {
    id: 'pos-2',
    title: { mn: 'Интерьер Дизайнер (Interior Designer)', en: 'Interior Designer' },
    department: 'Interior',
    location: { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar' },
    type: { mn: 'Бүрэн цаг', en: 'Full Time' },
    experience: { mn: '3+ жил', en: '3+ Years' },
    salaryRange: '₮3,500,000 - ₮5,500,000',
    featured: true,
    summary: {
      mn: 'Тансаг зэрэглэлийн орон сууц, пентхаус болон оффис үйлчилгээний орон зайн дотоод засал чимэглэлийн өUnique концепцийг боловсруулах авьяаслаг Интерьер дизайнер урьж байна.',
      en: 'Join our interior team to design bespoke, high-end residential interiors, executive suites, and luxury commercial spaces across Ulaanbaatar.',
    },
    responsibilities: {
      mn: [
        'Интерьер дизайны концепци боловсруулах, Moodboard болон 3D визуализаци хийх',
        'Материал, тавилга, гэрэлтүүлэг болон чимэглэлийн сонголт хийх, зохион байгуулах',
        'Интерьер засал чимэглэлийн ажлын зураг, деталь зургуудыг бэлтгэх',
        'Төслийн байранд зохигчдын гүйцэтгэлд автор засал чимэглэлийн хяналт тавих',
      ],
      en: [
        'Develop interior design concepts, moodboards, and realistic 3D renderings',
        'Specify furniture, fixtures, lighting, and premium finishing materials',
        'Prepare detailed execution drawings and millwork specifications',
        'Conduct site visits for author oversight during interior fit-outs',
      ],
    },
    requirements: {
      mn: [
        'Дотоод засал, Интерьер дизайны чиглэлээр дээд боловсролтой',
        '3ds Max / Corona / V-Ray, SketchUp, Photoshop, AutoCAD эзэмшсэн',
        'Орон зайн мэдрэмж өндөртэй, сүүлийн үеийн трендийг мэддэг',
      ],
      en: [
        'Degree in Interior Design or Interior Architecture',
        'Proficiency in 3ds Max / Corona / V-Ray, SketchUp, Photoshop, AutoCAD',
        'Refined aesthetic sensibility and deep awareness of modern luxury trends',
      ],
    },
    benefits: {
      mn: [
        'Бүтээлч эрх чөлөө ба дээд зэргийн төслүүд дээр ажиллах боломж',
        'Үр дүнд суурилсан бонус урамшуулал',
        'Таатай, орчин үеийн дижитал студи орчин',
      ],
      en: [
        'Creative autonomy on high-profile signature developments',
        'Performance-linked monetary incentives',
        'Modern, design-centric workspace',
      ],
    },
  },
  {
    id: 'pos-3',
    title: { mn: 'Төслийн Менежер (Project Manager)', en: 'Project Manager' },
    department: 'Management',
    location: { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar' },
    type: { mn: 'Бүрэн цаг', en: 'Full Time' },
    experience: { mn: '4+ жил', en: '4+ Years' },
    salaryRange: '₮4,500,000 - ₮7,000,000',
    featured: true,
    summary: {
      mn: 'Барилга угсралт, төслийн төсөв, цаг хугацааны графикийг батлагдсан нормын дагуу үр ашигтай удирдаж, ажлын чанарыг хангах төслийн менеджер авна.',
      en: 'Lead construction schedules, budgets, and interdisciplinary coordination to ensure on-time delivery of premium real estate projects.',
    },
    responsibilities: {
      mn: [
        'Төслийн график төлөвлөгөө (Gantt Chart), төсөв болон нөөцийн хуваарилалтыг удирдах',
        'Барилгын гүйцэтгэгч болон тусгалан гүйцэтгэгч нарын ажлын гүйцэтгэлийг хянах',
        'Эрсдэлийн удирдлага хэрэгжүүлж, саад бэрхшээлийг шуурхай шийдвэрлэх',
      ],
      en: [
        'Oversee project Master Schedules, resource allocation, and budget tracking',
        'Manage contractor relations and monitor site safety and compliance',
        'Implement risk mitigation plans and resolve operational bottlenecks',
      ],
    },
    requirements: {
      mn: [
        'Барилгын инженер эсвэл Төслийн менежментийн чиглэлээр бакалавр зэрэгтэй',
        'PMP эсвэл ижил төстэй сертификаттай бол давуу тал',
        'MS Project, Primavera, Excel ахисан түвшинд эзэмшсэн',
      ],
      en: [
        'Bachelor degree in Civil Engineering or Construction Management',
        'PMP certification is a strong plus',
        'Advanced skills in MS Project, Primavera P6, and data tracking tools',
      ],
    },
    benefits: {
      mn: ['Төслийн бонус', 'Утас, унааны хөнгөлөлт', 'Мэргэшлийн зэрэг ахиулах дэмжлэг'],
      en: ['Project completion bonuses', 'Mobility and communication allowance', 'Executive training support'],
    },
  },
  {
    id: 'pos-4',
    title: { mn: 'Иргэний Барилгын Инженер (Civil Engineer)', en: 'Civil Engineer' },
    department: 'Engineering',
    location: { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar' },
    type: { mn: 'Бүрэн цаг', en: 'Full Time' },
    experience: { mn: '3+ жил', en: '3+ Years' },
    salaryRange: '₮3,800,000 - ₮6,000,000',
    featured: false,
    summary: {
      mn: 'Барилга угсралтын талбайн инженерчлэлийн тооцоолол, хийцийн чанар, стандартын дагуу хяналт тавьж ажиллах туршлагатай барилгын инженер урьж байна.',
      en: 'Perform structural integrity checks, site engineering supervision, and quality assurance across building construction sites.',
    },
    responsibilities: {
      mn: [
        'Барилгын буурь суурь, каркас болон бүтээцийн зургийн дагуух угсралтад талбайн хяналт хийх',
        'Чанарын даалгавар, актуудыг шалгаж баталгаажуулах',
        'Гүйцэтгэлийн дагуух техникийн баримт бичиг боловсруулах',
      ],
      en: [
        'Supervise structural frame, concrete pouring, and foundation work on site',
        'Verify materials compliance and sign off quality assurance certificates',
        'Prepare detailed technical progress reports for stakeholders',
      ],
    },
    requirements: {
      mn: [
        'Иргэний болон үйлдвэрлэлийн барилгын инженер мэргэжилтэй',
        'Мэргэжлээрээ 3 ба түүнээс дээш жил ажилласан',
        'Барилгын нормативын баримт бичгүүдийг сайн мэддэг',
      ],
      en: [
        'Degree in Civil / Structural Engineering',
        '3+ years on-site structural engineering experience',
        'Thorough knowledge of Mongolian and International building codes',
      ],
    },
    benefits: {
      mn: ['Талбайн нэмэгдэл', 'Өдрийн хоолны хөнгөлөлт', 'Жилийн эцсийн бонус'],
      en: ['Field operation allowance', 'Daily meal allowances', 'Year-end bonus'],
    },
  },
  {
    id: 'pos-5',
    title: { mn: 'BIM Мэргэжилтэн (BIM Specialist)', en: 'BIM Specialist' },
    department: 'Architecture',
    location: { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar' },
    type: { mn: 'Бүрэн цаг', en: 'Full Time' },
    experience: { mn: '2+ жил', en: '2+ Years' },
    salaryRange: '₮3,200,000 - ₮5,000,000',
    featured: false,
    summary: {
      mn: 'Төслийн 3D дижитал загварчлал, clash detection болон BIM стандартаар мэдээллийн нэгдсэн загвар боловсруулах мэргэжилтэн.',
      en: 'Drive building information modeling (BIM), clash detection, and digital twin coordination across complex multi-story building projects.',
    },
    responsibilities: {
      mn: [
        'Revit дээр архитектур, инженерчлэлийн нэгдсэн BIM загвар үүсгэх',
        'Navisworks ашиглан хийцийн болон сантехникийн давхцлын (clash detection) анализ хийх',
        'Төслийн хэмжээний баримт бичгийн стандартыг хангах',
      ],
      en: [
        'Develop integrated multi-disciplinary BIM models in Autodesk Revit',
        'Run Navisworks spatial clash detection and resolution protocols',
        'Maintain office BIM standards, component families, and templates',
      ],
    },
    requirements: {
      mn: [
        'Архитектур эсвэл Барилгын инженерчлэлийн зэрэгтэй',
        'Autodesk Revit, Navisworks, BIM 360 ахисан түвшинд эзэмшсэн',
      ],
      en: [
        'Degree in Architecture or Engineering',
        'Advanced expertise in Autodesk Revit, Navisworks, BIM 360/Acc',
      ],
    },
    benefits: {
      mn: ['Сургалтын тэтгэлэг', 'Төслийн урамшуулал'],
      en: ['BIM Certification funding', 'Project incentives'],
    },
  },
  {
    id: 'pos-6',
    title: { mn: 'САН болон ХАБЭА Инженер (HSE Officer)', en: 'HSE Safety Manager' },
    department: 'Engineering',
    location: { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar' },
    type: { mn: 'Бүрэн цаг', en: 'Full Time' },
    experience: { mn: '3+ жил', en: '3+ Years' },
    salaryRange: '₮3,000,000 - ₮4,500,000',
    featured: false,
    summary: {
      mn: 'Барилгын талбайн аюулгүй ажиллагаа, эрүүл ахуйн стандартыг хангаж, осол аюулгүй орчныг бүрдүүлэх ХАБЭА-н инженер.',
      en: 'Implement strict site health, safety, and environmental protocols to guarantee zero-harm construction environments.',
    },
    responsibilities: {
      mn: [
        'Барилгын талбайн өдөр тутмын ХАБЭА-н шалгалт, зааварчилгаа өгөх',
        'Аюулгүй ажиллагааны сургалт зохион байгуулах',
      ],
      en: [
        'Conduct daily site safety audits and toolbox talks',
        'Organize mandatory health and safety training for all crew members',
      ],
    },
    requirements: {
      mn: [
        'ХАБЭА-н эрх бүхий сертификаттай',
        'Барилгын салбарт 3+ жил ажилласан',
      ],
      en: [
        'Certified Health & Safety Officer qualification',
        '3+ years of safety leadership in building construction',
      ],
    },
    benefits: {
      mn: ['Эрүүл мэндийн даатгал', 'Талбайн урамшуулал'],
      en: ['Full health coverage', 'Site performance bonuses'],
    },
  },
];

export const BENEFITS: BenefitItem[] = [
  {
    number: '01',
    iconName: 'GraduationCap',
    title: {
      mn: 'Мэргэжлийн Хөгжил',
      en: 'Professional Development',
    },
    description: {
      mn: 'Олон улсын сургалт, зэрэг ахиулах хөтөлбөр, шилдэг архитектурын туршлага судлах аялалуудыг компанийн зүгээс бүрэн санхүүжүүлдэг.',
      en: 'We invest heavily in your professional growth through sponsored certifications, global architectural study tours, and continuous training.',
    },
  },
  {
    number: '02',
    iconName: 'Award',
    title: {
      mn: 'Өрсөлдөхүйц Урамшуулал',
      en: 'Competitive Compensation',
    },
    description: {
      mn: 'Салбартаа тэргүүлэх үндсэн цалин, төсөл амжилттай дуусах бүрт олгогдох гүйцэтгэлийн бонус ба жилийн эцсийн ноогдол ашиг.',
      en: 'Industry-leading baseline salaries coupled with project milestone bonuses and annual profit-sharing incentives.',
    },
  },
  {
    number: '03',
    iconName: 'Sparkles',
    title: {
      mn: 'Уян Хатан Орчин',
      en: 'Flexible Work Environment',
    },
    description: {
      mn: 'Орчин үеийн А зэрэглэлийн дижитал оффис, бүтээлч чөлөөт бүс, уян хатан цагийн хуваарь ба зайнаас ажиллах боломж.',
      en: 'Work in Grade-A eco-friendly studio spaces with hybrid flexibility, relaxation lounges, and top-tier digital tools.',
    },
  },
  {
    number: '04',
    iconName: 'TrendingUp',
    title: {
      mn: 'Кареер Ахих Боломж',
      en: 'Career Growth Opportunities',
    },
    description: {
      mn: 'Нээлттэй, шударга үнэлгээний системээр дамжуулан удирдах болон ахлах түвшинд богино хугацаанд дэвших бодит боломж.',
      en: 'Fast-track internal progression based on merit, empowering high performers to step into senior and executive roles.',
    },
  },
];

export const HIRING_STEPS: HiringStep[] = [
  {
    number: '01',
    title: { mn: 'Анкет Хүлээн Авах', en: 'Application' },
    subtitle: { mn: 'Онлайн болон Имэйл', en: 'Online or Email Submission' },
    description: {
      mn: 'Та манай нээлттэй ажлын байранд эсвэл talent pool-д анкет, портфолиогоо ирүүлнэ үү.',
      en: 'Submit your resume and design portfolio through our online portal or direct HR email.',
    },
    duration: { mn: '1-3 хоног', en: '1-3 Days' },
    tips: {
      mn: 'Портфолио болон өмнө хийсэн төслүүдээ тодорхой харуулсан линк эсвэл PDF хавсаргавал илүү давуу талтай.',
      en: 'Include a direct portfolio link (Behance, Drive, or PDF) showcasing your real-world projects.',
    },
  },
  {
    number: '02',
    title: { mn: 'Эхний Ярилцлага', en: 'Interview' },
    subtitle: { mn: 'Хүний Нөөц & Соёл', en: 'HR & Cultural Fit' },
    description: {
      mn: 'Хүний нөөцийн багтай ганцаарчилсан ярилцлага хийж, компанийн соёл, таны зорилготой танилцана.',
      en: 'An introductory conversation with our HR team to discuss your background, values, and mutual fit.',
    },
    duration: { mn: '30-45 минут', en: '30-45 Mins' },
    tips: {
      mn: 'Боди Пропертиз-ийн хийж гүйцэтгэсэн төслүүдтэй өмнө нь танилцсан байх нь сайн сэтгэгдэл төрүүлнэ.',
      en: 'Familiarize yourself with Bodi Properties’ flagship completed developments ahead of time.',
    },
  },
  {
    number: '03',
    title: { mn: 'Мэргэжлийн Шалгалт', en: 'Assessment' },
    subtitle: { mn: 'Портфолио & Даалгавар', en: 'Technical Portfolio Review' },
    description: {
      mn: 'Ахлах архитектор, инженерүүдтэй техникийн ярилцлага хийж, мэргэжлийн даалгавар гүйцэтгэнэ.',
      en: 'Deep-dive technical review with lead architects and project heads to evaluate domain mastery.',
    },
    duration: { mn: '1-2 цаг', en: '1-2 Hours' },
    tips: {
      mn: 'Өөрийн боловсруулсан зураг төсөл, тооцооллын логик шийдлээ бэлдэж ирээрэй.',
      en: 'Be ready to discuss the specific engineering logic and design decisions behind your portfolio work.',
    },
  },
  {
    number: '04',
    title: { mn: 'Ажлын Санал', en: 'Job Offer' },
    subtitle: { mn: 'Гэрээ & Онбординг', en: 'Contract & Onboarding' },
    description: {
      mn: 'Бид танд албан ёсны ажлын байрны санал болон цалин урамшууллын багцыг танилцуулна.',
      en: 'Receive a formal offer letter detailing your role, competitive package, and customized onboarding timeline.',
    },
    duration: { mn: '24-48 цаг', en: '24-48 Hours' },
    tips: {
      mn: 'Манай найрсгаар угтан авах баг таны ажлын анхны өдрийг мартагдашгүй байлгах болно!',
      en: 'Our onboarding buddy will help you settle into your new desktop setup and team seamlessly!',
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Б.Энхжин (Enkhjin B.)',
    role: { mn: 'Ахлах Барилгын Архитектор', en: 'Lead Architectural Designer' },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    yearsAtCompany: 6,
    quote: {
      mn: 'Боди Пропертиз-д ажиллахад архитекторын хувьд өөрийн санааг хязгааргүй сорих, хотын өнгө төрхийг өөрчлөх томоохон төслүүд дээр ажиллах бодит боломж олгодог.',
      en: 'Working at Bodi Properties gives architects true creative freedom to build iconic projects that reshape Ulaanbaatar’s skyline for generations.',
    },
  },
  {
    id: 't-2',
    name: 'Г.Тэмүүлэн (Temuulen G.)',
    role: { mn: 'Төслийн Ерөнхий Инженер', en: 'Chief Project Engineer' },
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    yearsAtCompany: 4,
    quote: {
      mn: 'Багийн хамтын ажиллагаа, аюулгүй ажиллагааны олон улсын стандарт болон өндөр технологийн хэрэглээ манай барилгын талбайд үргэлж нэгдүгээрт байдаг.',
      en: 'Team cohesion, international safety standards, and cutting-edge BIM technologies are embedded in every single building site we run.',
    },
  },
  {
    id: 't-3',
    name: 'А.Номин (Nomin A.)',
    role: { mn: 'Интерьер Арт Директор', en: 'Interior Art Director' },
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    yearsAtCompany: 3,
    quote: {
      mn: 'Мэргэжилтний хувьд байнга суралцах, олон улсын үзэсгэлэнд оролцох боломжийг компани маань 100% дэмждэгт маш баяртай байдаг.',
      en: 'I love how management actively sponsors our attendance at global design expos and encourages constant skill upgrade.',
    },
  },
];

export const COMPANY_STATS = [
  { value: '15+', label: { mn: 'Жилийн Туршлага', en: 'Years of Excellence' } },
  { value: '120+', label: { mn: 'Хэрэгжүүлсэн Төсөл', en: 'Landmark Projects' } },
  { value: '450+', label: { mn: 'Ажилтнууд', en: 'Skilled Professionals' } },
  { value: '98%', label: { mn: 'Ажилтны Сэтгэл Ханамж', en: 'Employee Retention' } },
];
