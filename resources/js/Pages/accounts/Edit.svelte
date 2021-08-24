<script>
  import Head from "../component/Head.svelte";
  import Navgram from "../component/Navgram.svelte";
  export let user, img, auth;

  import { useForm } from "@inertiajs/inertia-svelte";

  let form = useForm({
    details: user.details,
    avatar: user.avatar,
  });

  const submit = () => {
    $form.post("/accounts/edit");
  };

  const setAvatar = (e) => {
    $form.avatar = e.target.files[0];
  };
</script>

<Head {user} />

<Navgram {img} {user} {auth} />

<div class="container mt-5 mb-4 col-10">
  <div class="row pt-5 justify-content-center">
    <div class="col-10">
      <div class="card bg-white">
        <div class="card-body">
          <h1 class="card-title mb-3 text-center">Update Your Details</h1>
          <form on:submit|preventDefault={submit}>
            <div class="mb-3">
              <label for="details" class="form-label">Bio</label>
              <textarea
                bind:value={$form.details}
                class="form-control"
                id="details"
                rows="4"
                placeholder="Your Bio Comes Here"
              />
            </div>
            <div class="mb-3">
              {#if user.avatar}
                <div>
                  <img
                    src={user.avatar}
                    width="250px"
                    class="my-3 img-thumbnail"
                    alt=""
                    title={user.avatar}
                  />
                </div>
              {/if}
              <label for="fileUpload" class="form-label">
                Upload Your Profile Photo
              </label>
              <input
                on:change={setAvatar}
                type="file"
                class="form-control"
                id="fileUpload"
                placeholder="File Upload"
              />
              {#if $form.progress}
                <progress value={$form.progress.percentage} max="100">
                  {$form.progress.percentage}%
                </progress>
              {/if}
            </div>
            <div class="text-center">
              <input type="submit" class="btn btn-primary" value="Update" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
