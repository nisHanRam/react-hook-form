import { useForm } from "react-hook-form";

const YouTubeForm = () => {
  const form = useForm();
  const { register } = form;

  return (
    <form>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" {...register("username")} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />
      <label htmlFor="channel">Channel</label>
      <input type="text" id="channel" {...register("channel")} />
      <button>Submit</button>
    </form>
  );
};

export default YouTubeForm;

/* useForm() hook is used to manage form state, validation, and submission.
It returns an object that contains several properties and methods to handle forms.
Here are some important proerties and methods:
=> register(name, options?)	- Registers an input field, enabling validation and tracking.
=> handleSubmit(onSubmit) - Handles form submission and validation before executing onSubmit.
=> watch(name?) - Watches a specific input or the entire form for changes.
=> setValue(name, value) - Programmatically sets the value of an input.
=> getValues(name?) - Retrieves the current value of an input or all values.
=> reset(values?) - Resets the form fields to their initial values.
=> trigger(name?) - Manually triggers validation for an input or the entire form.
=> formState - Contains form-related states like errors, isValid, isDirty, etc.
=> control - Used with controlled components and advanced features like Controller. */

/* register helps bind the form inputs to the form state using name attribute (that is why it is must)
register(name_attribute) returns an object containing following properties:
=> name - The input's name attribute, which is used to track it in the form state.
=> ref - A reference to the DOM element (for uncontrolled inputs).
=> onChange - Event handler to update the form state when input value changes.
=> onBlur - Event handler for blur events (used for validation).*/
