import passport from 'passport';
import passportLocal from 'passport-local';
import { hashPassword, isValidPassword } from '../fileUtils.js';
import User from '../dao/models/users.js';

const LocalStrategy = passportLocal.Strategy;

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: "email",
            },
            async (req, username, password, done) => {
                const { email } = req.body;
                try {
                    const user = await User.findOne({ email: username });
                    if (user) {
                        return done(null, false, { message: "User already exists" });
                    }
                    const newUser = new User({ 
                        email, 
                        password: hashPassword(password) 
                    });
                    await newUser.save();
                    return done(null, newUser);
                } catch (error) {
                    return done(error);
                }
            }
        )
    )
};

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    done(null, user);
});

passport.use(
    "login",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
            passwordField: "password",
        },
        async (req, email, password, done) => {
            console.log("LocalStrategy called with email:", email);
            console.log("LocalStrategy called with password:", password);
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "User not found" });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, { message: "Password incorrect" });
                }

                return done(null, user);
            } catch (error) {
                console.error("Error during login:", error);
                return done(error);
            }
        }
    )
);

export default initializePassport;