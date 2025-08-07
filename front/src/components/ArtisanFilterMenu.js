import { useEffect } from "react";

import styles from "../styles/ArtisanFilterMenu.module.css";

export function ArtisanFilterMenu({ filter, onFilterSubmit, setFilter }) {
  const categories = ["Woodwork"];
  const regions = ["North", "West", "South", "East"];

  const onFilterChange = (filter) => {
    const newFilter = { ...filter };

    setFilter(newFilter);
  };

  useEffect(() => {
    if (Object.keys(filter).length == 0) return;

    setFilter(filter);
  }, [filter, setFilter]);

  return (
    <div>
      <form className={styles.filterForm} onSubmit={onFilterSubmit}>
        <div>
          <input
            type="text"
            className={styles.filterInput}
            placeholder={filter.name || "Enter the name ..."}
            value={filter.name || ""}
            onChange={(e) =>
              onFilterChange({ ...filter, name: e.target.value })
            }
          />
        </div>
        <div>
          <select
            className={styles.filterInput}
            value={filter.category || ""}
            onChange={(e) =>
              onFilterChange({ ...filter, category: e.target.value })
            }
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className={styles.filterInput}
            value={filter.region || ""}
            onChange={(e) =>
              onFilterChange({ ...filter, region: e.target.value })
            }
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.filterButton}>
          Apply Filters
        </button>
      </form>
    </div>
  );
}
