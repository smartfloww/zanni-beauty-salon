import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Facebook, Menu, Phone, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import heroImage from '@/assets/hero-beauty.jpg';
import detailImage from '@/assets/detail-beauty.jpg';
import portraitImage from '@/assets/portrait-beauty.jpg';
import './index.css';

const queryClient = new QueryClient();
const facebookUrl = 'https://www.facebook.com/ZANNIBeautySalon/';
const phoneNumber = '+63 927 882 9513';
const telNumber = 'tel:+639278829513';

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
      <span className="flex h-10 w-10 items-center justify-center border border-foreground/35 font-serif text-lg italic text-primary transition-colors group-hover:border-primary">Z</span>
      <span className="leading-none">
        <span className="block font-serif text-lg tracking-[.2em]">ZANNI</span>
        <span className="mt-1 block text-[9px] font-medium uppercase tracking-[.3em] text-muted-foreground">Beauty Salon</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const navItems = [{ href: '/', label: 'Home' }, { href: '/services', label: 'Services' }, { href: '/contact', label: 'Contact' }];
  return (
    <header className="relative z-40 border-b border-foreground/10 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`link-underline text-[11px] font-medium uppercase tracking-[.18em] ${location === item.href ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-7 md:flex">
          <a href={telNumber} className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[.13em] text-foreground/75 hover:text-primary" data-testid="link-header-call"><Phone size={14} strokeWidth={1.5} /> Call now</a>
          <Link href="/contact" className="border border-primary bg-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-[.17em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary" data-testid="link-header-contact">Get in touch</Link>
        </div>
        <button type="button" className="p-2 text-foreground md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X size={23} strokeWidth={1.5} /> : <Menu size={23} strokeWidth={1.5} />}
        </button>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-[76px] border-b border-foreground/10 bg-background px-6 py-7 md:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-foreground/10 pb-4 font-serif text-2xl italic text-foreground" data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>
            ))}
            <a href={telNumber} onClick={() => setOpen(false)} className="mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.18em] text-primary" data-testid="link-mobile-call"><Phone size={15} /> {phoneNumber}</a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground px-6 py-12 text-background lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div><div className="font-serif text-3xl tracking-[.16em]">ZANNI</div><p className="mt-4 max-w-[270px] text-sm leading-6 text-background/60">A considered beauty space in Tirona, Dasmariñas.</p></div>
          <div><p className="mb-4 text-[10px] uppercase tracking-[.2em] text-background/45">Visit</p><address className="not-italic text-sm leading-7 text-background/75">Tirona Ave<br />Dasmariñas, Cavite<br />Philippines</address></div>
          <div><p className="mb-4 text-[10px] uppercase tracking-[.2em] text-background/45">Connect</p><a href={telNumber} className="block text-sm text-background/75 hover:text-accent" data-testid="link-footer-phone">{phoneNumber}</a><a href={facebookUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-background/75 hover:text-accent" data-testid="link-footer-facebook"><Facebook size={15} strokeWidth={1.5} /> Facebook</a></div>
        </div>
        <div className="mt-12 border-t border-background/15 pt-5 text-[10px] uppercase tracking-[.15em] text-background/35">ZANNI Beauty Salon — Tirona</div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <><Header />{children}<Footer /></>;
}

function Home() {
  return (
    <Shell>
      <main>
        <section className="mx-auto grid max-w-[1280px] gap-10 px-6 pb-20 pt-12 md:grid-cols-[.9fr_1.1fr] md:items-end md:gap-16 md:px-10 md:pb-28 md:pt-16">
          <div className="animate-rise-in pb-4 md:pb-12">
            <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-primary"><span className="h-px w-8 bg-primary" />Tirona · Dasmariñas</p>
            <h1 className="max-w-[570px] font-serif text-[clamp(3.35rem,7.4vw,7.5rem)] leading-[.95] tracking-[-.045em] text-foreground">Beauty,<br /><em className="text-primary">with intention.</em></h1>
            <p className="mt-8 max-w-[390px] text-[15px] leading-7 text-muted-foreground">A warm, thoughtful salon experience for the way you want to feel today.</p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/services" className="group flex items-center gap-3 border border-primary bg-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[.17em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary" data-testid="link-hero-services">Explore services <ArrowUpRight size={15} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
              <a href={telNumber} className="link-underline text-[10px] font-semibold uppercase tracking-[.17em] text-foreground/75 hover:text-primary" data-testid="link-hero-call">Call {phoneNumber}</a>
            </div>
          </div>
          <div className="animate-fade-in relative min-h-[400px] overflow-hidden bg-muted md:min-h-[590px]">
            <img src={heroImage} alt="Woman with sleek dark hair in warm studio light" className="image-editorial h-full w-full object-cover object-center" data-testid="img-home-hero" />
            <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-background/90 px-5 py-4 text-[10px] uppercase tracking-[.18em] text-foreground/70"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Feel like yourself</div>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-secondary/45 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-28">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-primary">The Zanni approach</p><div className="mt-7 h-px w-14 bg-accent" /></div>
            <div><h2 className="max-w-[700px] font-serif text-[clamp(2.2rem,4vw,4.35rem)] leading-[1.07] tracking-[-.035em]">The best beauty moments are the ones that still feel like <em className="text-primary">you.</em></h2><p className="mt-7 max-w-[570px] text-[15px] leading-7 text-muted-foreground">From a quiet reset to a fresh new look, we keep every detail personal. Come as you are; leave feeling a little more yourself.</p></div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between gap-6"><div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-primary">A little inspiration</p><h2 className="mt-4 font-serif text-4xl tracking-[-.03em] md:text-5xl">Your next <em>look</em></h2></div><Link href="/services" className="link-underline hidden text-[10px] font-semibold uppercase tracking-[.17em] text-foreground/70 hover:text-primary sm:block" data-testid="link-inspiration-services">View all services <ArrowUpRight size={14} className="ml-1 inline" /></Link></div>
          <div className="mt-12 grid gap-5 md:grid-cols-[1fr_.68fr_1fr] md:items-end">
            <div className="group overflow-hidden"><div className="aspect-[4/5] overflow-hidden bg-muted"><img src={detailImage} alt="Close detail of hair styling" className="image-editorial h-full w-full object-cover" data-testid="img-inspiration-detail" /></div><p className="mt-4 text-[11px] uppercase tracking-[.16em] text-foreground/70">Hair, considered</p></div>
            <div className="group overflow-hidden md:mb-16"><div className="aspect-[4/5] overflow-hidden bg-muted"><img src={portraitImage} alt="Soft profile portrait" className="image-editorial h-full w-full object-cover" data-testid="img-inspiration-portrait" /></div><p className="mt-4 text-[11px] uppercase tracking-[.16em] text-foreground/70">Softly defined</p></div>
            <div className="md:pl-8"><p className="font-serif text-2xl leading-8 text-primary md:text-3xl">“A little time for yourself changes the whole day.”</p><div className="mt-8 editorial-rule max-w-[180px]" /><Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-foreground/75 hover:text-primary" data-testid="link-inspiration-contact">Find us in Tirona <ArrowDownRight size={15} /></Link></div>
          </div>
        </section>

        <section className="bg-primary px-6 py-16 text-primary-foreground md:px-10 md:py-20">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-primary-foreground/70">Ready when you are</p><h2 className="mt-4 max-w-[640px] font-serif text-4xl leading-[1.05] tracking-[-.03em] md:text-6xl">Make a little room for <em>you.</em></h2></div><a href={telNumber} className="group flex items-center gap-3 border border-primary-foreground/50 px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[.17em] transition-colors hover:bg-primary-foreground hover:text-primary" data-testid="link-home-cta">Call now <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></div>
        </section>
      </main>
    </Shell>
  );
}

const serviceGroups = [
  { number: '01', title: 'Hair', intro: 'The everyday essentials, made considered.', items: ['Cuts & styling', 'Color & tone', 'Hair treatments'] },
  { number: '02', title: 'Nails', intro: 'Small details that finish the feeling.', items: ['Manicure', 'Pedicure', 'Nail care'] },
  { number: '03', title: 'Beauty', intro: 'A quiet reset, from brows to glow.', items: ['Makeup', 'Brows & lashes', 'Beauty care'] },
];

function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <Shell>
      <main>
        <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
          <p className="animate-rise-in flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-primary"><span className="h-px w-8 bg-primary" />The menu</p>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_.8fr] md:items-end"><h1 className="animate-rise-in font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[.92] tracking-[-.05em]">Services<br /><em className="text-primary">for you.</em></h1><p className="animate-rise-in delay-1 max-w-[350px] text-[15px] leading-7 text-muted-foreground md:mb-2">Take your time. Browse our menu and find a little something that feels right.</p></div>
        </section>
        <section className="border-t border-foreground/10">
          <div className="mx-auto max-w-[1280px] px-6 md:px-10">
            {serviceGroups.map((group) => {
              const isOpen = expanded === group.title;
              return <div key={group.number} className="grid gap-6 border-b border-foreground/10 py-9 md:grid-cols-[100px_1fr_1fr] md:gap-10 md:py-12">
                <p className="font-serif text-2xl italic text-accent">{group.number}</p>
                <div><h2 className="font-serif text-4xl tracking-[-.03em]">{group.title}</h2><p className="mt-2 text-sm text-muted-foreground">{group.intro}</p></div>
                <div className="md:pt-2"><button type="button" onClick={() => setExpanded(isOpen ? null : group.title)} className="flex w-full items-center justify-between border-b border-foreground/15 pb-3 text-left text-[11px] font-semibold uppercase tracking-[.16em] text-primary md:hidden" data-testid={`button-expand-${group.title.toLowerCase()}`}>Explore category <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} /></button><ul className={`${isOpen ? 'mt-5' : 'hidden'} space-y-4 md:mt-0 md:block`}>{group.items.map((item) => <li key={item} className="flex items-center justify-between border-b border-foreground/10 pb-3 text-[15px] text-foreground/75"><span>{item}</span><span className="text-accent">＋</span></li>)}</ul></div>
              </div>;
            })}
          </div>
        </section>
        <section className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 md:grid-cols-[.8fr_1.2fr] md:gap-28 md:px-10 md:py-28">
          <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={detailImage} alt="Hair styling detail in warm light" className="image-editorial h-full w-full object-cover" data-testid="img-services-detail" /></div>
          <div className="flex flex-col justify-center"><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-primary">Not sure where to start?</p><h2 className="mt-5 max-w-[580px] font-serif text-4xl leading-[1.08] tracking-[-.03em] md:text-5xl">Tell us what you’re <em>feeling.</em></h2><p className="mt-6 max-w-[440px] text-[15px] leading-7 text-muted-foreground">Call or message us and we’ll help you find the right place to begin.</p><div className="mt-8 flex flex-wrap gap-6"><a href={telNumber} className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-primary" data-testid="link-services-call">Call now <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a><a href={facebookUrl} target="_blank" rel="noreferrer" className="link-underline text-[10px] font-semibold uppercase tracking-[.17em] text-foreground/70 hover:text-primary" data-testid="link-services-facebook">Message on Facebook</a></div></div>
        </section>
      </main>
    </Shell>
  );
}

function Contact() {
  return (
    <Shell>
      <main>
        <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
          <p className="animate-rise-in flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-primary"><span className="h-px w-8 bg-primary" />Come say hello</p>
          <div className="mt-8 grid gap-12 md:grid-cols-[1fr_.7fr] md:items-end"><h1 className="animate-rise-in font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[.92] tracking-[-.05em]">Let’s make<br /><em className="text-primary">time for you.</em></h1><p className="animate-rise-in delay-1 max-w-[350px] text-[15px] leading-7 text-muted-foreground md:mb-2">We’re easy to reach, right here in Tirona. Call or send us a message whenever you’re ready.</p></div>
        </section>
        <section className="border-y border-foreground/10 bg-secondary/45 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-2 md:gap-28">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-primary">Reach us</p><div className="mt-8 space-y-7"><a href={telNumber} className="group block" data-testid="link-contact-phone"><span className="mb-2 block text-[10px] uppercase tracking-[.18em] text-muted-foreground">Phone</span><span className="flex items-center gap-3 font-serif text-3xl text-foreground group-hover:text-primary md:text-4xl">{phoneNumber}<ArrowUpRight size={21} strokeWidth={1.3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></a><a href={facebookUrl} target="_blank" rel="noreferrer" className="group block" data-testid="link-contact-facebook"><span className="mb-2 block text-[10px] uppercase tracking-[.18em] text-muted-foreground">Facebook</span><span className="flex items-center gap-3 font-serif text-3xl text-foreground group-hover:text-primary md:text-4xl">ZANNI Beauty Salon <ArrowUpRight size={21} strokeWidth={1.3} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></a></div></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-primary">Find us</p><div className="mt-8 border-l border-accent pl-6"><address className="not-italic font-serif text-3xl leading-[1.2] md:text-4xl">Tirona Ave<br />Dasmariñas, Cavite<br />Philippines</address><p className="mt-7 max-w-[270px] text-sm leading-6 text-muted-foreground">Look for ZANNI Beauty Salon along Tirona Ave.</p></div></div>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1280px] gap-10 px-6 py-20 md:grid-cols-[.65fr_1fr] md:items-center md:px-10 md:py-28"><div className="aspect-[4/3] overflow-hidden bg-muted"><img src={portraitImage} alt="Quiet beauty portrait" className="image-editorial h-full w-full object-cover" data-testid="img-contact-portrait" /></div><div><p className="font-serif text-3xl leading-[1.15] text-primary md:text-5xl">A good visit starts with a simple hello.</p><div className="mt-9 editorial-rule max-w-[240px]" /><a href={facebookUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 border border-primary px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[.17em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground" data-testid="link-contact-message"><Facebook size={15} strokeWidth={1.5} /> Message us on Facebook</a></div></section>
      </main>
    </Shell>
  );
}

function NotFound() {
  return <Shell><main className="mx-auto min-h-[60vh] max-w-[1280px] px-6 py-24 md:px-10"><p className="text-[10px] uppercase tracking-[.2em] text-primary">Page not found</p><h1 className="mt-6 font-serif text-6xl">Let’s go <em className="text-primary">home.</em></h1><Link href="/" className="mt-8 inline-flex border border-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-[.17em] text-primary" data-testid="link-not-found-home">Back to home</Link></main></Shell>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;