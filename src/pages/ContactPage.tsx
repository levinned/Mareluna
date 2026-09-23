import { useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { addressOneLine, business, contactForm, openingHours } from '@/content/business';
import { useI18n } from '@/i18n';
import { cn, EMAIL_RE, mailto, PHONE_RE } from '@/lib/utils';
import { ArrowUpRight, Crescent, Eyebrow, Reveal } from '@/components/ui/Primitives';
import { MoonAccent } from '@/components/ui/Media';
import { PageHero, ReserveCta } from '@/components/sections/Shared';
import { dayLabel } from '@/components/layout/Footer';

type Field = 'name' | 'email' | 'phone' | 'message' | 'consent';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'handedOff' | 'error';

/* ------------------------------------------------------------------ *
 * Contact form
 * ------------------------------------------------------------------ *
 *  No backend is wired up yet, and the form never pretends otherwise.
 *  • With `contactForm.endpoint` set, the data is POSTed as JSON.
 *  • Without it, the validated message is handed to the visitor's own
 *    mail client. We say exactly that — we never show “message sent”.
 * ------------------------------------------------------------------ */
function ContactFormBlock() {
  const { t, to } = useI18n();
  const uid = useId().replace(/:/g, '');
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const id = (field: string) => `${uid}-${field}`;
  const errId = (field: string) => `${uid}-${field}-error`;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const consent = data.get('consent');

    if (name.length < 2) next.name = t.contact.errors.name;
    if (!EMAIL_RE.test(email)) next.email = t.contact.errors.email;
    if (phone && !PHONE_RE.test(phone)) next.phone = t.contact.errors.phone;
    if (message.length < 20) next.message = t.contact.errors.message;
    if (!consent) next.consent = t.contact.errors.consent;
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setStatus('idle');
      return;
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    // ---- Real backend, when one is configured -------------------
    if (contactForm.endpoint) {
      setStatus('sending');
      try {
        const res = await fetch(contactForm.endpoint, {
          method: contactForm.method,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, phone, message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    // ---- No backend: hand the message to the visitor's mail app --
    const body = `${message}\n\n—\n${name}\n${email}${phone ? `\n${phone}` : ''}\n`;
    window.location.href = mailto(business.email, `Message — ${name}`, body);
    setStatus('handedOff');
  }

  const fieldClass = (field: Field) =>
    cn(
      'w-full rounded-2xl border bg-porcelain px-5 py-4 text-[1rem] text-ink transition-colors duration-300 placeholder:text-ink/35',
      errors[field]
        ? 'border-rose focus:border-rose'
        : 'border-navy/18 hover:border-navy/35 focus:border-navy/60',
    );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name ------------------------------------------------- */}
        <div>
          <label htmlFor={id('name')} className="label-xs mb-3 block text-navy/70">
            {t.contact.form.name}
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errId('name') : undefined}
            className={fieldClass('name')}
          />
          {errors.name ? (
            <p id={errId('name')} className="mt-2 text-[0.875rem] text-rose-deep">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* E-mail ----------------------------------------------- */}
        <div>
          <label htmlFor={id('email')} className="label-xs mb-3 block text-navy/70">
            {t.contact.form.email}
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errId('email') : undefined}
            className={fieldClass('email')}
          />
          {errors.email ? (
            <p id={errId('email')} className="mt-2 text-[0.875rem] text-rose-deep">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      {/* Phone -------------------------------------------------- */}
      <div>
        <label htmlFor={id('phone')} className="label-xs mb-3 block text-navy/70">
          {t.contact.form.phone}{' '}
          <span className="normal-case tracking-normal text-navy/65">
            ({t.contact.form.optional})
          </span>
        </label>
        <input
          id={id('phone')}
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? errId('phone') : undefined}
          className={fieldClass('phone')}
        />
        {errors.phone ? (
          <p id={errId('phone')} className="mt-2 text-[0.875rem] text-rose-deep">
            {errors.phone}
          </p>
        ) : null}
      </div>

      {/* Message ------------------------------------------------ */}
      <div>
        <label htmlFor={id('message')} className="label-xs mb-3 block text-navy/70">
          {t.contact.form.message}
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errId('message') : undefined}
          className={cn(fieldClass('message'), 'resize-y')}
        />
        {errors.message ? (
          <p id={errId('message')} className="mt-2 text-[0.875rem] text-rose-deep">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Consent ------------------------------------------------ */}
      <div>
        <label htmlFor={id('consent')} className="flex cursor-pointer items-start gap-3.5">
          <input
            id={id('consent')}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errId('consent') : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded-md border border-navy/25 accent-[#B86A61]"
          />
          <span className="text-[0.9375rem] leading-relaxed text-ink/70">
            {t.contact.form.consent}{' '}
            <Link
              to={to('privacy')}
              className="text-rose-deep underline decoration-rose/40 underline-offset-4"
            >
              {t.contact.form.consentLink}
            </Link>
          </span>
        </label>
        {errors.consent ? (
          <p id={errId('consent')} className="mt-2 text-[0.875rem] text-rose-deep">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center rounded-full bg-rose-deep px-8 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:bg-[#8f453d] disabled:opacity-60"
        >
          {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
        </button>
      </div>

      {/* Status ------------------------------------------------- */}
      <div role="status" aria-live="polite" className="min-h-[1.5rem]">
        {status === 'handedOff' ? (
          <p className="text-[0.9375rem] leading-relaxed text-ink/70">
            {t.contact.mailtoNotice}{' '}
            <span className="block pt-1 text-ink/55">
              {t.contact.mailtoFallback}{' '}
              <a
                href={`mailto:${business.email}`}
                className="text-rose-deep underline underline-offset-4"
              >
                {business.email}
              </a>
              .
            </span>
          </p>
        ) : null}
        {status === 'sent' ? (
          <p className="text-[0.9375rem] text-ink/75">{t.contact.sent}</p>
        ) : null}
        {status === 'error' ? (
          <p className="text-[0.9375rem] text-rose-deep">
            {t.contact.sendError}{' '}
            <a href={`mailto:${business.email}`} className="underline underline-offset-4">
              {business.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-porcelain/15 py-5 first:border-t-0 first:pt-0">
      <dt className="label-xs text-mist/75">{label}</dt>
      <dd className="mt-3 text-[1.0625rem] leading-relaxed text-porcelain">{children}</dd>
    </div>
  );
}

export default function ContactPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} />

      <section className="relative overflow-hidden bg-porcelain pb-24 lg:pb-32">
        <MoonAccent tone="coast" className="-left-[22%] top-[18%] h-[36rem] w-[36rem] opacity-50" />

        <div className="shell relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Coordinates panel ----------------------------------- */}
          <Reveal>
            <div className="on-dark relative overflow-hidden rounded-[1.75rem] bg-navy p-9 lg:p-12">
              <Crescent className="drift-slow pointer-events-none absolute -right-20 -top-24 h-72 w-72 text-white/[0.05]" />

              <div className="relative">
                <Eyebrow tone="sand">{t.contact.addressTitle}</Eyebrow>
                <p className="mt-6 font-display text-d3 text-porcelain">{t.contact.mapTitle}</p>
                <p className="mt-3 text-[1.0625rem] text-seafoam/70">
                  {business.address.postalCode} {business.address.city} · {t.contact.mapLede}
                </p>

                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-porcelain px-6 py-3 font-medium text-navy transition-colors duration-300 hover:bg-white"
                >
                  {t.common.directions}
                  <span className="sr-only"> ({t.common.newTab})</span>
                  <ArrowUpRight />
                </a>

                <dl className="mt-10">
                  <InfoRow label={t.contact.contactTitle}>
                    <a
                      href={business.phoneHref}
                      className="block transition-colors hover:text-sand"
                    >
                      {business.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${business.email}`}
                      className="mt-1.5 block break-all transition-colors hover:text-sand"
                    >
                      {business.email}
                    </a>
                  </InfoRow>

                  <InfoRow label={t.contact.followTitle}>
                    <a
                      href={business.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 transition-colors hover:text-sand"
                    >
                      Instagram {business.instagramHandle}
                      <ArrowUpRight />
                    </a>
                  </InfoRow>

                  {/*
                    Opening hours appear only once verified hours are
                    entered in content/business.ts. Nothing is guessed.
                  */}
                  <InfoRow label={t.contact.hoursTitle}>
                    {openingHours.verified && openingHours.days.length > 0 ? (
                      <ul className="space-y-1.5">
                        {openingHours.days.map((d) => (
                          <li key={d.key} className="flex justify-between gap-6">
                            <span>{dayLabel(d.key, lang)}</span>
                            <span className="font-mono text-[0.875rem] text-seafoam/65">
                              {d.ranges.length ? d.ranges.join(' · ') : '—'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[0.9375rem] leading-relaxed text-seafoam/65">
                        {t.contact.hoursUnavailable}
                      </p>
                    )}
                  </InfoRow>

                  <InfoRow label={business.legalName}>
                    <span className="text-[0.9375rem] text-seafoam/65">{addressOneLine}</span>
                  </InfoRow>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Form ------------------------------------------------ */}
          <Reveal delay={120}>
            <h2 className="font-display text-d2 text-navy">{t.contact.formTitle}</h2>
            <p className="mt-5 max-w-md text-lede text-ink/70">{t.contact.formLede}</p>
            <div className="mt-10">
              <ContactFormBlock />
            </div>
          </Reveal>
        </div>
      </section>

      <ReserveCta />
    </>
  );
}
