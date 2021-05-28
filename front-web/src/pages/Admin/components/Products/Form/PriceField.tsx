import CurrencyInput from "react-currency-input-field";
import { Control, Controller } from "react-hook-form";
import {  FormState } from './';

type Props = {
    control: Control<FormState>
}

const PriceField = ({control}: Props) => (
    <Controller
        name="price"
        defaultValue=""
        control={control}
        rules={{ required: "Field required" }}
        render={({ value, onChange }) => (
            <CurrencyInput
                placeholder="Price"
                className="form-control  input-base"
                value={value}
                intlConfig={{ locale: 'en-UE', currency: 'EUR' }}
                onValueChange={onChange}
            />
        )}
    />
);

export default PriceField;