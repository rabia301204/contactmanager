import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
  category: "other",
};

function ContactForm({ onSubmit, initialData = {}, loading }) {
  const [form, setForm] = useState({ ...initialState, ...initialData });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone)) errs.phone = "Invalid phone number";
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
          {errors.name && <p className="error-msg">⚠ {errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
        {errors.email && <p className="error-msg">⚠ {errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Phone *</label>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" />
        {errors.phone && <p className="error-msg">⚠ {errors.phone}</p>}
      </div>

      <div className="form-group">
        <label>Address</label>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Optional address" />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any notes about this contact..."
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Contact"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;