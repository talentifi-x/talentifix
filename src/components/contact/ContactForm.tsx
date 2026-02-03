"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@providers/toast";

interface FormData {
  firstName: string;
  lastName: string;
  organization: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    organization: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');
    toast({ variant: "info", title: "Sending message…" });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage(data.message);
        toast({ variant: "success", title: "Message sent", description: data.message });
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          organization: '',
          email: '',
          phone: '',
          areaOfInterest: '',
          message: '',
        });
      } else {
        setStatus('error');
        const message = data.error || 'Something went wrong. Please try again.';
        setResponseMessage(message);
        toast({ variant: "error", title: "Failed to send message", description: message });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      const message = 'Failed to send message. Please check your connection and try again.';
      setResponseMessage(message);
      toast({ variant: "error", title: "Failed to send message", description: message });
    }
  };

  return (
    <section className="w-full bg-[#F2F4F8] py-16 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[40px] font-bold font-notch text-[#1E1E24]">
            Connect With Us<span className="text-[#00DDE2]">.</span>
          </h2>
          <p className="text-lg text-[#1E1E24] opacity-60 font-medium max-w-2xl">
            Please share a few details about your requirement or area of interest, and a representative will connect with you.
          </p>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Message Sent Successfully!</p>
              <p className="text-green-700 text-sm mt-1">{responseMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
            <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Failed to Send Message</p>
              <p className="text-red-700 text-sm mt-1">{responseMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* Row 1: Name */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="firstName" className="text-lg font-medium text-[#1E1E24]">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="lastName" className="text-lg font-medium text-[#1E1E24]">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            </div>
          </div>

          {/* Row 2: Organization */}
          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-lg font-medium text-[#1E1E24]">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Your Company Name"
              className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
            />
          </div>

          {/* Row 3: Email & Phone */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-medium text-[#1E1E24]">
                Email ID <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="johndoe@email.com"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="phone" className="text-lg font-medium text-[#1E1E24]">
                Contact Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+919999887766"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            </div>
          </div>

          {/* Row 4: Area of Interest */}
          <div className="flex flex-col gap-2">
            <label htmlFor="areaOfInterest" className="text-lg font-medium text-[#1E1E24]">
              Area of Interest
            </label>
            <div className="relative">
              <select
                id="areaOfInterest"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0000FF] cursor-pointer"
              >
                <option value="">Select an option</option>
                <option value="hiring">Hiring Talent</option>
                <option value="job">Looking for Job</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-6 h-6 text-[#0000FF]" />
              </div>
            </div>
          </div>

          {/* Row 5: Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-lg font-medium text-[#1E1E24]">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Your message goes here..."
              className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center gap-2 bg-[#0000FF] hover:bg-[#000099] disabled:bg-[#0000FF]/50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-[5px] font-bold text-lg transition-colors uppercase"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  SUBMIT <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};
