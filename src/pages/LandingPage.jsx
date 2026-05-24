import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Hero — split layout */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto px-6 pt-1 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

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
                Upload a photo of your child's favourite plushie. Our AI crafts a unique,
                age-appropriate story around it — ready to read in seconds.
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
              <div className="absolute -inset-4 bg-terra-50 rounded-3xl -z-10" />
              <div className="bg-card rounded-2xl p-6 border border-terra-50 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-terra-50 flex items-center justify-center text-2xl">
                    🐰
                  </div>
                  <div>
                    <p className="font-display font-semibold text-brown">Daisy the Bunny</p>
                    <span className="text-xs text-brown-light bg-cream px-2.5 py-1 rounded-full">
                      Age 5 · Just generated
                    </span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-brown text-lg mb-3">
                  Daisy and the Missing Carrot
                </h3>
                <p className="text-brown-light text-sm leading-relaxed mb-4">
                  One sunny morning, Daisy woke up to find her favourite carrot had
                  disappeared. She hopped through the meadow, asking the butterflies
                  and friendly frogs if they'd seen it. "Perhaps the wind took it!"
                  said a little frog...
                </p>
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

      {/* Story example */}
      <section className="w-full bg-card">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl text-brown mb-3">
              Real stories, real toys
            </h2>
            <p className="text-brown-light">Here's what a Plushie Tale story looks like.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-cream rounded-2xl p-8 border border-terra-50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-terra-50 flex items-center justify-center text-3xl">
                🐻
              </div>
              <div>
                <p className="font-display font-semibold text-brown text-lg">Bruno the Bear</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-terra-50 text-terra px-2.5 py-1 rounded-full font-medium">Age 7</span>
                  <span className="text-xs text-brown-light">Adventure story</span>
                </div>
              </div>
            </div>
            <h3 className="font-display font-bold text-brown text-xl mb-4">
              Bruno and the Mountain of Stars
            </h3>
            <div className="space-y-4 text-brown-light text-sm leading-relaxed">
              <p>
                Bruno had always wondered what lived beyond the tall oak tree at the edge
                of the garden. One evening, just as the first stars appeared, he decided
                it was time to find out.
              </p>
              <p>
                He packed his tiny backpack with a biscuit, a leaf map, and his favourite
                pebble — the smooth grey one that always made him feel brave. "Ready," he
                said to no one in particular, and stepped into the soft purple dark.
              </p>
              <p className="italic opacity-70">
                … and that was just the beginning of the greatest adventure Bruno had ever had.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-terra-50 flex items-center justify-between">
              <span className="text-xs text-brown-light">Generated in 24 seconds</span>
              <Link to="/login" className="text-terra text-sm font-medium hover:text-terra-dark transition-colors">
                Create yours →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="font-display font-bold text-4xl text-brown mb-4">
            Which toy will be the hero tonight?
          </h2>
          <p className="text-brown-light text-lg mb-10 max-w-md mx-auto">
            Join parents turning bedtime into the best part of the day.
          </p>
          <Link
            to="/login"
            className="inline-block bg-terra text-white font-medium px-10 py-4 rounded-xl hover:bg-terra-dark transition-colors text-lg"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-terra-50">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-brown">🧸 Plushie Tale</span>
          <p className="text-brown-light text-xs">© 2026 Plushie Tale. Made with love for little readers.</p>
        </div>
      </footer>

    </div>
  )
}
