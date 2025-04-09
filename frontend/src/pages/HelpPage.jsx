import React, { useState } from 'react';
import { 
  HelpCircle, 
  FileQuestion, 
  MessageCircle, 
  Book, 
  Mail, 
  Phone,
  ChevronDown,
  Search,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaqs, setExpandedFaqs] = useState([]);

  const toggleFaq = (id) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter(faqId => faqId !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };

  // Sample FAQs
  const faqs = [
    // {
    //   id: 1,
    //   question: "How do I create a team in Smart Teams?",
    //   answer: "To create a team, navigate to the Dashboard and click on the 'Create New Team' button. Enter your team name, add members by email, and set permissions as needed."
    // },
    {
      id: 2,
      question: "How do I reset my password?",
      answer: "Click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password."
    },
    // {
    //   id: 3,
    //   question: "Can I use Smart Teams on multiple devices?",
    //   answer: "Yes, you can access your Smart Teams account from any device with internet connectivity. Your data will sync automatically across all your devices."
    // },
    // {
    //   id: 4,
    //   question: "How do I manage team permissions?",
    //   answer: "Go to Teams > Select Team > Members tab. From there, you can adjust role permissions for each team member by clicking on the settings icon next to their name."
    // }
  ];
  return (
    <div className="pt-16 bg-base-100 min-h-screen">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/login" className="btn btn-sm btn-ghost gap-2">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
      
      {/* Search Bar */}
      <div className="bg-primary py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2.5 justify-center mb-8">
            <div className="size-10 rounded-lg bg-primary-content/10 flex items-center justify-center">
              <HelpCircle size={24} className="text-primary-content" />
            </div>
            <h1 className="text-3xl font-bold text-primary-content">Smart Teams Help Center</h1>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for help topics..." 
              className="input input-bordered w-full pl-10 bg-base-100"
            />
            <Search className="absolute left-3 top-3 opacity-60" size={20} />
          </div>
        </div>
      </div>
      
      {/* Help Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div 
            className={`card bg-base-200 hover:shadow-lg transition-all cursor-pointer ${activeCategory === 'getting-started' ? 'border-2 border-primary' : ''}`}
            onClick={() => setActiveCategory('getting-started')}
          >
            <div className="card-body items-center text-center">
              <FileQuestion size={40} className="text-primary mb-2" />
              <h2 className="card-title">Getting Started</h2>
              <p>Basic guides and tutorials for new users</p>
            </div>
          </div>
          
          <div 
            className={`card bg-base-200 hover:shadow-lg transition-all cursor-pointer ${activeCategory === 'faq' ? 'border-2 border-primary' : ''}`}
            onClick={() => setActiveCategory('faq')}
          >
            <div className="card-body items-center text-center">
              <HelpCircle size={40} className="text-primary mb-2" />
              <h2 className="card-title">Frequently Asked Questions</h2>
              <p>Quick answers to common questions</p>
            </div>
          </div>
          
          <div 
            className={`card bg-base-200 hover:shadow-lg transition-all cursor-pointer ${activeCategory === 'contact' ? 'border-2 border-primary' : ''}`}
            onClick={() => setActiveCategory('contact')}
          >
            <div className="card-body items-center text-center">
              <MessageCircle size={40} className="text-primary mb-2" />
              <h2 className="card-title">Contact Support</h2>
              <p>Get in touch with our support team</p>
            </div>
          </div>
        </div>
        
        {/* Content based on active category */}
        <div className="mb-12">
          {activeCategory === 'getting-started' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileQuestion className="mr-2" size={24} />
                Getting Started with Smart Teams
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">Account Setup</h3>
                    <p className="mb-4">Learn how to create and configure your Smart Teams account.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-primary" />
                        <a href="#" className="link link-hover">Creating your account</a>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-primary" />
                        <a href="#" className="link link-hover">Profile settings</a>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-primary" />
                        <a href="#" className="link link-hover">Security settings</a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">Team Management</h3>
                    <p className="mb-4">Explore how to create and manage teams effectively.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-primary" />
                        <a href="#" className="link link-hover">Creating your first team</a>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-primary" />
                        <a href="#" className="link link-hover">Inviting team members</a>
                      </li>
                      <li className="flex items-center">
                        <Book size={16} className="mr-2 text-primary" />
                        <a href="#" className="link link-hover">Setting up permissions</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeCategory === 'faq' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <HelpCircle className="mr-2" size={24} />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map(faq => (
                  <div key={faq.id} className="collapse collapse-arrow bg-base-200">
                    <input 
                      type="checkbox" 
                      checked={expandedFaqs.includes(faq.id)} 
                      onChange={() => toggleFaq(faq.id)}
                      className="peer"
                    /> 
                    <div className="collapse-title text-lg font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* <div className="mt-8 card bg-base-300 p-6">
                <h3 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h3>
                <p className="mb-4">Browse our complete documentation or contact our support team for assistance.</p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn btn-primary">
                    <Book size={18} className="mr-2" />
                    View Documentation
                  </button>
                  <button className="btn btn-outline">
                    <MessageCircle size={18} className="mr-2" />
                    Contact Support
                  </button>
                </div>
              </div> */}
            </div>
          )}
          
          {activeCategory === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageCircle className="mr-2" size={24} />
                Contact Support
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Mail size={20} className="mr-2 text-primary" />
                      Email Support
                    </h3>
                    <p className="mb-4">Our support team typically responds within 24 hours on business days.</p>
                    <a 
                    href="mailto:support@smartteams.com" 
                    className="btn btn-primary">
                      Email Us
                    </a>
                  </div>
                </div>
                
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Phone size={20} className="mr-2 text-primary" />
                      Phone Support
                    </h3>
                    <p className="mb-4">Available Monday to Friday, 9 AM to 5 PM EST.</p>
                    {/* <a href="tel:+18001234567" className="btn btn-primary">
                      Call Us
                    </a> */}
                  </div>
                </div>
              </div>
              
              {/* <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Name</span>
                        </label>
                        <input type="text" placeholder="John Doe" className="input input-bordered" />
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email Address</span>
                        </label>
                        <input type="email" placeholder="email@example.com" className="input input-bordered" />
                      </div>
                    </div>
                    
                    <div className="form-control mb-4">
                      <label className="label">
                        <span className="label-text">Subject</span>
                      </label>
                      <input type="text" placeholder="How can we help you?" className="input input-bordered" />
                    </div>
                    
                    <div className="form-control mb-6">
                      <label className="label">
                        <span className="label-text">Message</span>
                      </label>
                      <textarea className="textarea textarea-bordered h-32" placeholder="Please describe your issue in detail..."></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                      Submit Request
                    </button>
                  </form>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
