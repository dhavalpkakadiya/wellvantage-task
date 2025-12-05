import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import BasicSection from '../../layout/BasicSection';
import PreferencesSection from '../../layout/PreferencesSection';
import StatusSection from '../../layout/StatusSection';
import { apiService } from '../../services/axios';

const SettingsPage = () => {
  const createLead = async (leadData) => {
    try {
      if (leadData.dateOfBirth == '') {
        leadData.dateOfBirth = null;
      }
      const response = await apiService.post('/lead/create', leadData);
      toast.success(response.data.message || "Lead created successfully!");
      return response.data;
    } catch (error) {
      console.error("Failed to create lead, please try again.");
      throw error;
    }
  };
  const [activeTab, setActiveTab] = useState('basic');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: '',
      dateOfBirth: null,
      height: '',
      heightUnit: 'cm',
      weight: '',
      weightUnit: 'kg',
      preferences: {
        activityLevel: 'sedentary',
        wellnessGoals: 'lose_weight',
        primaryFitnessFocus: 'gym_workout',
        preferredGymTime: 'morning',
        preferredWorkoutIntensity: 'light',
        medicalConcerns: 'none',
        previousGymExperience: 'no'
      },
      inquiryDate: new Date().toISOString().split('T')[0],
      assignedTo: 'Manish Agrawal',
      interestLevel: 'hot',
      followUpStatus: 'New Inquiry',
      preferredPackage: 'package',
      preferredPtPackage: 'package',
      howTheyHeard: 'social_media',
      customNotes: [
        {
          id: Date.now() + 1,
          date: new Date().toISOString().split('T')[0],
          text: '',
          isGrayedOut: false
        },
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          text: 'Lead created.',
          isGrayedOut: true
        },
      ]
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (!validateRequiredFields(values)) {
          setSubmitting(false);
          return;
        }
        await createLead(values);
        resetForm();
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
        setActiveTab('basic');
      }
    },
  });

  const validateRequiredFields = (values) => {
    const required = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'gender',
      'dateOfBirth',
      'height',
      'weight',
    ];

    const missing = required.filter((key) => {
      const val = values[key];
      if (key === 'dateOfBirth') { 
        return val === null || val === '';
      }
      return val === null || val === undefined || String(val).trim() === '';
    });

    if (missing.length > 0) {
      missing.forEach((k) => console.error(`Field '${k}' is not filled`));
      toast.error("Please fill all required fields.");
      return false;
    }

    return true;
  };

  const handleBasicUpdate = (updates) => {
    formik.setValues({ ...formik.values, ...updates });
  };

  const handlePreferencesUpdate = (updates) => {
    formik.setFieldValue('preferences', { ...formik.values.preferences, ...updates });
  };

  const handleStatusUpdate = (updates) => {
    formik.setValues({ ...formik.values, ...updates });
  };

  const handleNavigateBasic = () => {
    setActiveTab('basic');
  };

  const handleNavigatePreferences = () => {
    setActiveTab('preferences');
  };

  const handleNavigateStatus = () => {
    setActiveTab('status');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-20 xl:px-8 py-4 xl:py-6 border-b border-gray-200 bg-[#F9F9FA] h-auto md:h-[95px] ">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 pl-16 xl:pl-4">Lead Management</h1>
      </div>
      <div className="sticky top-auto md:top-[95px] z-10 border-b border-border bg-white w-full overflow-x-auto">
        <div className="flex items-center px-4 md:px-8 pt-4 md:pt-6 space-x-4 md:space-x-8 min-w-max md:min-w-full">
          <button
            onClick={() => setActiveTab('basic')}
            className={`pb-3 text-sm md:text-base font-bold transition-colors whitespace-nowrap ${activeTab === 'basic'
              ? 'border-b-4 border-[#28a745] text-[#28a745]'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
              }`}
          >
            Basic
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 text-sm md:text-base font-bold transition-colors whitespace-nowrap ${activeTab === 'preferences'
              ? 'border-b-4 border-[#28a745] text-[#28a745]'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
              }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 text-sm md:text-base font-bold transition-colors whitespace-nowrap ${activeTab === 'status'
              ? 'border-b-4 border-[#28a745] text-[#28a745]'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
              }`}
          >
            Status
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full bg-gray-50 text-foreground flex flex-col items-center">
        <div className="w-full bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="min-h-[400px]">
            {activeTab === 'basic' && (
              <BasicSection
                data={formik.values}
                onUpdate={handleBasicUpdate}
                onNavigateNext={handleNavigatePreferences}
                onSubmit={formik.handleSubmit}
              />
            )}
            {activeTab === 'preferences' && (
              <PreferencesSection
                data={formik.values.preferences}
                onUpdate={handlePreferencesUpdate}
                onNavigatePrevious={handleNavigateBasic}
                onNavigateNext={handleNavigateStatus}
                onSubmit={formik.handleSubmit}
              />
            )}
            {activeTab === 'status' && (
              <StatusSection
                data={formik.values}
                onUpdate={handleStatusUpdate}
                onNavigatePrevious={handleNavigatePreferences}
                onSubmit={formik.handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;