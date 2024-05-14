import { Props, User } from "@/utils/type";
import { ChangeEvent } from "react";

export default function Input({
  type,
  field,
  placeholder,
  input,
  setInput,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInput((i: User) => ({
      ...i,
      [field]: e.target.value,
    }));
  }

  return (
    <div className="my-3">
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-sm text-black outline-none"
        onChange={handleChange}
        value={input}
        required
      />
    </div>
  );
}
