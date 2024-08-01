import { ValidationError } from "yup";

import { AuthErrors } from "~/types";

export const createErrorObj = (error: ValidationError): AuthErrors => {
  const errors: AuthErrors =  {};
  
  error.inner.forEach((validationError) => {
    validationError.path && // checking if validationError.path exists
      (errors[validationError.path as keyof AuthErrors] =
        validationError.message);
  });

  return errors;
}

// export const isAuthenticated = async (
//   request: Request
// ): Promise<{
//   user: User | null;
//   token: string | null;
//   isLoggedIn: boolean;
// }> => {
//   try {
//     const sessionId = await getUserSessionKey(request);
//     if (!sessionId) return { user: null, token: null, isLoggedIn: false };

//     // lock the key of redis token
//     const tokens = await sessionManager.getSession(sessionId);

//     if (!tokens) {
//       return { user: null, token: null, isLoggedIn: false };
//     }

//     let token = null;

//     const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } =
//       tokens;

//     token = oldAccessToken;

//     const expired = isTokenExpired(oldAccessToken);

//     if (expired) {
//       const authResponse: AuthenticationData =
//         await refreshToken(oldRefreshToken);

//       const newAccessToken = authResponse.access_token!;
//       const newRefreshToken = authResponse.refresh_token!;

//       token = newAccessToken;

//       await sessionManager.updateTokens(sessionId, {
//         accessToken: newAccessToken,
//         refreshToken: newRefreshToken
//       });
//     }

//     directus.setToken(token);

//     const userMinimal = await getUserByTokenMinimal(token);

//     if (typeof userMinimal === 'boolean') {
//       return { user: null, token: null, isLoggedIn: false };
//     }

//     const user = (await customReadMe(userMinimal.id)) as unknown as User;
//     if (!user?.email) return { user: null, token: null, isLoggedIn: false };
//     return { user, token, isLoggedIn: true };
//   } catch (e: any) {
//     console.log(e);
//     return { user: null, token: null, isLoggedIn: false };
//   }
// };
