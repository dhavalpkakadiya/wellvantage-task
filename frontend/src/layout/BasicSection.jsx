
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  height: Yup.string().required("Height is required"),
  weight: Yup.string().required("Weight is required"),
});

const BasicSection = ({ data, onUpdate, onNavigateNext }) => {
  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      onNavigateNext();
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Basic Details</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-500">
              First Name*
            </label>
            <input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder=""
              className={`flex h-12 w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-500">
              Last Name*
            </label>
            <input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder=""
              className={`flex h-12 w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-500">
              Phone
            </label>
            <div className={`flex rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-200'} bg-white overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent`}>
              <div className="relative flex items-center bg-gray-100 border-r border-gray-200">
                <select className="h-full py-0 pl-3 pr-7 bg-transparent text-gray-500 text-sm font-medium appearance-none focus:outline-none cursor-pointer z-10">
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <div className="absolute right-2 pointer-events-none text-xs text-gray-500">▼</div>
              </div>
              <input
                id="phone"
                value={data.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    onUpdate({ phone: value });
                  }
                }}
                className="flex h-12 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              className={`flex h-12 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium text-gray-500">
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                value={data.gender}
                onChange={(e) => onUpdate({ gender: e.target.value })}
                className={`flex h-12 w-full appearance-none rounded-md border ${errors.gender ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <option value="" disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="dob" className="text-sm font-medium text-gray-500">
              Date of Birth
            </label>
            <div className="relative">
              <input
                id="dob"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
                className={`flex h-12 w-full rounded-md border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
              />
            </div>
            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="height" className="text-sm font-medium text-gray-500">
              Height
            </label>
            <div className="flex gap-2">
              <input
                id="height"
                value={data.height}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    onUpdate({ height: value });
                  }
                }}
                className={`flex h-12 w-full rounded-md border ${errors.height ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              <div className="relative h-12 w-20 rounded-md bg-green-50 border border-green-100 text-green-700">
                <select
                  value={data.heightUnit}
                  onChange={(e) => onUpdate({ heightUnit: e.target.value })}
                  className="h-12 w-full pl-3 pr-7 bg-transparent text-sm font-medium appearance-none focus:outline-none cursor-pointer z-10"
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</div>
              </div>
            </div>
            {errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="weight" className="text-sm font-medium text-gray-500">
              Weight
            </label>
            <div className="flex gap-2">
              <input
                id="weight"
                value={data.weight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    onUpdate({ weight: value });
                  }
                }}
                className={`flex h-12 w-full rounded-md border ${errors.weight ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              <div className="relative h-12 w-20 rounded-md bg-green-50 border border-green-100 text-green-700">
                <select
                  value={data.weightUnit}
                  onChange={(e) => onUpdate({ weightUnit: e.target.value })}
                  className="h-12 w-full pl-3 pr-7 bg-transparent text-sm font-medium appearance-none focus:outline-none cursor-pointer z-10"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</div>
              </div>
            </div>
            {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            onClick={handleNext}
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-md bg-[#28a745] px-8 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-[#218838] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicSection;
