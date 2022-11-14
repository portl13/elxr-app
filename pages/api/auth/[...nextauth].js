import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
const url = process.env.baseUrl + "/wp-json/jwt-auth/v1/token";

const errMsj = `The email or password you entered is incorrect. Lost your password?`
/* TODO: que necesito del usuario
*   - token
*   - id
*   - avatar_urls
*   - display_name
*   - roles
*   - email
*   - mention_name
*   - color
*   - name
*   - displayName
*   - user_login
* */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Custom Login",
      credentials: {
        email: { label: "correo", type: "text", placeholder: "correo" },
        password: {
          label: "password",
          type: "password",
          placeholder: "contasena",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        let user = null
        try {
          const {data} = await axios.post(url, { username: email, password });
          const resUser = data.data

          user = {
            id : resUser.id,
            token: resUser.token,
            avatar_urls: '',
            color: resUser.color,
            display_name: resUser.displayName,
            roles: resUser.roles,
            email: resUser.email,
            mention_name: resUser.firstName,
            name: resUser.firstName,
            displayName: resUser.displayName,
            rol: resUser.rol,
            profile_name: `${resUser.firstName} ${resUser.lastName}`
          }

        } catch (e) {
          if (axios.isAxiosError(e)) {
            if (e.response?.data) {
              const errorObject = e.response?.data
              switch (errorObject.code) {
                case 'incorrect_password':
                  throw new Error(errMsj)
                case 'invalid_email':
                  throw new Error(errorObject.message)
                case 'bp_account_not_activated':
                  throw new Error('bp_account_not_activated')
                default:
                  throw new Error(errMsj)
              }
            }
          }
          throw new Error(errMsj);
        }



        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    maxAge: 172800,
    strategy: "jwt",
    updateAge: 172800,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = session.access_token;
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account }) {
      console.log('hola')
      if (account) {
        token.accessToken = account.accessToken;
        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
