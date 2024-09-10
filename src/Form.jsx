import React, { useState } from "react";

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Reset individual field error
  };

  // Fields related to each step
  const fieldsByStep = {
    1: ['name', 'email'],
    2: ['street', 'city', 'state', 'postalCode'],
    3: ['cardNumber', 'expiry', 'cvv']
  };

  const validateStep = () => {
    let formErrors = {};
    const currentFields = fieldsByStep[step]; // Get fields for the current step

    // Step 1 validation: Name and Email
    if (step === 1) {
      if (!formData.name) formErrors.name = "Name is required.";
      else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
        formErrors.name = "Name should only contain alphabets and spaces.";
      }

      if (!formData.email) formErrors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        formErrors.email = "Please enter a valid email address.";
      }
    }

    // Step 2 validation: Address Fields
    if (step === 2) {
      if (!formData.street) formErrors.street = "Street is required.";
      if (!formData.city) formErrors.city = "City is required.";
      if (!formData.state) formErrors.state = "State is required.";

      if (!formData.postalCode) formErrors.postalCode = "Postal Code is required.";
      else if (!/^\d{6}$/.test(formData.postalCode)) {
        formErrors.postalCode = "Postal Code must be a 6-digit number.";
      }
    }

    // Step 3 validation: Card Details
    if (step === 3) {
      if (!formData.cardNumber) formErrors.cardNumber = "Card Number is required.";
      else if (!/^\d{16}$/.test(formData.cardNumber)) {
        formErrors.cardNumber = "Card Number must be a 16-digit number.";
      }

      if (!formData.expiry) formErrors.expiry = "Expiry is required.";
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
        formErrors.expiry = "Expiry date must be in MM/YY format.";
      }

      if (!formData.cvv) formErrors.cvv = "CVV is required.";
      else if (!/^\d{3}$/.test(formData.cvv)) {
        formErrors.cvv = "CVV must be a 3-digit number.";
      }
    }

    // Remove errors for fields not in the current step
    const updatedErrors = Object.keys(errors).reduce((acc, key) => {
      if (currentFields.includes(key)) {
        acc[key] = formErrors[key] || ''; // Keep current step errors
      }
      return acc;
    }, {});

    setErrors({ ...updatedErrors, ...formErrors });
    return Object.keys(formErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Submitted:", formData);
      alert("Form Submitted Successfully");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Step {step} of 3</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.street ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your street"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.city ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.state ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.postalCode ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your postal code"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardNumber ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter your card number"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.expiry ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="MM/YY"
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cvv ? "border-red-500" : "focus:ring-indigo-500"
                  }`}
                  placeholder="Enter CVV"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
