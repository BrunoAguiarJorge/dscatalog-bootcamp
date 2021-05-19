import { makePrivateRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ url: '/products', method: 'POST', data });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="Register a product">
                <div className="row">
                    <div className="col-6">
                        <div className="margin-botton-30">
                            <input
                                {...register({
                                    required: "Field required",
                                    minLength: { value: 5, message: 'It must contain at least 5 characteries!'},
                                    maxLength: { value: 60, message: 'It must contain maximum 60 characteries!'},

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
                                name="imageUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Product image"
                            />
                            {errors.imageUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imageUrl.message}
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