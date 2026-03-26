import ContactCard from "./ContactCard";

function ContactList({ contacts, loading, error }) {
  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading contacts...
    </div>
  );
  if (error) return <div className="alert alert-error">⚠ {error}</div>;
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No contacts found</h3>
        <p>Try adjusting your search or add a new contact.</p>
      </div>
    );
  }

  return (
    <div className="contact-grid">
      {contacts.map((contact) => (
        <ContactCard key={contact._id} contact={contact} />
      ))}
    </div>
  );
}

export default ContactList;