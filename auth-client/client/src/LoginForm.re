[@react.component]
let make = () => {
  let onSubmit = () => Js.log("Submitted")
  let { Forms.pristine, handleSubmit, form } = Forms.useForm(~onSubmit=onSubmit);

  let username = Forms.useField("username", form);
  let password = Forms.useField("password", form);

  let touched = username.meta.touched;
  Js.log({j| username is touched: $touched |j});

  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor={username.input.name}>
        {ReasonReact.string("Username")}
      </label>
      <input
        name={username.input.name}
        value={username.input.value}
        onChange={username.input.onChange}
        onBlur={username.input.onBlur}
        onFocus={username.input.onFocus}
        id={username.input.name}
      />
    </div>
    <div>
      <label htmlFor={password.input.name}>
        {ReasonReact.string("password")}
      </label>
      <input
        name={password.input.name}
        value={password.input.value}
        onChange={password.input.onChange}
        onBlur={password.input.onBlur}
        onFocus={password.input.onFocus}
        id={password.input.name}
        type_="password"
      />
    </div>
    <button disabled={pristine}>{ReasonReact.string("login")}</button>
  </form>
};