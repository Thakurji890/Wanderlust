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
app.get('/', function(req, res, next) {
if (req.session.views) {
req.session.views++
res.setHeader('Content-Type', 'text/html')
res.write('<p>views: ' + req.session.views + '</p>')
res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
res.end()
} else {
req.session.views = 1
res.end('welcome to the session demo. refresh!')
}
})

## CONNECT FLASH

    connect-flash    - > npm i connect-flash

    app.use(flash(key:value))

        it is a also a middleware that actully working for flashing the messages once after that it will disappear once it appear in web

        the flash is special area of the session used for storing messages. Messages are written to the flash and cleared after displayed to the user.

        it also used redirecting the page it stored on sessions

## AUTHENTICATION

    Authentication is the process of verifying who someone is

## AUTHORIZATION

    Authorization is the process of verifying what specific applications , files and data a user has access to

## Stroing Password

    we never store the password as it is . we store their hashed form.

    password  --->  hashing function   ---> how it is stored
    "helloworld" ---                    --- a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

## Hashing

    for every input there is a fixed output

    they are one-way function we cant get input from output

    for a different input there is a different output but of the same length

    small chnages in input should bring large changes in output

    eg: SHA256 , MD5 , CRC , BCRYPT

## SALTING

    password salting is technique to protect passwords stored in data base by adding a string of 32 or more characters and then hashing them

## PASSPORT

    npm i passport

    npm i passport-local

    npm i passport-local-mongoose

    and much more logIn/signUp through multiple plateform

## configuring strategy

    passport.initialize()

        a middleware that initializes passport

    passport.session()

        A web application needs the ability to identify users as they browse from page to page. this series of requests and response , each associated with the same user, is know as a session

    passport.use(new LocalStrategy(User.authenticate()))

## connecting login route

    how to check if user is logged in?

    req.isAuthenticated()

## Image Upload

    main problem in mongodb that file cann't store becouse it has limit
    - size limit
    - sending files is not allowed


    -- stroing files likes -
    1. form capable of sebding files
    2. mongox - 3rd party service
    3. other cloud based storage will give the link of the file
    and it will store in mongodb as link

    MANIPULATION FORM
        enctpe="mutlipart/form-data"
        // <div>
        //     <label for="image">Upload Image</label>
        //     <input type="file">
        // </div>
        --- npm multer to use the uploading files

## IMORTANT TOPIC

    ## CLOUD SETUP
        Cloudinary & .env file

        using .env variable to install dotenv
        -- require("dotenv").config();

## store Files

    multer store clodinary

    npm i cloudinary multer-storage-cloudinary
