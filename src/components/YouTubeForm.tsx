import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

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
  });

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const submitHandler = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const handleGetValues = () => {
    console.log("Get values: ", getValues());
    // If you want to get only one field, pass that as an argument.
    // If you want to get more than one field, pass an array containing them as argument.
  };

  const handleSetValue = () => {
    setValue("username", "Batman", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    }); // Takes 3 arguments: field-name, value you want to set for that field, and an options object
  };

  // const watchUsername = watch("username"); // This is used to observe an form input field
  // const watchFields = watch(["username", "email"]); // Pass an array if you wish to watch more than one fields
  // const watchForm = watch(); // If you wish to watch the entire form

  useEffect(() => {
    // This is a subscription to changes in the form values
    const subscription = watch((value) => {
      // The callback function receives the updated value as an argument
      console.log(value);
    });
    return () => {
      subscription.unsubscribe();
    }; // Unsubscribing to watch in the cleanup function
  }, [watch]); // Make sure to pass watch as a dependency

  return (
    <div>
      {/* <h2>Watched Value: {JSON.stringify(watchForm)}</h2> */}
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

        <button>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
      </form>
    </div>
  );
};

export default YouTubeForm;

/* getValues is another method to read field values.
getValues does not cause re-renders or subscribe to input changes.
Thus, it is a more better option to get form values when user 
performs some action, for example clicking a button.
Here, note that changing a field value will not trigger getValue. */

/* Calling setValue does not affect the state of the field such as 
dirty, touched or validation. If we want to change the field state
as ig the user is interacting, we need pass a third argument. 
It is an options object as shown above. */
