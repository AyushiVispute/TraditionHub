export default function ToiSlider({ toi, value, onChange }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      <div className="w-40 flex items-center gap-2 shrink-0">
        {toi.icon && <span className="text-xl">{toi.icon}</span>}
        <span className="font-medium text-gray-800">{toi.name}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(toi.slug, Number(e.target.value))}
        className="flex-1 accent-orange-500"
      />
      <span className="w-8 text-right font-semibold text-orange-600">{value}</span>
    </div>
  );
}