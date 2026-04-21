<!-- &#8377; <%= listing.price.toLocaleString('en-IN')  => to change the comma and rupees icons -->

# to middleware files -- for error handling and middlewares

# for schema validation -- used joi

    it is alsoo a npm joi schema validator

# Deleting Review

    Mongo $pull operator

    $pull -->
            the $pull operator removes from an exiting array all instances of a value or values that match a special condition

# Deleting Listing

    Delete Middleware for reviews

# Miscellaneous

    Topic cover
        Express Router
        Cookies

# Express Router

    Express Routers are a way to organise our express application such that our primary app.js file does not become bloated

    const router = express.Router() -> create new router object

# Cookies

    --  Web Cookies -->

    HTTP cookies are small blocks of data created by a web server while  a user is browsing a website and plcaed on the user's computer or other device by the user's web browser.

    app.get("/getCookies",(req,res) => {
        res.cookies("key","value");
        res.cookies("key","value");
        res.cookies("key","value");
    });

    --  Cookie parser-- it is middleware -- access + parse(read) in web
        cookie-parser package

        const cookieParser = require("cookie-parser");
        app.use(cookieParser());

        app.get("/getCookies",(req,res) => {
            res.cookies("key","value");
            console.dir(req.cookies);
        });

        app.get("/getCookies",(req,res) => {
            let { name = "anonymous" } = req.cookies;
            res.send(`hii, ${name}`)
        });

# Signed cookies

    send signed cookie

        app.use(cookieParser("secretcode"));
        app.get("/getCookies",(req,res) => {
            res.cookies("key","value", { signed : true});
            res.send("done");
        });

    varify signed cookie

        app.get("/verify",(req,res) => {
            res.send(req.signedCookies);
        });

# WHAT IS STATE ?

    Stateful Protocol
        stateful protocol require server to save the status and session information.
            eg : FTP

    Stateless Protocol
        stateless protocol does not require the sever to retain the server information or session.
            eg : HTTP

# EXPRESS SESSION

    npm i express-session

    req.session.___ =

    An attempt to make our session stateful

    it create middleware with the diffrent types of options

    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
// app.get('/', function(req, res, next) {
// if (req.session.views) {
// req.session.views++
// res.setHeader('Content-Type', 'text/html')
// res.write('<p>views: ' + req.session.views + '</p>')
// res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
// res.end()
// } else {
// req.session.views = 1
// res.end('welcome to the session demo. refresh!')
// }
// })

## CONNECT FLASH

    connect-flash
        the flash is special area of the session used for storing messages. Messages are written to the flash and cleared after displayed to the user.
