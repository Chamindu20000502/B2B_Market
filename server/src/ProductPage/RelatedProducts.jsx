import ProductCard from "./ProductCard";

export default function RelatedProducts()
{
    return(
        <div>
            <h2>Realted Products</h2>
            <div style={{display:'flex',gap:'0.5rem',marginLeft:'3rem',marginTop:'1rem'}}>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    );
}
