import React from 'react';

const RecruitmentCard = ({ data, updateStatus }) => {
  const statusOptions = ["Applied", "Interview", "Offered", "Rejected"];

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending Response':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Offered':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle status change
  const handleStatusChange = (e) => {
    updateStatus(data.id, e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-blue-600 truncate">{data.nameCompany}</h3>
          <span className="bg-gray-100 text-gray-700 text-sm font-medium px-2 py-1 rounded-full">
            {data.role}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex">
            <span className="text-sm text-gray-500 w-24">HR Name:</span>
            <span className="text-sm font-medium text-gray-700">{data.email}</span>
          </div>
          
          <div className="flex">
            <span className="text-sm text-gray-500 w-24">Date Sent:</span>
            <span className="text-sm font-medium text-gray-700">{data.createdAt.substring(0,10)}</span>
          </div>
          
          <div className="pt-2">
            <label htmlFor={`status-${data.id}`} className="block text-sm text-gray-500 mb-1">Status:</label>
            <select 
              id={`status-${data.id}`}
              value={data.status}
              onChange={handleStatusChange}
              className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-5 flex justify-end">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCard;