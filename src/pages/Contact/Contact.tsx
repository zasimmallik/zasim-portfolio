import React, { useState, useEffect, useCallback } from 'react';
import { Send, Phone, MapPin, Mail } from 'lucide-react';
import { validateEmail, validateRequired } from '@/utils/validators';
import { handleError, getErrorMessage } from '@/utils/errorHandler';
import { CONTACT_INFO, TEXTS } from '@/config/constants';

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
        form.append('access_key', (import.meta.env as any).VITE_WEB3FORMS_KEY || '');
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

        const result = await response.json();

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
    <section className="bg-[#04081A] text-white py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,70,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,70,0.1)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-14 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-blue-400 uppercase">Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 bg-linear-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to work together? Drop us a message!
          </p>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
        </div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start lg:grid-cols-2 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Let's Talk
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {/* Email Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-xl blur-lg transition-all duration-500" />
                <div className="relative flex items-center space-x-4 bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 group-hover:border-purple-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="bg-linear-to-br from-purple-500/20 to-purple-600/20 p-3 sm:p-3.5 rounded-lg shrink-0 border border-purple-500/30">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-white mb-1">Email</h4>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">zasimmallickofficial@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/20 group-hover:to-purple-500/20 rounded-xl blur-lg transition-all duration-500" />
                <div className="relative flex items-center space-x-4 bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 group-hover:border-pink-500/30 p-4 sm:p-5 rounded-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="bg-linear-to-br from-pink-500/20 to-pink-600/20 p-3 sm:p-3.5 rounded-lg shrink-0 border border-pink-500/30">
                    <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-pink-400" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-white mb-1">Location</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Natullabad, Barisal, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional info card */}
            <div className="relative mt-8">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg" />
              <div className="relative bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-blue-400/40 text-4xl leading-none font-serif">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed pt-1">
                    Looking forward to hearing from you and discussing how we can work together to bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 rounded-2xl blur-xl transition-all duration-500" />
              <div className="relative backdrop-blur-xl bg-linear-to-br from-gray-900/95 to-gray-800/95 p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700/50">
                <div className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 gap-5 sm:gap-6">
                    {/* Name Input */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-gray-300 mb-2"> </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                          errors.name ? 'border-red-500' : 'border-gray-700/50'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300`}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-gray-300 mb-2"></label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                          errors.email ? 'border-red-500' : 'border-gray-700/50'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300`}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject Input */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-gray-300 mb-2"></label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                          errors.subject ? 'border-red-500' : 'border-gray-700/50'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300`}
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Textarea */}
                    <div className="group/input">
                      <label className="block text-sm font-medium text-gray-300 mb-2"></label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border text-sm sm:text-base ${
                          errors.message ? 'border-red-500' : 'border-gray-700/50'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none`}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Message */}
                  {status === 'success' && (
                    <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 text-sm">
                      Message sent successfully! Thank you for reaching out.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
                      Failed to send message. Please try again or contact directly.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn relative w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 sm:py-3.5 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Status Message */}
                {status && (
                  <div className={`mt-5 p-4 rounded-lg text-center text-sm sm:text-base border ${
                    status.includes("success")
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}>
                    <p>{status}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

