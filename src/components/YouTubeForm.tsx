import { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: { twitter: string; facebook: string };
  phoneNumbers: string[];
  phNumbers: { number: string }[];
  age: number;
  dob: Date;
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
      age: 0,
      dob: new Date(),
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    getValues,
    setValue,
    reset,
    trigger, // Used to manually trigger validation for form fields
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const submitHandler = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
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
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
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
              disabled: true,
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
              disabled: watch("email") === "",
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
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Age is required" },
            })}
          />
          <p className="error">{errors?.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: { value: true, message: "Date of birth is required" },
            })}
          />
          <p className="error">{errors?.dob?.message}</p>
        </div>
        <button disabled={!isDirty || isSubmitting}>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={() => trigger("channel")}>
          Trigger Validate
        </button>
      </form>
    </div>
  );
};

export default YouTubeForm;

// If you wish to trigger validation for a particular field pass that as an argument to the trigger method
