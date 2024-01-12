const express = require('express')

const app = express()

const cors = require('cors')

app.use(express.urlencoded({ extended: true }))

const dbConfig = require('./db')

app.use(express.json())

app.use(cors())

const CLIENT_ID = '119945950962-fuoohsilsoe21pjv303h94bump878tl5.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

const APP_ID = '792176419403744'
const APP_SECRET = 'b7edd9a4e97dbd35862e3e7e6873fb55'

const session = require('express-session')
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

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

passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((user, done) => { done(null, user) })

const User = require('./models/user')

const googleUser = user => {
    app.get('/api/users/login', async (req, res) => {
        try {
            const temp = await User.findOne({ googleId: user.id })
            res.send(temp)
        } catch (error) { console.log(error) }
    })
}

passport.use(
    new OAuth2Strategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email']
        }, async (accessToken, refreshToken, profile, done) => {
            googleUser(profile)
            try {
                let user = await User.findOne({ googleId: profile.id })
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

passport.use(
    new FacebookStrategy(
        {
            clientID: APP_ID,
            clientSecret: APP_SECRET,
            callbackURL: '/auth/facebook/callback',
            scope: ['profile', 'email']
        }, async (accessToken, refreshToken, profile, done) => {
            // googleUser(profile)
            console.log(profile)
            try {
                let user = await User.findOne({ facebookId: profile.id })
                if (!user) {
                    user = new User(
                        {
                            facebookId: profile.id,
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



app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/login'
}))

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/login'
}))

app.get("/login", async (req, res) => {

    if (req.user) {
        await res.send(req.user)
        res.status(200).json({ message: "user Login", user: req.user })
    } else {
        res.status(400).json({ message: "Not Authorized" })
    }
})

app.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) }
        res.redirect('http://localhost:3000/login')
    })
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))