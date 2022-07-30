# CRM Application

- an applicatiom  for  resolve customer `Querry`

## getting  statrt  with node js  

- `step1  install all initial dependency`
- `npm init ` to create  your application stracture
- `to run `the application we use `node index.js`


1. Express js
    1. to install expressjs use `npm i express`
   
2. mongoose    
   1. to install expressjs use `npm i mongoose`
   2. mongoose is used for understanding mongodb querry to use in javascript
3. bcryptjs
    1. to install bcryptjs use `npm i bcryptjs`
    2. bcryptjs is used to has you password

4. jsonwebtoken
    1. to install json web token `JWT` we have to use `npm i jsonwebtoken`
    2. it is used to create webtoken
5. body-parser
    1. to install body-parser we use ` npm i body-parser`


    ### Backend application divide into three part
    - routes
    - controllers
    - model

 > OPTIONAL FOLDER
 - configs [ `store variable that can be change at application level or variable that can be configurable example - port number , database url`]
 - utils  [ `all reuseable function we will add in utils` ]

> in configs folder we have different config  file  depends on requrement in this project we have to one is `db.config.js `and `server.config.js`

> index.js shoudle be the starting point of the application
