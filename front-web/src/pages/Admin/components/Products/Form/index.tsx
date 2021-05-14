import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setformData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setformData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://cdn.vox-cdn.com/thumbor/OUmughYf4RVdlK2Qgpfee9evOP4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22015056/jbareham_201022_ply1040_ps5_lead_0002.jpg',
            categories: [{ id: formData.category }]
        }
        makePrivateRequest({ url: '/products', method: 'POST', data: payload })
            .then(() => {
                setformData({ name: '', category: '', price: '', description: '' });
            });
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">

                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do Product"
                        />
                        <select value={formData.category}
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            name="category">
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletronics</option>
                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="preco"
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30}
                            rows={10}
                        >
                        </textarea>
                    </div>
                </div>
            </ BaseForm>
        </form>
    )
}
export default Form;