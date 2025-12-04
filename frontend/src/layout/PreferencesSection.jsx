

const PreferencesSection = ({ data, onUpdate, onNavigateNext, onNavigatePrevious }) => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Preference</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="activityLevel" className="text-sm font-medium text-gray-500">
              Activity Level
            </label>
            <div className="relative">
              <select
                id="activityLevel" 
                value={data.activityLevel}
                onChange={(e) => onUpdate({ activityLevel: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="sedentary">Sedentary</option>
                <option value="lightly_active">Lightly active</option>
                <option value="moderately_active">Moderately active</option>
                <option value="very_active">Very active</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="wellnessGoals" className="text-sm font-medium text-gray-500">
              Wellness Goals
            </label>
            <div className="relative">
              <select
                id="wellnessGoals"
                value={data.wellnessGoals}
                onChange={(e) => onUpdate({ wellnessGoals: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="lose_weight">Lose weight</option>
                <option value="gain_weight">Gain weight</option>
                <option value="build_muscle">Build muscle</option>
                <option value="modify_diet">Modify My Diet</option>
                <option value="manage_stress">Manage Stress</option>
                <option value="improve_step_count">Improve Step Count</option>
                <option value="general_wellness">General wellness</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fitnessFocus" className="text-sm font-medium text-gray-500">
              Primary Fitness Focus
            </label>
            <div className="relative">
              <select
                id="fitnessFocus"
                value={data.primaryFitnessFocus}
                onChange={(e) => onUpdate({ primaryFitnessFocus: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="gym_workout">Gym workouts</option>
                <option value="yoga">Yoga</option>
                <option value="meditation">Meditation</option>
                <option value="nutrition">Nutrition</option>
                <option value="recovery">Recovery</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="gymTime" className="text-sm font-medium text-gray-500">
              Preferred Gym Time
            </label>
            <div className="relative">
              <select
                id="gymTime"
                value={data.preferredGymTime}
                onChange={(e) => onUpdate({ preferredGymTime: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="late_evening">Late evening</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="intensity" className="text-sm font-medium text-gray-500">
              Preferred Workout Intensity
            </label>
            <div className="relative">
              <select
                id="intensity"
                value={data.preferredWorkoutIntensity}
                onChange={(e) => onUpdate({ preferredWorkoutIntensity: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="medicalConcerns" className="text-sm font-medium text-gray-500">
              Medical Concerns
            </label>
            <div className="relative">
              <select
                id="medicalConcerns"
                value={data.medicalConcerns}
                onChange={(e) => onUpdate({ medicalConcerns: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="diabetes">Diabetes</option>
                <option value="hypertension">Hypertension</option>
                <option value="asthma">Asthma</option>
                <option value="other">Other</option>
                <option value="none">None</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium text-gray-500">
              Previous Gym Experience
            </label>
            <div className="relative">
              <select
                id="experience"
                value={data.previousGymExperience}
                onChange={(e) => onUpdate({ previousGymExperience: e.target.value })}
                className="flex h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5 pt-8">
          <button
            onClick={onNavigatePrevious}
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md bg-[#28a745] px-8 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-[#218838] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={onNavigateNext}
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md bg-[#28a745] px-8 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-[#218838] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;