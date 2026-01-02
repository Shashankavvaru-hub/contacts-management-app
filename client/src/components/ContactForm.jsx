import { useEffect, useState } from "react";
import axios from "axios";

const ContactForm = ({ setContacts }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const MAX_MESSAGE_LENGTH = 100;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/create-contact`,
        form
      );
      setContacts((prev) => [response.data, ...prev]);
      setForm({ name: "", email: "", phone: "", message: "" });
      setSuccessMessage("Contact created successfully.");
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit. Try again later.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (form.message && form.message.length > MAX_MESSAGE_LENGTH)
      newErrors.message = `Max ${MAX_MESSAGE_LENGTH} chars`;

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [form]);

  const inputBase =
    "w-full rounded-md border px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <div className="bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">Add Contact</h2>
          <p className="text-sm text-slate-600 mt-1">
            Fill in the details below
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 space-y-4"
          noValidate
        >
          {successMessage && (
            <div className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded text-sm">
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded text-sm">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.name ? "border-red-400" : "border-slate-300"
                }`}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.phone ? "border-red-400" : "border-slate-300"
                }`}
                placeholder="+91 XXXXXXXX"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.email ? "border-red-400" : "border-slate-300"
                }`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Message <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`${inputBase} h-24 resize-none ${
                  errors.message ? "border-red-400" : "border-slate-300"
                }`}
                placeholder="Message..."
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <div className="flex justify-between mt-1 text-xs text-slate-400">
                <span>{errors.message}</span>
                <span>
                  {form.message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white transition ${
                isFormValid && !isSubmitting
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
