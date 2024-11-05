# RUZZ-Notes

[Notes, Jouranl, Prompts etc sorted by Subject  (Work in progress)
1- Need to connect to SQLite Database or MySQL 

Installation 
Dependancies: Node JS & React JS
Step 1: Node js installation
    # installs fnm (Fast Node Manager)
winget install Schniz.fnm

# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression

# download and install Node.js
fnm use --install-if-missing 22

# verifies the right Node.js version is in the environment
node -v # should print `v22.11.0`

# verifies the right npm version is in the environment
npm -v # should print `10.9.0`

Step 2 React JS Installation
npx create-react-app ruzz-notes
