<h5>Site APi for Madam Sauce Resturant</h5>

This APi provides all the routes needed to implements a platform where Madam sauce Customers at GenesysTechHub can place order for their meal and it will be delivered to their offices.

<h3>Sign Up Route</h3>
The Sign up Route handles the user registration. The route is {url}/user/signup

<h3>User Login Route</h3>
The Login Route handles the User Login. The route is {url}/user/login

<h3>User Update Route </h3>
The user update route handles the profile update of the user:: {url}/user/edit/:id . This route requires user authorization. This means user must login before he can update details.

<i>PS: User authorization and Admin role validation are passed as Middlewares form the ./Middlewares/auth.js directory</i>

<h3> Get All user Route</h3>
This is route is only accessible for users with admin Role. :: <b>{url}/user/all</b>

<h3>Get Specific User Route</h3>