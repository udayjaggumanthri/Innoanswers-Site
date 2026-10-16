import React from "react";
import { ArrowRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import "./driftbar.css";

export function Footer() {
  return (
    <footer className="footer driftbar-footer" id="footer">
      {/* 1. Stage and Ambient Video */}
      <div className="footer__stage" aria-hidden="true">
        <video
          className="footer__video"
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d01c727-d9c5-47c8-a778-35a451ffd39f.mp4"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261014_121838_c97d0940-f430-4304-8573-4f47ee44f447.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* 2. Frosted Glass Giant Wordmark */}
      <p className="footer__wordmark" aria-hidden="true">
        Innoanswers
      </p>

      {/* 3. Atmospheric Fog Layer */}
      <div className="footer__fog" aria-hidden="true" />

      {/* 4. Exactly Three Desktop Columns: Company/Brand Info, Site Links, Contact Details */}
      <div className="footer__content">
        {/* Column 1: Company / Brand Info */}
        <div className="brand">
          <a className="brand__logo" href="/" aria-label="Innoanswers home">
            <span className="brand__mark">IA</span>
            <span>Innoanswers</span>
          </a>
          <span className="brand__subheading">Enterprise AI Engineering</span>
          <h2 className="brand__title">Solving tough problems with AI</h2>
          <p className="brand__text">
            Practical machine learning systems, enterprise RAG, and workflow automation — with zero jargon and full client code &amp; IP sovereignty.
          </p>
          <a className="brand__cta" href="/contact">
            <span>Talk to our team</span>
            <ArrowRight aria-hidden="true" />
          </a>
          <p className="brand__copy">© 2026 Innoanswers Inc. · All rights reserved.</p>
        </div>

        {/* Column 2: Site Links */}
        <nav className="col" aria-label="Site links and resources">
          <h3 className="col__title">Site Links</h3>
          <ul className="col__list col__list--two-col">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services Overview</a>
            </li>
            <li>
              <a href="/services/technology">Technology Services</a>
            </li>
            <li>
              <a href="/services/business">Business Services</a>
            </li>
            <li>
              <a href="/services/consulting">AI Consulting</a>
            </li>
            <li>
              <a href="/blogs">Articles &amp; Blogs</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms &amp; Conditions</a>
            </li>
            <li>
              <a href="/security">Security &amp; Compliance</a>
            </li>
            <li>
              <a href="/#faq">Technical FAQ</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </nav>

        {/* Column 3: Contact Details */}
        <div className="col col--contact" aria-label="Contact Details">
          <h3 className="col__title">Contact Details</h3>
          <ul className="col__list contact-list">
            <li className="contact-item">
              <MapPin className="contact-icon" aria-hidden="true" />
              <span>100 Enterprise Way, Suite 400, San Francisco, CA 94105</span>
            </li>
            <li className="contact-item">
              <Mail className="contact-icon" aria-hidden="true" />
              <a href="mailto:support@innoanswers.com" className="hover:text-[var(--ink)] transition-colors">
                support@innoanswers.com
              </a>
            </li>
            <li className="contact-item">
              <Phone className="contact-icon" aria-hidden="true" />
              <a href="tel:+18005550199" className="hover:text-[var(--ink)] transition-colors">
                +1 (800) 555-0199
              </a>
            </li>
            <li className="contact-item">
              <Clock className="contact-icon" aria-hidden="true" />
              <span>Mon – Fri, 9:00 AM – 6:00 PM PT</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
