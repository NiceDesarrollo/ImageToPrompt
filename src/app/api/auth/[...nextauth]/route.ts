import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "email", type: "email" },
        canGetThePrompt: { label: "canGetThePrompt", type: "boolean" },
      },
      async authorize(credentials, req) {

        await dbConnect();


        const userFound = await User.findOne({ email: credentials?.email });

        if (!userFound) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Invalid credentials");

        let userReturn = {
          id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          image:
            "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT6T0fBNTGkAtgVFDeBhTpUu8ZzCCQE8tnzn6qiRKjOajTIhoYz0sb__e-u7aGBxcl6L0tZUfnwe5Sf3I8",
        };

        if (userReturn) {
          // Any object returned will be saved in `user` property of the JWT
          return userReturn;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {

        // Prepare loginInfo
        const loginInfo = {
          name: user.name,
          email: user.email,
          provider: account ? account.provider : 'No provider',
        };
    
        // Send POST request to api/auth
        const res = await fetch(process.env.NEXT_PUBLIC_NEXT_URL + '/api/info-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo),
        });
    
        // Check if the request was successful
        // if (res.ok) {
        //   console.log('Login info sent successfully');
        // } else {
        //   console.log('Failed to send login info');
        // }      

      // Check if the user is allowed to sign in
      const isAllowedToSignIn = true; // Replace with your own logic

      if (isAllowedToSignIn) {
        // If the user is allowed to sign in, return true
        return true;
      } else {
        // If the user is not allowed to sign in, return false
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

