--------------------------------------------------------------------------------------------------------------
What do you need ?
* Install NodeJs: http://nodejs.org/
* Install Git: https://code.google.com/p/msysgit/
* Install Chrome: http://www.google.fr/intl/fr/chrome/browser/

Next, put into the system PATH:
* NodeJs bin
* Git bin
* Chrome exe (with the specified name: CHROME_BIN) --> not needed
Currently not needed

--------------------------------------------------------------------------------------------------------------
If you have a proxy:

You have a configuration property to configure Git
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy http://proxy.company.com:8080
git config --global http.sslVerify false
git config --global https.sslVerify false

And if needed
git config --global url."https://".insteadOf git://

You have two configuration properties to configure NPM
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
npm config set strict-ssl false

For Bower, put into the PATH the variable "HTTP_PROXY"
HTTP_PROXY http://proxy.company.com:8080
HTTPS_PROXY http://proxy.company.com:8080

Maybe you will have to do too:
npm install npm -g --ca=null
npm config set ca=""

--------------------------------------------------------------------------------------------------------------
After that, open a shell prompt, go to the current directory and type the following commands
> npm install
    -> We will install required NodeJs main and development plugins

> bower install
    -> We will install required frontend dependencies

