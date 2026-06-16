import { Link } from 'react-router-dom'

const LAST_UPDATED = 'June 16, 2026'
const CONTACT_EMAIL = 'ingbume@gmail.com'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* 헤더 */}
        <div className="mb-10">
          <Link to="/" className="text-terra text-sm font-medium hover:underline">
            ← Back to Plushie Tale
          </Link>
          <h1 className="font-display font-bold text-3xl text-brown mt-6 mb-2">
            Privacy Policy
          </h1>
          <p className="text-brown-light text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-brown leading-relaxed">

          <section>
            <p>
              Plushie Tale ("we", "us", or "our") is committed to protecting the privacy of all
              users, especially children. This Privacy Policy explains what personal data we
              collect, why we collect it, and what rights you have. Please read it carefully
              before using our service.
            </p>
          </section>

          <Section title="1. Data Controller">
            <p>
              The data controller responsible for your personal data is:
            </p>
            <div className="mt-3 pl-4 border-l-2 border-terra-50 space-y-1 text-sm">
              <p><strong>Inbeom Kwon</strong></p>
              <p>
                Email:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <p className="mt-3">
              If you have any questions about how your data is handled, please contact us
              at the address above.
            </p>
          </Section>

          <Section title="2. Who This Service Is For">
            <p>
              Plushie Tale is designed to be used by <strong>parents or guardians</strong> on
              behalf of children aged 3–11. We do not knowingly allow children to create accounts
              or submit personal information directly.
            </p>
            <p className="mt-3">
              By creating an account, you confirm that you are <strong>at least 16 years old</strong> and
              are the parent or legal guardian of the child(ren) for whom you are using this service.
            </p>
            <p className="mt-3">
              <strong>A note about photos:</strong> Please avoid uploading images that show the
              faces of identifiable individuals, including your children. Toy photos should ideally
              focus on the plushie itself. If you believe a child has provided us with personal
              data without parental consent, please contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra hover:underline">
                {CONTACT_EMAIL}
              </a>{' '}
              and we will delete it promptly.
            </p>
          </Section>

          <Section title="3. Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account information:</strong> your email address and nickname when you
                register, or your Google account name and email if you sign in with Google.
              </li>
              <li>
                <strong>Toy photos:</strong> images you upload of your child's plushies. These
                are stored securely on Amazon Web Services (AWS S3, EU region, Paris).
              </li>
              <li>
                <strong>Toy details:</strong> the name and personality description you provide
                for each plushie.
              </li>
              <li>
                <strong>Generated stories:</strong> the AI-created stories saved to your account.
              </li>
              <li>
                <strong>Community content:</strong> post titles, messages, comments, and likes
                you choose to share or make on the public board.
              </li>
              <li>
                <strong>Server log data:</strong> IP addresses and access timestamps recorded
                automatically by our servers for security and troubleshooting purposes.
              </li>
            </ul>
          </Section>

          <Section title="4. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide the story-generation service (our primary purpose).</li>
              <li>To authenticate your account securely.</li>
              <li>To display your plushie photos and stories within your account.</li>
              <li>To operate the community board if you choose to share content there.</li>
              <li>To maintain server security and investigate misuse.</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your data, use it for advertising, or share it with
              third parties except as described in section 6.
            </p>
          </Section>

          <Section title="5. Legal Basis for Processing (GDPR)">
            <p>
              If you are located in the European Economic Area, we rely on the following legal
              bases to process your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Contractual Necessity (Art. 6(1)(b)):</strong> processing your account
                information, toy photos, and generated stories is necessary to provide the service
                you have signed up for.
              </li>
              <li>
                <strong>Legitimate Interests (Art. 6(1)(f)):</strong> we process community content
                (posts, comments, and likes) that you choose to share on the public board, and we
                retain server log data, to operate community features and keep our service secure.
                Our legitimate interest in providing a functional, safe platform is balanced
                against the limited privacy impact involved.
              </li>
            </ul>
            <p className="mt-3">
              We do not ask for consent to process data that is required to deliver the service,
              as this processing is justified by the legal bases above.
            </p>
          </Section>

          <Section title="6. Third-Party Services & International Data Transfers">
            <p>We rely on the following third-party providers to operate the service:</p>
            <ul className="list-disc pl-5 space-y-3 mt-2">
              <li>
                <strong>Google Gemini API:</strong> your plushie images and descriptions are
                sent to Google's AI service to generate stories. Google processes this data in
                accordance with its{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terra hover:underline"
                >
                  Privacy Policy
                </a>
                . This may involve transfer of data to the United States. Such transfers are
                conducted under <strong>Standard Contractual Clauses (SCCs) approved by the
                European Commission</strong>, as part of Google's data protection framework.
                Please note that, under the API plan we currently use, Google may use the
                content you submit (including toy images and descriptions) to improve its
                services and AI models. We therefore recommend that you avoid including any
                sensitive personal information in the content you upload.
              </li>
              <li>
                <strong>Google OAuth:</strong> if you choose "Continue with Google",
                authentication is handled by Google and may similarly involve data transfer
                to the United States under SCCs.
              </li>
              <li>
                <strong>Amazon Web Services (AWS S3):</strong> toy photos are stored in an
                EU-based AWS bucket (Paris region, eu-west-3). No international transfer occurs
                for stored images.
              </li>
            </ul>
            <p className="mt-3 text-sm text-brown-light">
              You can request a copy of the relevant SCCs or further information about
              international transfer safeguards by contacting us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="7. AI-Generated Content">
            <p>
              We use Google Gemini AI to automatically generate stories based on the toy
              images and descriptions you provide. This process involves automated analysis
              of the content you submit.
            </p>
            <p className="mt-3">
              This does not constitute automated decision-making with legal or otherwise
              significant effects on individuals as defined under GDPR Article 22. The AI
              generates creative story content only; it does not make decisions about your
              account, eligibility, or any rights or obligations.
            </p>
          </Section>

          <Section title="8. Cookies & Local Storage">
            <p>
              We use your browser's local storage to maintain your login session via a
              secure authentication token (JWT). No tracking cookies or advertising cookies
              are used. This storage is strictly necessary for the service to function.
            </p>
          </Section>

          <Section title="9. Data Retention">
            <p>
              Your account data is retained for as long as your account is active. You may
              delete your plushies and stories at any time from within the app. To permanently
              delete your account and all associated data, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will process deletion requests within <strong>30 days</strong>.
            </p>
            <p className="mt-3">
              Server log data is automatically rotated each day and permanently deleted after
              a maximum of 30 days.
            </p>
          </Section>

          <Section title="10. Your Rights (GDPR)">
            <p>
              If you are located in the European Economic Area, you have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Access:</strong> request a copy of the data we hold about you.</li>
              <li><strong>Rectification:</strong> correct inaccurate or incomplete data.</li>
              <li><strong>Erasure:</strong> request deletion of your data ("right to be forgotten").</li>
              <li><strong>Restriction:</strong> request that we restrict processing of your data in certain circumstances.</li>
              <li><strong>Portability:</strong> receive your data in a structured, portable format.</li>
              <li><strong>Objection:</strong> object to processing based on legitimate interests.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra hover:underline">
                {CONTACT_EMAIL}
              </a>
              . We will respond within <strong>30 days</strong>.
            </p>
            <p className="mt-3">
              You also have the right to lodge a complaint with a supervisory authority if
              you believe we have processed your personal data unlawfully. In Belgium, the
              competent authority is:
            </p>
            <div className="mt-2 pl-4 border-l-2 border-terra-50 text-sm space-y-1">
              <p>
                <strong>Gegevensbeschermingsautoriteit (GBA)</strong>{' '}
                <span className="text-brown-light">/ Autorité de protection des données (APD)</span>
              </p>
              <p>
                <a
                  href="https://www.dataprotectionauthority.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terra hover:underline"
                >
                  www.dataprotectionauthority.be
                </a>
              </p>
            </div>
          </Section>

          <Section title="11. Security">
            <p>
              Passwords are hashed using BCrypt and never stored in plain text. Communication
              between your browser and our server is encrypted via HTTPS. Toy images are stored
              in a private AWS S3 bucket with restricted access.
            </p>
            <p className="mt-3">
              While we take reasonable steps to protect your data, no system is completely
              secure. In the event of a data breach that affects your rights and freedoms, we
              will notify you and the relevant supervisory authority as required by law.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The "Last updated" date at
              the top of this page will reflect any changes. For significant changes, we will
              make reasonable efforts to notify you. Continued use of the service after changes
              are posted constitutes acknowledgment of the updated policy.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy or how we handle
              your personal data, please contact us at:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </Section>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-lg text-brown mb-3">{title}</h2>
      {children}
    </section>
  )
}
