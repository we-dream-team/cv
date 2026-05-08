'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PROFILE } from '../_data/profile'

export default function MentionsLegalesPage() {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Retour
      </Link>

      <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Mentions légales &amp; confidentialité
      </h1>
      <p className="mt-3 font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
        Dernière mise à jour : {today}
      </p>

      <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          1. Éditeur du site
        </h2>
        <p>
          Le site <strong>cv.wedreamteam.com</strong> est édité par{' '}
          <strong>DT CONSULTING</strong>, SASU exerçant sous la marque{' '}
          <em>We Dream Team</em>, immatriculée sous le numéro SIRET{' '}
          <span className="font-mono text-foreground">980 178 859 00016</span>.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Représentant légal &amp; directeur de la publication : {PROFILE.name}</li>
          <li>
            Contact :{' '}
            <a className="text-foreground underline hover:text-accent" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
          </li>
          <li>Localisation : {PROFILE.location}</li>
        </ul>
      </section>

      <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          2. Hébergement
        </h2>
        <p>
          Le site est hébergé sur l&rsquo;infrastructure{' '}
          <strong>Amazon Web Services (AWS)</strong> — Amazon S3 et Amazon
          CloudFront — dans la région Europe (Paris).
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Amazon Web Services EMEA SARL</li>
          <li>38 avenue John F. Kennedy, L-1855 Luxembourg</li>
          <li>
            <a
              className="text-foreground underline hover:text-accent"
              href="https://aws.amazon.com/fr/"
              target="_blank"
              rel="noreferrer"
            >
              aws.amazon.com
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          3. Propriété intellectuelle
        </h2>
        <p>
          L&rsquo;ensemble du contenu de ce site (textes, code source, design,
          graphismes, logos) est la propriété exclusive de {PROFILE.name} ou de
          ses ayants droit, sauf mention contraire. Toute reproduction,
          représentation, modification ou exploitation, totale ou partielle,
          sans autorisation écrite préalable, est interdite et constitue une
          contrefaçon sanctionnée par le Code de la propriété intellectuelle.
        </p>
        <p>
          Les noms, marques et logos cités (Dailymotion, TotalEnergies, SNCF
          Connect &amp; Tech, Société Générale, Nexity, AWS, GCP, Kubernetes,
          Terraform, etc.) sont la propriété de leurs détenteurs respectifs et
          sont mentionnés à titre de référence professionnelle.
        </p>
      </section>

      <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          4. Données personnelles &amp; RGPD
        </h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD) et à la loi française Informatique et Libertés, voici les
          traitements opérés sur ce site.
        </p>

        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Données collectées
        </h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Compteur de visites</strong> : un appel au service tiers{' '}
            <a
              className="text-foreground underline hover:text-accent"
              href="https://counterapi.dev"
              target="_blank"
              rel="noreferrer"
            >
              counterapi.dev
            </a>{' '}
            est effectué à chaque chargement de page pour incrémenter un
            compteur public anonyme. Aucune donnée nominative n&rsquo;est
            transmise. Un drapeau de session est stocké dans le{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">sessionStorage</code>{' '}
            de votre navigateur pour éviter de compter plusieurs fois la même
            visite. Ce drapeau disparaît à la fermeture de l&rsquo;onglet.
          </li>
          <li>
            <strong>Logs serveur</strong> : Amazon CloudFront peut conserver
            des logs techniques (adresse IP, user-agent, URL appelée) à des
            fins de sécurité. La conservation des logs CloudFront est
            actuellement désactivée sur ce site.
          </li>
          <li>
            <strong>Aucun cookie publicitaire ni de mesure d&rsquo;audience</strong>{' '}
            n&rsquo;est déposé. Pas de Google Analytics, pas de pixel
            tiers, pas de tracking comportemental.
          </li>
          <li>
            <strong>Email</strong> : si vous me contactez par email
            (lien <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">mailto:</code>),
            les données échangées (adresse, contenu) sont conservées le temps
            nécessaire au traitement de votre demande.
          </li>
        </ul>

        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Vos droits
        </h3>
        <p>
          Vous disposez d&rsquo;un droit d&rsquo;accès, de rectification,
          d&rsquo;effacement, de portabilité, de limitation et
          d&rsquo;opposition sur les données vous concernant. Pour exercer ces
          droits, écrivez à{' '}
          <a className="text-foreground underline hover:text-accent" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          . Vous pouvez également déposer une réclamation auprès de la{' '}
          <a
            className="text-foreground underline hover:text-accent"
            href="https://www.cnil.fr/"
            target="_blank"
            rel="noreferrer"
          >
            CNIL
          </a>
          .
        </p>
      </section>

      <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          5. Cookies
        </h2>
        <p>
          Ce site n&rsquo;utilise <strong>aucun cookie de traçage</strong>.
          Seul un drapeau{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">sessionStorage</code>{' '}
          strictement nécessaire au fonctionnement du compteur de visites est
          déposé localement dans votre navigateur. Ce stockage technique est
          dispensé du recueil du consentement (article 82 de la loi
          Informatique et Libertés).
        </p>
      </section>

      <section className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          6. Droit applicable
        </h2>
        <p>
          Le présent site est soumis au droit français. Tout litige relatif à
          son utilisation relève de la compétence exclusive des juridictions
          françaises.
        </p>
      </section>

      <p className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
        Pour toute question relative aux présentes mentions, contactez{' '}
        <a className="text-foreground underline hover:text-accent" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        .
      </p>
    </main>
  )
}
