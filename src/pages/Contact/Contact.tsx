import React, { useState, useEffect, useCallback } from 'react';
import { Send, MapPin, Mail, MessageSquare } from 'lucide-react';
import { validateEmail, validateRequired } from '@/utils/validators';
import { handleError } from '@/utils/errorHandler';
import { CONTACT_INFO } from '@/config/constants';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = useCallback(() => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!validateRequired(formData.name)) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!validateRequired(formData.email)) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!validateRequired(formData.subject)) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!validateRequired(formData.message)) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        setStatus('error');
        return;
      }

      setIsSubmitting(true);
      setStatus(null);

      try {
        // Create a new FormData object to send to Web3Forms API
        const form = new FormData();
        form.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY || '');
        form.append('email_to', CONTACT_INFO.EMAIL); // Your email to receive messages
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('subject', formData.subject || 'New Contact Form Submission');
        form.append('message', formData.message);

        // Send form data to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: form,
        });

        await response.json();

        if (response.ok) {
          setStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          setErrors({});
        } else {
          setStatus('error');
        }
      } catch (error) {
        handleError(error, 'Contact.handleSubmit');
        setStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, formData],
  );

  return (
    <section id="contact" className="bg-[#04081A] text-slate-200 py-12 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/5 via-[#020617] to-[#020617]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Let&apos;s Connect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Touch</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed px-4">
            Have a question or want to work together? Drop us a message!
          </p>
        </div>

        <div className="grid gap-8 lg:gap-16 items-start lg:grid-cols-2 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Let&apos;s Talk
              </h3>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Email Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 rounded-2xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4 sm:gap-5 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-blue-500/30 p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                  <div className="bg-blue-500/10 p-3 sm:p-4 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h4>
                    <p className="text-slate-400 text-xs sm:text-sm md:text-base truncate">zasimmallickofficial@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 rounded-2xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4 sm:gap-5 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 group-hover:border-purple-500/30 p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-purple-500/10">
                  <div className="bg-purple-500/10 p-3 sm:p-4 rounded-xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Location</h4>
                    <p className="text-slate-400 text-xs sm:text-sm md:text-base">Natullabad, Barisal, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional info card */}
            <div className="relative mt-8">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-lg" />
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 sm:p-8">
                <div className="flex gap-4">
                  <div className="text-blue-400 text-5xl leading-none font-serif opacity-50">&quot;</div>
                  <p className="text-slate-300 text-lg leading-relaxed italic pt-2">
                    Looking forward to hearing from you and discussing how we can work together to bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 rounded-3xl blur-xl transition-all duration-500" />
              <div className="relative backdrop-blur-xl bg-slate-900/50 p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-800/50">
                <div className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 gap-5 sm:gap-6">
                    {/* Name Input */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-slate-400 mb-1.5 sm:mb-2 ml-1"></label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-slate-950/50 border text-white placeholder-slate-500 transition-all duration-300 text-sm sm:text-base ${errors.name
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-800/50 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-700'
                          } focus:ring-4 focus:outline-none`}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1.5 ml-1">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-slate-400 mb-1.5 sm:mb-2 ml-1"></label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-slate-950/50 border text-white placeholder-slate-500 transition-all duration-300 text-sm sm:text-base ${errors.email
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-800/50 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-700'
                          } focus:ring-4 focus:outline-none`}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1.5 ml-1">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject Input */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-slate-400 mb-1.5 sm:mb-2 ml-1"></label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-slate-950/50 border text-white placeholder-slate-500 transition-all duration-300 text-sm sm:text-base ${errors.subject
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-800/50 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-700'
                          } focus:ring-4 focus:outline-none`}
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center gap-1.5 ml-1">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-slate-400 mb-1.5 sm:mb-2 ml-1"></label>
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows={5}
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-slate-950/50 border text-white placeholder-slate-500 transition-all duration-300 resize-none text-sm sm:text-base ${errors.message
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-800/50 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-700'
                          } focus:ring-4 focus:outline-none`}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 ml-1">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Message */}
                  {status === 'success' && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Message sent successfully! Thank you for reaching out.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Failed to send message. Please try again or contact directly.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isSubmitting ? 'translate-x-2 opacity-0' : 'group-hover:translate-x-1'}`} />
                    {isSubmitting && (
                      <div className="absolute right-8 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

