<h1>Site APi for Madam Sauce Resturant</h1>

This APi provides all the routes needed to implements a platform where Madam sauce Customers at GenesysTechHub can place order for their meal and it will be delivered to their offices. This project was designed with expressjs, nodejs and Mongodb

<h2>USER ROUTE</h2>
<h3>Sign Up Route <i>{url}/user/signup</i></h3>
The Sign up Route handles the user registration. here is a sample Json snippet.

<code>{
    "firstName": "Joshua",
    "lastName": "Mba",
    "phone": "07063516620",
    "sex": "male",
    "email": "joshua.mba.g20@gmail.com",
    "password": "12345678",
    "confirmPassword": "12345678"
}</code>

<h3>User Login Route <i>{url}/user/login</i></h3>
The Login Route handles the User Login. An example of json snippet to pass.
<code>{
    "email": "joshua@gmail.com",
    "password": "12345678"
}</code>

<h3>User Update Route  <i>{url}/user/edit/:id</i></h3>
The user update route handles the profile update of the user. This route requires user authorization. This means user must login before he can update details.

<i>PS: User authorization and Admin role validation are passed as Middlewares form the ./Middlewares/auth.js directory</i>

<h3> Get All user Route <i>{url}/user/all</i></h3>
This is route is only accessible for users with admin Role.

<h3>Get Specific User Route  <i>{url}/user/:id</i></h3>
This route gets a specific user details.

<h3>Delete User Route<i>{url}/user/delete/:id</i></h3>
This route deletes a User record but requires an Admin Authorization


<h2>MEAL ROUTE</h2>

<h3>Get all the Meal {url}/meal/all</h3>
This route get all the Meals added by the admin. This is visible to all type of users

<h3> Add Meal {url}/meal/add</h3>
This route is for adding new meal to the Meal list. Only an admin can access this route. A simple json file to pass:

<code>{
    "name": "Rice and Beans",
    "description": "This food comes with 2 meat and a bottle of Eba",
    "price": "750",
    "photo": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
}</code>


<h3>Get details of a Meal {url}/meal/:id</h3>
This route get all details about a meal. just pass mealid as a params


<h3>Delete a Particular Meal {url}/meal/delete/:id</h3>
This route deletes a particular meal. Just pass mealid as a params

<h3>Edit a Particular Meal {url}/meal/delete/:id</h3>
This route edits a particular meal. Just pass mealid as a params and the MEal update as a payload




<h2>ORDER ROUTE</h2>

<h3> Make Order {url}/order/make</h3>

You will need the Meal id, quantity and the officeRoomNumber (The office of the Genesys Staff that placed order)

<code>{
    "mealId" : "5f893c3bec48542e24c1e566",
    "quantity" : 15,
    "officeRoomNumber": "genesys office 123"

}</code>

<h3> Cancel Order {url}/order/cancel</h3>
This route is for users to cancel their Meal order. Just pass the order id as a payload. Example:
<code>{
    "orderId" : "5f893c3bec48542e24c1e566"
}</code>


<h3> Complete Order {url}/order/complete</h3>
This route is for users to complete their Meal order once it is delivered. Just pass the order id as a payload. Example:
<code>{
    "orderId" : "5f893c3bec48542e24c1e566"
}</code>


<h3> Delete Order {url}/order/delete/:id</h3>
This route is for admin to delete an Order record. Just pass the order id as a params.


<h3> Check A user Order record {url}/order/my</h3>
This route is for users to View their order records


<h3> All Order {url}/order/all</h3>
This route is for admin to check all order record in the DB
