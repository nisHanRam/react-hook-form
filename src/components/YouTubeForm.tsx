import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: { twitter: string; facebook: string };
  phoneNumbers: string[];
  phNumbers: { number: string }[]; // We are using an array of objects, instead of array of strings, because useFieldArray works with only object values.
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
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

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
          {...register("social.twitter", {
            required: "Please provide twitter profile",
          })}
        />
        <p className="error">{errors?.social?.twitter?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook", {
            required: "Please provide facebook profile",
          })}
        />
        <p className="error">{errors?.social?.facebook?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="primary-phone">Primary Phone Number</label>
        <input
          type="text"
          id="primary-phone"
          {...register("phoneNumbers.0", {
            required: "Please provide primary phone number",
          })}
        />
        <p className="error">{errors?.phoneNumbers?.[0]?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="secondary-phone">Secondary Phone Number</label>
        <input
          type="text"
          id="secondary-phone"
          {...register("phoneNumbers.1", {
            required: "Please provide secondary phone number",
          })}
        />
        <p className="error">{errors?.phoneNumbers?.[1]?.message}</p>
      </div>

      <div>
        <label htmlFor="">List of phone numbers</label>
        <div>
          {fields.map((field, index) => (
            <div className="form-control" key={field.id}>
              <input type="text" {...register(`phNumbers.${index}.number`)} />
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => append({ number: "" })}>
            Add phone number
          </button>
        </div>
      </div>

      <button>Submit</button>
    </form>
  );
};

export default YouTubeForm;

// For more on useFieldArray: https://react-hook-form.com/docs/usefieldarray
