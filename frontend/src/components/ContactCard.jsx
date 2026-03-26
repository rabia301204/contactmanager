import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/contactcontext";
import { useToast } from "../context/toastcontext";
import ConfirmModal from "./confirmmodal";

const AVATAR_COLORS = 6;

function getAvatarClass(name) {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return `avatar-${code % AVATAR_COLORS}`;
}

function ContactCard({ contact }) {
  const { removeContact, toggleFav } = useContacts();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await removeContact(contact._id);
      addToast(`${contact.name} deleted`, "success");
    } catch {
      addToast("Failed to delete contact", "error");
    }
    setShowConfirm(false);
  };

  const handleToggleFav = async () => {
    try {
      await toggleFav(contact._id);
      addToast(
        contact.isFavorite ? "Removed from favorites" : "Added to favorites",
        "success"
      );
    } catch {
      addToast("Failed to update favorite", "error");
    }
  };

  const initials = contact.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className={`avatar ${getAvatarClass(contact.name)}`}>{initials}</div>
          <div className="card-title">
            <h3>{contact.name}</h3>
            <span className={`badge badge-${contact.category}`}>{contact.category}</span>
          </div>
          <button
            className={`btn-fav${contact.isFavorite ? " is-fav" : ""}`}
            onClick={handleToggleFav}
            title={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {contact.isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className="card-info">
          <p><span className="icon">✉</span>{contact.email}</p>
          <p><span className="icon">☎</span>{contact.phone}</p>
          {contact.address && <p><span className="icon">⌖</span>{contact.address}</p>}
          {contact.notes && <p className="note-text">"{contact.notes}"</p>}
        </div>

        <div className="card-actions">
          <button className="btn btn-edit" onClick={() => navigate(`/edit/${contact._id}`)}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={() => setShowConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete Contact"
          message={`Are you sure you want to delete ${contact.name}? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

export default ContactCard;