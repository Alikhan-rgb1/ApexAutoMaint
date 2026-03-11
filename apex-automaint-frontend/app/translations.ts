export type Language = 'en' | 'ar' | 'ru';

export const translations = {
  en: {
    nav: {
      services: 'Services',
      about: 'About Us',
      faq: 'FAQ',
      contact: 'Contact',
      book: 'Book Appointment',
    },
    topBanner: {
      text: '24/7 Concierge Service & Free Pickup/Delivery | ISO 9001 Certified',
    },
    hero: {
      subtitle: 'Premium Auto Care',
      title1: 'Excellence in',
      title2: 'Automotive',
      title3: 'Maintenance.',
      description: 'Experience the pinnacle of car care with our ISO 9001 certified services. From precision diagnostics to luxury detailing, we ensure your vehicle performs at its peak.',
      bookBtn: 'Book Service',
      exploreBtn: 'Explore Services',
      stats: {
        exp: 'Years Exp.',
        clients: 'Clients',
        support: 'Support',
      },
      cards: {
        iso: { title: 'ISO 9001 Certified', desc: 'International quality standards guaranteed.' },
        fast: { title: 'Fast Turnaround', desc: 'Same-day service for minor repairs.' },
        expert: { title: 'Expert Technicians', desc: 'Certified professionals for all car makes.' },
      }
    },
    services: {
      subtitle: 'Our Expertise',
      title: 'World-Class Services',
      desc: 'We offer a wide range of services to keep your vehicle in top condition. Our state-of-the-art facility is equipped to handle all makes and models with precision and care.',
      items: {
        maintenance: { title: 'Periodic Maintenance', desc: 'Comprehensive check-ups ensuring longevity and performance.' },
        diagnostics: { title: 'Advanced Diagnostics', desc: 'State-of-the-art computer scanning for precise troubleshooting.' },
        mechanical: { title: 'Mechanical Repairs', desc: 'Engine, transmission, and suspension repairs by experts.' },
        electrical: { title: 'Electrical Services', desc: 'Battery, alternator, and wiring solutions for modern cars.' },
        ac: { title: 'AC Services', desc: 'Climate control maintenance, gas refill, and leak detection.' },
        detailing: { title: 'Premium Detailing', desc: 'Interior and exterior detailing with ceramic coating options.' },
      }
    },
    about: {
      isoTitle: 'ISO 9001:2015',
      isoDesc: 'Certified Quality',
      rating: 'Customer Rating',
      served: 'Served Clients',
      subtitle: 'Why Choose Us',
      title: 'Your Peace of Mind is Our Priority',
      desc: "ApexAutoMaint is not just a garage; it's a commitment to excellence. Our team of experienced and certified technicians use the latest tools and technology to ensure your vehicle is in safe hands. We believe in transparency, quality, and customer satisfaction above all else.",
      features: [
        "ISO 9001:2015 Certified Facility",
        "Latest Diagnostic Technology",
        "Genuine Parts Guarantee",
        "Transparent Pricing Policy"
      ],
      quoteBtn: 'Get a Free Quote'
    },
    insurance: {
      title: 'Insurance Partners',
      subtitle: 'We work with all major insurance providers for seamless claims.',
    },
    faq: {
      subtitle: 'Common Questions',
      title: 'Frequently Asked Questions',
      desc: 'Find answers to common questions about our services and policies.',
      items: [
        { q: 'Do you offer pickup and delivery?', a: 'Yes, we offer complimentary pickup and delivery services across Dubai for all major services.' },
        { q: 'Are your technicians certified?', a: 'Absolutely. All our technicians are certified and undergo regular training for luxury and performance vehicles.' },
        { q: 'Do you use genuine parts?', a: 'We use 100% genuine parts or high-quality OEM alternatives depending on your preference and budget.' },
        { q: 'How long does a service take?', a: 'Minor services are completed same-day. Major repairs may take 2-3 days depending on parts availability.' },
      ]
    },
    cta: {
      title: 'Ready to Experience the Apex Difference?',
      desc: 'Contact us today for a free consultation and let our experts take care of your car with the precision it deserves.',
      callBtn: 'Call Us Now',
      bookBtn: 'Book Appointment'
    },
    contact: {
      subtitle: 'Get in Touch',
      title: 'Visit Our Center',
      dubaiBranch: 'Dubai Branch',
      sharjahBranch: 'Sharjah Branch',
      dubaiAddr: 'Dubai, United Arab Emirates',
      sharjahAddr: 'Sharjah, United Arab Emirates',
      waze: 'Open in Waze',
      address: 'Address',
      addressVal: 'Al Quoz Industrial Area 3, Dubai, UAE',
      phone: 'Phone',
      email: 'Email',
      hours: 'Working Hours',
      hoursVal: 'Mon - Sat: 8:00 AM - 7:00 PM',
      form: {
        name: 'Name',
        namePh: 'Your Full Name',
        phone: 'Phone',
        phonePh: 'Your Phone Number',
        service: 'Service Type',
        serviceOptions: { maintenance: 'Regular Maintenance', repair: 'Repair', bodywork: 'Body & Paint', other: 'Other' },
        message: 'Message',
        messagePh: 'Tell us about your car issues...',
        submit: 'Send Message',
        submitting: 'Sending...',
        success: 'Message Sent!'
      }
    },
    modal: {
      title: 'Book Appointment',
      subtitle: 'Schedule your premium service today',
      name: 'Name',
      namePh: 'Your Full Name',
      phone: 'Phone',
      phonePh: '+971 50...',
      date: 'Date',
      service: 'Service Type',
      serviceOptions: { general: 'General Maintenance', oil: 'Oil Change', brake: 'Brake Service', engine: 'Engine Diagnostics', body: 'Body Repair', other: 'Other' },
      submit: 'Confirm Booking',
      processing: 'Processing...',
      successTitle: 'Booking Confirmed!',
      successDesc: "We'll contact you shortly to confirm the details."
    },
    footer: {
      desc: 'Premium automotive care center in Dubai. ISO 9001 Certified quality you can trust.',
      links: 'Quick Links',
      newsletter: 'Newsletter',
      subscribe: 'Subscribe to get latest offers and maintenance tips.',
      emailPh: 'Your Email',
      join: 'Join',
      contact: 'Contact Info',
      rights: '© 2024 ApexAutoMaint. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  },
  ar: {
    nav: {
      services: 'خدماتنا',
      about: 'من نحن',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
      book: 'احجز موعد',
    },
    topBanner: {
      text: 'خدمة كونسيرج 24/7 واستلام وتسليم مجاني | معتمدون بشهادة ISO 9001',
    },
    hero: {
      subtitle: 'عناية فائقة بالسيارات',
      title1: 'التميز في',
      title2: 'صيانة',
      title3: 'السيارات.',
      description: 'اختبر قمة العناية بالسيارات مع خدماتنا المعتمدة بشهادة ISO 9001. من التشخيص الدقيق إلى التلميع الفاخر، نضمن أداء سيارتك في أفضل حالاتها.',
      bookBtn: 'احجز خدمة',
      exploreBtn: 'استكشف الخدمات',
      stats: {
        exp: 'سنوات خبرة',
        clients: 'عميل',
        support: 'دعم',
      },
      cards: {
        iso: { title: 'معتمدون ISO 9001', desc: 'معايير جودة عالمية مضمونة.' },
        fast: { title: 'إنجاز سريع', desc: 'خدمة في نفس اليوم للإصلاحات البسيطة.' },
        expert: { title: 'فنيون خبراء', desc: 'محترفون معتمدون لجميع أنواع السيارات.' },
      }
    },
    services: {
      subtitle: 'خبراتنا',
      title: 'خدمات عالمية المستوى',
      desc: 'نقدم مجموعة واسعة من الخدمات للحفاظ على سيارتك في أفضل حالة. منشأتنا الحديثة مجهزة للتعامل مع جميع الماركات والموديلات بدقة وعناية.',
      items: {
        maintenance: { title: 'الصيانة الدورية', desc: 'فحوصات شاملة لضمان العمر الطويل والأداء.' },
        diagnostics: { title: 'تشخيص متقدم', desc: 'فحص كمبيوتر بأحدث التقنيات لتحديد الأعطال بدقة.' },
        mechanical: { title: 'إصلاحات ميكانيكية', desc: 'إصلاح المحرك وناقل الحركة والتعليق بواسطة خبراء.' },
        electrical: { title: 'خدمات كهربائية', desc: 'حلول للبطارية والدينامو والأسلاك للسيارات الحديثة.' },
        ac: { title: 'خدمات التكييف', desc: 'صيانة التحكم بالمناخ وتعبئة الغاز وكشف التسربات.' },
        detailing: { title: 'تلميع فاخر', desc: 'تلميع داخلي وخارجي مع خيارات نانو سيراميك.' },
      }
    },
    about: {
      isoTitle: 'ISO 9001:2015',
      isoDesc: 'جودة معتمدة',
      rating: 'تقييم العملاء',
      served: 'عميل تم خدمتهم',
      subtitle: 'لماذا تختارنا',
      title: 'راحة بالك هي أولويتنا',
      desc: "أبيكس أوتو مينت ليس مجرد ورشة؛ إنه التزام بالتميز. يستخدم فريقنا من الفنيين ذوي الخبرة والمعتمدين أحدث الأدوات والتقنيات لضمان أن سيارتك في أيد أمينة. نحن نؤمن بالشفافية والجودة ورضا العملاء قبل كل شيء.",
      features: [
        "منشأة معتمدة ISO 9001:2015",
        "أحدث تقنيات التشخيص",
        "ضمان قطع غيار أصلية",
        "سياسة تسعير شفافة"
      ],
      quoteBtn: 'احصل على عرض مجاني'
    },
    insurance: {
      title: 'شركاء التأمين',
      subtitle: 'نحن نعمل مع جميع مزودي التأمين الرئيسيين لمطالبات سلسة.',
    },
    faq: {
      subtitle: 'أسئلة شائعة',
      title: 'الأسئلة المتكررة',
      desc: 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا وسياساتنا.',
      items: [
        { q: 'هل تقدمون خدمة الاستلام والتسليم؟', a: 'نعم، نقدم خدمات استلام وتسليم مجانية في جميع أنحاء دبي للخدمات الرئيسية.' },
        { q: 'هل الفنيون لديكم معتمدون؟', a: 'بالتأكيد. جميع فنيينا معتمدون ويخضعون لتدريب منتظم للسيارات الفاخرة وعالية الأداء.' },
        { q: 'هل تستخدمون قطع غيار أصلية؟', a: 'نستخدم قطع غيار أصلية 100% أو بدائل OEM عالية الجودة حسب تفضيلك وميزانيتك.' },
        { q: 'كم يستغرق وقت الخدمة؟', a: 'تكتمل الخدمات البسيطة في نفس اليوم. قد تستغرق الإصلاحات الكبيرة 2-3 أيام حسب توفر القطع.' },
      ]
    },
    cta: {
      title: 'جاهز لتجربة تميز أبيكس؟',
      desc: 'اتصل بنا اليوم للحصول على استشارة مجانية ودع خبراءنا يعتنون بسيارتك بالدقة التي تستحقها.',
      callBtn: 'اتصل بنا الآن',
      bookBtn: 'احجز موعد'
    },
    contact: {
      subtitle: 'تواصل معنا',
      title: 'زر مركزنا',
      dubaiBranch: 'فرع دبي',
      sharjahBranch: 'فرع الشارقة',
      dubaiAddr: 'دبي، الإمارات العربية المتحدة',
      sharjahAddr: 'الشارقة، الإمارات العربية المتحدة',
      waze: 'افتح في Waze',
      address: 'العنوان',
      addressVal: 'منطقة القوز الصناعية 3، دبي، الإمارات',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      hours: 'ساعات العمل',
      hoursVal: 'السبت - الخميس: 8:00 ص - 7:00 م',
      form: {
        name: 'الاسم',
        namePh: 'اسمك الكامل',
        phone: 'الهاتف',
        phonePh: 'رقم هاتفك',
        service: 'نوع الخدمة',
        serviceOptions: { maintenance: 'صيانة دورية', repair: 'إصلاح', bodywork: 'سمكرة وصبغ', other: 'أخرى' },
        message: 'الرسالة',
        messagePh: 'أخبرنا عن مشاكل سيارتك...',
        submit: 'إرسال الرسالة',
        submitting: 'جاري الإرسال...',
        success: 'تم الإرسال!'
      }
    },
    modal: {
      title: 'حجز موعد',
      subtitle: 'حدد موعد خدمتك المميزة اليوم',
      name: 'الاسم',
      namePh: 'اسمك الكامل',
      phone: 'الهاتف',
      phonePh: '+971 50...',
      date: 'التاريخ',
      service: 'نوع الخدمة',
      serviceOptions: { general: 'صيانة عامة', oil: 'تغيير زيت', brake: 'خدمة الفرامل', engine: 'تشخيص المحرك', body: 'إصلاح الهيكل', other: 'أخرى' },
      submit: 'تأكيد الحجز',
      processing: 'جاري المعالجة...',
      successTitle: 'تم تأكيد الحجز!',
      successDesc: "سنتصل بك قريباً لتأكيد التفاصيل."
    },
    footer: {
      desc: 'مركز عناية بالسيارات فاخر في دبي. جودة معتمدة ISO 9001 يمكنك الوثوق بها.',
      links: 'روابط سريعة',
      newsletter: 'النشرة البريدية',
      subscribe: 'اشترك للحصول على أحدث العروض ونصائح الصيانة.',
      emailPh: 'بريدك الإلكتروني',
      join: 'اشتراك',
      contact: 'معلومات الاتصال',
      rights: '© 2024 أبيكس أوتو مينت. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    }
  },
  ru: {
    nav: {
      services: 'Услуги',
      about: 'О нас',
      faq: 'FAQ',
      contact: 'Контакты',
      book: 'Записаться',
    },
    topBanner: {
      text: 'Круглосуточный консьерж-сервис и бесплатный трансфер авто | Сертификация ISO 9001',
    },
    hero: {
      subtitle: 'Премиальный автосервис',
      title1: 'Совершенство в',
      title2: 'Обслуживании',
      title3: 'Автомобилей.',
      description: 'Испытайте вершину ухода за автомобилем с нашими услугами, сертифицированными по ISO 9001. От точной диагностики до роскошного детейлинга.',
      bookBtn: 'Записаться',
      exploreBtn: 'Услуги',
      stats: {
        exp: 'Лет опыта',
        clients: 'Клиентов',
        support: 'Поддержка',
      },
      cards: {
        iso: { title: 'Сертификат ISO 9001', desc: 'Гарантия международных стандартов качества.' },
        fast: { title: 'Быстрый ремонт', desc: 'Мелкий ремонт в день обращения.' },
        expert: { title: 'Эксперты-механики', desc: 'Сертифицированные профи для всех марок.' },
      }
    },
    services: {
      subtitle: 'Наш опыт',
      title: 'Услуги мирового класса',
      desc: 'Мы предлагаем широкий спектр услуг для поддержания вашего автомобиля в идеальном состоянии. Наш современный центр оснащен для работы со всеми марками и моделями с точностью и заботой.',
      items: {
        maintenance: { title: 'Периодическое ТО', desc: 'Комплексные проверки для долговечности и производительности.' },
        diagnostics: { title: 'Компьютерная диагностика', desc: 'Сканирование новейшим оборудованием для точного поиска неисправностей.' },
        mechanical: { title: 'Слесарный ремонт', desc: 'Ремонт двигателя, трансмиссии и подвески экспертами.' },
        electrical: { title: 'Автоэлектрика', desc: 'Решение проблем с аккумулятором, генератором и проводкой.' },
        ac: { title: 'Обслуживание кондиционера', desc: 'Заправка, поиск утечек и ремонт климат-контроля.' },
        detailing: { title: 'Премиум детейлинг', desc: 'Химчистка, полировка и нанесение керамических покрытий.' },
      }
    },
    about: {
      isoTitle: 'ISO 9001:2015',
      isoDesc: 'Сертифицированное качество',
      rating: 'Рейтинг клиентов',
      served: 'Обслужено клиентов',
      subtitle: 'Почему мы',
      title: 'Ваше спокойствие — наш приоритет',
      desc: "ApexAutoMaint — это не просто гараж, это приверженность совершенству. Наша команда опытных сертифицированных техников использует новейшие инструменты и технологии, чтобы гарантировать безопасность вашего авто. Мы верим в прозрачность, качество и удовлетворенность клиентов превыше всего.",
      features: [
        "Сертифицированный центр ISO 9001:2015",
        "Новейшие технологии диагностики",
        "Гарантия на оригинальные запчасти",
        "Прозрачная ценовая политика"
      ],
      quoteBtn: 'Получить расчет'
    },
    insurance: {
      title: 'Страховые партнеры',
      subtitle: 'Мы работаем со всеми крупными страховыми компаниями для беспроблемного урегулирования убытков.',
    },
    faq: {
      subtitle: 'Вопросы',
      title: 'Часто задаваемые вопросы',
      desc: 'Найдите ответы на часто задаваемые вопросы о наших услугах и правилах.',
      items: [
        { q: 'Есть ли у вас услуга "забрать и вернуть"?', a: 'Да, мы предлагаем бесплатный трансфер автомобиля по Дубаю для крупных работ.' },
        { q: 'Ваши механики сертифицированы?', a: 'Абсолютно. Все наши техники сертифицированы и регулярно проходят обучение по люксовым и спорткарам.' },
        { q: 'Используете ли вы оригинальные запчасти?', a: 'Мы используем 100% оригинальные запчасти или качественные OEM-аналоги, в зависимости от вашего выбора.' },
        { q: 'Сколько времени занимает сервис?', a: 'Мелкое ТО делается в тот же день. Крупный ремонт может занять 2-3 дня в зависимости от наличия запчастей.' },
      ]
    },
    cta: {
      title: 'Готовы почувствовать разницу?',
      desc: 'Свяжитесь с нами сегодня для бесплатной консультации, и позвольте экспертам позаботиться о вашем авто.',
      callBtn: 'Позвонить',
      bookBtn: 'Записаться'
    },
    contact: {
      subtitle: 'Контакты',
      title: 'Наш центр',
      dubaiBranch: 'Филиал в Дубае',
      sharjahBranch: 'Филиал в Шардже',
      dubaiAddr: 'Дубай, ОАЭ',
      sharjahAddr: 'Шарджа, ОАЭ',
      waze: 'Открыть в Waze',
      address: 'Адрес',
      addressVal: 'Al Quoz Industrial Area 3, Дубай, ОАЭ',
      phone: 'Телефон',
      email: 'Email',
      hours: 'Часы работы',
      hoursVal: 'Пн - Сб: 8:00 - 19:00',
      form: {
        name: 'Имя',
        namePh: 'Ваше полное имя',
        phone: 'Телефон',
        phonePh: 'Ваш номер телефона',
        service: 'Тип услуги',
        serviceOptions: { maintenance: 'Регулярное ТО', repair: 'Ремонт', bodywork: 'Кузовной ремонт', other: 'Другое' },
        message: 'Сообщение',
        messagePh: 'Расскажите о проблеме...',
        submit: 'Отправить',
        submitting: 'Отправка...',
        success: 'Отправлено!'
      }
    },
    modal: {
      title: 'Запись на сервис',
      subtitle: 'Запланируйте визит на удобное время',
      name: 'Имя',
      namePh: 'Ваше имя',
      phone: 'Телефон',
      phonePh: '+971 50...',
      date: 'Дата',
      service: 'Услуга',
      serviceOptions: { general: 'Общее обслуживание', oil: 'Замена масла', brake: 'Тормозная система', engine: 'Диагностика двигателя', body: 'Кузовной ремонт', other: 'Другое' },
      submit: 'Подтвердить запись',
      processing: 'Обработка...',
      successTitle: 'Запись подтверждена!',
      successDesc: "Мы свяжемся с вами в ближайшее время для уточнения деталей."
    },
    footer: {
      desc: 'Премиальный автосервис в Дубае. Качество, подтвержденное ISO 9001.',
      links: 'Быстрые ссылки',
      newsletter: 'Рассылка',
      subscribe: 'Подпишитесь, чтобы получать последние предложения и советы по обслуживанию.',
      emailPh: 'Ваш Email',
      join: 'Подписаться',
      contact: 'Контакты',
      rights: '© 2024 ApexAutoMaint. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия обслуживания'
    }
  }
};