import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
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
    const { register, handleSubmit } = useForm<FormState>();
   
    const onSubmit = (data: FormState) => {
       makePrivateRequest({ url: '/products', method: 'POST', data });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="Register a product">
                <div className="row">
                    <div className="col-6">
                        <input
                            {...register({ required: "Field required" })}
                            name="name"
                            type="text"
                            className="form-control margin-botton-30 input-base"
                            placeholder="Product name"
                        />

                        <input
                            {...register({ required: "Field required" })}
                            name="price"
                            type="number"
                            className="form-control margin-botton-30 input-base"
                            placeholder="Price"
                        />

                        <input
                            {...register({ required: "Field required" })}
                            name="imageUrl"
                            type="text"
                            className="form-control margin-botton-30 input-base"
                            placeholder="Product image"
                        />
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
                    </div>
                </div>
            </ BaseForm>
        </form>
    )
}
export default Form;