import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import MapPicker from "./MapPicker";
import Loader from "../components/Loader";

export default function ContactModal({ isOpen, onClose, mode, contactData }) {
  const { addContact, updateContact } = useAuth();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && mode === "edit" && contactData) {
      setFormData({
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email,
      });
      setPhotoPreview(contactData.photo);
      setLocation(contactData.location);
    } else {
      setFormData({ name: "", phone: "", email: "" });
      setPhotoFile(null);
      setPhotoPreview(null);
      setLocation(null);
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen, mode, contactData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: "Ukuran file maksimal 1MB." }));
      return;
    }
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      if (errors.photo) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.photo;
          return newErrors;
        });
      }
    }
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Nama tidak boleh mengandung angka.";
    }
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi.";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telepon wajib diisi.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Telepon hanya boleh berisi angka.";
    }
    if (!photoPreview) newErrors.photo = "Foto profil wajib diunggah.";
    if (!location) newErrors.location = "Lokasi wajib dipilih pada peta.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Periksa kembali isian anda");
      return;
    }

    setIsLoading(true);

    if (!validateForm()) return;
    const contactPayload = { ...formData, photo: photoPreview, location };
    if (mode === "add") {
      addContact(contactPayload);
      toast.success("Kontak baru berhasil ditambahkan!");
    } else {
      updateContact({ ...contactPayload, id: contactData.id });
      toast.success("Kontak berhasil diperbarui!");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {isLoading && <Loader>Menyimpan data...</Loader>}
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === "add" ? "Tambah Kontak Baru" : "Edit Kontak"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 items-center">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full border rounded-md shadow-sm p-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 items-center">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Telepon
              </label>
              <div className="sm:col-span-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`block w-full border rounded-md shadow-sm p-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 items-center">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="sm:col-span-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full border rounded-md shadow-sm p-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 items-start pt-2">
              <label className="text-sm font-medium text-gray-700 pt-2">
                Foto Profil
              </label>
              <div className="sm:col-span-2">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-white flex-shrink-0">
                    <img
                      src={
                        photoPreview ||
                        "https://placehold.co/100x100/e2e8f0/a0aec0?text=Preview"
                      }
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 items-start">
              <label className="text-sm font-medium text-gray-700 pt-2">
                Lokasi
              </label>
              <div className="sm:col-span-2">
                <div className="h-64 w-full rounded-lg overflow-hidden">
                  <MapPicker
                    initialPosition={location}
                    onLocationChange={handleLocationChange}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
            </div>

            <div className="pt-5 mt-6 flex justify-end gap-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === "add" ? "Simpan" : "Perbarui"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
