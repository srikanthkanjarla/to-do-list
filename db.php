<?php
class Db
{
    public $mysql;
function __construct(){
    $this->mysql = new mysqli('localhost','root','','to_do_list') or die('Unable to connect to Db');
}
}

?>