function Card({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-[#1B4F72]">{value}</p>
    </div>
  );
}

export default Card;
