
	// var phoneReg = new RegExp(/\d+-?/);
	// var phoneReg = new RegExp(/[0-9-]/);
	// var emailReg = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
	// var emailReg = new RegExp(/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$ /);
	// var emailReg = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

    var phoneReg    = /^1\d{10}$|^\d{4}-\d{7}$|^\d{3}-\d{8}$/;
    var pwdReg      = /^\w{6,20}$/;
    var usernameReg = /^.{2,20}$/;
    var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // var pwdReg = /^(?!\D+$)(?![^a-z]+$)[a-zA-Z\d]{6,20}$/;
    var ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

    var validateEmail = function(value){
        return emailReg.test(value.trim());
    };
    var validatePwd = function (value) {
        return pwdReg.test(value.trim());
    };

$(function(){

})