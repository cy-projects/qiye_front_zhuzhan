	.sidebar{
		position: absolute;
		left: 0px;
		top: 60px;
		bottom: 0;
		width: 220px;
	    background: #fff;
	    z-index: 101;
	}
	.sidebar_slim{ margin-left: 7px; }
	.side_menu ul.side_menu_item{ overflow: hidden;  }
	.side_menu_item hr{
		margin: 15px 0 4px 0;
		height: 1px;
		background-color: #ddd;
		border: initial;
	}
	.side_menu_item h5{
		height: 50px;
		line-height: 50px;
		cursor: pointer;
	}
	.side_menu_item h5 span:nth-of-type(1){
		width: 160px;
		padding-right: 20px;
		text-align: center;
		font-family: 'Helvetica Neue','Hiragino Sans GB','WenQuanYi Micro Hei','Microsoft Yahei',sans-serif,'fontawesome';
	}
	.side_menu_item h5 span:nth-of-type(2){
		width: 30px;
		color: #c81623;
		text-align: left;
		float: right;
		font-size: 18px;
	}
	.side_menu_item strong{
		height: 30px;
		line-height: 30px;
		float: right;
		font-size: 20px;
		color: #c81623;
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
		position: absolute;
		left: 170px;
		opacity: 0;
		display: none;	
	}
	.side_menu_item li{
		position: relative;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
		font-size: 16px;
		/*display: none;*/
	}
	.side_menu_item li div{
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
		width: 5px;
		height: 0;
		background-color: #c81623;
		position: absolute;
		left: 0;
		top: 15px;
	}
	.side_menu_item li:hover{ background-color: #eee; }
	.side_menu_item li a{
		width: 100%;
		color: #333;
		text-decoration: none;
		text-align: center;
		padding:0 10px;
		box-sizing: border-box;
		-webkit-transition: all 0.3s linear;
		transition: all 0.3s linear;
		outline: medium;
	}



<!--轮播-->
	<div class="bannerLb">
		<div id="bannerLb_carousel" class="carousel slide" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#bannerLb_carousel" data-slide-to="0" class="active"></li>
				<li data-target="#bannerLb_carousel" data-slide-to="1"></li>
				<li data-target="#bannerLb_carousel" data-slide-to="2"></li>
				<li data-target="#bannerLb_carousel" data-slide-to="3"></li>
				<li data-target="#bannerLb_carousel" data-slide-to="4"></li>
			</ol>
			<div class="carousel-inner">
				<div class="item active">
					<img src="img/lbpic1.jpg" alt="First slide">
				</div>
				<div class="item">
					<img src="img/lbpic3.jpg" alt="Second slide">
				</div>
				<div class="item">
					<img src="img/lbpic2.jpg" alt="Second slide">
				</div>
				<div class="item">
					<img src="img/lbpic4.jpg" alt="Third slide">
				</div>
				<div class="item">
					<img src="img/lbpic5.jpg" alt="Third slide">
				</div>
			</div>
			<a class="carousel-control left" href="#bannerLb_carousel" data-slide="prev">
				<span class="glyphicon glyphicon-chevron-left">
					<i class="fa fa-angle-left"></i>
				</span>
			</a>
			<a class="carousel-control right" href="#bannerLb_carousel" data-slide="next">
				<span class="glyphicon glyphicon-chevron-right">
					<i class="fa fa-angle-right"></i>
				</span>
			</a>
		</div>
	</div>