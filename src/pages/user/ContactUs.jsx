import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ContactUs = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-display font-bold text-gradient">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="card p-6 shadow-soft border border-neutral-100">
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Get in Touch</h3>
          <p className="text-neutral-600 mb-6">We'd love to hear from you! Please reach out with any questions or feedback.</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-primary-500 mr-3" />
              <p className="text-neutral-700">support@tastemate.com</p>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-6 w-6 text-primary-500 mr-3" />
              <p className="text-neutral-700">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-6 w-6 text-primary-500 mr-3" />
              <p className="text-neutral-700">123 Foodie Lane, Culinary City, CA 90210</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card p-6 shadow-soft border border-neutral-100">
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field mt-1 block w-full"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field mt-1 block w-full"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="input-field mt-1 block w-full"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;