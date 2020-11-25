<?php
function is_local() {
	if ( $_SERVER['HTTP_HOST'] == 'localhost'
	     || $_SERVER['REMOTE_ADDR'] == '127.0.0.1'
	     || substr( $_SERVER['HTTP_HOST'], 0, 3 ) == '10.'
	     || substr( $_SERVER['HTTP_HOST'], 0, 7 ) == '192.168' ) {
		return true;
	}
	return false;
}

function folderOnly() {
	$parts = explode( "/", basename( $_SERVER['REQUEST_URI'] ) );
	if ( ! empty( end( $parts ) ) ) {
		$f = end( $parts );
		$f = explode( "?", $f );
		//print_r( $f );
		if ( ! empty( $f[1] ) ) {
			return $f[0];
		} else {
			return $f[0];
		}
	} else {
		return 'home';
	}
}

function i( $src, $data = [] ) {
	if ( ! empty( $src ) ) {
		$path_parts   = pathinfo( $src );
		$path_parts_b = explode( '?', $path_parts['extension'] );
		if ( ! empty( $path_parts_b[1] ) ) {
			parse_str( $path_parts_b[1], $vars );
			if ( ! empty( $vars['w'] ) ) {
				$w = $vars['w'];
			}
			if ( ! empty( $vars['h'] ) ) {
				$h = $vars['h'];
			}
			if ( ! empty( $vars['q'] ) ) {
				$q = $vars['q'];
			}
			if ( ! empty( $vars['fm'] ) ) {
				$fm = $vars['fm'];
			}
			if ( ! empty( $vars['bg'] ) ) {
				$bg = $vars['bg'];
			}
			//print_r( $vars['w'] );
			//die();
			//////// WIDTHS /////////
			if ( ! empty( $w ) ) {
				if ( ! empty( $h ) ) {
					$ratio = $h / $w;
				}
				$size_arrays = [
					'1920',
					'1600',
					'1366',
					'1024',
					'992',
					'768',
					'640',
					'480',
					'360',
					'200',
				];
				$s           = [];
				$output      = [];
				foreach ( $size_arrays as $size ) {
					if ( $size <= $w ) {
						if ( ! empty( $ratio ) ) {
							$tmp   = p_update( $src, 'w', $size );
							$tmp_2 = p_update( $tmp, 'h', round( $size * $ratio, 0 ) );
							$s[]   = $tmp_2 . " " . $size . "w";
						} else {
							$s[] = p_update( $src, 'w', $size ) . " " . $size . "w";
						}
					}
				}
				///////////////////////////////
				///////////////////////////////
				$output[] = 'src="' . $src . '"';
				$output[] = 'srcset="' . implode( ", ", $s ) . '"';
				$output[] = 'sizes="(max-width: ' . $w . 'px) 100vw, ' . $w . 'px"';
				echo implode( ' ', $output );
			}
		} else {
			echo 'src="' . $src . '"';
		}
	}
}

function p_update( $url, $parameter, $parameterValue ) {
	$url = parse_url( $url );
	parse_str( $url["query"], $parameters );
	unset( $parameters[ $parameter ] );
	$parameters[ $parameter ] = $parameterValue;
	return $url["path"] . "?" . http_build_query( $parameters );
}

function clean_cache( $what = 'all' ) {
	//die($what);
	if ( $what == 'all' ) {
		$folders = [
			'resources/css/cache/',
			'resources/js/cache/',
			'resources/images/cache/png/',
			'resources/images/cache/jpg/',
			'resources/images/cache/gif/',
			'resources/images/cache/webp',
		];
	} else if ( $what == 'js' ) {
		$folders = [
			'resources/js/cache/',
		];
	} else if ( $what == 'css' ) {
		$folders = [
			'resources/css/cache/',
		];
	} else if ( $what == 'image' || $what == 'images' ) {
		$folders = [
			'resources/images/cache/png/',
			'resources/images/cache/jpg/',
			'resources/images/cache/gif/',
			'resources/images/cache/webp',
		];
	}
	if ( ! empty( $folders ) ) {
		foreach ( $folders as $folder ) {
			//$folder = $_SERVER['DOCUMENT_ROOT'] . '/' . $folder;
			$folder = getcwd() . '/' . $folder;
			//die($folder);
			$files = scandir( $folder ); // get all file names
			//print_r( $files );
			foreach ( $files as $file ) { // iterate files
				if ( $file === '.' || $file === '..' ) {
					continue;
				}
				unlink( $folder . '/' . $file );
			}
		}
	}
}

function get_url_instructions() {
	if ( ! empty( $_GET['cache'] ) ) {
		switch ( $_GET['cache'] ) {
			case "image":
			case "images":
				clean_cache( 'images' );
				break;
			case "js":
				clean_cache( 'js' );
				break;
			case "css":
				clean_cache( 'css' );
				break;
			case "all":
			default:
				return 'all';
		}
	} else {
		return false;
	}
}

function curPageURL() {
	$url = @( $_SERVER["HTTPS"] != 'on' ) ? 'http://' . $_SERVER["SERVER_NAME"] : 'https://' . $_SERVER["SERVER_NAME"];
	//$url .= ( $_SERVER["SERVER_PORT"] !== 80 ) ? ":".$_SERVER["SERVER_PORT"] : "";
	$url .= $_SERVER["REQUEST_URI"];
	return $url;
}

function curPageDomain() {
	return @( $_SERVER["HTTPS"] != 'on' ) ? 'http://' . $_SERVER["SERVER_NAME"] : 'https://' . $_SERVER["SERVER_NAME"];
}

function output_path( $filename, $extension, $webp = true, $attr = true ) {
	$info = pathinfo( $filename );
	if ( $webp ) {
		if ( $attr ) {
			return 'src="resources/images/cache/webp/' . $info['filename'] . '.webp" fallback="resources/images/cache/' . $extension . '/' . $info['filename'] . '.' . $extension . '"';
		} else {
			return 'resources/images/cache/webp/' . $info['filename'] . '.webp';
		}
	} else {
		if ( $attr ) {
			return 'src="resources/images/cache/' . $extension . '/' . $info['filename'] . '.' . $extension . '"';
		} else {
			return 'resources/images/cache/' . $extension . '/' . $info['filename'] . '.' . $extension;
		}
	}
	//return $info['dirname'].'/'.;
}

if ( get_url_instructions() ) {
	clean_cache( $_GET['cache'] );
}
function make_image( $img, $data = [] ) {
	$width  = 0;
	$height = 0;
	$type   = 'con';
	$webp   = true;
	$attr   = true;
	if ( ! empty( $data['width'] ) ) {
		if ( $data['width'] > 0 ) {
			$width = $data['width'];
		}
	}
	if ( ! empty( $data['height'] ) ) {
		if ( $data['height'] > 0 ) {
			$height = $data['height'];
		}
	}
	if ( ! empty( $data['type'] ) ) {
		$type = $data['type'];
	}
	if ( isset( $data['webp'] ) ) {
		if ( $data['webp'] ) {
		} else {
			$webp = $data['webp'];
		}
	}
	if ( isset( $data['attr'] ) ) {
		if ( $data['attr'] ) {
		} else {
			$attr = $data['attr'];
		}
	}
	if ( ! empty( $img ) ) {
		$info = pathinfo( $img );
		if ( file_exists( $img ) ) {
			// great, file exists
			$new_name          = $info['filename'] . '-w' . $width . '-h' . $height . '-t' . $type . '[' . strtolower( $info['extension'] ) . '].webp';
			$new_name_fallback = $info['filename'] . '-w' . $width . '-h' . $height . '-t' . $type . '[' . strtolower( $info['extension'] ) . '].' . strtolower( $info['extension'] );
			if ( ! file_exists( output_path( $new_name, strtolower( $info['extension'] ), false, false ) ) || ! file_exists( output_path( $new_name, strtolower( 'webp' ), false, false ) ) || get_url_instructions() == 'all' || get_url_instructions() == 'image' || get_url_instructions() == 'images' ) {
				//echo "    ";
				// it needs to be made
				try {
					// Create a new SimpleImage object
					$image = new \claviska\SimpleImage();
					// Magic! ✨
					$image->fromFile( $img );
					switch ( $type ) {
						case 'cov':
							//echo 'cover';
							$image->thumbnail( $width, $height, 'center' );
							break;
						case 'no-crop':
							$image->bestFit( $width, $height ); // 100x79 px
							$empty = new \claviska\SimpleImage();
							$empty->fromNew( $width, $height, 'white' )
							      ->overlay( $image );
							$image = $empty;
							break;
						default:
							//echo 'contain';
							if ( $width == 0 || $height == 0 && ( $width + $height > 0 ) ) {
								if ( $width > 0 ) {
									$image->resize( $width, 0 );
								}
								if ( $height > 0 ) {
									$image->resize( 0, $height );
								}
							} else {
								$image->bestFit( $width, $height );
							}
							break;
					}
					//$image->resize( $width, $height );
					if ( $webp ) {
						$image->toFile( 'resources/images/cache/webp/' . $new_name, 'image/webp', 75 );
					}
					$quality = null;
					switch ( $info['extension'] ) {
						case "jpg":
						case 'jpeg':
							$mime = 'image/jpeg';
							break;
							$quality = 75;
						case 'png':
							$mime = 'image/png';
							break;
						case 'gif':
							$mime = 'image/gif';
							break;
					}
					$image->toFile( 'resources/images/cache/' . strtolower( $info['extension'] ) . '/' . $new_name_fallback, $mime, $quality );
				} catch ( Exception $err ) {
					// Handle errors
					echo $err->getMessage();
				}
			} else {
				// its already here
				//echo 1;
			}
			echo output_path( $new_name, strtolower( $info['extension'] ), $webp, $attr );
		}
	} else {
		echo '';
	}
}


