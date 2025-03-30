import YouTubeForm from "./components/YouTubeForm";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>YouTube Form</h1>
      <YouTubeForm />
    </div>
  );
};

export default App;

/* Controlled components are one with states. Any update causes re-renders.
So, when inputs are controlled by states (the default setup) with every key stroke re-render happens.
This is not good for performance.
In case of react-hook-form inputs are not controlled by state, instead they are handled by refs.
That is they are uncontrolled. As a result, re-render does not happen on every key stroke.
This improves performance. */