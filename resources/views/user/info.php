<?php
	session_start();

	// header('Location:/school/athletes.php?id='.$_SESSION['user_id']);

ob_start();
require '/school/athletes.php?id='.$_SESSION['user_id'];
$output = ob_get_clean();

?>
