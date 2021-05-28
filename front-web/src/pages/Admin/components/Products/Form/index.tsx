import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import './styles.scss';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Edit Product' : 'Register Product'

    useEffect(() => {
        if (isEditing ) {
        makeRequest({ url: `/products/${productId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('description', response.data.description);
                setValue('imgUrl', response.data.imgUrl);
            })
        }
    }, [productId, isEditing, setValue]);

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
                            <input
                                {...register({ required: "Field required" })}
                                name="price"
                                type="number"
                                className="form-control  input-base"
                                placeholder="Price"
                            />
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