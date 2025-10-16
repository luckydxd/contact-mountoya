import { Pencil, Trash2, Phone, Mail, MapPin } from "lucide-react";

export default function ContactCard({ contact, onEdit, onDelete }) {
  const { name, email, phone, photo, location } = contact;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div className="relative">
        <img
          src="/images/cover.png"
          alt="Contact card banner"
          className="w-full h-28 object-cover"
        />

        <div className="absolute top-16 left-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={onEdit}
            className="bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-white p-2 rounded-full transition-colors"
            aria-label="Edit Kontak"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={onDelete}
            className="bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-white p-2 rounded-full transition-colors"
            aria-label="Hapus Kontak"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>

        <div className="mt-6 space-y-4 text-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Phone size={18} className="text-green-400" />
            </div>
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Mail size={18} className="text-blue-400" />
            </div>
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <MapPin size={18} className="text-yellow-400" />
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Lihat di Peta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
