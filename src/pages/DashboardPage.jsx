import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ContactCard from "../components/ContactCard";
import ContactModal from "../components/ContactModal";
import ContactsMap from "../components/ContactsMap";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import Notiflix from "notiflix";

export default function DashboardPage() {
  const { contacts, deleteContact } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    Notiflix.Confirm.init({
      titleColor: "#ff4c51",
      okButtonBackground: "#ff4c51",
      borderRadius: "8px",
    });
  }, []);

  const handleOpenModal = (mode, contact = null) => {
    setModalMode(mode);
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
  };

  const handleDeleteContact = (contactId, contactName) => {
    Notiflix.Confirm.show(
      "Hapus Kontak",
      `Apakah Anda yakin ingin menghapus kontak "${contactName}"?`,
      "Ya, Hapus",
      "Batal",
      () => {
        deleteContact(contactId);
        toast.success(`Kontak "${contactName}" berhasil dihapus.`);
      },
      () => {}
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Lokasi Kontak
      </h1>
      <div className={`relative ${isModalOpen ? "z-0" : "z-10"}`}>
        {contacts.length > 0 && <ContactsMap contacts={contacts} />}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-16 mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Daftar Kontak
        </h1>
        <button
          onClick={() => handleOpenModal("add")}
          className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow flex items-center gap-2"
        >
          <PlusCircle size={20} />
          <span>Tambah Kontak</span>
        </button>
      </div>

      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => handleOpenModal("edit", contact)}
              onDelete={() => handleDeleteContact(contact.id, contact.name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border-2 border-dashed">
          <h3 className="text-xl font-semibold text-gray-700">
            Kontak Anda Masih Kosong
          </h3>
          <p className="text-gray-500 mt-2 mb-6">
            Mari tambahkan kontak pertama Anda!
          </p>
          <button
            onClick={() => handleOpenModal("add")}
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow flex items-center gap-2 mx-auto"
          >
            <PlusCircle size={20} />
            <span>Tambah Kontak Baru</span>
          </button>
        </div>
      )}

      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        contactData={currentContact}
      />
    </div>
  );
}
