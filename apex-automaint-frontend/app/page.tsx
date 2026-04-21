"use client";
import React, { useMemo, useState } from 'react';
import {
  Clock3,
  Droplets,
  Gauge,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import Header from './components/Header';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language } = useLanguage();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const content = useMemo(() => {
    if (language === 'ru') {
      return {
        badge: 'Премиальный автосервис в Дубае',
        heroDesc:
          'Профессиональный уход за вашим автомобилем в сердце Дубая. Современное оборудование, опытные мастера и чёткий сервис на каждом этапе.',
        heroSubline: 'ДУБАЙ - ОАЭ',
        servicesLabel: 'Что мы делаем',
        servicesWord1: 'НАШИ',
        servicesWord2: 'УСЛУГИ',
        whyLabel: 'Почему мы',
        whyWord1: 'ПОЧЕМУ',
        whyWord2: 'ALWAKEEL?',
        brandsLabel: 'Работаем со всеми марками автомобилей',
        reviewsLabel: 'Отзывы клиентов',
        reviewsWord1: 'ЧТО ГОВОРЯТ',
        reviewsWord2: 'КЛИЕНТЫ',
        faqWord1: 'ЧАСТЫЕ',
        faqWord2: 'ВОПРОСЫ',
        ctaLabel: 'Запишитесь сейчас',
        ctaWord1: 'ГОТОВЫ',
        ctaWord2: 'ПОМОЧЬ',
        ctaWord3: 'ВАШЕМУ АВТО',
        ctaDesc:
          'Оставьте заявку или свяжитесь с нами напрямую. Ответим быстро, согласуем удобное время и примем автомобиль без лишней бюрократии.',
        bookNow: 'Записаться',
        ourServices: 'Наши услуги',
        callOrBook: 'Позвонить / Записаться',
        location: 'Локация',
        hours: 'Часы работы',
        phone: 'Телефон',
        whatsapp: 'WhatsApp',
        whatsappValue: 'Быстрый ответ 24/7',
        stats: [
          { value: '12+', label: 'Лет в Дубае' },
          { value: '5000+', label: 'Довольных клиентов' },
          { value: '30+', label: 'Марок автомобилей' },
          { value: '100%', label: 'Гарантия качества' },
        ],
        marquee: [
          'Диагностика',
          'Замена масла',
          'Тормозная система',
          'Кондиционер',
          'Двигатель',
          'Подвеска',
          'Электрика',
          'Кузовной ремонт',
        ],
        testimonials: [
          {
            initials: 'АК',
            name: 'Алексей К.',
            role: 'Дубай, Jumeirah',
            text: 'Отличный сервис. Нашли проблему с двигателем быстро, всё объяснили и сделали в срок. Честно и профессионально.',
          },
          {
            initials: 'МС',
            name: 'Мария С.',
            role: 'Дубай, Marina',
            text: 'Обращаюсь уже не первый раз. Удобная коммуникация, понятные цены и реально качественная работа по кондиционеру и обслуживанию.',
          },
          {
            initials: 'ДМ',
            name: 'Дмитрий М.',
            role: 'Дубай, Downtown',
            text: 'Мастера высокого уровня. Машину держат под контролем, всё по делу и с гарантией. Именно такой сервис и нужен в Дубае.',
          },
        ],
        featureDescriptions: [
          'Даём понятный и прозрачный процесс работы, современную диагностику и качественный контроль на каждом этапе.',
          'Ценим ваше время и стараемся выполнять ключевые работы без лишних задержек.',
          'Используем современную диагностику и понятный процесс согласования работ.',
          'Команда сервиса и мастеров работает как единая система, чтобы клиент всегда понимал статус автомобиля.',
        ],
      };
    }

    if (language === 'ar') {
      return {
        badge: 'خدمة سيارات متميزة في دبي',
        heroDesc:
          'عناية احترافية بسيارتك في قلب دبي. معدات حديثة، فنيون خبراء، وخدمة واضحة في كل مرحلة.',
        heroSubline: 'دبي - الإمارات',
        servicesLabel: 'ماذا نقدم',
        servicesWord1: 'خدماتنا',
        servicesWord2: 'الاحترافية',
        whyLabel: 'لماذا نحن',
        whyWord1: 'لماذا',
        whyWord2: 'ALWAKEEL؟',
        brandsLabel: 'نعمل مع جميع ماركات السيارات',
        reviewsLabel: 'آراء العملاء',
        reviewsWord1: 'ماذا يقول',
        reviewsWord2: 'العملاء',
        faqWord1: 'الأسئلة',
        faqWord2: 'الشائعة',
        ctaLabel: 'احجز الآن',
        ctaWord1: 'جاهزون',
        ctaWord2: 'لخدمة',
        ctaWord3: 'سيارتك',
        ctaDesc:
          'اترك طلبك أو تواصل معنا مباشرة. نرد بسرعة وننسق الوقت المناسب لاستلام السيارة.',
        bookNow: 'احجز الآن',
        ourServices: 'خدماتنا',
        callOrBook: 'اتصل / احجز',
        location: 'الموقع',
        hours: 'ساعات العمل',
        phone: 'الهاتف',
        whatsapp: 'واتساب',
        whatsappValue: 'رد سريع 24/7',
        stats: [
          { value: '12+', label: 'سنوات في دبي' },
          { value: '5000+', label: 'عميل سعيد' },
          { value: '30+', label: 'ماركات سيارات' },
          { value: '100%', label: 'ضمان الجودة' },
        ],
        marquee: [
          'فحص شامل',
          'تغيير زيت',
          'نظام الفرامل',
          'تكييف',
          'المحرك',
          'التعليق',
          'كهرباء',
          'سمكرة ودهان',
        ],
        testimonials: [
          {
            initials: 'AK',
            name: 'أليكسي',
            role: 'دبي، جميرا',
            text: 'خدمة ممتازة، تشخيص سريع، وشرح واضح لكل خطوة. العمل تم في الوقت المحدد وبجودة عالية.',
          },
          {
            initials: 'MS',
            name: 'ماريا',
            role: 'دبي، مارينا',
            text: 'أتعامل معهم باستمرار. الأسعار واضحة، والتواصل ممتاز، وخدمة التكييف والصيانة كانت رائعة.',
          },
          {
            initials: 'DM',
            name: 'ديمتري',
            role: 'دبي، داون تاون',
            text: 'فريق محترف جداً. يتعاملون مع السيارة باهتمام كامل ويقدمون ضماناً وخدمة موثوقة.',
          },
        ],
        featureDescriptions: [
          'نقدم أسلوب عمل واضحاً، وتشخيصاً حديثاً، ورقابة جودة دقيقة في كل مرحلة.',
          'نقدّر وقتك ونسعى لإنجاز الأعمال الأساسية دون تأخير.',
          'نستخدم تشخيصاً حديثاً وعملية واضحة للموافقة على الأعمال.',
          'فريق الخدمة والفنيين يعمل كنظام واحد ليبقى العميل على اطلاع دائم بحالة السيارة.',
        ],
      };
    }

    return {
      badge: "Dubai's Premier Auto Service",
      heroDesc:
        'Professional care for your vehicle in the heart of Dubai. Modern equipment, expert technicians, and a clear service process at every stage.',
      heroSubline: 'DUBAI - UAE',
      servicesLabel: 'What We Do',
      servicesWord1: 'OUR',
      servicesWord2: 'SERVICES',
      whyLabel: 'Why Us',
      whyWord1: 'WHY',
      whyWord2: 'ALWAKEEL?',
      brandsLabel: 'We work with all major car brands',
      reviewsLabel: 'Client Reviews',
      reviewsWord1: 'WHAT CLIENTS',
      reviewsWord2: 'SAY',
      faqWord1: 'FREQUENTLY',
      faqWord2: 'ASKED',
      ctaLabel: 'Book Now',
      ctaWord1: 'READY',
      ctaWord2: 'TO HELP',
      ctaWord3: 'YOUR CAR',
      ctaDesc:
        'Send a request or contact us directly. We reply fast, arrange a convenient time, and accept your vehicle without unnecessary friction.',
      bookNow: 'Book Now',
      ourServices: 'Our Services',
      callOrBook: 'Call / Book',
      location: 'Location',
      hours: 'Working Hours',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      whatsappValue: 'Quick response 24/7',
      stats: [
        { value: '12+', label: 'Years in Dubai' },
        { value: '5000+', label: 'Happy Clients' },
        { value: '30+', label: 'Car Brands' },
        { value: '100%', label: 'Quality Guarantee' },
      ],
      marquee: [
        'Diagnostics',
        'Oil Change',
        'Brake Service',
        'AC Service',
        'Engine Repair',
        'Suspension',
        'Electrical',
        'Body Work',
      ],
      testimonials: [
        {
          initials: 'AK',
          name: 'Alexey K.',
          role: 'Dubai, Jumeirah',
          text: 'Excellent service. They diagnosed the engine issue fast, explained everything clearly, and finished on time.',
        },
        {
          initials: 'MS',
          name: 'Maria S.',
          role: 'Dubai, Marina',
          text: 'I keep coming back. Clear pricing, smooth communication, and very solid AC and maintenance work.',
        },
        {
          initials: 'DM',
          name: 'Dmitry M.',
          role: 'Dubai, Downtown',
          text: 'A highly professional team. They handle the car with care, keep you informed, and deliver with confidence.',
        },
      ],
      featureDescriptions: [
        'We provide a clear workflow, modern diagnostics, and quality control at every stage.',
        'We value your time and aim to complete key work without unnecessary delays.',
        'We use modern diagnostics and a clear approval process for all work.',
        'Our service advisors and technicians work as one system so the client always knows the vehicle status.',
      ],
    };
  }, [language]);

  const serviceCards = [
    { key: 'diagnostics', icon: Gauge, num: '01' },
    { key: 'ac', icon: Droplets, num: '02' },
    { key: 'mechanical', icon: ShieldCheck, num: '03' },
    { key: 'maintenance', icon: Sparkles, num: '04' },
    { key: 'electrical', icon: Wrench, num: '05' },
    { key: 'detailing', icon: Users, num: '06' },
  ] as const;

  const locationItems = [
    { icon: MapPin, label: content.location, value: 'Al Khuzaima St, Sharjah Industrial Area 7' },
    { icon: Clock3, label: content.hours, value: t.contact.hoursVal },
    { icon: Phone, label: content.phone, value: '+971 52 352 4196 / +971 52 258 1990' },
    { icon: MessageCircle, label: content.whatsapp, value: content.whatsappValue },
  ];

  const brands = ['BMW', 'Mercedes', 'Toyota', 'Lexus', 'Audi', 'Nissan', 'Land Rover', 'Porsche'];

  return (
    <>
      <Header onBookClick={openModal} forceDarkHeader />
      <main className="bg-dark text-white overflow-hidden">
        <section className="relative min-h-screen pt-28 md:pt-32 pb-14 md:pb-20">
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(34,168,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,168,255,0.03)_1px,transparent_1px)] [background-size:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,168,255,0.18),_transparent_28%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(11,134,216,0.12),_transparent_24%)]" />
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
              <div className="max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-3 border border-gold/20 bg-black/20 px-4 py-2 mb-8 text-gold text-[11px] font-bold uppercase tracking-[0.28em]">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  {content.badge}
                </div>
                <h1 className="font-sans text-[52px] leading-[0.9] md:text-[92px] lg:text-[110px] uppercase tracking-[0.04em] font-black mb-6">
                  <span className="block text-white">ALWAKEEL</span>
                  <span className="block text-gold">AUTO MAINT</span>
                  <span className="block text-white/15 text-[0.44em] tracking-[0.35em] mt-3">
                    {content.heroSubline}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-8 mb-10">
                  {content.heroDesc}
                </p>
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <button
                    onClick={openModal}
                    className="bg-gold text-dark px-10 py-4 text-sm font-black uppercase tracking-[0.24em] [clip-path:polygon(12px_0%,100%_0%,calc(100%-12px)_100%,0%_100%)] hover:bg-white transition-colors"
                  >
                    {content.bookNow}
                  </button>
                  <a
                    href="#services"
                    className="flex items-center gap-4 text-white hover:text-gold text-sm font-bold uppercase tracking-[0.18em] transition-colors"
                  >
                    <span className="w-10 h-px bg-gold" />
                    {content.ourServices}
                  </a>
                </div>
              </div>

              <div className="relative min-h-[420px] lg:min-h-[620px]">
                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(34,168,255,0.18)_0%,_transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80&fm=jpg&auto=format&fit=crop"
                    alt="ALWAKEEL AUTO MAINT"
                    className="w-full max-w-[760px] object-contain drop-shadow-[0_0_60px_rgba(34,168,255,0.28)]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gold/15 pt-8">
              {content.stats.map((item) => (
                <div key={item.label}>
                  <div className="font-sans text-5xl md:text-6xl font-black leading-none text-gold">
                    {item.value}
                  </div>
                  <div className="text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-gray-500 mt-2">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gold py-4 border-y border-gold/40 overflow-hidden">
          <div className="whitespace-nowrap animate-[marquee_22s_linear_infinite] flex gap-10 min-w-max">
            {[...content.marquee, ...content.marquee].map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className="flex items-center gap-6 text-dark text-sm font-black uppercase tracking-[0.28em]"
              >
                <span>{item}</span>
                <span className="text-[8px]">◆</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container">
            <div className="border border-gold/15 bg-[rgba(0,170,255,0.05)] px-6 py-6 md:px-10 md:py-8 grid lg:grid-cols-4 gap-6">
              {locationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <Icon className="text-gold h-6 w-6 shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                        {item.label}
                      </div>
                      <div className="text-white font-semibold tracking-wide">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="py-20 md:py-28">
          <div className="container">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.32em] mb-4">
              {content.servicesLabel}
            </div>
            <h2 className="font-sans text-[42px] leading-[0.95] md:text-[72px] uppercase tracking-[0.04em] font-black mb-14">
              <span className="block text-white">{content.servicesWord1}</span>
              <span className="block text-gold">{content.servicesWord2}</span>
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-gold/10">
              {serviceCards.map(({ key, icon: Icon, num }) => {
                const item = t.services.items[key];
                return (
                  <div
                    key={key}
                    className="relative overflow-hidden border border-gold/10 bg-dark-lighter px-8 py-10 hover:bg-[#151f2a] transition-all hover:-translate-y-1"
                  >
                    <div className="absolute top-5 right-6 font-sans text-6xl font-black text-gold/10">
                      {num}
                    </div>
                    <Icon className="h-14 w-14 text-gold mb-6" />
                    <div className="font-sans text-2xl uppercase tracking-[0.04em] font-bold text-white mb-3">
                      {item.title}
                    </div>
                    <p className="text-gray-400 leading-7 text-sm">{item.desc}</p>
                    <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-gold/70" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-28">
          <div className="container grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=900&q=80&auto=format&fit=crop"
                alt="Workshop"
                className="w-full h-[520px] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80&auto=format&fit=crop"
                alt="Vehicle detail"
                className="absolute -bottom-8 -right-4 md:-right-8 w-44 h-44 md:w-52 md:h-52 object-cover border-4 border-dark"
              />
              <div className="absolute top-6 -left-3 md:-left-5 bg-gold text-dark px-5 py-3 text-xs font-black uppercase tracking-[0.2em]">
                {t.about.isoDesc}
              </div>
            </div>

            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-[0.32em] mb-4">
                {content.whyLabel}
              </div>
              <h2 className="font-sans text-[42px] leading-[0.95] md:text-[72px] uppercase tracking-[0.04em] font-black mb-8">
                <span className="block text-white">{content.whyWord1}</span>
                <span className="block text-gold">{content.whyWord2}</span>
              </h2>

              <div className="space-y-8">
                {t.about.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className={`flex gap-5 ${idx !== t.about.features.length - 1 ? 'pb-8 border-b border-gold/10' : ''}`}
                  >
                    <div className="w-11 h-11 shrink-0 border border-gold/15 bg-gold/10 flex items-center justify-center text-gold">
                      {idx === 0 && <ShieldCheck className="h-5 w-5" />}
                      {idx === 1 && <Clock3 className="h-5 w-5" />}
                      {idx === 2 && <Wrench className="h-5 w-5" />}
                      {idx === 3 && <Users className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="font-sans text-xl uppercase tracking-[0.04em] font-bold mb-2 text-white">
                        {feature}
                      </div>
                      <p className="text-sm leading-7 text-gray-400">
                        {content.featureDescriptions[idx]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-gold/10">
          <div className="container">
            <div className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-10">
              {content.brandsLabel}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-8">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="font-sans text-2xl md:text-3xl font-black uppercase tracking-[0.18em] text-white/15 hover:text-gold transition-colors"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 md:py-28 bg-dark-lighter/60">
          <div className="container">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.32em] mb-4">
              {content.reviewsLabel}
            </div>
            <h2 className="font-sans text-[42px] leading-[0.95] md:text-[72px] uppercase tracking-[0.04em] font-black mb-14">
              <span className="block text-white">{content.reviewsWord1}</span>
              <span className="block text-gold">{content.reviewsWord2}</span>
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {content.testimonials.map((item) => (
                <div
                  key={item.name}
                  className="relative border border-gold/10 bg-dark-lighter px-8 py-8"
                >
                  <div className="absolute top-4 right-6 font-sans text-7xl leading-none text-gold/20">
                    &quot;
                  </div>
                  <div className="flex gap-1 text-gold mb-5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-7 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 md:py-28">
          <div className="container">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.32em] mb-4">
              {t.faq.subtitle}
            </div>
            <h2 className="font-sans text-[42px] leading-[0.95] md:text-[72px] uppercase tracking-[0.04em] font-black mb-6">
              <span className="block text-white">{content.faqWord1}</span>
              <span className="block text-gold">{content.faqWord2}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mb-12">{t.faq.desc}</p>
            <div className="grid gap-4">
              {t.faq.items.map((item) => (
                <div
                  key={item.q}
                  className="border border-gold/10 bg-dark-lighter px-6 py-6"
                >
                  <div className="text-white font-bold mb-3 uppercase tracking-[0.04em]">
                    {item.q}
                  </div>
                  <div className="text-sm leading-7 text-gray-400">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-24 md:py-32 text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="font-sans text-[120px] md:text-[240px] font-black uppercase tracking-[0.2em] text-gold/[0.03]">
              SERVICE
            </div>
          </div>
          <div className="container relative z-10">
            <div className="text-gold text-xs font-bold uppercase tracking-[0.32em] mb-4">
              {content.ctaLabel}
            </div>
            <h2 className="font-sans text-[48px] leading-[0.9] md:text-[96px] uppercase tracking-[0.04em] font-black mb-6">
              <span className="block text-white">{content.ctaWord1}</span>
              <span className="block text-gold">{content.ctaWord2}</span>
              <span className="block text-white">{content.ctaWord3}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-8 mb-10">
              {content.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={openModal}
                className="bg-gold text-dark px-10 py-4 text-sm font-black uppercase tracking-[0.24em] [clip-path:polygon(12px_0%,100%_0%,calc(100%-12px)_100%,0%_100%)] hover:bg-white transition-colors"
              >
                {content.callOrBook}
              </button>
              <a
                href="https://wa.me/971523524196"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-gold/15 px-8 py-4 text-gold text-lg font-bold tracking-[0.12em] uppercase hover:bg-gold/10 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
