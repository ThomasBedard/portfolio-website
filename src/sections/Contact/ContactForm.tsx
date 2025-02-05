export default function ContactForm() {
  return (
    <div className="mt-7 bg-gray-900 rounded-xl shadow-lg border-2 border-gray-700">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Me</h2>
        <form>
          <div className="grid gap-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="py-3 px-4 block w-full border-2 border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:border-white focus:ring-white shadow-sm"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="py-3 px-4 block w-full border-2 border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:border-white focus:ring-white shadow-sm"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your message..."
                className="py-3 px-4 block w-full border-2 border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:border-white focus:ring-white shadow-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-600 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
