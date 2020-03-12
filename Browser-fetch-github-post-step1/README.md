# Github API

Let's create web interface that allows us to interact with Github API.

The end result should allow the user to **create repositories**.

## Authentication header

Create a personal token to use for authentication with Github, follow the instructions [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

Once you have generated a token, copy it somewhere or leave the window open, so you can copy it later.

We will need it later to authenticate with the Github API.
This way, when we make a request to create a repository, it will be created in the space of the currently authenticated user (which should be you).

## Requirements

> No Handlebars this time, can you use ESNext literal strings instead?

## Plan for action

1. Create HTML for form to create a repo and add some minimal styles. It could look something this:

![example form html](example-images/example-form.png)

What can go in the form, depends on what you can submit via the API.

2. Next, add event listener for form submission

3. On submit make a request to the Github api to create repo. You will need to pass the data that the user entered in the form. In addition you will need to pass the token you created earlier as a header in the options of your fetch:

```js
    "headers": {
        "Authorization": "token <HERE GOES YOUR TOKEN>",
    }
```

On submit, clear the form

4. Check for mandatory fields like name, and disallow form submission if they are missing

5. Next, let's disable the submit button and cancel buttons while loading, and possibly add a class that changes the looks of disabled buttons

6. If there was an error, display error message to the user

7. Next, create your list item html. To make things easier, add it in the html with some dummy data, we will move it later on to the js.

![example repo list item in html](example-images/example-repo-list-item.png)

8. Let's adjust the css for a list, items should appear side by side, like for example:

![example repo list items in html](example-images/example-repo-list-items.png)

9. Once you are happy with the styles and html, move one list item to the js file. Create a function, that accepts one parameter (the repository data for 1 item), and returns an HTML string. Replace the dummy data that you had placed before with template variables, like for example \${repository.name}, where `repostitory` would be the name of the parameter you are passing to the function. The `.name` part is based on the data you receive from the API.

10. Next, let's get some data! Fetch the list of repositories from the Github API and display them as a list using the template function you just defined.

11. On initial load, fetch the repositories. After a new repository was created via the form submission, re-fetch the repositories so the new one appears in the list

12. Add extra params to your get repos list query, if you like, for example sorting order, or fetching only public repos, take a look at the docs what you could use.

> API endpoint: https://developer.github.com/v3/repos/#list-repositories-for-the-authenticated-user
