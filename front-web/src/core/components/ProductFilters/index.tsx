import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { makeRequest } from 'core/utils/request';
import { Category } from 'core/types/Products';

type Props = {
  name?: string;
  handleChangeName: (name: string) => void;
  handleChangeCategory: (category: Category) => void;
  clearFilters: () => void;
  category?: Category;
}

const ProductFilters = ({ 
    name,
    handleChangeName,
    handleChangeCategory,
    clearFilters,
    category
}: Props) => {
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setIsLoadingCategories(true)
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

  
    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className="form-control "
                    placeholder="Search Product"
                    onChange={event => handleChangeName(event.target.value)}
                />

                <SearchIcon />
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                value={category}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                placeholder="Categories"
                inputId="categories"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button className="btn btn-outline-secondary border-radius-10"
            onClick={clearFilters}
            >
                CLEAR FILTERS
                
            </button>
        </div>
    )
}

export default ProductFilters;