import { useForm } from "react-hook-form";

type FormValues = { username: string; email: string; channel: string };

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Batman", // Reserving some value as default
        email: data?.email, // Reserving a previously saved value as default
        channel: "", // Reserving some value as default
      };
    },
    /* NOTE: If we had no previous value to fetch we would have directly passed the object
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
    }, */
  });

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
