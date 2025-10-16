export default function Loader({ children }) {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      {children && (
        <div className="mt-4 text-gray-700 font-semibold">{children}</div>
      )}
    </div>
  );
}
