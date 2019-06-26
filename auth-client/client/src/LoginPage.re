// TODO: Inject these a better way
[@bs.val] external homepagePath: string = "homepagePath";
[@bs.val] external authApiPath: string = "authApiPath";

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
    /* TODO: Pass in API path as config */
    ignore(Js.Promise.(
      Fetch.fetchWithInit(authApiPath, Fetch.RequestInit.make(~method_=Post, ()))
      |> then_(response => {
        switch (Fetch.Response.ok(response)) {
          | true => {
            /* TODO: Pass in path as config */
            Navigation.hardLink(homepagePath);
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