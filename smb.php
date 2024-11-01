<?php


/*
    Plugin Name: ShowMB
    Plugin URI: www.showmb.com
    Description: Show automatically the followers you have on each social network. 
    Author: ShowMB
    Version: 1.0
    Author URI: www.showmb.com
    License: GPL2
    License URI: https://www.gnu.org/licenses/gpl-2.0.html
    Text Domain: showmb
    Domain Path: /languages
    */

$plugin_header_translate = array( __('ShowMB', 'showmb'), __('ShowMB.', 'showmb') );

add_action('init','showmb_plugin_load_textdomain');

function showmb_plugin_load_textdomain(){

$text_domain    = 'showmb';
$path_languages = basename(dirname(__FILE__)).'/languages/';
load_plugin_textdomain($text_domain, false, $path_languages );


};

function showmb_registering_styles() {
    wp_register_style( 'showmbstyle', plugins_url( 'CSS/estilos.css', __FILE__) );
    wp_register_style( 'showmbstyle2', plugins_url( 'CSS/fontW/css/font-awesome.min.css' , __FILE__) );
    wp_enqueue_style( 'showmbstyle', get_stylesheet_uri() );
    wp_enqueue_style( 'showmbstyle2', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'showmb_registering_styles' );


function showmb_create_widget(){    
    include_once(plugin_dir_path( __FILE__ ).'/includes/widget.php');
    register_widget('smb_widget');
}
add_action('widgets_init','showmb_create_widget'); 

 function showmb_mi_inicio() {
	if (!is_admin()) {
		wp_enqueue_script('jquery');
	}
}






add_action('init', 'showmb_mi_inicio');                               

function showmb_loading_jquery() {
	if (!is_admin()) {
		wp_enqueue_script('jquery');
	}
}
add_action('init', 'showmb_loading_jquery');

?>