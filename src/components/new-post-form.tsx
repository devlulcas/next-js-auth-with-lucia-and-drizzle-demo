import { newPostServerAction } from '@/lib/posts/new-post-server-action';

export function NewPostForm() {
  return (
    <form action={newPostServerAction} method="POST">
      <h2>New post</h2>
      <div className="flex flex-col gap-2 p-4 border container">
        <div className="flex flex-col gap-2">
          <label htmlFor="content">content</label>

          <textarea
            className="p-2 text-neutral-950 bg-neutral-200"
            name="content"
            id="content"
          />
        </div>

        <button className="p-2 text-white bg-blue-500" type="submit">
          Create new post
        </button>
      </div>
    </form>
  );
}
