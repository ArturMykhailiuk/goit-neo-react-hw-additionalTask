import { useSelector, useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { useState, useEffect } from "react";
import { selectContacts } from "../../redux/contacts/selectors";
import css from "./Contact.module.css";
import phonesvg from "../../assets/phone.svg";
import contactsvg from "../../assets/contact.svg";
import Modal from "../Modal/Modal";

const Contact = ({ id }) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) =>
    selectContacts(state).find((contact) => contact.id === id)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(contactToDelete.id));
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  const [contactToEdit, setContactToEdit] = useState(null);
  const [name, setName] = useState(contact.name);
  const [number, setPhone] = useState(contact.number);

  useEffect(() => {
    setName(name);
    setPhone(number);
  }, [name, number]);

  const handleEditClick = (contact) => {
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

  const handleConfirmUpdate = () => {
    dispatch(
      updateContact({ id: contactToEdit.id, updates: { name, number } })
    );

    setContactToEdit(null);
    setIsModalOpen(false);
  };

  const handleCloseEditForm = () => {
    setContactToEdit(null);
  };

  if (!contact) {
    return null;
  }

  return (
    <div>
      {contactToDelete && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        >
          <p className={css.modal}> Are you sure you want to delete</p>
          <p className={css.modalContactName}>
            {contactToDelete && contactToDelete.name}?
          </p>
        </Modal>
      )}
      {contactToEdit ? (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseEditForm}
          onConfirm={handleConfirmUpdate}
        >
          <label className={css.editLabel}>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className={css.editLabel}>
            Phone
            <input
              type="tel"
              value={number}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </Modal>
      ) : (
        <>
          <li key={id} className={css.contact}>
            <div className={css.contactInfo}>
              <div className={css.flexRow}>
                <img src={contactsvg} alt={name} className={css.iconName} />
                <span className={css.contactSpan}>{name}</span>
              </div>
              <div className={css.flexRow}>
                <img
                  src={phonesvg}
                  alt={contact.name}
                  className={css.iconNum}
                />
                <span className={css.contactSpan}>{number}</span>
              </div>
            </div>
            <div className={css.actions}>
              <button
                onClick={() => handleDeleteClick(contact)}
                className={css.deleteBtn}
              >
                Delete
              </button>
              <button
                onClick={() => handleEditClick(contact)}
                className={css.editBtn}
              >
                Edit
              </button>
            </div>
          </li>
        </>
      )}
    </div>
  );
};

export default Contact;
