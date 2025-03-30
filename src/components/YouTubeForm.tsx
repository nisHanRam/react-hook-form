import { useForm } from "react-hook-form";

type FormValues = { username: string; email: string; channel: string };

const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submitHandler = (data: FormValues) => {
    console.log("Form submitted", data);
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
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email"
                );
              },
              notBlacklisted: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
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
            validate: (fieldValue) => {
              return (
                fieldValue !== "Microsoft" || "This channel name is reserved"
              );
            },
          })}
        />
        <p className="error">{errors?.channel?.message}</p>
      </div>

      <button>Submit</button>
    </form>
  );
};

export default YouTubeForm;

/* Custom validation is added using the validate field of the options object,i.e., the second argument of the register method.
It is a function that automatically receives the field value as an argument. [See validate for Channel input.]
Within the function you can add validation conditions and return true if the condition passes and return an error message otherwise. */

/* NOTE: Validate can also be an object with multiple key-value pairs. [See validate for Email input.] */
