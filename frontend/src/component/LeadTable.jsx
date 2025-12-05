import React, { useState, useEffect } from "react";
import personIcon from "../assets/svg/person.svg";
import actionIcon from "../assets/svg/action.svg";

import { apiService } from "../services/axios";

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const leadsPerPage = 8;

  const fetchLeads = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: leadsPerPage,
      };
      if (search) {
        params.search = search; 
      }
      const response = await apiService.get('/lead', params);
      setLeads(response.data || []);
      setTotalLeads(response.total || 0);
      setTotalPages(Math.ceil((response.total || 0) / leadsPerPage));
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const getInterestBadge = (level) => {
    const styles = {
      Hot: { emoji: "🔥", bg: "#FEE2E2", text: "#DC2626", label: "Hot" },
      Cold: { emoji: "❄️", bg: "#DBEAFE", text: "#2563EB", label: "Cold" },
      Warm: { emoji: "🌡️", bg: "#FED7AA", text: "#EA580C", label: "Warm" },
    };

    const style = styles[level] || styles.Warm;

    return (
      <div
        className="inline-flex items-center gap-1 px-3 py-1  text-sm font-medium"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        <span>{style.emoji}</span>
        <span>{style.label}</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const colorPicker = (status) => {
    const colors = {
      "New Inquiry": "#BFDBFE",
      "Needs Follow-Up": "#FDE68A",
      "Engaged": "#BBF7D0",
      "Converted": "#DDD6FE",
      "Archived": "#CBD5E1",
    };
    return colors[status] || "transparent";
  };

  return (
    <div className="bg-white border rounded-[6px] border-gray-200 h-full flex flex-col w-full overflow-hidden">
      <div className="px-4 md:px-6 py-3 border-b border-gray-200 shrink-0">
        <input
          type="text"
          placeholder="Search leads by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border bg-[#F6F6F8] border-[#DFDFDF] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full min-w-[800px]">
            <thead className="border-b h-[75px] border-[#F1F1F1] bg-[#FFFDFD] sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-bold text-[16px] text-[#333333] bg-[#FFFDFD]">
                Name
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[16px] text-[#333333] bg-[#FFFDFD]">
                Interest Level
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[16px] text-[#333333] bg-[#FFFDFD]">
                Assigned to
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[16px] text-[#333333] bg-[#FFFDFD]">
                Last Interaction
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[16px] text-[#333333] bg-[#FFFDFD]">
                Follow Up
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[16px] text-[#333333] bg-[#FFFDFD]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F1F1]">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Loading leads...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id || lead.id} className="hover:bg-gray-50 transition-colors bg-[#FFFFFF]">
                  <td className="px-6 py-0.5 text-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#BBBBBB] flex items-center justify-center shrink-0">
                        <img
                          src={personIcon}
                          alt="person"
                          className="w-5 h-5"
                        />
                      </div>
                      <span className="text-[#2563EB] font-medium whitespace-nowrap">
                        {`${lead.firstName || ''} ${lead.lastName || ''}`.trim() || 'N/A'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-0.5 text-center">
                    {getInterestBadge(lead.interestLevel)}
                  </td>

                  <td className="px-6 py-0.5 text-center whitespace-nowrap">{lead.assignedTo || 'N/A'}</td>

                  <td className="px-6 py-0.5 text-center whitespace-nowrap">
                    {lead.inquiryDate ? formatDate(lead.inquiryDate) : 'N/A'}
                  </td>

                  <td className="px-6 py-0.5 text-center whitespace-nowrap">
                    <span
                      className="inline-block px-3 py-1 text-sm font-medium whitespace-nowrap text-[#F59E0B]"
                      style={{ backgroundColor: colorPicker(lead.followUpStatus) }}
                    >
                      {lead.followUpStatus || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-0.5 text-center box">
                    <button className="hover:opacity-70 transition-opacity">
                      <img src={actionIcon} alt="actions" className="w-25 h-15" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-white overflow-x-auto">
        <div className="text-sm text-gray-600 text-center md:text-left">
          Showing {indexOfFirstLead + 1} to{" "}
          {Math.min(indexOfLastLead, totalLeads)} of {totalLeads} leads
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="hidden sm:flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentPage === index + 1
                    ? "bg-[#28A745] text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="sm:hidden text-sm text-gray-700 px-3 py-1">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
