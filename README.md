## Pre-requisites:
* Create a Github account if you don’t have one.
* If you don’t have Git installed in your computer,  install Git using this guide. [Git - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* This a template repository. So, you will fork this repository in your GitHub account before working on it. This will give you a complete ownership of your code. To fork this project, click on the Fork button on the top right corner.
* Once you have the forked project, you will clone it to your computer to get started. To clone the project, click on the green “Clone or Download” button and follow the instructions.
* Learn about GitHub and Git commands. We will use git throughout the program, so make sure you have basic understanding of GIT.
* We will use Visual Studio Code as a text editor. If you have a different preference like Sublime Text, Atom etc., feel free to stick with it. Install [Visual Studio Code](https://code.visualstudio.com/) 
* If you don’t have npm installed in your computer,  install npm using this guide. [Npm - get npm](https://www.npmjs.com/get-npm)

## How to run the react app

* In your terminal, navigate to the api directory.
* Run `npm install` to install all dependencies.
* Run `npm start` to run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br/>
Note: The page will reload if you make edits. You will also see any lint errors in the console.

## How to configure firebase in your project
* If you don't have firebase account, follow  [Create firebase account](https://firebase.google.com/) 
* After you create your account, follow the steps provided in *Step 1* and *Step 2* : [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup#from-hosting-urls)).
*Note: You can skip all the steps marked as optional*
* [Create a Cloud Firestore database](https://cloud.google.com/firestore/docs/quickstart-mobile-web#create)
*Note: use the same project you created in earlier steps and stop after you complete 5 steps*
* Adding Firebase SDKs and initializing Firebase on your project:
		* Go to  [firebase console](https://console.firebase.google.com/) .
		* Click on your *project name*.
		* In *Project Overview* page click on *Add app* and select *web* as a platform.
		* On *Add Firebase to your web app* dialog box give a nickname and click on /Register app/
		* In dialog box copy `var config = <copy this area>` configuration key/value.
		* Open `firebase-config.js` file in your cloned project, it is under `src/config/` and replace the firebase `var firebaseConfig = <paste this area>` with your copied key/value
