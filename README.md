<h1>Site APi for Madam Sauce Resturant</h1>

This APi provides all the routes needed to implements a platform where Madam sauce Customers at GenesysTechHub can place order for their meal and it will be delivered to their offices. This project was designed with expressjs, nodejs and Mongodb

<h2>USER ROUTE</h2>
<h3>Sign Up Route <i>{url}/user/signup</i></h3>
The Sign up Route handles the user registration.

<h3>User Login Route <i>{url}/user/login</i></h3>
The Login Route handles the User Login.

<h3>User Update Route  <i>{url}/user/edit/:id</i></h3>
The user update route handles the profile update of the user. This route requires user authorization. This means user must login before he can update details.

<i>PS: User authorization and Admin role validation are passed as Middlewares form the ./Middlewares/auth.js directory</i>

<h3> Get All user Route <i>{url}/user/all</i></h3>
This is route is only accessible for users with admin Role.

<h3>Get Specific User Route  <i>{url}/user/:id</i></h3>
This route gets a specific user details.

<h3>Delete User Route<i>{url}/user/delete/:id</i></h3>
This route deletes a User record but requires an Admin Authorization