import { useForm } from "react-hook-form";

type FormValues = { username: string; email: string; channel: string };

const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, handleSubmit } = form;

  const submitHandler = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        {...register("username", { required: "Username is required" })}
      />
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
      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        {...register("channel", {
          required: { value: true, message: "Channel name is required" },
        })}
      />
      <button>Submit</button>
    </form>
  );
};

export default YouTubeForm;

/* noValidate attribute on form prevents browser validation and 
allows react-hook-form to handle the validation of the fields. */

/* List of validation rules supported by react-hook-form
=> required - self explanatory
=> min & max - minimum and maximum values of numerical input types
=> minLength & maxLength - minimum and maximum length of textual data (strings)
=> pattern - regex (regular expression) that the input string should match
=> validate - Is used to add custom validation. */

/* register method is used not only to bind the form inputs to the form state,
but also to apply the validation rules.
The second argument of register method is an object with validation rule.
This is how you can apply a validation rule: { required: true }
If you wish to provide an error message as well (in case of validation failing)
you can use: { required: "Username is required" }
For more on register and validation refer: https://react-hook-form.com/docs/useform/register */

/* NOTE: This: { required: "Username is required" }, and
This: { required: { value: true, message: "Username is required" }} are equivalent. */

/* Email validation regex for most practical emails:
^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$
In JavaScript regex literals must be enclosed in / (forward slashes) when defining them directly.
That is why we used:
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/ */
