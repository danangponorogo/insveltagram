<script>
  import { inertia, useForm } from "@inertiajs/inertia-svelte";
  export let img = {};

  let form = useForm({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    remember: false,
  });

  const handleSubmit = () => {
    $form.post("/signup");
  };
</script>

<svelte:head>
  <title>Sign Up</title>
  <style>
    body {
      background: #fafafa;
    }
  </style>
</svelte:head>

<div class="container d-flex vh-100">
  <div class="row mx-auto">
    <div class="col align-self-center p-4">
      <div class="card rounded-3 shadow-sm p-3" style="width:400px">
        <div class="card-body">
          <center>
            <img src={img.Insveltagram} alt="Insveltagram" />
            <p class="instagram-desc">
              Sign up to see photos and videos from your friends.
            </p>
          </center>
          <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-3">
              <label for="name" class="form-label">Full Name</label>
              <input
                bind:value={$form.name}
                type="text"
                class="form-control"
                id="name"
                placeholder="John Doe"
              />
              {#if $form.errors.name}
                <small> {$form.errors.name} </small>
              {/if}
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                bind:value={$form.email}
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                autocomplete="username"
              />
              {#if $form.errors.email}
                <small> {$form.errors.email} </small>
              {/if}
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                bind:value={$form.password}
                type="password"
                class="form-control"
                id="password"
                autocomplete="new-password"
              />
              {#if $form.errors.password}
                <small> {$form.errors.password} </small>
              {/if}
            </div>
            <div class="mb-3">
              <label for="password_confirmation" class="form-label">
                Password Confirmation
              </label>
              <input
                bind:value={$form.password_confirmation}
                type="password"
                name="password_confirmation"
                class="form-control"
                id="password_confirmation"
                autocomplete="new-password"
              />
            </div>
            <div class="text-center">
              <input type="submit" class="btn btn-primary" value="Sign Up" />
            </div>
            <div class="text-center my-3 small">
              By signing up, you agree to our Terms , Data Policy and Cookies
              Policy .
            </div>
          </form>
        </div>
      </div>
      <div class="card rounded-3 shadow-sm mt-4" style="width:400px">
        <div class="card-body text-center">
          Have an account? <a use:inertia href="/login">Log in</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  small {
    color: red;
  }

  .instagram-desc {
    color: rgba(var(--f52, 142, 142, 142), 1);
    font-size: 17px;
    font-weight: 600;
    line-height: 20px;
    margin: 0 40px 10px;
    text-align: center;
  }

  a {
    text-decoration: none;
  }
</style>
