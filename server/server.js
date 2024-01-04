const express = require('express')

const app = express()

const cors = require('cors')

app.use(express.urlencoded({ extended: true }))

const dbConfig = require('./db')

app.use(express.json())

app.use(cors())

const CLIENT_ID = '402946356001-ija2fhgavkf8k1en3nd2l6nqsv5kk8rh.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

const session = require('express-session')
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2').Strategy

const User = require('../models/user')

const productRoute = require('./routes/product')
const usersRoute = require('./routes/user')
// const feedbackRoute = require('./routes/feedback')

app.use('/api/products', productRoute)
app.use('/api/users', usersRoute)
// app.use('/api/feedbacks', feedbackRoute)

app.use(session({
    secret: 'Our little secret',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2Strategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: '/auth/google/secrets',
            scope: ['profile', 'email']
        }, async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            try {
                const user = await User.findOne({ googleId: profile.id })
                if (!user) {
                    user = new User(
                        {
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value
                        }
                    )
                    await user.save()
                } return done(null, user)
            } catch (error) { return done(error, null) }
        }
    )
)

passport.serializeUser((user, done) => { done(null, user) })

passport.deserializeUser((user, done) => { done(null, user) })

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get("/auth/google/secrets", passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/login'
}))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))