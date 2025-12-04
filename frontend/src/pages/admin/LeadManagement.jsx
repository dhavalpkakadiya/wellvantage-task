

import { useNavigate } from "react-router-dom";
import LeadTable from "../../component/LeadTable";
import addIcon from "../../assets/svg/add.svg";
import React from "react";

const LeadManagement = () => {
    const navigate = useNavigate(); 

    const handleAddLead = () => {
        navigate("/add-lead");
    };

    return (
        <>
            <div className="bg-[#F9F9FA] border-b border-[#F1F1F1] px-6 py-4 lg:px-8 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Lead Management
                </h1>
                <button
                    onClick={handleAddLead}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <img src={addIcon} alt="Add Lead" className="w-8 h-8" />
                </button>
            </div>


            <div className="p-6 lg:p-8">
                <div className="bg-white rounded-[6px] shadow-sm overflow-hidden">
                    <LeadTable />
                </div>
            </div>
        </>
    );
};

export default LeadManagement;
