import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: { twitter: string; facebook: string };
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },
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

      <div className="form-control">
        <label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter", { required: true })}
        />
      </div>

      <div className="form-control">
        <label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook", { required: true })}
        />
      </div>

      <button>Submit</button>
    </form>
  );
};

export default YouTubeForm;

// If you want to group some inputs into an object (may be because the API accepts the data in such format) you can make use of nested object.