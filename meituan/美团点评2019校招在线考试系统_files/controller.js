if(Object.isNullString(cdn))cdn="";app.register("MainController",["$scope","$rootScope","$http","$state","$stateParams","$location","$timeout","App",function($scope,$rootScope,$http,$state,$stateParams,$location,$timeout,App){$scope.App=App;$scope.private="-----BEGIN PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANF2K2iRtLDr48je3USa9kgYdt9zGYTraDno5bBleweOTgkfuXbViXvI4rLe4XTjPfQnXtsuY3Lj8TaejfvGo5a5TtGF5qJLWeiRdoNTXeF/T1//ubtjFwOA0NV2hk6fSZe9bj89VBjv7rGfZoCcwFRjeySWnKnsux5S3VAljOdfAgMBAAECgYEAmREV37C6rp9zMhNK9xuW5lCabegaufuditQbJbDDG15uwFQioCij84V1xOkDMPvvBkDPHLTlj8vrNdLgRyF94RBT9uOoaz67Ba/vBuRCuVdCAJzVuLYl5F2HVEFeLM5Qoe9q053UJynyMaSzWOtCX8cGgK9wcuBKg5QYOkcyfWECQQD0UzT5wX7S5PT5C2uzM5Zn9D6qOAgXwA6I426SFdYwLmwSfBmXoZBzSfwae7VxKiEocGsrW9V3S83MhP5Ce9htAkEA23h7upxTF2/nPhPyo7oujsvVHYn3evwoalHXp4K39KWdM/Q/YxL1SSvHHz48mzOdjZVc9ImUHjZl2Xoh8+63ewJAcGxJGBNdFBWeU2pZ6F94eeT9YL3fm24YQgzEuBusLwdtWyQXcpo5KZOFmXoLB0NndoAkEBN1qisLS2x2wojSEQJARh+9COch9X8f18nv4Th/38hpE8MdfAJNt4rm6PLvbA/upscH6dQI45RFT0pHex+G29I5nTjIRs8Cw/YuGw7POQJBAOhYBUAJLxV8q3Z+pRQnJPvm8DlFq4Fr75UTI9PPAvzLBhhwm9Yk64urUEwIGFP3tYusS0Tti2DJRmXJYzeI5OI=-----END PRIVATE KEY-----";App.refreshMyInfo($http,$timeout,$state);App.serverTimer=window.setInterval(function(){App.updateFromServer($http,$state)},6e5);App.timer=window.setInterval(function(){App.rendTime($rootScope)},1e3);if(isMobile){$(".footer").html('<img src="https://cdn.acmcoder.com/release/exam/1.2.4/images/wlogo.png" style="height: 25px;position: relative;top: -1px;">  &nbsp;&nbsp;本考试系统由 <a target="_blank" href="https://kao.acmcoder.com" style="font-weight:bold;color:#Fff;">赛码网</a> 提供技术支持')}App.refreshPapers($http,$state,$stateParams);$scope.submitPaper=function(){$scope.$broadcast("main.submitAPaper",$state.params.paperId)};$scope.goToQuestion=function(paperId,rowNumber){$scope.$broadcast("main.gotoQuestion",paperId,rowNumber)};$scope.$on("$stateChangeStart",function(event,toState,toParams,fromState,fromParams){if(!blClickInBody){cxalert(ACM.lang.hint,ACM.lang.main.notGoBack);event.preventDefault();blClickInBody=false;return}else{if(toState.url.startWith("/onlinecode")||toState.url.startWith("/answer")){App.answering=true;if(toState.url.startWith("/answer")){$(".mianall").addClass("foranswer").removeClass("forcode")}if(toState.url.startWith("/onlinecode")||toState.url.startWith("/prj")){$(".mianall").addClass("forcode").removeClass("foranswer").removeClass("forall");$(".myCalculator").hide();$(".mianall .header .w1000").removeClass("w1000");$(".mianall .mainbody .innerInfo").removeClass("w1000");$(".mianall .mainbody.forall").removeClass("forall");if(window.autoSave!=undefined){window.clearInterval(window.autoSave)}if(window.saveUseTime!=undefined){window.clearInterval(window.saveUseTime)}}}else{App.answering=false;if(window.autoSave!=undefined){window.clearInterval(window.autoSave)}if(window.saveUseTime!=undefined){window.clearInterval(window.saveUseTime)}}if(fromState.url.startWith("/answer")){$(".mianall").removeClass("foranswer").removeClass("forcode")}if(fromState.url.startWith("/onlinecode")){$(".myCalculator").show();if(window.codeResultTimer)clearTimeout(window.codeResultTimer)}if((fromState.url.startWith("/onlinecode")||fromState.url.startWith("/prj"))&&!(toState!=null&&toState.url.startWith("/onlinecode"))){$(".mianall").addClass("forall").removeClass("forcode");$(".codeshow").hide();$(".mianall .header .logo").parent().addClass("w1000");$(".mianall .mainbody .innerInfo").addClass("w1000");$(".mianall .mainbody").addClass("forall");$(".mianall .mainbody .innerInfo .examtitle").show()}}blClickInBody=false});$scope.goToPaper=function(p){var strTo="answer";if(p.forCode){strTo="onlinecode";$(".codeshow").show();$(".loadshow").show();$(".examtitle").hide();$(".examContent").hide();$(".mianall .header .w1000").removeClass("w1000");$(".mianall .mainbody .innerInfo").removeClass("w1000")}else{}gotoHash("#/main/{2}/{0}/{1}/1".Format(p._id,-1,strTo))};$scope.startExam=function(){$rootScope.$broadcast("user.startExam")};setTimeout(function(){$script.ready("forCode",function(){for(var i=0;i<forCode.length;i++){forCode[i]()}});$script.ready("forPaint",function(){for(var i=0;i<forPaint.length;i++){forPaint[i]()}});$script.path("");cdn="https://cdn.acmcoder.com/release/exam/1.2.4/plugins";$script([cdn+"/CodeMirror/lib/codemirror.js"],function(){$script([cdn+"/CodeMirror/mode/scheme/scheme.js",cdn+"/CodeMirror/mode/python/python.js",cdn+"/CodeMirror/addon/selection/active-line.js",cdn+"/CodeMirror/addon/display/fullscreen.js",cdn+"/CodeMirror/mode/javascript/javascript.js",cdn+"/CodeMirror/addon/edit/matchbrackets.js",cdn+"/CodeMirror/addon/hint/show-hint.js",cdn+"/CodeMirror/addon/hint/code-hint.js",cdn+"/CodeMirror/addon/search/match-highlighter.js"],"forCode")});$script([cdn+"/jPainter/js/anyLine.js"],function(){$script([cdn+"/jPainter/js/canvas.js"],"forPaint")});$(".monitor .open").bind("click",function(){initLoadMyPhoto();openMonitorDialog();$(".monitorBox").addClass("heightLimited")});$(".calculatorTitle").click(function(){$(".CalculatorBox").toggle()})},1e3);window.onblur=function(e){var bl=true;e=e||window.event;if(e){var x=e.clientX;var y=e.clientY;var w=document.body.clientWidth;var h=document.body.clientHeight;if(x>=0&&x<=w&&y>=0&&y<=h){bl=false}}if(typeof examNotStart=="undefined"||examNotStart==true){bl=false}if($(".painterdialog").parent().css("display")=="block"&&$(".InputBox.InputBoxArea").length==1){bl=false}var detectIframe=function(){var ifm=$("iframe").is(":focus");console.log("ifm: "+ifm);if(ifm!=true){bl=true;if(detectTimer)clearInterval(detectTimer);endFun()}};var endFun=function(){if($("iframe").is(":focus")||$(".cke_dialog_ui_input_textarea ").is(":focus")){bl=false;if(detectTimer)clearInterval(detectTimer);detectTimer=setInterval(detectIframe,3e3)}if(bl){console.log("BLUR");if(blurTime)window.clearTimeout(blurTime);try{blurTime=window.setTimeout(function(){if(examNotStart){return}if(location.hash.indexOf("answer")>0){if(blurTime){clearTimeout(blurTime);blurTime=null}var post={paperId:App.paperId,quesNo:App.rowNumber,focus:"QUES_BLUR",timestamp:Date.now()};$http.post("/cand/api/focusLog",post).success(function(data){if(data=="-1"){return}var encrypt=new JSEncrypt;encrypt.setPrivateKey($scope.private);data=encrypt.decrypt(data);if(data!=null&&data.length>0){data=$.parseJSON(data)}var validity=false;if(post.timestamp+5*1e3>Date.now()&&post.timestamp<Date.now()){validity=true}if(post.paperId!=data.paperId||post.focus!=data.focus||post.quesNo!=data.quesNo){validity=false}if(validity){data=data.result;if(!isNaN(data)&&data!=null){if($scope.App.myInfo.jumpCount!=undefined&&parseInt($scope.App.myInfo.jumpCount)!=0&&parseInt($scope.App.myInfo.jumpCount)<parseInt(data)){$http.post("/cand/api/submit",{r:Math.random()}).success(function(cs){$.cxDialog({title:ACM.lang.hint,closeBtn:false,info:'<div style="padding:10px 20px 20px;">'+ACM.lang.main.jumpOutLimitTip+"</div>",ok:function(){location.href="https://cdn.acmcoder.com/release/exam/1.2.4/htmls/exam/endexam.html"},okText:ACM.lang.ok})}).error(function(data){console.log("Error: "+data)})}else{if(parseInt(data)==-1){}else if(parseInt(data)<5){if(isMobile){console.log("此时是手机端")}else{if(parseInt(data)==0&&document.body.clientWidth>800){$.cxDialog({title:"",height:400,width:800,baseClass:"forWin",info:ACM.lang.answer.yellowCard1.Format(1),ok:function(){$("#cxdialog").attr("style","");$.cxDialog.defaults.baseClass="";$.cxDialog.defaults.width=0;$.cxDialog.defaults.height=0},okText:ACM.lang.ok})}else{$.cxDialog({title:"",height:400,width:800,baseClass:"forWin",info:ACM.lang.answer.yellowCard1.Format(data),ok:function(){$("#cxdialog").attr("style","");$.cxDialog.defaults.baseClass="";$.cxDialog.defaults.width=0;$.cxDialog.defaults.height=0},okText:ACM.lang.ok})}}}else{if(isMobile){console.log("此时是手机端")}else{if(document.body.clientWidth>800){$.cxDialog({title:"",height:400,width:800,baseClass:"forWin",info:ACM.lang.answer.yellowCard2.Format(data),ok:function(){$("#cxdialog").attr("style","");$.cxDialog.defaults.baseClass="";$.cxDialog.defaults.width=0;$.cxDialog.defaults.height=0},okText:ACM.lang.ok})}}}}}else{$.post("/cand/api/addLog",{action:"CheatBlur"},function(){})}}else{$.post("/cand/api/addLog",{action:"CheatBlur"},function(){})}}).error(function(data){})}else if(location.hash.indexOf("onlinecode")>0){if(blurTime){clearTimeout(blurTime);blurTime=null}$http.post("/cand/api/focusLog",{paperId:App.paperId,quesNo:App.rowNumber,focus:"CODE_BLUR"}).success(function(data){}).error(function(data){})}},3e3)}catch(e){}finally{}}};endFun()};var entno={get:function(){return{}},set:function($v){}};try{Object.defineProperty(window,"onblur",entno)}catch(E){}}]);