import axios from "axios";

const ContactsList = ({ contacts = [], setContacts }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASEURL}/delete-contact/${id}`
      );
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  return (
    <>
      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No contacts found
              </td>
            </tr>
          ) : (
            contacts.map((c) => (
              <tr key={c._id} className="border-t">
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.message || "-"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default ContactsList;
