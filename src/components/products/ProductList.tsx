type Item = {
  id: number;
  name: string;
};

type Props = {
  items: Item[];
};

export default function ProductList({ items }: Props) {
  if (items.length === 0) {
    return <p className="no-results">Nenhum produto encontrado.</p>;
  }

  return (
    <ul className="product-list">
      {items.map((item) => (
        <li key={item.id} className="product-card">
          {item.name}
        </li>
      ))}
    </ul>
  );
}
