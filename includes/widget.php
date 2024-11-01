<?php
class smb_widget extends WP_Widget {
    public function __construct(){
        $widget_ops = array(
            'classname' => 'ShowMB',
            'description' => __("","smb" ));
        
        
            parent::__construct(false, __('ShowMB', "ShowMB"), $widget_ops);
    }
    function widget($smb_args,$smb_instance){
        ?>
        <aside id="smb_widget_<?=$smb_instance['smb_texto']?>" class='widget smb_widget'>
            <h3 class='widget-title'><?php echo __('My followers','showmb')?></h3>
            

<?php 


    $smb_first = "../JS/widget.js?!";
    $smb_done = $smb_first.$smb_instance["smb_texto"];
    echo '<script src="' . plugins_url( $smb_done, __FILE__ ) . '" > ';
    

?>

        </aside>
        <?php
    }
    function update($smb_new_instance, $smb_old_instance){
         $smb_instance = $smb_old_instance;
            $smb_instance["smb_texto"] = strip_tags($smb_new_instance["smb_texto"]);
                return $smb_instance;    
    }
 function form($smb_instance){
        if(!isset($smb_instance["smb_texto"])) $smb_instance["smb_texto"]='';
        ?>
         <p>
            <label for="<?php echo $this->get_field_id('smb_texto'); ?>"><?php echo $smb_oki = __('Write your ShowMB ID', 'showmb')?></label>
                <input class="widefat" id="<?php echo $this->get_field_id('smb_texto');?>" name="<?php echo $this->get_field_name('smb_texto'); ?>" type="text" value="<?php echo esc_attr($smb_instance["smb_texto"]);?>" />
         </p>  
         <?php
    }    
} 
?>