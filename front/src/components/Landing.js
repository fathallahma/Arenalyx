import React, { useState } from "react";
import "../styles/Landing.css";


export default function Landing() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: brancher sur ton backend Spring Boot (ex: POST /api/contact)
    alert("Merci ! Nous reviendrons vers vous rapidement.");
    setEmail("");
    setMsg("");
  }

  return (
    <div className="alx-root">
      {/* ===== Header ===== */}
      <header className="alx-header">
        <a href="/" className="alx-brand" aria-label="Arenalyx – Accueil">
          <LogoArenalyx />
          <span className="alx-brand-text">Arenalyx</span>
        </a>

        <nav className="alx-nav" aria-label="Navigation principale">
          <a href="#features">Fonctionnalités</a>
          <a href="#pricing">Tarifs</a>
          <a href="#contact">Contact</a>
          <a className="alx-login" href="/login" aria-label="Se connecter">
            Se connecter
          </a>
        </nav>
      </header>

      {/* ===== Hero ===== */}
      <section className="alx-hero">
        <div className="alx-hero-inner">
          <h1>
            L’analytics sportive <span className="alx-accent">actionnable</span>.
          </h1>
          <p>
            Unifiez matchs, entraînements et santé des joueurs pour des décisions
            rapides et mesurables. Rapports automatisés, alertes intelligentes,
            et dashboards prêts pour le staff.
          </p>
          <div className="alx-cta">
            <a className="alx-btn alx-btn-primary" href="/signup">
              Essai gratuit
            </a>
            <a className="alx-btn alx-btn-ghost" href="#demo">
              Voir la démo
            </a>
          </div>

          <ul className="alx-kpis" aria-label="Indicateurs clés">
            <li>
              <strong>99.9%</strong>
              <span>Disponibilité</span>
            </li>
            <li>
              <strong>12</strong>
              <span>Ligues supportées</span>
            </li>
            <li>
              <strong>50+</strong>
              <span>Clubs onboarded</span>
            </li>
          </ul>
        </div>

        {/* arrière-plan décoratif */}
        <div className="alx-hero-bg" aria-hidden="true">
          <div className="alx-glow alx-glow-1" />
          <div className="alx-glow alx-glow-2" />
          <div className="alx-rings" />
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="features" className="alx-section">
        <div className="alx-section-head">
          <h2>Ce que vous obtenez</h2>
          <p>Des modules concrets pour coachs, analystes, préparateurs et direction.</p>
        </div>

        <div className="alx-grid">
          <FeatureCard
            title="Match Center"
            text="Plan de match, tendances adverses, xG timeline et recommandations prêtes à l’emploi."
            icon={<IconCompass />}
          />
          <FeatureCard
            title="Performance joueurs"
            text="Indice composite, minutes & charge, risque blessure (ACWR) et plans individualisés."
            icon={<IconRadar />}
          />
          <FeatureCard
            title="Post-match auto"
            text="Rapports PDF/HTML, clips clés taggés, CPA, transitions et comparatif plan vs réel."
            icon={<IconReport />}
          />
          <FeatureCard
            title="Intégrations & données"
            text="Imports CSV/API (FBref, Understat, …), cache & historisation, traçabilité complète."
            icon={<IconPlug />}
          />
        </div>
      </section>

      {/* ===== Demo strip ===== */}
      <section id="demo" className="alx-demo">
        <div className="alx-demo-card">
          <h3>Un aperçu en 90 secondes</h3>
          <p>Découvrez un tableau de bord équipe, les alertes et la génération de plan de match.</p>
          <div className="alx-video-placeholder" role="img" aria-label="Aperçu vidéo du dashboard Arenalyx" />
          <div className="alx-cta">
            <a className="alx-btn alx-btn-primary" href="/login">Se connecter</a>
            <a className="alx-btn alx-btn-ghost" href="#pricing">Consulter les tarifs</a>
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="alx-section">
        <div className="alx-section-head">
          <h2>Tarification simple</h2>
          <p>Démarrez petit, évoluez quand votre staff grandit.</p>
        </div>

        <div className="alx-pricing">
          <PriceCard
            badge="Basic"
            price="€79"
            per="/mois"
            items={[
              "Dashboards équipe",
              "Imports CSV",
              "Rapports post-match",
              "Support standard",
            ]}
          />
          <PriceCard
            badge="Pro"
            highlight
            price="€249"
            per="/mois"
            items={[
              "Alertes intelligentes",
              "xG/xThreat avancés",
              "Permissions fines",
              "API & Webhooks",
            ]}
          />
          <PriceCard
            badge="Elite"
            price="Sur devis"
            per=""
            items={[
              "Intégrations GPS/API premium",
              "Modèles custom",
              "SLA et onboarding",
              "Support prioritaire",
            ]}
          />
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="alx-section alx-contact">
        <div className="alx-section-head">
          <h2>Contactez l’équipe</h2>
          <p>Une question, un besoin spécifique, ou envie d’une démo personnalisée ?</p>
        </div>

        <div className="alx-contact-grid">
          <form className="alx-form" onSubmit={handleSubmit}>
            <label className="alx-label">
              Email
              <input
                type="email"
                required
                placeholder="vous@club.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="alx-input"
              />
            </label>

            <label className="alx-label">
              Message
              <textarea
                required
                rows={5}
                placeholder="Dites-nous en plus…"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="alx-textarea"
              />
            </label>

            <button className="alx-btn alx-btn-primary" type="submit">
              Envoyer
            </button>
          </form>

          <aside className="alx-aside">
            <h3>Nos coordonnées</h3>
            <ul className="alx-list">
              <li>📧 contact@arenalyx.com</li>
              <li>📞 +212 6 12 34 56 78</li>
              <li>🕓 Lun–Ven · 9h–18h CET</li>
            </ul>

            <div className="alx-socials" aria-label="Réseaux sociaux">
              <a href="https://x.com/" aria-label="X / Twitter" className="alx-social"><IconX /></a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="alx-social"><IconLinkedIn /></a>
              <a href="https://www.youtube.com/" aria-label="YouTube" className="alx-social"><IconYouTube /></a>
              <a href="https://www.instagram.com/" aria-label="Instagram" className="alx-social"><IconInstagram /></a>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="alx-footer">
        <div className="alx-footer-inner">
          <div className="alx-footer-brand">
            <LogoArenalyx />
            <span>Arenalyx</span>
          </div>
          <nav className="alx-footer-nav" aria-label="Liens légaux">
            <a href="/legal/terms">Conditions</a>
            <a href="/legal/privacy">Confidentialité</a>
            <a href="/legal/security">Sécurité</a>
          </nav>
          <span className="alx-footnote">© {new Date().getFullYear()} Arenalyx. Tous droits réservés.</span>
        </div>
      </footer>
    </div>
  );
}

/* ===== Petits composants ===== */

function FeatureCard({ title, text, icon }) {
  return (
    <article className="alx-card">
      <div className="alx-card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function PriceCard({ badge, price, per, items, highlight }) {
  return (
    <article className={`alx-price ${highlight ? "is-highlight" : ""}`} aria-label={`Offre ${badge}`}>
      <div className="alx-price-badge">{badge}</div>
      <div className="alx-price-amount">
        <span className="alx-price-number">{price}</span>
        <span className="alx-price-per">{per}</span>
      </div>
      <ul className="alx-price-list">
        {items.map((it) => <li key={it}>{it}</li>)}
      </ul>
      <a className="alx-btn alx-btn-primary alx-price-cta" href="/signup">Commencer</a>
    </article>
  );
}

/* ===== Icônes (SVG inline, sans dépendance) ===== */

function LogoArenalyx() {
  return (
    <svg className="alx-logo" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6l18 30H14L32 6z" />
      <path d="M22 40h20l-10 18-10-18z" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm4 4-3 7-7 3 3-7 7-3Z" />
    </svg>
  );
}
function IconRadar() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconReport() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8 12h8M8 16h6" />
    </svg>
  );
}
function IconPlug() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M7 2v6M17 2v6" />
      <path d="M3 8h18v3a7 7 0 1 1-14 0V8Z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M4 4h4v16H4zM9 9h4v11H9zM14 9h4v11h-4z" />
      <circle cx="6" cy="6" r="2" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <path d="M22 12s0-5-1-6-3-1-9-1-8 0-9 1-1 6-1 6 0 5 1 6 3 1 9 1 8 0 9-1 1-6 1-6Z" />
      <path d="M10 15V9l6 3-6 3z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="alx-ico" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" />
    </svg>
  );
}
