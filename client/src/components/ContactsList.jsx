import axios from "axios";

const ContactsList = ({ contacts = [], setContacts }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/delete-contact/${id}`
      );
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      window.alert("Delete failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Contacts</h1>
          <p className="text-slate-600 text-sm mt-2">
            {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <table className="w-full text-sm" aria-label="Contacts">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {!contacts || contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <p className="text-base">No contacts yet</p>
                    <p className="text-sm text-slate-400 mt-1">
                      Add a contact to get started
                    </p>
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-slate-900 font-medium truncate">
                        {c.name}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 truncate">
                      {c.email}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{c.phone}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-pre-wrap break-words max-w-md">
                      {c.message || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        aria-label={`Delete ${c.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
