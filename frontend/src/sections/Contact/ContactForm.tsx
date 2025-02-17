"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import LoginButton from "@/components/ui/login-button";

const API_URL = import.meta.env.VITE_API_URL + "/contact";

export default function ContactForm() {
  const { isAuthenticated, user } = useAuth0();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Update formData when the user logs in
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok)
        throw new Error("Failed to send message. Please try again.");

      setStatusMessage("✅ Message sent successfully!");
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatusMessage("❌ Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="mt-7 bg-gray-900 rounded-xl shadow-lg border-2 border-gray-700">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Me</h2>
          <form onSubmit={handleSubmit}>
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
                  value={formData.name}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border-2 border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:border-white focus:ring-white shadow-sm"
                  required
                  disabled
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
                  value={formData.email}
                  onChange={handleChange}
                  className="py-3 px-4 block w-full border-2 border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:border-white focus:ring-white shadow-sm"
                  required
                  disabled
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="py-3 px-4 block w-full border-2 border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:border-white focus:ring-white shadow-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-600 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>

              {/* Status Message */}
              {statusMessage && (
                <p className="text-center text-white mt-3">{statusMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4 text-center">
        Please log in to contact me. <br />
        <div className="mt-4">
          <LoginButton />
        </div>
      </div>
    );
  }
}
