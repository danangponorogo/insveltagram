<script>
  import { useForm } from "@inertiajs/inertia-svelte";

  let form = useForm();

  const handleSubmit = () => {
    $form.post("/verify-email");
  };
</script>

<div class="container mt-5 col-10">
  <div class="row pt-5 justify-content-center align-items-center g-3">
    <div class="col-8 text-center">
      <p>
        You have to <b>VERIFY YOUR ACCOUNT</b> to be able to change your profile
        and post messages.<br />
        Please verify your Account
        <b>BY CLICKING THE LINK WE ALREADY SENT TO YOUR EMAIL</b>.
        <br />
        If You don't see it then please click button below to resend the email verification.
      </p>
      <button on:click={() => handleSubmit("verify")} type="submit">
        Resend Verification
      </button>
    </div>
  </div>
</div>
