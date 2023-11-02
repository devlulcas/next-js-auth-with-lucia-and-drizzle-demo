import { Form } from '@/components/form';
import { ListPosts } from '@/components/list-posts';
import { NewPostForm } from '@/components/new-post-form';
import { handlePageAuthRequest } from '@/lib/auth/handle-auth-request';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const authRequest = handlePageAuthRequest();

  const session = await authRequest.validate();

  if (!session) redirect('/login');

  return (
    <main className="border-neutral-400 p-6 rounded flex flex-col gap-6 container">
      <div className="flex gap-2 px-3 py-2 border justify-center items-center w-full h-full bg-gray-100">
        <p>{session.user.username} is signed in</p>

        <Form action="/api/logout">
          <button className="p-2 text-white bg-red-500" type="submit">
            Sign out
          </button>
        </Form>
      </div>

      <hr />

      <NewPostForm />

      <hr />

      <ListPosts />
    </main>
  );
}
