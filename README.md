# How to work with this project

## Prerequisities

### 1. Composer

[Install composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

> Why are we using Composer?
Because it's standartised way how to handle project dependencies in PHP world.

### 2. Docker
* [Follow instruction for your OS](https://docs.docker.com/)
* [Install Amazee.io](https://docs.amazee.io/local_docker_development/local_docker_development.html)

> Why are we using Docker? Docker allows everyone to have the same environment, so it means no more "It's working for me."

@TODO: Gulp/Grunt

## Let's start working

### Non-drupal stuff
1. checkout this repository
2. go into directory where your repository is installed
3. run `composer install`, which will download all dependencies
4. run your docker containers with `pigmy up`(Linux) or `amazeeio-cachalot up`(Mac) and run `docker-compose up -d` to assure that your containers are running.
5. log into container using `docker-compose exec --user drupal drupal bash`
6. develop

### Drupal stuff
1. install project by going to your-project-url/core/install.php
2. select 'Slovak' language in the first step.
3. select 'Config installer' install profile in the second step.
4. rest of the required values for the rest of install profile should be set up automatically.
  
## Development
* Autoloader is implemented to use the generated composer autoloader in `vendor/autoload.php`,
  instead of the one provided by Drupal (`web/vendor/autoload.php`).
* Modules (packages of type `drupal-module`) will be placed in `web/modules/contrib/`
* Theme (packages of type `drupal-theme`) will be placed in `web/themes/contrib/`
* Profiles (packages of type `drupal-profile`) will be placed in `web/profiles/contrib/`
* Creates default writable versions of `settings.php` and `services.yml`.
* Creates `sites/default/files`-directory.
* Latest version of drush is installed locally for use at `vendor/bin/drush`.
* Latest version of DrupalConsole is installed locally for use at `vendor/bin/drupal`.

### How can I apply patches to downloaded modules?

If you need to apply patches (depending on the project being modified, a pull 
request is often a better solution), you can do so with the 
[composer-patches](https://github.com/cweagans/composer-patches) plugin.

To add a patch to drupal module foobar insert the patches section in the extra 
section of composer.json:
```json
"extra": {
    "patches": {
        "drupal/foobar": {
            "Patch description": "URL to patch"
        }
    }
}
```

## Updating Drupal Core

Follow the steps below to update your core files.

1. Run `composer update drupal/core --with-dependencies` to update Drupal Core and its dependencies.
1. Run `git diff` to determine if any of the scaffolding files have changed. 
   Review the files for any changes and restore any customizations to 
  `.htaccess` or `robots.txt`.
1. Commit everything all together in a single commit, so `web` will remain in
   sync with the `core` when checking out branches or running `git bisect`.
1. In the event that there are non-trivial conflicts in step 2, you may wish 
   to perform these steps on a branch, and use `git merge` to combine the 
   updated core files with your customized files. This facilitates the use 
   of a [three-way merge tool such as kdiff3](http://www.gitshah.com/2010/12/how-to-setup-kdiff-as-diff-tool-for-git.html). This setup is not necessary if your changes are simple; 
   keeping all of your modifications at the beginning or end of the file is a 
   good strategy to keep merges easy.


