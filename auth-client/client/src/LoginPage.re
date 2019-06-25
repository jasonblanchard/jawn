type state = {
  didLoginSubmitFail: bool,
  isLoginSubmitting: bool
};

/* Action declaration */
type action =
  | LoginFormSubmited
  | LoginFormSubmitSucceeded
  | LoginFormSubmitFailed;

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer((state, action) => {
    switch (action) {
      | LoginFormSubmited => {isLoginSubmitting: true, didLoginSubmitFail: false }
      | LoginFormSubmitSucceeded => {...state, isLoginSubmitting: false }
      | LoginFormSubmitFailed => {didLoginSubmitFail: true, isLoginSubmitting: false }
    }
  }, { didLoginSubmitFail: false, isLoginSubmitting: false });

  let handleSubmit = (username, password) => {
    Js.log({j|Called with username: $username password $password|j});
    ignore(Js.Promise.(
      Fetch.fetchWithInit("/auth/login", Fetch.RequestInit.make(~method_=Post, ()))
      |> then_(response => {
        switch (Fetch.Response.ok(response)) {
          | true => {
            Navigation.hardLink();
            resolve();
          }
          | false => {
            dispatch(LoginFormSubmitFailed);
            resolve();
          }
        }
      })
      |> catch(error => {
        Js.log(error);
        dispatch(LoginFormSubmitFailed);
        resolve();
      })
    ));
    ();
  };

  <Layout>
    <LoginForm 
      didSubmitFail={state.didLoginSubmitFail}
      isSubmitting={state.isLoginSubmitting}
      onSubmit={handleSubmit}
    />
  </Layout>
};