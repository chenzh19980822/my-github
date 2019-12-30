<?php
	include "db.php";
	//$_GET 只能接受前端发来的get请求
	//$_POST  
	//$_REQUEST  ，可以接收get和post
	$status = $_REQUEST["status"];
	//接收手机号和密码
	$tel = isset( $_REQUEST["tel"] ) ? $_REQUEST["tel"] : "";
	$pwd = isset( $_REQUEST["pwd"] ) ? $_REQUEST["pwd"] : "";
	if( $status == "login" ){//登录功能
		$sql = "select * from users where tel = '$tel'";
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		if( $arr ){ //说明手机号已经存在了
			if( $pwd == $arr["pwd"] ){
				echo 1;//登录成功
			}else{
				echo 2; //密码错误
			}
		}else{
			echo 0;//手机号不存在
		}
	}else if( $status == "register" ){//注册功能
		$sql = "insert into users(tel,pwd) values('$tel','$pwd')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//注册成功
		}else{
			echo 0;//注册失败
		}
	}else if( $status == "checkTel" ){ //验证手机号唯一功能
		$sql = "select * from users where tel = '$tel'";
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array( $res );
		if( $arr ){
			echo 1; //手机号存在
		}else{
			echo 0; //手机号可以使用的
		}
	}
?>