# React Crypto Stats v1.18.5
<br />

## Basic Root User Deployment Guide For App Evaluation
###### This guide is intended for deployment testing purposes & it uses the Root user. Creating a new user is strongly suggested for a production setup.
<br />

### 1. Deploy a Cloud Compute Ubuntu 21.10 server from Vultr named "CryptoStats".
<br />

### 2. Open a PowerShell (as Admin) terminal & connect to your CryptoStats server's IP address via SSH:

```Bash
ssh root@enter.CryptoStats.IP.address
```

- **Enter the password provided by Vultr on the CryptoStats server page & follow all prompts until connected.**

<br />

### 3. Update Ubuntu OS:

```Bash
sudo apt update && sudo apt upgrade -y
```

<br />

### 4. Enable & setup UFW Firewall:

```Bash
sudo ufw enable
```

```Bash
sudo ufw status
```

- **It should display that the UFW Firewall is active.**

```Bash
sudo ufw allow ssh
```

```Bash
sudo ufw allow http
```

```Bash
sudo ufw allow https
```

- **Restart the CryptoStats server then reconnect via SSH (repeat step 2).**

```Bash
sudo reboot
```

<br />

### 5. Install Node onto the server:

```Bash
curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
```

```Bash
sudo apt install nodejs
```

```Bash
npm --version
```

- **The NPM version should be displayed.**

```Bash
node --version
```

- **The Node version should be displayed.**

<br />

### 6. Clone the ReactCryptoStats GitHub repository to the CryptoStats server:

```Bash
cd ~/
```

```Bash
mkdir superkloklabs
```

```Bash
cd superkloklabs
```

```Bash
git clone https://github.com/Superklok/ReactCryptoStats.git
```

<br />

### 7. Install dependencies:

```Bash
cd ReactCryptoStats/v1.x.x/
```

```Bash
npm i
```

- **Create a production build:**

```Bash
npm run build
```

<br />

### 8. Start app using PM2:

```Bash
npm i pm2 -g
```

- **Set environment variables:**

```Bash
cd ~/
```

```Bash
nano .bashrc
```

- **Add the following to the top of the file:**

```Bash
export PORT="ThePortCryptoStatsIsRunningOn"
```

```Bash
export NODE_ENV="production"
```

- **Press ctrl+x & save changes, then refresh the user environment:**

```Bash
source .bashrc
```

- **Double check that the new environment variables have been set correctly.**

```Bash
env
```

- **Then start the app:**

```Bash
cd superkloklabs/ReactCryptoStats/v1.x.x/
```

```Bash
pm2 serve build/ ThePortCryptoStatsIsRunningOn --name "CryptoStats" --spa
```

<br />

### 9. Setup a start script to automatically start the app if the CryptoStats server is restarted:

```Bash
pm2 startup ubuntu
```

```Bash
pm2 save
```

<br />

### 10. Install & configure NGINX:

```Bash
sudo apt install nginx
```

```Bash
sudo nano /etc/nginx/sites-available/default
```

- **Add the following to the location part of the server block:**

```JavaScript
server_name yourwebsite.com www.yourwebsite.com;
    location / {
        proxy_pass http://localhost:ThePortCryptoStatsIsRunningOn;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

```Bash
sudo nginx -t
```

- **Restart NGINX:**

```Bash
sudo service nginx restart
```

<br />

### 11. Update your DNS "A" records for "yourwebsite.com" & "www.yourwebsite.com" with the CryptoStats server IP address.
<br />

### 12. Setup SSL with LetsEncrypt:

```Bash
sudo snap install core; sudo snap refresh core
```

```Bash
sudo snap install --classic certbot
```

```Bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

```Bash
sudo certbot --nginx -d yourwebsite.com -d www.yourwebsite.com
```

- **Enter your@email.com for the email address it requests, & select (y)es, then (n)o.**
- **Test the 90 day renewal process:**

```Bash
certbot renew --dry-run
```

- **Test the PM2 startup script by restarting the CryptoStats server:**

```Bash
sudo reboot
```

- **Then reconnect to the CryptoStats server via SSH (repeat step 2).**
- **Check PM2 to make sure CryptoStats is still running:**

```Bash
pm2 status
```

- **Logout of SSH:**

```Bash
exit
```

<br />
<br />

## DONE!
<br />

###### Languages

[<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />][javascript] [<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />][css] [<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />][html] [<img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white" />][json] [<img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" />][markdown]

###### Libraries, Frameworks & Runtime

[<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />][react] [<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />][reactrouter] [<img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />][materialui] [<img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />][chartjs] [<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />][node] [<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />][npm]

###### Deployment Tools & Services

[<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />][docker] [<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />][nginx] [<img src="https://img.shields.io/static/v1?style=for-the-badge&message=Let%E2%80%99s+Encrypt&color=003A70&logo=Let%E2%80%99s+Encrypt&logoColor=FFFFFF&label=" />][letsencrypt] [<img src="https://img.shields.io/static/v1?style=for-the-badge&message=Vultr&color=007BFC&logo=Vultr&logoColor=FFFFFF&label=" />][vultr]

<br />
<br />

[javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
[markdown]: https://www.markdownguide.org/getting-started/
[react]: https://reactjs.org/docs/getting-started.html
[reactrouter]: https://reactrouter.com/en/main/start/overview
[materialui]: https://v4.mui.com/getting-started/installation/
[chartjs]: https://www.chartjs.org/docs/latest/getting-started/installation.html
[node]: https://nodejs.org/en/docs/guides/
[npm]: https://docs.npmjs.com/cli/v7/commands/npm
[docker]: https://hub.docker.com/r/superklok/reactcryptostats/tags
[nginx]: https://docs.nginx.com/
[letsencrypt]: https://certbot.eff.org/
[vultr]: https://www.vultr.com/