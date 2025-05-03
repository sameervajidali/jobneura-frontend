import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const basePlans = [
  {
    name: 'Free',
    monthly: '$0',
    yearly: '$0',
    description: 'Best for exploring the platform.',
    features: [
      'AI Resume Builder (Basic)',
      '5 Skill Quizzes / month',
      'Access to Job Listings',
    ],
    button: 'Get Started',
    highlighted: false,
    gradient: 'bg-gradient-to-br from-gray-100 to-white',
  },
  {
    name: 'Pro',
    monthly: '$12/mo',
    yearly: '$96/yr',
    description: 'For job seekers actively applying.',
    features: [
      'Resume Enhancer (AI)',
      'Unlimited Quizzes + Certifications',
      'Smart Job Recommendations',
      'Cover Letter Generator',
    ],
    button: 'Upgrade to Pro',
    highlighted: true,
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white',
  },
  {
    name: 'Premium',
    monthly: '$24/mo',
    yearly: '$192/yr',
    description: 'Everything fully automated.',
    features: [
      'Auto Job Apply',
      'Skill Gap Analyzer',
      'Career Coaching AI',
      'Portfolio Builder',
      'Priority Support',
    ],
    button: 'Go Premium',
    highlighted: false,
    gradient: 'bg-gradient-to-br from-gray-100 to-white',
  },
];

function PricingPage() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Made for Job Seekers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Simple, transparent pricing that grows with your career.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-14 gap-4">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full font-medium transition border ${
              billing === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 rounded-full font-medium transition border ${
              billing === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            Yearly Billing <span className="ml-1 text-xs text-green-600">(Save 20%)</span>
          </button>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {basePlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 border shadow-xl transition-all duration-300 relative ${
                plan.highlighted ? 'scale-[1.05] border-transparent' : 'border-gray-200 hover:shadow-2xl'
              } ${plan.gradient}`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 right-4 bg-yellow-400 text-xs font-semibold text-gray-800 px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <h3 className={`text-2xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`mb-4 text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className={`text-3xl font-extrabold mb-6 ${plan.highlighted ? 'text-white' : 'text-indigo-600'}`}>
                {billing === 'monthly' ? plan.monthly : plan.yearly}
              </div>
              <ul className={`text-left space-y-3 mb-8 text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-gray-700'}`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className={`${plan.highlighted ? 'text-white' : 'text-green-500'} w-4 h-4`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/register"
                className={`inline-block w-full text-center rounded-lg py-2 font-semibold text-sm transition ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {plan.button}
              </a>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="mt-24 text-left max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Can I cancel my subscription anytime?</h4>
              <p className="text-gray-600 text-sm">Yes, you can cancel at any time from your dashboard. You'll continue to have access until the end of your billing cycle.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Do I need a credit card to use the Free plan?</h4>
              <p className="text-gray-600 text-sm">No, the Free plan doesn’t require a credit card. Just sign up and start exploring!</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">What’s included in the Premium plan?</h4>
              <p className="text-gray-600 text-sm">Everything we offer: automated job applications, full resume optimization, personalized career coaching, and more.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">Is support available?</h4>
              <p className="text-gray-600 text-sm">Yes! Pro and Premium users receive priority email support. Free users can access our Help Center.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
