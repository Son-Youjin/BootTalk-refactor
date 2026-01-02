interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  helpText?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  helpText,
}) => {
  return (
    <div className="space-y-2">
      <select
        className={`select ${className || ""}`}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {placeholder || "선택해주세요"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
  );
};

export default FormSelect;
