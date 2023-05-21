import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth2';
import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

interface User {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_OAUTH_REDIRECT,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user: User = {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                };

                user.accessToken = accessToken;
                user.refreshToken = refreshToken;

                const db: Pool = await initializeConnection();
                const insertUserSQL = `
                    INSERT INTO ecom.users
                        (id, name, email, access_token, refresh_token) 
                    VALUES
                        ($1, $2, $3, $4, $5)
                `;

                const query: QueryConfig = {
                    text: insertUserSQL,
                    values: [
                        user.id,
                        user.name,
                        user.email,
                        user.accessToken,
                        user.refreshToken
                    ]
                };

                const result: QueryResult = await db.query(query);
                if (result.rows) {
                    done(null, user)
                }
            } catch (err) {
                done(err)
            }
        }
    )
);

export default passport;