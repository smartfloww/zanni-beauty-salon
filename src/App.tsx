import { type ReactNode, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Facebook, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import heroImage from '@/assets/hero-beauty.jpg';
import detailImage from '@/assets/detail-beauty.jpg';
import portraitImage from '@/assets/portrait-beauty.jpg';
import './index.css';

const queryClient = new QueryClient();
const facebookUrl = 'https://www.facebook.com/ZANNIBeautySalon/';
const phoneNumber = '0927-8829-513';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Our work' },
  { href: '/contact', label: 'Visit us' },
];

type LocationDetails = {
  id: string;
  name: string;
  address: string[];
  landmark: string;
  hours: string;
  mapQuery: string;
};

const locations: LocationDetails[] = [
  {
    id: 'main',
    name: 'Main Salon',
    address: ['3775 Tirona Road', 'San Agustin 2', 'Dasmarinas City, Cavite'],
    landmark: 'Beside Alfamart',
    hours: 'Daily, 8:45 AM - 6:00 PM',
    mapQuery: 'Zanni Beauty Salon, 3775 Tirona Road, San Agustin 2, Dasmarinas City, Cavite, Philippines',
  },
  {
    id: 'branch',
    name: 'Branch Salon',
    address: ['B38 L29 P2 Main Road', 'Cityhomes Resortville Subd.', 'Langkaan 2', 'Dasmarinas City, Cavite'],
    landmark: 'Infront of Oasis Water Station',
    hours: 'Daily, 10:15 AM - 7:30 PM',
    mapQuery: 'Zanni Beauty Salon, B38 L29 P2 Main Road, Cityhomes Resortville Subd., Langkaan 2, Dasmarinas City, Cavite, Philippines',
  },
];

const mapEmbedUrl = (location: LocationDetails) => `https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`;
const mapOpenUrl = (location: LocationDetails) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`;

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const publicImages = {
  hairOne: assetPath('images/hairs1.jpg'),
  hairTwo: assetPath('images/hairs2.jpg'),
  hairThree: assetPath('images/hairs3.jpg'),
  nailsOne: assetPath('images/nails1.jpg'),
  nailsTwo: assetPath('images/nails2.jpg'),
  logo: assetPath('images/logo.png'),
};

function Logo() {
  return <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/45 font-serif text-lg italic text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">Z</span>
    <span className="leading-none"><span className="block font-serif text-lg tracking-[.2em]">ZANNI</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.3em] text-muted-foreground">Beauty Salon</span></span>
  </Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return <>
    <div className="hidden border-b border-primary/10 bg-secondary/60 px-6 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[.2em] text-primary md:block">#May Everyday Promo Ka</div>
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between px-6 lg:px-10"><Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className={`link-underline text-[10px] font-semibold uppercase tracking-[.18em] ${location === item.href ? 'text-primary' : 'text-foreground/60 hover:text-foreground'}`} data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.label}</Link>)}</nav>
        <div className="hidden items-center gap-5 md:flex"><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-foreground/65"><Phone size={14} /> {phoneNumber}</span><a href={facebookUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-[.17em] text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90" data-testid="link-header-messenger">Message us</a></div>
        <button type="button" className="rounded-full border border-foreground/15 p-2.5 text-foreground md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && <div className="absolute left-0 right-0 top-[78px] border-b border-foreground/10 bg-background px-6 py-7 shadow-xl md:hidden"><nav className="flex flex-col gap-1" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-foreground/10 py-4 font-serif text-3xl italic" data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.label}</Link>)}<span className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.13em] text-primary"><Phone size={15} /> {phoneNumber}</span><a href={facebookUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-4 inline-flex w-fit rounded-full bg-primary px-5 py-3 text-[10px] font-bold uppercase tracking-[.17em] text-primary-foreground">Message us on Messenger</a></nav></div>}
    </header>
  </>;
}

function Footer() {
  return <footer className="bg-foreground px-6 py-14 text-background lg:px-10"><div className="mx-auto max-w-[1320px]"><div className="grid gap-12 md:grid-cols-[1.1fr_1fr_1fr]"><div><div className="font-serif text-4xl tracking-[.16em]">ZANNI</div><p className="mt-5 max-w-[300px] text-sm leading-7 text-background/55">A warm beauty space for thoughtful cuts, details, and time that feels like yours.</p><div className="mt-6 flex items-center gap-3"><img src={publicImages.logo} alt="ZANNI Beauty Salon logo" className="h-12 w-12 rounded-lg object-cover" /><span className="text-[10px] uppercase tracking-[.18em] text-background/45">Hair · Nails · Waxing · Massage</span></div></div><div><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-background/40">Visit both branches</p>{locations.map((location) => <div key={location.id} className="mb-5 text-sm leading-6 text-background/75"><p className="font-semibold text-background">{location.name}</p><address className="not-italic">{location.address.map((line) => <span key={line} className="block">{line}</span>)}</address><p className="mt-1 text-xs text-background/50">{location.hours}</p></div>)}</div><div><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-background/40">Connect</p><span className="block text-sm text-background/75">{phoneNumber}</span><a href={facebookUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-background/75 hover:text-accent"><Facebook size={15} /> Message us</a><Link href="/contact" className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.15em] text-accent">See locations <ArrowUpRight size={13} /></Link></div></div><div className="mt-14 flex flex-col gap-3 border-t border-background/15 pt-5 text-[10px] uppercase tracking-[.15em] text-background/35 sm:flex-row sm:justify-between"><span>ZANNI Beauty Salon · Dasmarinas City</span><span>Come as you are</span></div></div></footer>;
}

function Shell({ children }: { children: ReactNode }) { return <><Header />{children}<Footer /></>; }

const serviceGroups = [
  { number: '01', title: 'Hair', intro: 'A considered refresh, shaped around you.', items: ['Cuts & styling', 'Color & tone', 'Hair treatments'], image: publicImages.hairTwo },
  { number: '02', title: 'Nails', intro: 'Small details that finish the feeling.', items: ['Manicure', 'Pedicure', 'Nail care'], image: publicImages.nailsTwo },
  { number: '03', title: 'Beauty', intro: 'A quiet reset, from brows to glow.', items: ['Waxing', 'Massage', 'Beauty care'], image: detailImage },
];

function SectionLabel({ children }: { children: ReactNode }) { return <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.25em] text-primary"><span className="h-px w-8 bg-accent" />{children}</p>; }

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, [location]);
  return null;
}

function LocationSummary({ location }: { location: LocationDetails }) {
  return <article className="rounded-3xl border border-foreground/10 bg-background/70 p-7 md:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-primary">{location.id === 'main' ? '01' : '02'}</p><h3 className="mt-2 font-serif text-3xl">{location.name}</h3></div><MapPin className="mt-1 text-accent" size={22} strokeWidth={1.5} /></div><address className="mt-5 not-italic text-sm leading-6 text-muted-foreground">{location.address.map((line) => <span key={line} className="block">{line}</span>)}</address><dl className="mt-5 space-y-2 border-t border-foreground/10 pt-5 text-sm"><div className="flex gap-3"><dt className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-[.15em] text-primary">Landmark</dt><dd className="text-foreground/75">{location.landmark}</dd></div><div className="flex gap-3"><dt className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-[.15em] text-primary">Hours</dt><dd className="text-foreground/75">{location.hours}</dd></div></dl></article>;
}

function MapCard({ location }: { location: LocationDetails }) {
  return <article className="overflow-hidden rounded-3xl border border-foreground/10 bg-background"><div className="relative h-64 bg-muted"><iframe src={mapEmbedUrl(location)} title={`Map showing ${location.name}`} className="h-full w-full border-0 grayscale-[.25]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-primary shadow-sm">{location.name}</div></div><div className="p-7"><div className="flex items-center justify-between gap-4"><h3 className="font-serif text-3xl">{location.name}</h3><MapPin size={21} className="text-accent" /></div><address className="mt-4 not-italic text-sm leading-6 text-muted-foreground">{location.address.map((line) => <span key={line} className="block">{line}</span>)}</address><div className="mt-5 grid gap-3 border-t border-foreground/10 pt-5 text-sm sm:grid-cols-2"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-primary">Landmark</p><p className="mt-1 text-foreground/75">{location.landmark}</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-primary">Opening hours</p><p className="mt-1 text-foreground/75">{location.hours}</p></div></div><a href={mapOpenUrl(location)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-primary hover:text-foreground">Open this pin in Maps <ArrowUpRight size={14} /></a></div></article>;
}

function Home() {
  return <Shell><main>
    <section className="mx-auto grid max-w-[1320px] gap-10 px-6 pb-20 pt-10 md:grid-cols-[.82fr_1.18fr] md:items-end md:gap-16 md:px-10 md:pb-28 md:pt-16"><div className="animate-rise-in pb-2 md:pb-14"><SectionLabel>Dasmarinas City · Cavite</SectionLabel><h1 className="mt-7 max-w-[650px] font-serif text-[clamp(3.8rem,8vw,8.8rem)] leading-[.88] tracking-[-.06em]">Feel good<br /><em className="text-primary">in your skin.</em></h1><p className="mt-8 max-w-[420px] text-[15px] leading-7 text-muted-foreground">A warm, thoughtful salon experience for the way you want to feel today. Come for a little reset. Leave feeling more like yourself.</p><div className="mt-9 flex flex-wrap items-center gap-5"><Link href="/services" className="group flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-[10px] font-bold uppercase tracking-[.17em] text-primary-foreground transition hover:-translate-y-0.5" data-testid="link-hero-services">Explore services <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link><a href={facebookUrl} target="_blank" rel="noreferrer" className="link-underline text-[10px] font-bold uppercase tracking-[.17em] text-foreground/65 hover:text-primary" data-testid="link-hero-facebook">Message us on Facebook</a></div></div><div className="animate-fade-in relative min-h-[440px] overflow-hidden rounded-[11rem_11rem_1rem_1rem] bg-muted md:min-h-[650px]"><img src={heroImage} alt="Woman with sleek dark hair in warm studio light" className="image-editorial h-full w-full object-cover object-center" data-testid="img-home-hero" /><div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-background/90 px-5 py-3 text-[10px] font-bold uppercase tracking-[.17em] text-foreground/70 shadow-lg"><Sparkles size={14} className="text-accent" />Feel like yourself</div></div></section>

    <section className="border-y border-foreground/10 bg-secondary/45 px-6 py-7 md:px-10"><div className="mx-auto grid max-w-[1320px] gap-6 sm:grid-cols-3"><div className="flex items-center gap-4 border-foreground/10 sm:border-r"><span className="font-serif text-3xl text-primary">01</span><span className="text-[10px] font-bold uppercase tracking-[.15em] text-muted-foreground">Personal<br />attention</span></div><div className="flex items-center gap-4 border-foreground/10 sm:border-r sm:pl-7"><span className="font-serif text-3xl text-primary">02</span><span className="text-[10px] font-bold uppercase tracking-[.15em] text-muted-foreground">Hair, nails<br />& beauty</span></div><div className="flex items-center gap-4 sm:pl-7"><span className="font-serif text-3xl text-primary">03</span><span className="text-[10px] font-bold uppercase tracking-[.15em] text-muted-foreground">Two branches<br />in Dasmarinas</span></div></div></section>

    <section className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 md:grid-cols-[.7fr_1.3fr] md:gap-28 md:px-10 md:py-32"><div><SectionLabel>The Zanni approach</SectionLabel><div className="mt-8 hidden aspect-[4/5] overflow-hidden rounded-t-full bg-muted md:block"><img src={portraitImage} alt="Soft profile portrait" className="image-editorial h-full w-full object-cover" /></div></div><div className="flex flex-col justify-center"><h2 className="max-w-[750px] font-serif text-[clamp(2.6rem,5vw,5.4rem)] leading-[1.01] tracking-[-.05em]">Beauty should feel like a conversation, not a <em className="text-primary">prescription.</em></h2><p className="mt-8 max-w-[580px] text-[15px] leading-7 text-muted-foreground">From a quiet reset to a fresh new look, we keep every detail personal. We listen first, work with care, and make space for the version of you that is already there.</p><p className="mt-8 font-serif text-2xl italic text-primary">#VIP Result Na Hindi Masakit Sa Bulsa</p><Link href="/contact" className="mt-9 inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.17em] text-primary hover:text-foreground">Start with a hello <ArrowDownRight size={16} /></Link></div></section>

    <section className="bg-primary px-6 py-20 text-primary-foreground md:px-10 md:py-28"><div className="mx-auto max-w-[1320px]"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionLabel>Find your feeling</SectionLabel><h2 className="mt-5 font-serif text-5xl leading-none tracking-[-.04em] md:text-7xl">A little<br /><em>something</em> for you.</h2><p className="mt-5 max-w-lg text-sm leading-6 text-primary-foreground/75">#Hair, Nails, Waxing & Massage Services</p></div><Link href="/services" className="group flex w-fit items-center gap-3 rounded-full border border-primary-foreground/50 px-6 py-4 text-[10px] font-bold uppercase tracking-[.17em] transition hover:bg-primary-foreground hover:text-primary">View the menu <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></div><div className="mt-14 grid gap-4 md:grid-cols-3">{serviceGroups.map((group) => <Link key={group.number} href="/services" className="service-teaser group relative min-h-[290px] overflow-hidden rounded-t-full bg-black/10"><img src={group.image} alt={`${group.title} service work`} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" /><div className="absolute bottom-0 p-6"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-accent">{group.number}</p><h3 className="mt-2 font-serif text-3xl">{group.title}</h3><p className="mt-1 text-sm text-white/75">{group.intro}</p></div></Link>)}</div></div></section>

    <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Find your branch</SectionLabel><h2 className="mt-6 max-w-[700px] font-serif text-[clamp(2.8rem,5vw,5.3rem)] leading-[.98] tracking-[-.045em]">Two easy places to say <em className="text-primary">hello.</em></h2></div><Link href="/contact" className="inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.17em] text-primary">View maps & details <ArrowUpRight size={15} /></Link></div><div className="mt-12 grid gap-5 md:grid-cols-2">{locations.map((location) => <LocationSummary key={location.id} location={location} />)}</div></section>
  </main></Shell>;
}

function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return <Shell><main><section className="mx-auto max-w-[1320px] px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24"><SectionLabel>The menu</SectionLabel><div className="mt-8 grid gap-8 md:grid-cols-[1fr_.65fr] md:items-end"><div><h1 className="font-serif text-[clamp(3.8rem,8vw,8.5rem)] leading-[.86] tracking-[-.06em]">Services<br /><em className="text-primary">for you.</em></h1><p className="mt-6 font-serif text-2xl italic text-primary">#You Must Try To Believe</p></div><p className="max-w-[360px] text-[15px] leading-7 text-muted-foreground md:mb-2">Take your time. Browse our menu and find a little something that feels right.</p></div></section><section className="border-t border-foreground/10"><div className="mx-auto max-w-[1320px] px-6 md:px-10">{serviceGroups.map((group) => { const isOpen = expanded === group.title; return <div key={group.number} className="grid gap-7 border-b border-foreground/10 py-10 md:grid-cols-[90px_1fr_1fr] md:gap-12 md:py-14"><p className="font-serif text-2xl italic text-accent">{group.number}</p><div><h2 className="font-serif text-5xl tracking-[-.04em]">{group.title}</h2><p className="mt-3 max-w-[300px] text-sm leading-6 text-muted-foreground">{group.intro}</p></div><div className="md:pt-2"><button type="button" onClick={() => setExpanded(isOpen ? null : group.title)} className="flex w-full items-center justify-between border-b border-foreground/15 pb-4 text-left text-[10px] font-bold uppercase tracking-[.16em] text-primary md:hidden">Explore category <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} /></button><ul className={`${isOpen ? 'mt-5' : 'hidden'} space-y-4 md:mt-0 md:block`}>{group.items.map((item) => <li key={item} className="flex items-center justify-between border-b border-foreground/10 pb-4 text-[15px] text-foreground/75"><span>{item}</span><span className="text-accent">＋</span></li>)}</ul></div></div>; })}</div></section><section className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 md:grid-cols-[.8fr_1.2fr] md:gap-28 md:px-10 md:py-32"><div className="aspect-[4/3] overflow-hidden rounded-[3rem] bg-muted"><img src={publicImages.hairOne} alt="Long hair color work at ZANNI Beauty Salon" className="image-editorial h-full w-full object-cover" /></div><div className="flex flex-col justify-center"><SectionLabel>Not sure where to start?</SectionLabel><h2 className="mt-5 max-w-[580px] font-serif text-5xl leading-[1.02] tracking-[-.04em]">Tell us what you’re <em className="text-primary">feeling.</em></h2><p className="mt-6 max-w-[440px] text-[15px] leading-7 text-muted-foreground">Call or message us and we’ll help you find the right place to begin.</p><div className="mt-8 flex flex-wrap items-center gap-6"><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-primary"><Phone size={15} /> {phoneNumber}</span><a href={facebookUrl} target="_blank" rel="noreferrer" className="link-underline text-[10px] font-bold uppercase tracking-[.17em] text-foreground/65 hover:text-primary">Message on Facebook</a></div></div></section></main></Shell>;
}

function GalleryImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <figure className={`gallery-frame overflow-hidden rounded-[2rem] bg-muted ${className}`}><img src={src} alt={alt} className="image-editorial h-full w-full object-cover" loading="lazy" /></figure>;
}

function Gallery() {
  return <Shell><main><section className="mx-auto grid max-w-[1320px] gap-12 px-6 pb-16 pt-16 md:grid-cols-[1fr_.55fr] md:items-end md:px-10 md:pb-24 md:pt-24"><div><SectionLabel>Past work</SectionLabel><h1 className="mt-8 font-serif text-[clamp(3.8rem,8vw,8.5rem)] leading-[.86] tracking-[-.06em]">Our<br /><em className="text-primary">work.</em></h1><p className="mt-8 max-w-[480px] text-[15px] leading-7 text-muted-foreground">A look at the hair and nail details made at ZANNI Beauty Salon. Bring us a reference, or come in ready for a conversation.</p></div><div className="rounded-[2rem] border border-foreground/10 bg-secondary/60 p-5"><img src={publicImages.logo} alt="ZANNI Beauty Salon logo" className="aspect-square w-full rounded-[1.25rem] object-cover" /><p className="mt-5 font-serif text-2xl italic text-primary">#Serbisyo ay Legit Na Babalik Balikan Mo</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Hair, nails, waxing and massage services in Dasmarinas City.</p></div></section><section className="border-y border-foreground/10 bg-secondary/35 px-6 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-[1320px]"><div className="flex items-end justify-between gap-6"><div><SectionLabel>01 · Hair</SectionLabel><h2 className="mt-5 font-serif text-5xl tracking-[-.04em] md:text-7xl">Shape, tone<br /><em className="text-primary">& movement.</em></h2></div><p className="hidden max-w-[250px] text-right text-sm leading-6 text-muted-foreground md:block">Real work from the salon floor, captured in the details.</p></div><div className="mt-12 grid gap-5 md:grid-cols-[1.08fr_.92fr]"><GalleryImage src={publicImages.hairTwo} alt="Warm curled hair styling work" className="h-[440px] md:h-[650px]" /><div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1"><GalleryImage src={publicImages.hairOne} alt="Long warm-toned hair work" className="h-[300px] sm:h-[360px] md:h-[315px]" /><GalleryImage src={publicImages.hairThree} alt="Short layered hair work" className="h-[300px] sm:h-[360px] md:h-[315px]" /></div></div></div></section><section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28"><div className="flex items-end justify-between gap-6"><div><SectionLabel>02 · Nails</SectionLabel><h2 className="mt-5 font-serif text-5xl tracking-[-.04em] md:text-7xl">Small details,<br /><em className="text-primary">big feeling.</em></h2></div><Link href="/contact" className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-primary md:inline-flex">Plan your visit <ArrowUpRight size={14} /></Link></div><div className="mt-12 grid gap-5 md:grid-cols-[.92fr_1.08fr]"><GalleryImage src={publicImages.nailsOne} alt="Classic red manicure" className="h-[430px] md:h-[580px]" /><GalleryImage src={publicImages.nailsTwo} alt="Soft lilac manicure" className="h-[430px] md:h-[580px]" /></div><div className="mt-9 md:hidden"><Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-primary">Plan your visit <ArrowUpRight size={14} /></Link></div></section></main></Shell>;
}

function Contact() {
  return <Shell><main><section className="mx-auto max-w-[1320px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24"><SectionLabel>Come say hello</SectionLabel><div className="mt-8 grid gap-12 md:grid-cols-[1fr_.6fr] md:items-end"><div><h1 className="font-serif text-[clamp(3.7rem,8vw,8.5rem)] leading-[.86] tracking-[-.06em]">Let’s make<br /><em className="text-primary">time for you.</em></h1><p className="mt-7 font-serif text-2xl italic text-primary">#May Everyday Promo Ka</p></div><p className="max-w-[350px] text-[15px] leading-7 text-muted-foreground md:mb-2">We’re easy to reach in Dasmarinas City. Choose the branch that’s nearest to you, then message us whenever you’re ready.</p></div></section><section className="border-y border-foreground/10 bg-secondary/45 px-6 py-16 md:px-10 md:py-24"><div className="mx-auto max-w-[1320px]"><div className="grid gap-14 md:grid-cols-[.75fr_1.25fr] md:gap-28"><div><SectionLabel>Reach us</SectionLabel><div className="mt-8 space-y-8"><div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">Phone</span><span className="flex flex-wrap items-center gap-3 font-serif text-3xl text-foreground md:text-4xl">{phoneNumber}</span></div><div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">Facebook Messenger</span><a href={facebookUrl} target="_blank" rel="noreferrer" className="group flex flex-wrap items-center gap-3 font-serif text-3xl text-foreground hover:text-primary md:text-4xl">Message us <ArrowUpRight size={21} /></a></div></div></div><div><SectionLabel>Both branches</SectionLabel><div className="mt-8 grid gap-5 sm:grid-cols-2">{locations.map((location) => <LocationSummary key={location.id} location={location} />)}</div></div></div></div></section><section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-32"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Find the right pin</SectionLabel><h2 className="mt-5 max-w-[720px] font-serif text-5xl leading-[1.02] tracking-[-.04em] md:text-7xl">Two branches,<br /><em className="text-primary">one warm welcome.</em></h2></div><p className="max-w-[280px] text-sm leading-6 text-muted-foreground">Use the embedded maps below to confirm each location before your visit.</p></div><div className="mt-12 grid gap-7 lg:grid-cols-2">{locations.map((location) => <MapCard key={location.id} location={location} />)}</div></section><section className="mx-auto grid max-w-[1320px] gap-10 px-6 pb-20 md:grid-cols-[.65fr_1fr] md:items-center md:px-10 md:pb-32"><div className="aspect-[4/3] overflow-hidden rounded-[3rem] bg-muted"><img src={publicImages.hairThree} alt="Short layered hair work at ZANNI Beauty Salon" className="image-editorial h-full w-full object-cover" /></div><div><p className="font-serif text-4xl leading-[1.08] text-primary md:text-6xl">A good visit starts with a simple hello.</p><div className="mt-9 editorial-rule max-w-[240px]" /><a href={facebookUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 rounded-full border border-primary px-5 py-3.5 text-[10px] font-bold uppercase tracking-[.17em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"><Facebook size={15} /> Message us on Facebook</a></div></section></main></Shell>;
}

function NotFound() { return <Shell><main className="mx-auto min-h-[60vh] max-w-[1320px] px-6 py-24 md:px-10"><SectionLabel>Page not found</SectionLabel><h1 className="mt-6 font-serif text-6xl">Let’s go <em className="text-primary">home.</em></h1><Link href="/" className="mt-8 inline-flex rounded-full border border-primary px-5 py-3 text-[10px] font-bold uppercase tracking-[.17em] text-primary">Back to home</Link></main></Shell>; }

function Router() { return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/gallery" component={Gallery} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><ScrollToTop /><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;
