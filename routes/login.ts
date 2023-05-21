import express from 'express';
import passport from '../middlewares/passport';

const router = express.Router();

router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }
    ));

router.get(
    '/session/oauth/google',
    passport.authenticate('google', {
        failureRedirect: '/login-failed'
    }),
    (req: any, res) => {
        const callbackUrl = 'http://localhost:3500/session/oauth/google';
        const accessToken = req.user.accessToken;
        const refreshToken = req.user.refreshToken;
        const redirectUrl = `${callbackUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
        res.redirect(redirectUrl);
    }
);

export default router;