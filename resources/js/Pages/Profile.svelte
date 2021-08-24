<script>
  import Head from "./component/Head.svelte";
  import Navgram from "./component/Navgram.svelte";
  import VerifyEmail from "./component/VerifyEmail.svelte";
  import Svg from "./component/Svg.svelte";
  import Posts from "./component/Posts.svelte";

  import { inertia, useForm } from "@inertiajs/inertia-svelte";
  export let img,
    user,
    auth,
    form = useForm();

  const handleSubmit = (status = "following") => {
    switch (status) {
      case "unfollow":
        $form.post(`/follow/${user.id}?_method=delete`);
        break;

      default:
        $form.post(`/follow/${user.id}`);
    }
  };
</script>

<Head {user} />

<Navgram {img} {user} {auth} />

{#if user.email_verified_at === null}
  <VerifyEmail />
{:else}
  <div class="container mt-5 col-10">
    <div class="row pt-5 align-items-center g-3">
      <div class="col text-center">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="link-menu">
          <img
            src={user.avatar}
            alt="..."
            width="300px"
            class="img-thumbnail rounded-circle"
          />
        </a>
      </div>
      <div class="col">
        <div class="d-flex">
          <h2>{user.username}</h2>
          {#if user.username == user.auth}
            <div class="ms-2">
              <a
                use:inertia
                class="btn btn-secondary"
                href="/accounts/edit/"
                tabindex="0">Edit&nbsp;Profile</a
              >
            </div>
            <div class="ms-2">
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a href="#">
                <Svg label="options" />
              </a>
            </div>
          {:else}
            <div class="ms-2">
              {#if auth.isFollowings}
                <form on:submit|preventDefault={() => handleSubmit("unfollow")}>
                  <button
                    type="submit"
                    class="btn btn-primary ms-3"
                    tabindex="0"
                  >
                    Unfollow
                  </button>
                </form>
              {:else}
                <form on:submit|preventDefault={handleSubmit}>
                  <button
                    type="submit"
                    class="btn btn-primary ms-3"
                    tabindex="0"
                  >
                    Follow
                  </button>
                </form>
              {/if}
            </div>
          {/if}
        </div>

        <ul class="d-flex justify-content-between col-md-8 list-unstyled">
          <li>{user.posts.length} post</li>
          <li>
            <a
              class="text-decoration-none text-dark"
              href="/danang_dismantoro/followers/"
              tabindex="0"
            >
              <span title={user.followers}>
                {user.followers}
              </span>
              followers
            </a>
          </li>
          <li>
            <a
              class="text-decoration-none text-dark"
              href="/danang_dismantoro/following/"
              tabindex="0"
            >
              <span title={user.followings}>
                {user.followings}
              </span>
              following
            </a>
          </li>
        </ul>
        <p>{user.details}</p>
      </div>
    </div>
  </div>

  <div
    class="container mt-3 col-10 border-top p-3 d-flex justify-content-between"
  >
    <a role="tab" href="/danang_dismantoro/" tabindex="0">
      <Svg label="posts" active={true} />
    </a>
    <a role="tab" href="/danang_dismantoro/channel/" tabindex="0">
      <Svg label="channel" active={false} />
    </a>
    <a role="tab" href="/danang_dismantoro/saved/" tabindex="0">
      <Svg label="saved" active={false} />
    </a>
    <a role="tab" href="/danang_dismantoro/tagged/" tabindex="0">
      <Svg label="tagged" active={false} />
    </a>
  </div>

  <section class="p-3">
    <div class="container col-11">
      <div class="row text-center g-4">
        {#if user.posts}
          {#each user.posts as post}
            <Posts {post} />
          {/each}
        {/if}
      </div>
    </div>
  </section>
{/if}
