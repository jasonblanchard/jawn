// TODO: Move somewhere else
let validate = (fields) => {
  let results = Js.Dict.empty();

  switch (Js.Dict.get(fields, "username")) {
    | None | Some("") => Js.Dict.set(results, "username", "Can't be empty")
    | Some(value) => Js.log(value)
  };

  results;
};

[@react.component]
let make = () => {
  let onSubmit = (values) => {
    switch(values) {
      | None => Js.log("Invalid")
      | Some(values) => {
        let username = Js.Dict.get(values, "username");
        let password = Js.Dict.get(values, "password");
        Js.log({j|Called with username: $username password $password|j});
      }
    }
  };

  let { Forms.pristine, handleSubmit, form } = Forms.useForm(~onSubmit=onSubmit, ~validate=validate, ());

  let username = Forms.useField("username", form);
  let password = Forms.useField("password", form);

  let usernameErrorMessage =
    switch (username.meta.touched, username.meta.valid) {
    | (true, false) => ReasonReact.string("Need to supply username")
    | (false, _) => ReasonReact.null
    | (true, true) => ReasonReact.null
  };

  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor={username.input.name}>
        {usernameErrorMessage}
        <br />
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