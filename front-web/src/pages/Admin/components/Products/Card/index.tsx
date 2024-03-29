import ProductPrice from 'core/components/productPrice'
import { Product } from 'core/types/Products'
import { Link } from 'react-router-dom'
import './styles.scss'

type Props = {
    product: Product;
    onRevome: (productId: number) => void;
}
const Card = ({ product, onRevome }: Props) => {
    return (
        <div className="card-base product-card-admin">
            <div className="row">
                <div className="col-2  text-center border-right py-3">
                    <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="product-card-image-admin"
                    />
                </div>
                <div className="col-7 py-3">
                    <h1 className="product-card-name-admin">
                        {product.name}
                    </h1>
                    <ProductPrice price={product.price} />
                    <div>
                        {product.categories.map(category => (
                            <span
                                className="badge rounded-pill bg-secondary mr-2">
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link
                        to={`/admin/products/${product.id}`}
                        type="button"
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-3 ">
                        EDIT
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-block border-radius-10"
                        onClick={() => onRevome(product.id)}
                    >
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;