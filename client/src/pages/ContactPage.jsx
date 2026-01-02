import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm";
import ContactsList from "../components/ContactsList";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    console.log("first")
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASEURL}/get-contacts`
    );
    console.log(res);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <>
      <ContactForm setContacts={setContacts} />
      <ContactsList contacts={contacts} setContacts={setContacts}/>
    </>
  );
};

export default ContactPage;
