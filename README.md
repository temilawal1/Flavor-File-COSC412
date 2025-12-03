## FlavorFile
Temilola Lawal, Amanda Ichniowski, Elijah Mari, Max Fadley,John Kenny
- Springboot must be installed
- To install springboot, maven must be installed first. follow instructions here: https://docs.spring.io/spring-boot/installing.html and here: https://maven.apache.org/download.cgi
- Recommended to use intelliJ as an IDE

- If the user has windows as their operating system. Please install maven and make sure the path for its bin is placed correctly in the path variables for enviroment variables.
- MacOS and Linux should just a regular install and thats it.
- Install Node/NPM. Same thing for windows make sure the path for the bin is placed correctly in the path variables for enviroment variables. Linus and MacOS are easier since they dont have to deal with this.
- It is recommended that the User use IntelliJ as it comes with many of the Maven tools needed for this project.
- Install Node as well and make sure to do "npm i" which will install everything in the package.json file
- Ensure that you obtain a key for ChatGPT as that is the AI chosen for this project
- To run the backend, you must first use your own .env file for the database connection and the chatGPT portion. There is a provided .env file that follows the structure but if you cannot see it then follow what the application.properties file has and replace the .env areas with personal keys and links. After placing all the MongoDB and ChatGPT keys in correctly, make sure you do "mvn clean install" in the console or if on intellij click the folder with a circle that says generate sources and update folders for all projects.
- If everything runs correctly then the backend should run smoothly and all issues should go.
- For the Front-end, make sure you are in the spring-prototype folder in the console. Type in cd flavor-file to enter the folder. Type npm run dev to run the front end and it should kick in.
- To ensure the project runs correctly run the backend "SpringPrototypeApplication" file first then type the "npm run dev" needed for the front-end.
