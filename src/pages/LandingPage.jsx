import { Link } from 'react-router-dom'

const STORY_GENERATED_AT = '2026-06-04T12:00:00'

function getRelativeTime(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins   = Math.floor(diff / 60_000)
  const hours  = Math.floor(diff / 3_600_000)
  const days   = Math.floor(diff / 86_400_000)
  const weeks  = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years  = Math.floor(days / 365)

  if (mins   <  60) return 'Just generated'
  if (hours  <   2) return '1 hour ago'
  if (hours  <  24) return `${hours} hours ago`
  if (days   <   2) return '1 day ago'
  if (days   <   7) return `${days} days ago`
  if (weeks  <   2) return '1 week ago'
  if (weeks  <   4) return `${weeks} weeks ago`
  if (months <   2) return '1 month ago'
  if (months <  12) return `${months} months ago`
  if (years  <   2) return '1 year ago'
  return `${years} years ago`
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero — split layout */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto px-6 pt-1 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center bg-terra-50 text-terra text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                AI-powered bedtime stories
              </div>
              <h1 className="font-display font-bold text-5xl text-brown leading-[1.15] mb-6">
                The bedtime story starring{' '}
                <span className="text-terra font-display italic font-bold">your favourite plushie.</span>
              </h1>
              <p className="text-brown-light text-lg leading-relaxed mb-10">
                Upload a photo of your child's<br />
                <span className="text-terra">favourite plushie.</span><br />
                Our AI crafts a unique, age-appropriate story. Ready in seconds!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/login"
                  className="bg-terra text-white font-medium px-8 py-3.5 rounded-xl hover:bg-terra-dark transition-colors text-center"
                >
                  Create your first story
                </Link>
                <Link
                  to="/board"
                  className="border border-terra-50 text-brown font-medium px-8 py-3.5 rounded-xl hover:bg-terra-50 transition-colors text-center"
                >
                  Browse stories
                </Link>
              </div>
            </div>

            {/* Right: story preview card */}
            <div className="relative">
              <div className="absolute -inset-x-4 -bottom-4 top-0 bg-terra-50 rounded-3xl -z-10" />
              <div className="bg-card rounded-2xl p-6 border border-terra-50 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://plushietale-images.s3.eu-west-3.amazonaws.com/toys/84b3cd91-acf2-4e38-a549-0f8ee83d0c98.jpg"
                    alt="Daisy the Goose"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-display font-semibold text-brown">Daisy the Goose</p>
                    <span className="text-xs text-brown-light bg-cream px-2.5 py-1 rounded-full">
                      Age 5 · {getRelativeTime(STORY_GENERATED_AT)}
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-brown text-lg mb-3">
                  The Great Goose Fever Adventure
                </h3>
                <div className="relative mb-4">
                  <div className="space-y-3 text-brown-light text-sm leading-relaxed">
                    <p>
                      The day began with a wobble. Daisy the goose, usually a whirlwind of fluffy
                      feathers and dramatic dance moves, lay slumped on the comfy grey blanket.
                      Her beak was pale, her little goose eyes half-closed.{' '}
                      <span className="italic">"Honk… my head feels like a dizzy disco ball!"</span>
                    </p>
                    <p>
                      Enzo, the wise blue dino, immediately understood. He gently nudged Daisy with
                      his snout, then pressed a cool cloth to her forehead — gesturing toward the
                      sparkly 'Healing Berries' across the room. Daisy had a fever!
                    </p>
                    <p>
                      Before Enzo could even fully turn, Mr. Crab scuttled over.{' '}
                      <span className="italic">"Snip, snip!"</span> he chirped, claws wiggling with
                      concern. He saw Enzo point to the medicine and then to Daisy — and understood
                      exactly what needed to be done.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="flex items-center gap-2 text-xs text-terra font-medium">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-terra" />
                    <div className="w-1.5 h-1.5 rounded-full bg-terra opacity-60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-terra opacity-30" />
                  </div>
                  <span>Story continues for 3 more pages</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Story example */}
      <section className="w-full bg-card">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl text-brown mb-3">
              Real plushies, real stories
            </h2>
            <p className="text-brown-light">Here's a story made from actual plushies — just like yours.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-cream rounded-2xl border border-terra-50 overflow-hidden">

            {/* Cast */}
            <div className="px-8 pt-8 pb-6 border-b border-terra-50">
              <p className="text-xs text-brown-light uppercase tracking-widest mb-5 font-medium">The plushies</p>
              <div className="flex gap-8">
                {[
                  { name: 'Daisy the Goose', url: 'https://plushietale-images.s3.eu-west-3.amazonaws.com/toys/84b3cd91-acf2-4e38-a549-0f8ee83d0c98.jpg' },
                  { name: 'Enzo the Dino',   url: 'https://plushietale-images.s3.eu-west-3.amazonaws.com/toys/cc668508-68cf-4794-b272-a3091e7574fd.jpg' },
                  { name: 'Mr. Crab',        url: 'https://plushietale-images.s3.eu-west-3.amazonaws.com/toys/10625145-e1f0-436e-a029-89755968dd1e.jpg' },
                ].map(({ name, url }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <img src={url} alt={name} className="w-16 h-16 rounded-xl object-cover" />
                    <span className="text-xs text-brown font-medium text-center">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="px-8 py-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-terra-50 text-terra px-2.5 py-1 rounded-full font-medium">Age 5</span>
                <span className="text-xs text-brown-light">3 plushies</span>
              </div>
              <h3 className="font-display font-bold text-brown text-xl mb-4">
                The Great Goose Fever Adventure
              </h3>
              <div className="space-y-3 text-brown-light text-sm leading-relaxed">
                <p>
                  The day began with a wobble. Daisy the goose, usually a whirlwind of fluffy feathers
                  and dramatic dance moves, lay slumped on the comfy grey blanket. Her beak was pale,
                  her little goose eyes were half-closed, and she let out a mournful,{' '}
                  <span className="italic">"Honk… my head feels like a dizzy disco ball!"</span>
                </p>
                <p>
                  Enzo, the wise blue dino, immediately understood. He gently nudged Daisy's soft body
                  with his snout, then pressed a cool, damp cloth to her forehead. His big, kind eyes
                  gestured toward the sparkly 'Healing Berries' across the room. Daisy had a fever!
                </p>
                <p className="italic opacity-70">
                  … Mr. Crab scuttled in tiny circles, making funny clicking noises — and somehow, Daisy laughed.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-terra-50 flex items-center justify-between">
                <span className="text-xs text-brown-light">Generated by AI in seconds</span>
                <Link to="/login" className="text-terra text-sm font-medium hover:text-terra-dark transition-colors">
                  Create yours →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl text-brown mb-3">
              Three steps to a story they'll remember
            </h2>
            <p className="text-brown-light">No setup. No waiting. Just magic.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                title: 'Add your toy',
                desc: 'Take a photo of any plushie or stuffed animal. Our AI reads its personality from the image.',
              },
              {
                num: '02',
                title: 'Pick their age',
                desc: "Choose between 3 and 11. The story's length, words, and complexity adapt automatically.",
              },
              {
                num: '03',
                title: 'Read together',
                desc: 'Your personalised story is ready in seconds. Save it, share it, or use the same toy again.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num}>
                <span className="font-display font-bold text-7xl text-terra-50 leading-none select-none">
                  {num}
                </span>
                <div className="-mt-3">
                  <h3 className="font-display font-semibold text-brown text-lg mb-2">{title}</h3>
                  <p className="text-brown-light text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Footer */}
      <footer className="w-full border-t border-terra-50">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-brown">🧸 Plushie Tale</span>
          <p className="text-brown-light text-xs">© 2026 Plushie Tale. Made with love for little readers.</p>
          <Link to="/privacy-policy" className="text-xs text-brown-light hover:text-terra transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>

    </div>
  )
}
