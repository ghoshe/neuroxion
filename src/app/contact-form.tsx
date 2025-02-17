'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    services: {
      website: false,
      aiAssistant: false,
      automation: false,
      analytics: false
    }
  });
  const [errors, setErrors] = useState({
    services: false
  });
  const [submitStatus, setSubmitStatus] = useState({
    isLoading: false,
    isSuccess: false,
    error: ''
  });

  const validateForm = () => {
    // Check if at least one service is selected
    const isServiceSelected = Object.values(formData.services).some(value => value);
    setErrors({
      services: !isServiceSelected
    });

    // Check if all required fields are filled
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.company.trim() !== '' &&
      formData.message.trim() !== '' &&
      isServiceSelected
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setSubmitStatus({ isLoading: true, isSuccess: false, error: '' });

    // Configure these with your EmailJS account details
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

    // Prepare the email template data
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      message: formData.message,
      services: Object.entries(formData.services)
        .filter(([key, value]) => value)
        .map(([key]) => {
          switch(key) {
            case 'website': return 'SiteXion';
            case 'aiAssistant': return 'NeuroAssist';
            case 'automation': return 'ChronoXion';
            case 'analytics': return 'Neurolytics';
            default: return key;
          }
        })
        .join(', ')
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus({ isLoading: false, isSuccess: true, error: '' });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        services: {
          website: false,
          aiAssistant: false,
          automation: false,
          analytics: false
        }
      });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus({ 
        isLoading: false, 
        isSuccess: false, 
        error: 'Failed to send message. Please try again.' 
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Start Your AI Journey</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Schedule a consultation to discuss how Neuroxion can transform your business.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Company</label>
              <input
                type="text"
                required
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Services Interested In</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={formData.services.website}
                    onChange={(e) => setFormData({
                      ...formData,
                      services: {...formData.services, website: e.target.checked}
                    })}
                  />
                  <span className="text-gray-400">SiteXion</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={formData.services.aiAssistant}
                    onChange={(e) => setFormData({
                      ...formData,
                      services: {...formData.services, aiAssistant: e.target.checked}
                    })}
                  />
                  <span className="text-gray-400">NeuroAssist</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={formData.services.automation}
                    onChange={(e) => setFormData({
                      ...formData,
                      services: {...formData.services, automation: e.target.checked}
                    })}
                  />
                  <span className="text-gray-400">ChronoXion</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={formData.services.analytics}
                    onChange={(e) => setFormData({
                      ...formData,
                      services: {...formData.services, analytics: e.target.checked}
                    })}
                  />
                  <span className="text-gray-400">Neurolytics</span>
                </label>
              </div>
              {errors.services && (
                <p className="text-red-500 text-sm mt-2">Please select at least one service</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Message</label>
              <textarea
                rows={4}
                required
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {submitStatus.isSuccess && (
              <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-center">
                Your message has been sent successfully! We will get back to you soon.
              </div>
            )}
            {submitStatus.error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-center">
                {submitStatus.error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={submitStatus.isLoading}
              className={`w-full bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center ${
                submitStatus.isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitStatus.isLoading ? 'Sending...' : 'Request Free Consultation'}
              {!submitStatus.isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;