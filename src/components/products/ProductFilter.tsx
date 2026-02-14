type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductFilter({ value, onChange }: Props) {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Digite para filtrar produtos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter-input"
      />
    </div>
  );
}
