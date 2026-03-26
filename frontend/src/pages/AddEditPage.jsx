import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContacts } from "../context/contactcontext";
import { useToast } from "../context/toastcontext";
import ContactForm from "../components/ContactForm";
import { fetchContactById } from "../api/contactapi";

function AddEditPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addContact, editContact } = useContacts();
  const { addToast } = useToast();

  const [initialData, setInitialData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetchContactById(id)
        .then((res) => setInitialData(res.data.data))
        .catch(() => setApiError("Failed to load contact"));
    }
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setApiError("");
    try {
      if (isEdit) {
        await editContact(id, formData);
        addToast("Contact updated successfully", "success");
      } else {
        await addContact(formData);
        addToast("Contact added successfully", "success");
      }
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong";
      setApiError(msg);
      addToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && !initialData && !apiError) {
    return (
      <div className="page-wrapper">
        <div className="loading"><div className="spinner" /> Loading contact...</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="form-page">
        <div className="form-header">
          <h2>{isEdit ? "Edit Contact" : "New Contact"}</h2>
          <p>{isEdit ? "Update the details below" : "Fill in the details to add a new contact"}</p>
        </div>

        {apiError && <div className="alert alert-error">⚠ {apiError}</div>}

        <div className="form-card">
          <ContactForm
            onSubmit={handleSubmit}
            initialData={initialData || {}}
            loading={submitting}
          />
        </div>

        <div style={{ marginTop: "1.2rem" }}>
          <button className="btn-secondary" onClick={() => navigate("/")}>
            ← Back to Contacts
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditPage;