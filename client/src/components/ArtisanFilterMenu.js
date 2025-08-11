
import styles from "../styles/ArtisanFilterMenu.module.css";

export function ArtisanFilterMenu({filter, onFilterSubmit, setFilter}) {

	const onFilterChange = (e) => {
		e.preventDefault();
		const newFilter = {
			...filter,
			[e.target.name]: e.target.value,
		};
		setFilter(newFilter);
	}

	return (
		<div>
			<form className={styles.filterForm}>
				<div>
					<input 
						type="text"
						className={styles.filterInput}
						placeholder={filter.name || "Enter the name ..."}
						value={filter.name || ""}
						onChange={(e) => onFilterChange(
							{ ...filter, name: e.target.value }
						)}
					/>
				</div>
				<div>
					<select 
						className={styles.filterInput}
						value={filter.category || "" } 
						onChange={(e) => onFilterChange(
							{ ...filter, category: e.target.value }
						)}
					>
						<option value="">All Categories</option>
						{filter.categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
				<div>
					<select 
						className={styles.filterInput}
						value={filter.region || "" } 
						onChange={(e) => onFilterChange(
							{ ...filter, region: e.target.value }
						)}
					>
						<option value="">All Regions</option>
						{filter.regions.map((region) => (
							<option key={region} value={region}>
								{region}
							</option>
						))}
					</select>
				</div>
				<button 
					type="submit" 
					className={styles.filterButton}
					onSubmit={onFilterSubmit}
				>
					Apply Filters
				</button>
			</form>
		</div>
	);
}
