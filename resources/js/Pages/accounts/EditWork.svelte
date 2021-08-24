<script>
  import Head from "../component/Head.svelte";
  import Navgram from "../component/Navgram.svelte";
  export let user, img;

  import { useForm } from "@inertiajs/inertia-svelte";

  let form = useForm({
    details: null,
    avatar: null,
  });

  const submit = () => {
    $form.post("/accounts/edit");
  };

  // let avatar = null;

  // const upload = (file) => {
  //   fetch("http://localhost:3333/accounts/edit", {
  //     method: "POST",
  //     body: file,
  //   })
  //     .then(
  //       (response) => response.json()
  //     )
  //     .then(
  //       (success) => console.log(success)
  //     )
  //     .catch(
  //       (error) => console.log(error)
  //     );
  // };

  // const onSelectFile = () => upload(avatar);

  const setAvatar = (e) => {
    $form.avatar = e.target.files[0];
    console.log("e", e.target.files[0]);
    console.log("$form.avatar", $form.avatar);
  };
</script>

<Head {user} />

<Navgram {img} />

<!--
  <div class="container mt-5 col-10">
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
              <label for="fileUpload" class="form-label">
                Upload Your Profile Photo
              </label>
              <input
                bind:value={$form.avatar}
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
-->

<div class="container mt-5 col-10">
  <div class="row pt-5 justify-content-center">
    <div class="col-10">
      <div class="card bg-white">
        <div class="card-body">
          <!-- <input type="file" on:change={submit} bind:value={$form.avatar} /> -->
          <form on:submit|preventDefault={submit}>
            <input type="text" bind:value={$form.details} />
            <input
              type="file"
              on:change={setAvatar}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
