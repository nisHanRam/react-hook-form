import { useForm } from "react-hook-form";

type FormValues = { username: string; email: string; channel: string };

const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submitHandler = (data: FormValues) => {
    console.log("Form submitted", data);
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <div className="form-control">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
        />
        <p className="error">{errors?.username?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
              message: "Invalid email",
            },
          })}
        />
        <p className="error">{errors?.email?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel name is required" },
          })}
        />
        <p className="error">{errors?.channel?.message}</p>
      </div>

      <button>Submit</button>
    </form>
  );
};

export default YouTubeForm;

/* The formState object not just returns the errors field, but also returns the following:
=> isDirty – Indicates whether any of the form fields have been modified.
=> isValid – Returns true if the form is valid (i.e., passes all validation rules).
=> isSubmitting – Becomes true while the form is being submitted.
=> isSubmitted – Indicates whether the form has been submitted at least once.
=> isSubmitSuccessful – Returns true if the form submission was successful.
=> touchedFields – Tracks which fields have been touched.
=> dirtyFields – Keeps track of fields that have been modified.
=> submitCount – Counts the number of times the form has been submitted.
For more refer: https://react-hook-form.com/docs/useform/formstate */