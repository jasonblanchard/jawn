type options = Js.t({
  .
  onSubmit: unit => unit
});

type formStuff = Js.t({
  .
  pristine: bool
});

[@bs.module "react-final-form-hooks"] external useForm : options => formStuff = "useForm";
let test = () => "asdf";
let useForm = useForm;