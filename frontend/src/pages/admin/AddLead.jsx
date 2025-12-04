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
  const [errors, setErrors] = useState({});

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
      assignedTo: 'ram_mohan',
      interestLevel: 'hot',
      followUpStatus: 'New Inquiry', 
      preferredPackage: 'package',
      preferredPtPackage: 'package',
      howTheyHeard: 'social_media',
      customNotes: [
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0], 
          text: 'Lead created.',
          isGrayedOut: true 
        }
      ]
    },validate:(values)=>{
      if (!values.firstName) {
        setErrors((prevErrors) => ({ ...prevErrors, firstName: 'First name is required' }));
      }
      if (!values.lastName) {
        setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Last name is required' }));
      }
      if (!values.phone) {
        setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number is required' }));
      }
      if (!values.email) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      }
      if (!values.gender) {
        setErrors((prevErrors) => ({ ...prevErrors, gender: 'Gender is required' }));
      }
      if (!values.dateOfBirth) {
        setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: 'Date of birth is required' }));
      }
      if (!values.height) {
        setErrors((prevErrors) => ({ ...prevErrors, height: 'Height is required' }));
      }
      if (!values.heightUnit) {
        setErrors((prevErrors) => ({ ...prevErrors, heightUnit: 'Height unit is required' }));
      }
      if (!values.weight) {
        setErrors((prevErrors) => ({ ...prevErrors, weight: 'Weight is required' }));
      }
      if (!values.weightUnit) {
        setErrors((prevErrors) => ({ ...prevErrors, weightUnit: 'Weight unit is required' }));
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {        
        if(errors){
          toast.error("Please fill all the required fields");
          return;
        }
        await createLead(values);
        resetForm();
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
      <div className="sticky top-0 z-10 px-8 py-6 border-b border-gray-200 bg-[#F9F9FA] h-[95px]">
        <h1 className="text-2xl font-bold text-gray-800">Lead Management</h1>
      </div>
      <div className="sticky top-[95px] z-10 border-b border-border bg-white w-full">
        <div className="flex items-center px-8 pt-6 space-x-8">
          <button
            onClick={() => setActiveTab('basic')}
            className={`pb-3 text-base font-bold transition-colors ${activeTab === 'basic'
              ? 'border-b-4 border-[#28a745] text-[#28a745]'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
              }`}
          >
            Basic
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 text-base font-bold transition-colors ${activeTab === 'preferences'
              ? 'border-b-4 border-[#28a745] text-[#28a745]'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent'
              }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 text-base font-bold transition-colors ${activeTab === 'status'
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