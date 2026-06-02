"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site-content";

export default function ContactRightPane() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    projectType: site.contact.projectTypes[0],
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically send the data to a server
    console.log("Form submitted:", formData);

    setSubmitted(true);
    setIsSubmitting(false);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        company: "",
        projectType: site.contact.projectTypes[0],
        email: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="w-3/5 p-24 flex flex-col justify-center bg-background overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Natural Language Form */}
          <div className="space-y-6">
            {/* Intro Line 1 */}
            <p className="text-xl leading-loose text-white/90">
              <span className="text-white/70">{site.contact.intro[0]}</span>{" "}
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder={site.contact.placeholderName}
                className={`bg-transparent border-0 border-b-2 px-2 py-1 focus:outline-none transition-all duration-300 min-w-[200px] ${
                  focusedField === "name"
                    ? "border-cyan-400 text-white"
                    : "border-white/20 text-white/80"
                }`}
                whileFocus={{ scale: 1.02 }}
              />{" "}
              <span className="text-white/70">{site.contact.intro[1]}</span>{" "}
              <motion.input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
                placeholder={site.contact.placeholderCompany}
                className={`bg-transparent border-0 border-b-2 px-2 py-1 focus:outline-none transition-all duration-300 min-w-[180px] ${
                  focusedField === "company"
                    ? "border-cyan-400 text-white"
                    : "border-white/20 text-white/80"
                }`}
                whileFocus={{ scale: 1.02 }}
              />
              <span className="text-white/70">.</span>
            </p>

            {/* Intro Line 2 */}
            <p className="text-xl leading-loose text-white/90">
              <span className="text-white/70">{site.contact.intro[2]}</span>{" "}
              <motion.select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                onFocus={() => setFocusedField("projectType")}
                onBlur={() => setFocusedField(null)}
                className={`bg-transparent border-0 border-b-2 px-2 py-1 focus:outline-none transition-all duration-300 min-w-[220px] appearance-none cursor-pointer ${
                  focusedField === "projectType"
                    ? "border-cyan-400 text-white"
                    : "border-white/20 text-white/80"
                }`}
                whileFocus={{ scale: 1.02 }}
              >
                {site.contact.projectTypes.map((projectType) => (
                  <option
                    key={projectType}
                    value={projectType}
                    className="bg-black text-white"
                  >
                    {projectType}
                  </option>
                ))}
              </motion.select>
              <span className="text-white/70">.</span>
            </p>

            {/* Email Line */}
            <p className="text-xl leading-loose text-white/90">
              <span className="text-white/70">{site.contact.intro[3]}</span>{" "}
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder={site.contact.placeholderEmail}
                required
                className={`bg-transparent border-0 border-b-2 px-2 py-1 focus:outline-none transition-all duration-300 min-w-[220px] ${
                  focusedField === "email"
                    ? "border-cyan-400 text-white"
                    : "border-white/20 text-white/80"
                }`}
                whileFocus={{ scale: 1.02 }}
              />{" "}
              <span className="text-white/70">to discuss the details.</span>
            </p>

            {/* Message Line */}
            <p className="text-xl leading-loose text-white/90">
              <span className="text-white/70">{site.contact.intro[4]}</span>
            </p>
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              placeholder={site.contact.placeholderMessage}
              rows={4}
              className={`w-full bg-transparent border-b-2 px-2 py-2 focus:outline-none transition-all duration-300 resize-none ${
                focusedField === "message"
                  ? "border-cyan-400 text-white"
                  : "border-white/20 text-white/80"
              }`}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-12"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full border border-white/20 py-6 font-mono text-sm font-bold tracking-wider hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ letterSpacing: "0.2em" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Loading bar */}
              {isSubmitting && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-cyan-400/20"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              )}

              {/* Button text */}
              <span className="relative z-10">
                {submitted
                  ? site.contact.submittedLabel
                  : isSubmitting
                    ? site.contact.submittingLabel
                    : site.contact.submitLabel}
              </span>
            </motion.button>
          </motion.div>

          {/* Success message */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center font-mono text-sm text-cyan-400/80"
            >
              {site.contact.successMessage}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
