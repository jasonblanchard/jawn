[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  switch (url.path) {
    | ["login"] => <LoginPage />;
    | _ => <div>{ReasonReact.string("404")}</div>
  }
}