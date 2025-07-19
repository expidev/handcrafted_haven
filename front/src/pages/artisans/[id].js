import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ArtisanDetails = () => {
	// const router = useRouter();
	// const { id } = router.query;
	// const [artisan, setArtisan] = useState(null);

	// useEffect(() => {
	// 	if (id) {
	// 		// Fetch artisan details from an API or database
	// 		fetch(`/api/artisans/${id}`)
	// 			.then((response) => response.json())
	// 			.then((data) => setArtisan(data))
	// 			.catch((error) => console.error('Error fetching artisan details:', error));
	// 	}
	// }, [id]);

	// return (
	// 	<div>
	// 		<h1>{artisan.name}</h1>
	// 		<p>{artisan.description}</p>
	// 		<h2>Products</h2>
	// 		<ul>
	// 			{artisan.products.map((product) => (
	// 				<li key={product.id}>{product.name}</li>
	// 			))}
	// 		</ul>
	// 	</div>
	// );
};

export default ArtisanDetails;