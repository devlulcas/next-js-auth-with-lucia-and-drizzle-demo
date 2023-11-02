import { auth } from '@/lib/auth/lucia';
import { validateAuthFormData } from '@/lib/auth/validate-auth-form-data';
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
    const user = await auth.createUser({
      key: {
        providerId: 'username', // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
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
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
};
