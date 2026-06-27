import { Icon } from "@/lib/icons";
import { site, whatsappHref } from "@/lib/site";

export default function ContactGrid() {
  return (
    <div className="contact" id="contactGrid">
      <a href={`tel:${site.phoneE164}`} className="contact__card">
        <div className="contact__ic">
          <Icon name="phone" />
        </div>
        <h3>Téléphone</h3>
        <p>{site.phoneDisplay}</p>
      </a>
      <a href={`mailto:${site.email}`} className="contact__card">
        <div className="contact__ic">
          <Icon name="mail" />
        </div>
        <h3>Email</h3>
        <p>{site.email}</p>
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener"
        className="contact__card"
      >
        <div className="contact__ic">
          <Icon name="chat" />
        </div>
        <h3>WhatsApp</h3>
        <p>Discutons directement</p>
      </a>
      <div className="contact__card contact__card--static">
        <div className="contact__ic">
          <Icon name="pin" />
        </div>
        <h3>Zone d&apos;intervention</h3>
        <p>Île-de-France</p>
      </div>
      <div className="contact__card contact__card--static">
        <div className="contact__ic">
          <Icon name="clock" />
        </div>
        <h3>Horaires</h3>
        <p>{site.hours}</p>
      </div>
    </div>
  );
}
