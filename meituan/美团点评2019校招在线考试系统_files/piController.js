$(".nav .examlist").hide();app.register("piController",["$scope","$http","$state","$location","$timeout","App",function($scope,$http,$state,$location,$timeout,App){$scope.App=App;var loadPager=function(){};$scope.model={personalMust:{realName:1,mobile:1,email:1,idcard:-1,gender:-1,university:-1,major:-1,degree:-1,GraduateDate:-1,city:-1}};var refreshFuncs=function(t){$http.post("/cand/MyInfo",{r:Math.random()}).success(function(result){$scope.model=result;if($scope.model.personalMust==undefined){$scope.model.personalMust=[{realName:1},{mobile:1},{email:1},{idcard:-1},{gender:-1},{university:-1},{major:-1},{degree:-1},{GraduateDate:-1},{city:-1}]}if($scope.model.personalMust.length>0){$scope.model.personalMustAns={};$scope.model.personalMust.forEach(function(item){$.extend($scope.model.personalMustAns,item)});$scope.model.personalMust=$scope.model.personalMustAns}if($scope.model.personalChooise!=undefined&&$scope.model.personalChooise.length>0&&($scope.model.personalChooiseAns==undefined||$scope.model.personalChooiseAns.length==0)){$scope.model.personalChooiseAns=[];for(var i=0;i<$scope.model.personalChooise.length;i++){var data="";if($scope.model.personalChooise[i].data!=undefined&&$scope.model.personalChooise[i].data!=""){data=$scope.model.personalChooise[i].data.split("@@")}$scope.model.personalChooiseAns.push({title:$scope.model.personalChooise[i].title,answer:"",type:$scope.model.personalChooise[i].type,dataList:data,data:$scope.model.personalChooise[i].data,control:$scope.model.personalChooise[i].control})}}else if($scope.model.personalChooiseAns!=undefined&&$scope.model.personalChooiseAns.length>0){$scope.model.personalChooiseAnsResult=[];for(var i=0;i<$scope.model.personalChooise.length;i++){for(var j=0;j<$scope.model.personalChooiseAns.length;j++){if($scope.model.personalChooiseAns[j].title==$scope.model.personalChooise[i].title){if(($scope.model.personalChooiseAns[j].control==3||$scope.model.personalChooiseAns[j].control==4)&&$scope.model.personalChooiseAns[j].answer!=undefined){$scope.model.personalChooiseAns[j].answerArr=$scope.model.personalChooiseAns[j].answer.split("，")}else{}if(($scope.model.personalChooise[i].control==3||$scope.model.personalChooise[i].control==4)&&$scope.model.personalChooise[i].data!=undefined&&$scope.model.personalChooise[i].data!=""){$scope.model.personalChooise[i].dataList=$scope.model.personalChooise[i].data.split("@@");$scope.model.personalChooiseAns[j].data=$scope.model.personalChooise[i].data;$scope.model.personalChooiseAns[j].dataList=$scope.model.personalChooise[i].dataList}$scope.model.personalChooiseAnsResult.push($scope.model.personalChooiseAns[j])}}}$scope.model.personalChooiseAns=$scope.model.personalChooiseAnsResult}if(location.host.indexOf("xueersi")>-1){var isNeedSave=false;if($scope.model.personalChooiseAns.length>0&&$scope.model.personalChooiseAns[0].answer==""){isNeedSave=true}for(var i=0;i<$scope.model.personalChooiseAns.length;i++){if($scope.model.personalChooiseAns[i].title=="所在年级"&&$scope.model.personalChooiseAns[i].answer==""){$scope.model.personalChooiseAns[i].answer=$scope.model.my4}if($scope.model.personalChooiseAns[i].title=="参赛地区"&&$scope.model.personalChooiseAns[i].answer==""){for(var j=0;j<$scope.model.personalChooiseAns[i].dataList.length;j++){if($scope.model.personalChooiseAns[i].dataList[j].indexOf($scope.model.my5)>-1){$scope.model.personalChooiseAns[i].answer=$scope.model.personalChooiseAns[i].dataList[j]}}if($scope.model.personalChooiseAns[i].answer==""){$scope.model.personalChooiseAns[i].answer="全国赛区"}}}if(isNeedSave){$http.post("/cand/api/EditPersonalInfo",$scope.model).success(function(data){}).error(function(data){})}}ACMGlobal.faceRecognition=result.faceRecognition;if($.cookie("faceRecognitionLimited")==null&&(ACMGlobal.faceRecognition==true||ACMGlobal.faceRecognition=="1")){$.cookie("faceRecognitionLimited","1",{expires:7})}ACMGlobal.idcard=result.idcard;if(result.idcard!=null&&result.idcard!=""){ACMGlobal.idcard=result.idcard.replace("'","")}ACMGlobal.realName=result.realName;ACMGlobal.candId=result._id;if(t==1){$("#appEdit").css({display:"none"});$("#appNext").css({display:"none"});$(".showBox").show();$(".mainBox").hide();$(".toolguider a.edit").show();$(".toolguider button.edit").hide();$(".toolguider .next").show();$(".toolguider .cancel").hide()}$timeout(function(){checkBindFun()})}).error(function(result){console.log("Error: "+result)})};var checkBindFun=function(){$(".personalChooiseBox input[type=radio]").click(function(){$(this).parent().siblings().find("input").prop("checked",false)});$("#GraduateDate,#birthday").datetimepicker({minView:"month",format:"yyyy-mm-dd",language:"zh-CN",autoclose:true})};$scope.refreshFuncs=refreshFuncs;refreshFuncs(0);$scope.reset=function(){refreshFuncs(1)};$scope.editStart=function(){$(".showBox").hide();$(".mainBox").show();if(parseInt($.cookie("faceRecognitionLimited"))<=0){if($("#idcard").val()!=""){$("#idcard").attr("disabled","disabled")}}$(".toolguider a.edit").hide();$(".toolguider button.edit").show();$(".toolguider .next").hide();$(".toolguider .cancel").show()};$scope.save=function(){$(".modal-dialog").attr("style","");$(".modal-dialog .modal-body").attr("style","");$(".modal-dialog .modal-footer").attr("style","");$(".modal-dialog .modal-content").attr("style","");var realName=$("#realName").val();if(realName==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.nameHolder);return}if(!isEng(realName)){if(realName.length>20){cxalert($scope.App.lang.hint,$scope.App.lang.person.nameLonger);return}}var emailReg=/^[_\.a-zA-Z0-9-]+@([_a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,3}$/;if(emailReg.test(realName)){cxalert($scope.App.lang.hint,$scope.App.lang.person.incorrectName);return}if($("#mobile").val()!=undefined){if($("#mobile").attr("data-must")==1&&$("#mobile").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.incorrectPhone);return}var inputmobile=$("#mobile").val();var mobieReg=/^0?1[0-9][0-9]\d{8}$/;if(mobieReg.test(inputmobile)==false){cxalert($scope.App.lang.hint,$scope.App.lang.person.incorrectPhone);return}}if($("#email").val()!=undefined){if($("#email").attr("data-must")==1&&$("#email").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.emailHolder);return}var inputemail=$.trim($("#email").val());$scope.model.email=$.trim(inputemail);var emailReg=/^[_\.a-zA-Z0-9-]+@([_a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,3}$/;if(emailReg.test(inputemail)==false){cxalert($scope.App.lang.hint,$scope.App.lang.person.incorrectEmail);return}}if($("#idcard").val()!=undefined){if(($("#idcard").attr("data-must")==1||ACMGlobal.faceRecognition==true||ACMGlobal.faceRecognition=="1")&&$("#idcard").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.idnoHolder);return}var idcard=$("#idcard").val();idcard=idcard.replace("'","");if(idcard!=""&&!isCardNo(idcard)){cxalert($scope.App.lang.hint,$scope.App.lang.person.incorrectIdno);return}}if($("#idcard").val()!=undefined){if($("#idcard").attr("data-must")==1&&$("#idcard").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.idnoHolder);return}}if($("#university").val()!=undefined){if($("#university").attr("data-must")==1&&$("#university").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.universityHolder);return}}if($("#major").val()!=undefined){if($("#major").attr("data-must")==1&&$("#major").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.majorHolder);return}}if($("#degree").val()!=undefined){if($("#degree").attr("data-must")==1&&$("#degree").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.degreeHolder);return}}if($("#GraduateDate").val()!=undefined){if($("#GraduateDate").attr("data-must")==1&&$("#GraduateDate").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.graduationHolder);return}}if($(".genderBox").length==1){if($(".genderBox").attr("data-must")==1&&$('input:radio[name="gender"]:checked').val()==undefined){cxalert($scope.App.lang.hint,$scope.App.lang.person.genderHolder);return}}if($("#city").val()!=undefined){if($("#city").attr("data-must")==1&&$("#city").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.cityHolder);return}}$scope.model.GraduateDate=$("#GraduateDate").val();var chooiseBool=true;if($(".personalChooiseBox .pcAnsList").length>0){$(".personalChooiseBox .pcAnsList .w380").each(function(){if($(this).attr("data-must")==1&&$("#cxdialog.cxdialog.in").length==0){if($(this).attr("data-control")==1&&$(this).find("input").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseInput+$(this).parent().find("label span").not(".must").html());chooiseBool=false}else if($(this).attr("data-control")==2&&$(this).find("input:checked").length==0){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseSelect+$(this).parent().find("label span").not(".must").html());chooiseBool=false}else if($(this).attr("data-control")==3&&$(this).find("input:checked").length==0){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseSelect+$(this).parent().find("label span").not(".must").html());chooiseBool=false}else if($(this).attr("data-control")==4&&$(this).find("select").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseSelect+$(this).parent().find("label span").not(".must").html());chooiseBool=false}}else{}});if(!chooiseBool){return false}$scope.model.personalChooiseAns=[];$(".personalChooiseBox .pcAnsList .w380").each(function(){if($(this).attr("data-control")==1){$scope.model.personalChooiseAns.push({title:$(this).parent().find("label span").not(".must").html(),answer:$(this).find("input").val(),type:$(this).attr("data-must"),dataList:$(this).attr("data-data"),data:$(this).attr("data-data"),control:$(this).attr("data-control")})}else if($(this).attr("data-control")==2){var ans="";if($(this).find("input:checked").length>0){ans=$(this).find("input:checked").val()}$scope.model.personalChooiseAns.push({title:$(this).parent().find("label span").not(".must").html(),answer:ans,type:$(this).attr("data-must"),dataList:$(this).attr("data-data").split("@@"),data:$(this).attr("data-data"),control:$(this).attr("data-control")})}else if($(this).attr("data-control")==3){var valueList=[];$(this).find("input[type=checkbox]").each(function(item){if($(this).is(":checked")){valueList.push($(this).val())}});$scope.model.personalChooiseAns.push({title:$(this).parent().find("label span").not(".must").html(),answerArr:valueList,answer:valueList.join("，"),type:$(this).attr("data-must"),dataList:$(this).attr("data-data").split("@@"),data:$(this).attr("data-data"),control:$(this).attr("data-control")})}else if($(this).attr("data-control")==4){$scope.model.personalChooiseAns.push({title:$(this).parent().find("label span").not(".must").html(),answer:$(this).find("select").val(),type:$(this).attr("data-must"),dataList:$(this).attr("data-data").split("@@"),data:$(this).attr("data-data"),control:$(this).attr("data-control")})}})}var alertHtml="";if(window.ACMGlobal.faceRecognition){alertHtml='<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-circle"></i></td><td><span class="fbig fb"></span>'+$scope.App.lang.person.idnoTip+"</td></tr></tbody></table></div>"}if(ACMGlobal.faceRecognition==true||ACMGlobal.faceRecognition=="1"){$.cxDialog({title:$scope.App.lang.hint,info:alertHtml,background:"#000",ok:function(){$http.post("/cand/api/EditPersonalInfo",$scope.model).success(function(data){App.checkData(data,$state);if(data=="1"){$(".showBox").show();$(".mainBox").hide();App.refreshMyInfo($http,$timeout);$(".toolguider button.edit").hide();$(".toolguider .next").show();$(".toolguider .cancel").hide();if($.cookie("faceRecognitionLimited")!=null&&(ACMGlobal.faceRecognition==true||ACMGlobal.faceRecognition=="1")){$.cookie("faceRecognitionLimited",parseInt($.cookie("faceRecognitionLimited"))-1)}else{$(".toolguider .edit").show()}$(".toolguider .edit").show();$(".toolguider .editComplete").hide()}else{cxalert($scope.App.lang.hint,$scope.App.lang.person.editFail)}}).error(function(data){console.log("Error: "+data)})},okText:$scope.App.lang.iknow})}else{$http.post("/cand/api/EditPersonalInfo",$scope.model).success(function(data){App.checkData(data,$state);if(data=="1"){App.refreshMyInfo($http,$timeout);$(".showBox").show();$(".mainBox").hide();$(".toolguider a.edit").show();$(".toolguider button.edit").hide();$(".toolguider .next").show();$(".toolguider .cancel").hide();$.cxDialog({title:$scope.App.lang.hint,closeBtn:false,background:"#000",info:'<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-circle"></i></td><td><span class="fbig fb"></span>'+$scope.App.lang.person.editSuccess+"</td></tr></tbody></table></div>",ok:function(){refreshFuncs(0)},okText:$scope.App.lang.iknow})}else{cxalert($scope.App.lang.hint,$scope.App.lang.person.editFail)}}).error(function(data){console.log("Error: "+data)})}};window.isEng=function(param){var regExp=/[^A-Za-z]/;if(regExp.test(param))return false;return true};$scope.sureNext=function(){if($("#realName").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.nameHolder);return}if($("#email").val()!=undefined){if($("#email").attr("data-must")==1&&$("#email").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.emailHolder);return}}if($("#mobile").val()!=undefined){if($("#mobile").attr("data-must")==1&&$("#mobile").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.phoneHolder);return}}if($("#idcard").val()!=undefined){if($("#idcard").attr("data-must")==1&&$("#idcard").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.idnoHolder);return}}if($("#university").val()!=undefined){if($("#university").attr("data-must")==1&&$("#university").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.universityHolder);return}}if($("#major").val()!=undefined){if($("#major").attr("data-must")==1&&$("#major").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.majorHolder);return}}if($("#degree").val()!=undefined){if($("#degree").attr("data-must")==1&&$("#degree").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.degreeHolder);return}}if($("#GraduateDate").val()!=undefined){if($("#GraduateDate").attr("data-must")==1&&$("#GraduateDate").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.graduationHolder);return}}if($(".genderBox").length==1){if($(".genderBox").attr("data-must")==1&&$('input:radio[name="gender"]:checked').val()==undefined){cxalert($scope.App.lang.hint,$scope.App.lang.person.genderHolder);return}}if($("#city").val()!=undefined){if($("#city").attr("data-must")==1&&$("#city").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.cityHolder);return}}var chooiseBool=true;if($(".personalChooiseBox .pcAnsList").length>0){$(".personalChooiseBox .pcAnsList .w380").each(function(){if($(this).attr("data-must")==1&&$("#cxdialog.cxdialog.in").length==0){if($(this).attr("data-control")==1&&$(this).find("input").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseInput+$(this).parent().find("label span").not(".must").html());chooiseBool=false}else if($(this).attr("data-control")==2&&$(this).find("input:checked").length==0){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseSelect+$(this).parent().find("label span").not(".must").html());chooiseBool=false}else if($(this).attr("data-control")==3&&$(this).find("input:checked").length==0){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseSelect+$(this).parent().find("label span").not(".must").html());chooiseBool=false}else if($(this).attr("data-control")==4&&$(this).find("select").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.pleaseSelect+$(this).parent().find("label span").not(".must").html());chooiseBool=false}}})}if(!chooiseBool){return false}if($("#idcard").val()!=undefined){if(($("#idcard").attr("data-must")==1||ACMGlobal.faceRecognition==true||ACMGlobal.faceRecognition=="1")&&$("#idcard").val()==""){cxalert($scope.App.lang.hint,$scope.App.lang.person.idnoHolder);return}var idCard=$("#idcard").val();idCard=idCard.replace("'","");if(idCard!=""&&!isCardNo(idCard)){cxalert($scope.App.lang.hint,$scope.App.lang.person.idnoTipConfirm)}else{if(isMobile||App.myInfo.supervisor==2){gotoHash("#/main/rules")}else{gotoHash("#/main/myPhoto")}}}else{if(isMobile||App.myInfo.supervisor==2){gotoHash("#/main/rules")}else{gotoHash("#/main/myPhoto")}}};$timeout(function(){selTab("personalInfo");if(document.body.clientWidth<800){$("#pcEdit").html($scope.App.lang.main.editInfo);$("#pcNext").html($scope.App.lang.main.nextStep)}else{$("#pcEdit").html($scope.App.lang.person.btn1);$("#pcNext").html($scope.App.lang.person.btn2)}},100);window.isCardNo=function(card){if(card.length==17||card.length>18||card.length<6){return false}else{return true}}}]);