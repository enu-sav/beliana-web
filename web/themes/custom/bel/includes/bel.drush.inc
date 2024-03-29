<?php

/**
 * @file
 * Drush hooks and include commands for bel theme.
 */

/**
 * Implements hook_drush_command().
 */
function bel_drush_command() {

  $items['bel-install'] = array(
    'description' => dt('Run through the installation process of the bel theme.'),
    'options' => array(
      'destination' => array(
        'description' => 'Path to which the theme will be placed. If you\'re providing a relative path, note it is relative to the drupal root.',
        'example-value' => 'themes/',
      ),
    ),
    'aliases' => array('binstall'),
  );

  return $items;
}

/**
 * Implements hook_drush_help().
 */
function bel_drush_help($section) {
  switch ($section) {
    case 'drush:bel-install':
      return dt('Runs through an automated process for installing and renaming your theme to use as your own.');
  }
}

/**
 * Implements drush_hook_COMMAND().
 */
function drush_bel_install() {
  drush_print('Checking for npm...');
  $npm_check_output = drush_shell_exec('npm version 2>&1');
  if (strpos($npm_check_output, 'command not found')) {
    drush_print('NPM could not be found. Please install npm (https://nodejs.org/en/) and try again.');
    exit();
  }
  else {
    drush_print('npm was found.');
  }

  // Prompt the user what we're doing.
  drush_print('-----------------------------');
  drush_print(dt('Welcome to the bel Install!'));
  drush_print('-----------------------------');
  drush_print(dt('We will perform the automated tasks for you to use your new theme. We will create a copy of the bel theme and store it in the standard theme directory or in spescified destination.'));
  drush_confirm(dt('Do you wish to continue?'));

  // Rebuild the theme data so that we can safely check for the existence of
  // themes by using the information provided by list_themes().
  $theme_handler = \Drupal::service('theme_handler');
  $theme_handler->rebuildThemeData();

  // Prompt for a theme name.
  $name = drush_prompt(dt('Please enter the name of that you want for your theme'), 'My Theme');

  // Try to generate a machine-readable name. If that fails, prompt for one.
  if (!$machine_name = drush_bel_generate_theme_name($name)) {
    drush_print(dt("Sorry, I couldn't generate a machine-readable name for @name", array(
      '@name' => $name,
    )));
  }
  // Prompt for a theme name using the automatically generated default if any.
  drush_set_option('machine-name', drush_bel_require_valid_theme_name(dt('Please enter a machine-readable name for your new theme'), $machine_name));

  // Try to generate a machine-readable name. If that fails, prompt for one.
  if (!$machine_name = drush_get_option('machine-name', drush_bel_generate_theme_name($name))) {
    drush_print(dt("Sorry, I couldn't generate a machine-readable name for @name. Please use the '--machine-name' option to specify it manually.", array(
      '@name' => $name,
    )));
  }

  $origin_path = $theme_handler->getTheme('bel')->getPath();
  $temporary = \Drupal::config('system.file')->get('path.temporary');
  $temp_path = $temporary . '/' . $machine_name;
  $destination_path = drush_bel_get_destination($machine_name);

  // Check whether the destination path exist and bail out if it does,
  // so we don't delete any important data by accident.
  if (file_exists($destination_path)) {
    return drush_set_error('BASIC_COPY_PATH', dt('The path !path already exists.', array(
      '!path' => $destination_path,
    )));
  }

  if (is_dir($temp_path)) {
    bel_rm_dir($temp_path);
  }

  // Copy into temp directory.
  if (!bel_copy_dir($origin_path, $temp_path)) {
    return drush_set_error('DRUSH_COPY_DIR_FAILURE', dt('Failed to copy !origin_path to !temp_path.', array(
      '!origin_path' => $origin_path,
      '!temp_path' => $temp_path,
    )));
  }

  // Recursively rewrite the file names and contents of all the files that are
  // now in the subtheme's directory to represent the human- and
  // machine-readable names of the subtheme.
  $search = array(
    'bel' => $machine_name,
    'bel' => $name,
  );

  if (!drush_bel_rewrite_recursive($temp_path, array_keys($search), array_values($search))) {
    return drush_set_error('BASIC_COPY_GENERATE_THEME', dt('Failed to rewrite files and contents while generating theme.'));
  }

  // Copy from temp folder into new theme's folder.
  if (!bel_copy_dir($temp_path, $destination_path)) {
    return drush_set_error('DRUSH_COPY_DIR_FAILURE', dt('Failed to copy !temp_path to !destination_path.', array(
      '!temp_path' => $temp_path,
      '!destination_path' => $destination_path,
    )));
  }

  // Run npm install on the new theme folder.
  drush_print(dt("Building node dependencies for the theme @theme. This could take a couple minutes.", array(
    '@theme' => $machine_name,
  )));
  drush_op('chdir', DRUPAL_ROOT . '/' . $destination_path);
  drush_shell_exec('npm install');
  drush_print(dt("Node dependancies have been successfully built."));

  // Notify user of successful installation.
  drush_print(dt("------------------------------------------------------------------"));
  drush_print(dt("The new theme, !theme, has been successfully derived from bel and placed in !destination.", array(
    '!theme' => $machine_name,
    '!destination' => $destination_path,
  )));
  drush_print(dt("------------------------------------------------------------------"));
}

/**
 * Generates a valid machine-readable name for a theme from any string.
 *
 * @param string $string
 *   The string to generate the machine-readable name from.
 *
 * @return string
 *   The generated machine-readable name.
 */
function drush_bel_generate_theme_name($string) {
  // Lowercase to start.
  $string = strtolower($string);
  // Machine-readable names have to start with a lowercase letter.
  // $string = preg_replace('/^[^a-z]+/', '', strtolower($string));
  // Machine-readable names may only contain alphanumeric characters and
  // underscores.
  $string = preg_replace('/[^a-z0-9_]+/', '_', $string);
  // Trim all trailing and leading underscores.
  $string = trim($string, '_');

  // Get list of current themes.
  $theme_handler = \Drupal::service('theme_handler');
  $themes = $theme_handler->listInfo();

  if (isset($themes[$string])) {
    $plain = $string;
    $counter = 0;

    while (isset($themes[$string])) {
      // Make sure that the machine-readable name of the theme is unique.
      $string = $plain . '_' . $counter++;
    }
  }

  return $string;
}

/**
 * Helper function that continuously prompts for a valid machine-readable name.
 *
 * @param string $message
 *   The message that should be displayed.
 * @param string $default
 *   (Optional) The default theme name. Defaults to NULL.
 *
 * @return string
 *   A valid, unique machine-readable name.
 */
function drush_bel_require_valid_theme_name($message, $default = NULL) {
  while (TRUE) {
    // Keep prompting for a machine-name until we get an acceptable value.
    $prompt = drush_prompt($message, $default);

    if (!preg_match('/^[a-z][a-z0-9_]*$/', $prompt)) {
      drush_print('The machine-readable name is invalid. It may only contain lowercase numbers, letters and underscores and must start with a letter.');
    }
    else {

      // Get list of current themes.
      $theme_handler = \Drupal::service('theme_handler');
      $themes = $theme_handler->listInfo();

      // Validate that the machine-readable name of the theme is unique.
      if (isset($themes[$prompt])) {
        drush_print(dt('A theme with the name @name already exists. The machine-readable name must be unique.', array(
          '@name' => $prompt,
        )));
      }
      else {
        // The given machine-readable name is valid. Let's proceed.
        return $prompt;
      }
    }
  }
}

/**
 * Helper function to get proper destination for the new theme.
 *
 * @param string $machine_name
 *   A valid, unique machine-readable name for the new theme.
 *
 * @return string
 *   The path to the destination where the new theme should be placed.
 */
function drush_bel_get_destination($machine_name) {
  // Find proper destination if no destination option is provided.
  if ($destination = drush_get_option('destination')) {
    $destination_path = drush_trim_path($destination) . '/' . $machine_name;
  }
  else {
    $site_root = drush_get_context('DRUSH_DRUPAL_SITE_ROOT');
    if ($site_root == 'sites/default') {
      $destination_path = 'themes/' . $machine_name;
    }
    else {
      $destination_path = $site_root . '/themes/' . $machine_name;
    }
  }
  $destination_path = drush_normalize_path($destination_path);
  return $destination_path;
}

/**
 * Recursively rewrites (and renames) all files in a given path.
 *
 * @param string $path
 *   The path to rewrite all files in.
 * @param string|array $search
 *   The string(s) to look for when replacing the file names and contents. Can
 *   be an array or a string.
 * @param string|array $replace
 *   The string(s) to replace $search with. Can be an array or a string.
 *
 * @return bool
 *   TRUE if the operation succeeded, FALSE otherwise.
 *
 * @see omega_drush_replace_contents()
 * @see str_replace()
 */
function drush_bel_rewrite_recursive($path, $search, $replace) {
  if (!is_dir($path)) {
    return drush_set_error('INVALID_PATH', dt('The given path !path is not a directory.', array(
      '!path' => $path,
    )));
  }

  // If the file actually is a directory, proceed with the recursion.
  $directory = new DirectoryIterator($path);

  foreach ($directory as $item) {
    if ($item->isDot()) {
      // Do not process '..' and '.'.
      continue;
    }

    // Retrieve the path of the current item.
    $pathname = $item->getPathname();
    if ($item->isDir() && !drush_bel_rewrite_recursive($pathname, $search, $replace)) {
      return FALSE;
    }
    elseif ($item->isFile()) {
      // If it is a file, try to replace its contents.
      $content = file_get_contents($pathname);

      // Nothing to replace in empty files.
      if (empty($content)) {
        unlink($pathname);
        continue;
      }

      if (($changed_content = str_replace($search, $replace, $content)) === NULL) {
        return drush_set_error('REWRITE_FAILURE', dt('There was an error while trying to rewrite !path (!search to !replace)', array(
          '!path' => $pathname,
          '!search' => $search,
          '!replace' => $replace,
        )));
      }

      if ($content !== $changed_content) {
        file_put_contents($pathname, $changed_content);
      }
    }
  }

  return TRUE;
}

/**
 * Copy $src to $dest.
 *
 * @param string $src
 *   The directory to copy.
 * @param string $dest
 *   The destination to copy the source to, including the new name of
 *   the directory.  To copy directory "a" from "/b" to "/c", then
 *   $src = "/b/a" and $dest = "/c/a".  To copy "a" to "/c" and rename
 *   it to "d", then $dest = "/c/d".
 * @param int $overwrite
 *   Action to take if destination already exists.
 *     - FILE_EXISTS_OVERWRITE - completely removes existing directory.
 *     - FILE_EXISTS_ABORT - aborts the operation.
 *     - FILE_EXISTS_MERGE - Leaves existing files and directories in place.
 *
 * @return bool
 *   TRUE on success, FALSE on failure.
 */
function bel_copy_dir($src, $dest, $overwrite = FILE_EXISTS_ABORT) {
  // Preflight based on $overwrite if $dest exists.
  if (file_exists($dest)) {
    if ($overwrite === FILE_EXISTS_OVERWRITE) {
      drush_op('drush_delete_dir', $dest, TRUE);
    }
    elseif ($overwrite === FILE_EXISTS_ABORT) {
      return drush_set_error('DRUSH_DESTINATION_EXISTS', dt('Destination directory !dest already exists.', array('!dest' => $dest)));
    }
    elseif ($overwrite === FILE_EXISTS_MERGE) {
      // $overwrite flag may indicate we should merge instead.
      drush_log(dt('Merging existing !dest directory', array('!dest' => $dest)));
    }
  }
  // $src readable?
  if (!is_readable($src)) {
    return drush_set_error('DRUSH_SOURCE_NOT_EXISTS', dt('Source directory !src is not readable or does not exist.', array('!src' => $src)));
  }
  // $dest writable?
  if (!is_writable(dirname($dest))) {
    return drush_set_error('DRUSH_DESTINATION_NOT_WRITABLE', dt('Destination directory !dest is not writable.', array('!dest' => dirname($dest))));
  }
  // Try to do a recursive copy.
  if (@drush_op('_bel_recursive_copy', $src, $dest)) {
    return TRUE;
  }

  return drush_set_error('DRUSH_COPY_DIR_FAILURE', dt('Unable to copy !src to !dest.', array('!src' => $src, '!dest' => $dest)));
}

/**
 * Internal function called by bel_copy_dir; do not use directly.
 */
function _bel_recursive_copy($src, $destination) {
  static $machine_name;
  if (!isset($machine_name)) {
    $machine_name = drush_get_option('machine-name');
  }
  // All subdirectories and contents.
  $ignore_directories = array(
    'node_modules',
  );
  $no_mask = '/^' . implode('|', $ignore_directories) . '$/';

  if (is_dir($src)) {
    if (!drush_mkdir($destination, TRUE)) {
      return FALSE;
    }
    $dir_handle = opendir($src);
    while ($file = readdir($dir_handle)) {
      if (($file[0] != '.' || $file == '.gitignore') && !preg_match($no_mask, $file)) {
        if (_bel_recursive_copy("$src/$file", "$destination/$file") !== TRUE) {
          return FALSE;
        }
      }
    }
    closedir($dir_handle);
  }
  elseif (is_link($src)) {
    symlink(readlink($src), $destination);
  }
  elseif (!copy($src, $destination)) {
    return FALSE;
  }

  // Rename files with bel.
  if (strpos($destination, 'bel') !== FALSE) {
    $renamed_destination = str_replace('bel', $machine_name, $destination);
    rename($destination, $renamed_destination);
  }

  // Preserve file modification time.
  touch($destination, filemtime($src));

  // Preserve execute permission.
  if (!is_link($src) && !drush_is_windows()) {
    // Get execute bits of $src.
    $execperms = fileperms($src) & 0111;
    // Apply execute permissions if any.
    if ($execperms > 0) {
      $perms = fileperms($destination) | $execperms;
      chmod($destination, $perms);
    }
  }

  return TRUE;
}

/**
 * Recursively removes all files within the provided directory.
 *
 * USE WITH CAUTION.
 *
 * @param string $dir
 *   File path for the directory you want to delete.
 */
function bel_rm_dir($dir) {
  if (is_dir($dir)) {
    $objects = scandir($dir);
    foreach ($objects as $object) {
      if ($object != "." && $object != "..") {
        if (is_dir($dir . "/" . $object)) {
          bel_rm_dir($dir . "/" . $object);
        }
        else {
          unlink($dir . "/" . $object);
        }
      }
    }
    rmdir($dir);
  }
}
