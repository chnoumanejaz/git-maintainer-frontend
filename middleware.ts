import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_TOKEN,
  GITHUB_TOKEN,
  GITHUB_USER,
  REFRESH_TOKEN,
} from './constants';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/auth/login', '/auth/register'];

const refreshToken = async () => {
  const refreshToken = (await cookies()).get(REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/token/refresh/',
      {
        refresh: refreshToken,
      }
    );

    if (response.status === 200) {
      (await cookies()).set(ACCESS_TOKEN, response.data.access, {
        secure: true,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const isAuthenticated = async () => {
  const accessToken = (await cookies()).get(ACCESS_TOKEN)?.value;
  console.log('accessToken', accessToken);
  if (!accessToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    console.log('decodedToken', decodedToken);

    const currentTime = Date.now() / 1000;
    const tokenExpiration = decodedToken.exp;

    if (tokenExpiration && currentTime > tokenExpiration) {
      const isTokenRefreshed = await refreshToken();
      return isTokenRefreshed;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getGithubCredentials = async () => {
  try {
    const accessToken = (await cookies()).get(ACCESS_TOKEN)?.value;
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/get_github/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('User github credentials: ', response.data);
    (await cookies()).set(GITHUB_USER, response.data.github_username, {
      secure: true,
    });
    (await cookies()).set(GITHUB_TOKEN, response.data.github_token, {
      secure: true,
    });
    console.log(
      'Github Cookies set: ',
      response.data.github_username,
      response.data.github_token
    );
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError && error.response?.status === 404) {
      (await cookies()).delete(GITHUB_USER);
      (await cookies()).delete(GITHUB_TOKEN);
    }
  }
};

export default async function middleware(req: NextRequest) {
  console.log('Middleware executed');
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    await getGithubCredentials();
  }

  if (isProtectedRoute && !isUserAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  if (
    isPublicRoute &&
    isUserAuthenticated &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
