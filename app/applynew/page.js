"use client";
import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Loader from '../_components/Loader';


export default function ApplyForm() {

  const [formData, setFormData] = useState({
    hrName: 'Dear hr',
    role: 'Fullstack Developer Intern',
    companyName: '',
    email: '',
    subject: 'Application for Fullstack Developer Intern Role at '
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.hrName.trim()) newErrors.hrName = 'HR Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   axios.post("https://recruitment-z6tf.onrender.com/mailrecuriter",{
    hrName: formData.hrName,
    role: formData.role,
    companyName: formData.companyName,
    email: formData.email,
    subject: formData.subject
   }).then((response) => {
    setLoading(false);
      console.log("Email sent successfully:", response);
    //   setIsSubmitting(true);
    toast.success("Email sent successfully!");
    }).catch((error) => {
      setLoading(false);
      toast.error("Error sending email. Please try again.");
      console.error("Error sending email:", error);
    });
    
    
    try {
      // Here you would typically send the form data to your API
      console.log('Form data submitted:', formData);
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to success page or dashboard
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  let [loading,setLoading]=useState(false);
  return (
    <>{
      loading&&
     ( <div className="min-h-screen flex items-center justify-center">
      <div className='flex  flex-col'>
        <p className='mb-4 font-bold md:text-2xl text-lg'>

      Getting Things Ready
        </p>
      <Loader />
        </div>
    </div>
     )
    }
    <Toaster/>
      <Head>
        <title>Submit Application | Recruitment Portal</title>
        <meta name="description" content="Submit your job application" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8 w-full">
              <div className="uppercase flex md:flex-row flex-col md:justify-between tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                <p className='mb-2'>

                Email Application Form
</p>
<p className=''>
  <Link href="/applied" className="bg-blue-600 hover:bg-blue-700  text-white font-medium py-2 px-4 rounded transition shadow-sm">
  View Applied Jobs
</Link>
</p>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Submit Your Application
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* HR Name */}
                <div>
                  <label htmlFor="hrName" className="block text-sm font-medium text-gray-700">
                    HR Name
                  </label>
                  <input
                    type="text"
                    id="hrName"
                    name="hrName"
                    value={formData.hrName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                      ${errors.hrName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Name of the HR person you're contacting"
                  />
                  {errors.hrName && (
                    <p className="mt-1 text-xs text-red-500">{errors.hrName}</p>
                  )}
                </div>
                
                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                      ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Position you are applying for"
                  />
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                  )}
                </div>
                
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                      ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Name of the company"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                      ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                
                {/* Subject */}
                <div hidden={true}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                      ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Application subject/title"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>All fields are required. Your information will be kept confidential.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}