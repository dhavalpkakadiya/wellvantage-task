import React from "react";
import logo02 from "../../assets/svg/logo02.svg";
import logo from "../../assets/svg/logo.svg"
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { apiService } from "../../services/axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";

const Details = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      gymName: "",
      ownerFirstName: "",
      ownerLastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "India",
      phoneNumber: "",
    },
    validate: (values) => {
      const errors = {};
      const required = [
        "gymName",
        "ownerFirstName",
        "ownerLastName",
        "addressLine1",
        "addressLine2",
        "city",
        "state",
        "country",
        "phoneNumber",
      ];

      required.forEach((field) => {
        if (!values[field] || values[field].trim() === "") {
          errors[field] = "This field is required.";
        }
      });

      if (values.phoneNumber && !/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = "Phone number must be exactly 10 digits.";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const userId = userData.userId;
        const payload = { ...values, userId };

        const response = await apiService.post('/gym/create', payload);
        toast.success(response.data.message || "Gym created successfully!");
        resetForm();
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to create gym.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      formik.setFieldValue("phoneNumber", value);
    }
  };

  const showError = (field) => formik.touched[field] && Boolean(formik.errors[field]);
  const getHelperText = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="relative h-[4rem]  md:h-full md:w-[45%] w-full bg-[#28A745] flex flex-col justify-center items-center px-3 md:px-10 lg:py-12">
        <button
          className="absolute top-4 left-6 text-2xl lg:top-6 lg:left-6 lg:text-3xl hover:text-gray-200"
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <div className="flex justify-center">
          <img src={logo}
            alt="logo"
            className="block md:hidden object-contain w-[12rem] h-[12rem]" />
          <img src={logo02}
            alt="logo"
            className="hidden md:block object-contain md:w-[272px] md:h-[272px] md:mt-10" />
        </div>
      </div>

      <div className="md:w-[55%] w-full p-4 md:p-12 bg-white overflow-y-auto">

        <h2 className="text-[28px] font-semibold text-center mb-1">Details</h2>

        <p className="text-center text-gray-600 mb-4">
          Let’s build your gym’s digital HQ! 💪✨
        </p>

        <p className="text-gray-500 text-sm mb-8 text-center ">
          Enter your name, address & contact so we can tailor everything for your business.
        </p>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">Gym Name*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="gymName"
              value={formik.values.gymName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={showError('gymName')}
              helperText={getHelperText('gymName')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">
              Gym Owner's First Name*
            </label>
            <span className="text-xs block mb-1 !text-[#737373] !text-[12px]">
              (will have access to all features of the app)
            </span>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="ownerFirstName"
              value={formik.values.ownerFirstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('ownerFirstName')}
              helperText={getHelperText('ownerFirstName')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">Last Name*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="ownerLastName"
              value={formik.values.ownerLastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('ownerLastName')}
              helperText={getHelperText('ownerLastName')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">Address Line 1*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="addressLine1"
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('addressLine1')}
              helperText={getHelperText('addressLine1')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">Address Line 2*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="addressLine2"
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('addressLine2')}
              helperText={getHelperText('addressLine2')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">City*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('city')}
              helperText={getHelperText('city')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">State*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('state')}
              helperText={getHelperText('state')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">Country*</label>
            <TextField
              fullWidth
              size="medium"
              variant="outlined"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!rounded-[8px]"
              error={showError('country')}
              helperText={getHelperText('country')}
            />
          </div>

          <div>
            <label className="!font-medium !mb-1 !block !text-[16px] !text-[#737373]">Phone Number*</label>

            <div className="flex gap-4">
              <select className="border rounded-lg p-3 w-24 text-gray-700">
                <option>+91</option>
              </select>
              <TextField
                fullWidth
                size="medium"
                variant="outlined"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={handlePhoneNumberChange}
                onBlur={formik.handleBlur}
                error={showError('phoneNumber')}
                helperText={getHelperText('phoneNumber')}
                className="!rounded-[8px]" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              // name="privacyPolicy"
              checked={checked}
              onChange={() => setChecked(!checked)}
              onBlur={formik.handleBlur}
              className="w-4 h-4"
            />
            <p className="text-sm">
              I agree to the{" "}
              <span className="text-[#28A745] underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#28A745",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#23953e" },
            }}
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Details;
