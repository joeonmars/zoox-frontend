<?php
	// Compilation mode, which must be one of "RAW", "WHITESPACE", "SIMPLE", or "ADVANCED".
	// The default value is "SIMPLE".
	$COMPILE_MODE = isset( $_GET['mode'] ) ? $_GET['mode'] : 'SIMPLE';
?>

<!DOCTYPE html>
<html>

	<head>
		<title>Zoox Prototype</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
	  <meta name="keywords" content="">
	  <meta name="description" content="">
	  <link rel="shortcut icon" href="/img/favicon.ico">
	  <link rel="stylesheet" href="/css/main.css" media="screen">
	</head>

	<body>


		<!-- third-party -->
		<script src="/js/third-party/modernizr-latest.js"></script>
		<script src="/js/third-party/fastclick.js"></script>
		<script src="/js/third-party/greensock/plugins/ScrollToPlugin.min.js"></script>
		<script src="/js/third-party/greensock/TweenMax.min.js"></script>

		<!-- project js -->
		<!--<script src="js/compiled.js"></script>-->
		<script src="http://localhost:9810/compile?id=zoox&mode=<?php echo $COMPILE_MODE ?>"></script>
		<!--<script src="/js/zoox-compiled.js"></script>-->

		<!-- execute the main js-->
		<script>
			zoox.main();
		</script>
	</body>
	

</html>