import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Category } from 'core/types/Products';
import PriceField from './PriceField';

export type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Edit Product' : 'Register Product'

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('categories', response.data.categories)
                })
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data
        })
            .then(() => {
                toast.info('Product registered successfuly!')
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Error registering product!')
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm
                title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-botton-30">
                            <input
                                {...register({
                                    required: "Field required",
                                    minLength: { value: 5, message: 'It must contain at least 5 characteries!' },
                                    maxLength: { value: 60, message: 'It must contain maximum 60 characteries!' },

                                })}
                                name="name"
                                type="text"
                                className="form-control  input-base"
                                placeholder="Product name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-botton-30">
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingCategories}
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                classNamePrefix="categories-select"
                                placeholder="Categories"
                                inputId="categories"
                                defaultValue=""
                                isMulti
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                   Field Required
                                </div>
                            )}
                        </div>

                        <div className="margin-botton-30">
                           <PriceField control={control} />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-botton-30">
                            <input
                                {...register({ required: "Field required" })}
                                name="imgUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Product image"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea
                            {...register({ required: "Field required" })}
                            name="description"
                            className="form-control input-base"
                            placeholder="Description"
                            cols={30}
                            rows={10}
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </ BaseForm>
        </form>
    )
}
export default Form;