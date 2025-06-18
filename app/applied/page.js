"use client";
import React, { useState, useEffect } from 'react';
import RecruitmentCard from './_components/RecruitmentCard';
import axios from 'axios';
import Link from 'next/link';

const App = () => {
  // Sample recruitment data
  // const initialRecruitmentData = [
  //   {
  //     id: 1,
  //     companyName: "Tech Innovations Inc.",
  //     hrName: "Sarah Johnson",
  //     dateSent: "2025-06-10",
  //     status: "Applied",
  //     role: "Frontend Developer"
  //   },
  //   {
  //     id: 2,
  //     companyName: "Global Solutions Ltd.",
  //     hrName: "Michael Chen",
  //     dateSent: "2025-06-15",
  //     status: "Interview",
  //     role: "UI/UX Designer"
  //   },
  //   {
  //     id: 3,
  //     companyName: "Future Technologies",
  //     hrName: "Emily Rodriguez",
  //     dateSent: "2025-06-12",
  //     status: "Rejected",
  //     role: "Software Engineer"
  //   },
  //   {
  //     id: 4,
  //     companyName: "Digital Creations",
  //     hrName: "David Kim",
  //     dateSent: "2025-06-17",
  //     status: "Offered",
  //     role: "Full Stack Developer"
  //   }
  // ];

  // State for recruitment data and search term
  const [recruitmentData, setRecruitmentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Filter data when search term changes
  useEffect(()=>{
    axios.get("https://recruitment-z6tf.onrender.com/getallemail").then((response) => {
      console.log(response.data);
      setRecruitmentData(response.data);
      setFilteredData(response.data);
    }).catch((error) => {
      console.error("Error fetching recruitment data:", error);
    });
    console.log("fetching data")
  },[])
  useEffect(() => {
    const filtered = recruitmentData.filter(item => 
      item.nameCompany.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, recruitmentData]);

  // Update status function
  const updateStatus = (id, newStatus) => {
    setRecruitmentData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    // In a real application, you would update data in a database
    console.log(`Updated application ${id} status to ${newStatus}`);
  };

  // Handle new application
  const handleAddNew = () => {
    alert('Add new application form would appear here');
    // This would typically open a form or modal in a real application
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Recruitment Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              <Link href="/applynew">
              + Add New Application
              </Link>
            </button>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {filteredData.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No matching records found</p>
          </div>
        ) : (
          filteredData.map(item => (
            <RecruitmentCard 
              key={item.id} 
              data={item} 
              updateStatus={updateStatus} 
            />
          ))
        )}
      </main>
    </div>
  );
};

export default App;