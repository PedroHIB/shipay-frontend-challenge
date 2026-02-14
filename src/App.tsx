import { useState, useMemo } from "react";
import { initialItems } from "./data/products";
import { useDebounce } from "./hooks/useDebounce";
import { ProductFilter, ProductList } from "./components/products";

function App() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filteredItems = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    if (!normalizedSearch) return initialItems;

    return initialItems.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearch),
    );
  }, [debouncedSearch]);

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Produtos Transacionais Shipay</h1>

        <ProductFilter value={search} onChange={setSearch} />

        <p className="results">{filteredItems.length} resultado(s)</p>

        <ProductList items={filteredItems} />
      </div>
    </div>
  );
}

export default App;
