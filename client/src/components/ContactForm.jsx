import { useEffect, useState } from "react";
import axios from "axios";
const ContactForm = ({ setContacts }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/create-contact`,
        form
      );
      setContacts((prev) => [response.data, ...prev]);
      setForm({ name: "", email: "", phone: "", message: "" });
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };
  useEffect(() => {
    validate();
  }, [form]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-6 w-full max-w-md"
    >
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter the name"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter the email"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          name="phone"
          value={form.phone}
          placeholder="Enter the phone number"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <textarea
        name="message"
        value={form.message}
        placeholder="Enter the message (Optional)"
        className="border p-2 rounded"
        onChange={handleChange}
      />

      <button
        disabled={!isFormValid}
        className={`p-2 rounded text-white ${
          isFormValid ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
