

const StatusSection = ({ data, onUpdate, onSubmit, onNavigatePrevious }) => {

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      text: '',
      createdBy: 'user',
    };
    onUpdate({ customNotes: [newNote, ...data.customNotes] });
  };

  const handleNoteChange = (id, field, value) => {
    if (!id) return;
    const updatedNotes = data.customNotes.map(note =>
      note.id === id ? { ...note, [field]: value } : note
    );
    onUpdate({ customNotes: updatedNotes });
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900">Status</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="inquiryDate" className="text-sm font-medium text-gray-500">
              Inquiry Date
            </label>
            <div className="relative">
              <input
                id="inquiryDate"
                type="date"
                value={data.inquiryDate}
                onChange={(e) => onUpdate({ inquiryDate: e.target.value })}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="assignedTo" className="text-sm font-medium text-gray-500">
              Assigned To Admin/Receptionist
            </label>
            <div className="flex gap-2">
              <div className={`relative ${data.assignedTo === "other" ? "w-1/5" : "w-full"}`}>
                <select
                  id="assignedTo"
                  value={data.assignedTo}
                  onChange={(e) => onUpdate({ assignedTo: e.target.value })}
                  className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Ram Mohan">Ram Mohan</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {data.assignedTo === "other" && (
                <input
                  id="customAssignedToName"
                  type="text"
                  placeholder="Enter name"
                  value={data.customAssignedToName || ""}
                  onChange={(e) => onUpdate({ customAssignedToName: e.target.value })}
                  className="flex-1 h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="interestLevel" className="text-sm font-medium text-gray-500">
              Interest Level
            </label>
            <div className="relative">
              <select
                id="interestLevel"
                value={data.interestLevel}
                onChange={(e) => onUpdate({ interestLevel: e.target.value })}
                className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="followUpStatus" className="text-sm font-medium text-gray-500">
              Follow Up Status
            </label>
            <div className="relative">
              <select
                id="followUpStatus"
                value={data.followUpStatus}
                onChange={(e) => onUpdate({ followUpStatus: e.target.value })}
                className="flex h-10 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="New Inquiry">New Inquiry</option>
                <option value="Needs Follow-Up">Needs Follow-Up</option>
                <option value="Engaged">Engaged</option>
                <option value="Converted">Converted</option>
                <option value="Archived">Archived</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredPackage" className="text-sm font-medium text-gray-500">
              Preferred Package
            </label>
            <div className="relative">
              <select
                id="preferredPackage"
                value={data.preferredPackage}
                onChange={(e) => onUpdate({ preferredPackage: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="package">Package</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredPTPackage" className="text-sm font-medium text-gray-500">
              Preferred PT Package (If Any)
            </label>
            <div className="relative">
              <select
                id="preferredPTPackage"
                value={data.preferredPtPackage}
                onChange={(e) => onUpdate({ preferredPtPackage: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="package">Package</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-1">
            <label htmlFor="source" className="text-sm font-medium text-gray-500">
              How They Heard About The Gym
            </label>
            <div className="relative">
              <select
                id="source"
                value={data.howTheyHeard}
                onChange={(e) => onUpdate({ howTheyHeard: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="social_media">Social Media</option>
                <option value="word_of_mouth">Word of Mouth</option>
                <option value="walk_in">Walk-in</option>
                <option value="wellvantage_b2c_app">WellVantage B2C App</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-xs md:text-sm font-medium text-gray-500">Custom notes</label>
            <button
              onClick={handleAddNote}
              className="rounded-full bg-[#28a745] p-1 text-white hover:bg-[#218838] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <div className="space-y-4">
            {data.customNotes.map((note) => (
              <div key={note.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="w-full sm:w-32 shrink-0">
                  <div className="relative">
                    <input
                      type="date"
                      value={note.date}
                      readOnly={note.isGrayedOut}
                      onChange={(e) => handleNoteChange(note.id, 'date', e.target.value)}
                      className={`flex h-10 md:h-12 w-full rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${note.isGrayedOut ? 'bg-gray-200 text-gray-500' : 'bg-white'}`}
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    value={note.text}
                    readOnly={note.isGrayedOut}
                    onChange={(e) => handleNoteChange(note.id, 'text', e.target.value)}
                    className={`flex h-10 md:h-12 w-full rounded-md border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${note.isGrayedOut ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-900'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 pt-6 md:pt-8 px-4 sm:px-0">
          <button
            onClick={onNavigatePrevious}
            className="inline-flex h-12 min-w-[150px] sm:min-w-[200px] items-center justify-center rounded-md bg-[#28a745] px-6 sm:px-8 py-2 text-xs sm:text-sm font-semibold text-white shadow transition-colors hover:bg-[#218838] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
          >
            Previous
          </button>
          <button
            onClick={onSubmit}
            className="inline-flex h-12 min-w-[150px] sm:min-w-[200px] items-center justify-center rounded-md bg-[#28a745] px-6 sm:px-8 py-2 text-xs sm:text-sm font-semibold text-white shadow transition-colors hover:bg-[#218838] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
