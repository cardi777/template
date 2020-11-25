<?php
require '../vendor/autoload.php';
$error                   = 1;
$supported_image         = [
	'jpg',
	'jpeg',
	'png',
];
$path_parts              = pathinfo( $_SERVER['REQUEST_URI'] );
$p                       = explode( '?', $path_parts['extension'] );
$path_parts['extension'] = $p[0];
//die(print_r($path_parts));
if ( basename($path_parts['dirname']) != 'glide'  ) {
	die(basename($path_parts['dirname']) );
	$error .= 2;
}
if ( ! in_array( $path_parts['extension'], $supported_image ) ) {
	//die($path_parts['extension']);
	$error .= 3;
}
$file_name = $path_parts['filename'] . '.' . $path_parts['extension'];
if ( file_exists( __DIR__ . 'images/' . $file_name ) ) {
	//die(__DIR__.'images/'.$file_name);
	$error .= 4;
}
if ( ! empty( $p[1] ) ) {
	parse_str( $p[1], $output );
	if ( ! empty( $output['w'] ) || ! empty( $output['h'] ) ) {
		//die(print_r($output));
	} else {
		//$error .= 5;
	}
}
//die(print_r($output));
// ALL GOOD?
if ( $error != 1 ) {
	die( $error );
}
$get = $_GET;

use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use League\Glide\ServerFactory;

/*/////////////////*/
// Setup Glide server
$server = League\Glide\ServerFactory::create( [
	'source'         => 'images',
	'cache'          => 'images/glide',
	'max_image_size' => 2000 * 2000,
	/*'base_url' => '/img/',*/
] );
// Set using setter method
$server->setDefaults( [
	'q'     => '90',
	'sharp' => '5',
	'fm'    => 'webp',
	'fit'   => 'contain',
] );
$server->setGroupCacheInFolders( false );
// You could manually pass in the image path and manipulations options
$s = $server->outputImage( $file_name, $get );
?>
<img src="<?php echo $s; ?>"/>
