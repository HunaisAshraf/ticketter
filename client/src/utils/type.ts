export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type Props = {
  type: "text" | "number" | "email" | "password";
  field: "name" | "email" | "phone" | "password";
  placeholder: string;
  input: string;
  setInput: SetStateType<User>;
};

export type User = {
  name?: string;
  email: string;
  phone?: string;
  password: string;
};
