import { ComponentPropsWithoutRef } from "react";

type InputProps = {
    label: string;
    id: string;
} & ComponentPropsWithoutRef<"input">;

const Input = ({ label, id, ...props }: InputProps) => {
    console.log(props);
    return (
        <p>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...props} />
        </p>
    )
}

export default Input