import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInputs {
  TextField: string;
  MyCheckbox: boolean;
}

export default function Form() {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      MyCheckbox: false,
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="MyCheckbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <input type="checkbox" {...field} />}
      />
      <input type="submit" />
    </form>
  );
}
