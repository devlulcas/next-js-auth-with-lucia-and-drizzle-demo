import { auth } from '@/lib/auth/lucia';
import { validateAuthFormData } from '@/lib/auth/validate-auth-form-data';
import { LuciaError } from 'lucia';
import * as context from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  const formDataResult = validateAuthFormData(formData);

  if (!formDataResult.data) {
    return NextResponse.json({ error: formDataResult.error }, { status: 400 });
  }

  const { username, password } = formDataResult.data;

  try {
    // find user by key
    // and validate password
    const key = await auth.useKey('username', username.toLowerCase(), password);

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(request.method, context);

    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/', // redirect to profile page
      },
    });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === 'AUTH_INVALID_KEY_ID' ||
        e.message === 'AUTH_INVALID_PASSWORD')
    ) {
      // user does not exist or invalid password
      return NextResponse.json(
        { error: 'Incorrect username or password' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
};
