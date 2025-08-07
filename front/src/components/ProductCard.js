import Link from "next/link";

export default function ProductCard({ product }) {
    return (
      <div
        key={product._id}
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "1rem",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <Link href={`/products/${product._id}`}>
          <button
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#DAA520",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            View
          </button>
        </Link>
      </div>
    )
}