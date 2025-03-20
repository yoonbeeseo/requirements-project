import React, { Ref } from "react";

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  ref: Ref<HTMLInputElement | HTMLSelectElement>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  isSelectTag?: boolean;
  data?: string[];
}

const TextInput = ({
  id,
  label,
  onChange,
  isSelectTag,
  ref,
  value,
  data,
  placeholder,
  type,
}: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {isSelectTag ? (
        <select
          id={id}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          ref={ref as Ref<HTMLSelectElement>}
        >
          <option>{placeholder ?? "선택"}</option>
          {data?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          ref={ref as Ref<HTMLInputElement>}
          type={type ?? "text"}
        />
      )}
    </div>
  );
};

export default TextInput;
