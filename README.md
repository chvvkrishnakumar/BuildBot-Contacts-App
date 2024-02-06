# Getting Started with Contacts App

contacts app is to manage contacts, and it uses [jsonplaceholder](https://jsonplaceholder.typicode.com/) as fake APIs for testing CRUD operations (PUT, POST, DELETE)

## Views
I created to types views for conatcts 
    1)You can see each contact as a card
    2) You can see contacts in table

    In both, the options are same to edit and updating records, but in table there is sorting opton in addition

## APIs

 Used JSONPlaceholder , for testing CRUD operations (PUT, POST, DELETE). Note that records are not actually updated in jsonplaceholder.

 ## UI

 This project utilizes Ant Design, a React UI library, for building and styling UI components. The decision to use Ant Design was driven by its ease of use, well-established design principles, and a wide range of pre-built components that expedite the development process.


## Functionalities

This project provides the following functionalities:

- View a list of contacts with their name, mobile number, and email.
- Switch between table view and card view for contacts.
- Edit existing contacts.
- Delete contacts.
- Add new contacts.

 Note: All operations working fine but you didn't find the difference in data after operation beacuse of Fake APIs.

## Pagination
I implemented pagination, but from these APIs i'm not getting pagable data, so even you change the data, API call will happen but you will get Same Data.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Available Options 
Deployed the site using Netlify

you can visit this link to see output (https://krishnacontacts.netlify.app/)
this will be expired in 30days