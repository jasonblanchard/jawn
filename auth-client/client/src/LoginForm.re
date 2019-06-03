[@react.component]
let make = () => {
  let options = [%bs.obj {
    onSubmit: () => Js.log("Submitted")
  }];
  let form = Forms.useForm(options);
  Js.log(form##pristine);

  <form>
    <div>
      <label htmlFor="username">
        {ReasonReact.string("Username")}
      </label>
      <input id="username" />
    </div>
    <div>
      <label htmlFor="password">
        {ReasonReact.string("Password")}
      </label>
      <input id="password" />
    </div>
  </form>
};