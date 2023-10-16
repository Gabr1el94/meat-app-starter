# Deploy Apache HTTP Server - App Angular

## Install Apache

`sudo apt install apache2`

## After the installation is complete, start the Apache service by running the following command

`sudo systemctl start apache2`

## To ensure that Apache starts automatically upon system boot , run the following command:

`sudo systemctl enable apache2`

## Deploy Application Angular

### Redirect folder dist(after build --prod)

`mv /dist <redirect_folder_apache>`

### Application Path

- Find httpd.conf:

  Able LoadModule rewrite_module;
  AllowOverride All;

- Add file .htaccess:

    RewriteEngine On
  
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    RewriteRule . /index.html [L]