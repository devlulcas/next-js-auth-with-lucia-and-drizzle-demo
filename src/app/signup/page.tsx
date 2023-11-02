import { Form } from '@/components/form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-2 h-fit items-center">
      <h1>Sign up</h1>
      <Form action="/api/signup">
        <div className="flex flex-col gap-2 p-4 border container">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="p-2 text-neutral-950 bg-neutral-200"
              name="username"
              id="username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="p-2 text-neutral-950 bg-neutral-200"
              type="password"
              name="password"
              id="password"
            />
          </div>

          <button className="p-2 text-white bg-blue-500" type="submit">
            Sign up
          </button>
        </div>
      </Form>

      <Link className="text-blue-500" href="/login">
        Sign in
      </Link>
    </div>
  );
}
