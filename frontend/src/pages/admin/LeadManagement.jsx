

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
        <div className="flex flex-col h-screen w-screen overflow-hidden xl:pl-64">
            <div className="bg-white border-b border-[#F1F1F1] px-1 py-4 xl:px-8 flex items-center justify-between shrink-0">
                <h1 className="text-2xl pl-16 font-semibold text-gray-800 xl:pl-4">
                    Lead Management
                </h1>
                <button
                    onClick={handleAddLead}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <img src={addIcon} alt="Add Lead" className="w-8 h-8 min-w-6 min-h-6 " />
                </button>
            </div>

            <div className="flex-1 overflow-hidden p-6 xl:p-6 bg-white w-full">
                <div className="bg-white rounded-md shadow-sm h-full flex flex-col w-full overflow-hidden">
                    <LeadTable />
                </div>
            </div>
        </div>
    );
};

export default LeadManagement;
