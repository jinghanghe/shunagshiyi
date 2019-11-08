    <template>
        <div class="Translate" >
            <div class="IELTSImgs">
                <div class="IELTSImgLefts"></div>
                <div class="IELTSImgRights"  v-if="backgroundimgs" :class="[backgroundimg ? 'IELTSImgRights':'IELTSImgRightss']" ></div>
                <div class="IELTSImgRightsstudy" v-if="backgroundstudys" :class="[backgroundstudy ? 'IELTSImgRightsstudy':'IELTSImgRightsstudys']" ></div>
            </div>
            <div class="IELTSSuccess" >支付成功</div>
            <div class="Countdowns" >
                  <p class="downTimes" >
                    <span>拼单倒计时</span>
                    <span>{{this.curriculumAssemblies}}</span>
                  </p>
                
            </div>
            <div class="participates">
              <div>
                    <p :style="{backgroundImage:'url('+this.promoterUserAvatar+')'}">
                      <span>发起人</span>
                    </p>
                    <p>?</p>
              </div>
              <div>还差<span class="participatesred" >{{this.assemblySize-this.assemblyLength}}</span>人，赶快邀请好友来拼单吧</div>
              <div @click="handlerclick" >邀请好友去拼单</div>
              <div>人不满将自动退款</div>
              
            </div>
            <div class="download" >
                 请下载鲸小爱APP，在课程中学习~
            </div>
            <div class="studyAPP" @click="handlerstudy" >
               下载APP学习
            </div>
        </div>
    </template>
    <script>
        import "./index.css"
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from '../../common/common';
        export default {
          data() {
            return {
              collapsed: false,
              assemblyId:"1",//拼单ID
              promoterUserId:"",//队长ID
              startTime:"",//拼单开始时间
              assemblyInvalidTimelong:"",//拼单有效时间
              curriculumId:"2",//课程ID
              type:"",//课程类型
              name:"",//课程名称
              price:"39",//价格
              assemblePrice:"29",//拼单价格
              assemblySize:"",//拼团规模
              userId:"",//用户id
              avatar:"",//用户头像
              nickname:"",//用户昵称
              startDate:"",//开始时间
              endDate:"",//结束时间
              startTime:"",
              texts:"",
              iswei:"",//是否是微信
              promoterUserAvatar:"",//队长头像
              assemblyLength:"",
              curriculumAssemblies:"",
              backgroundimg:true,
              backgroundstudy:"",//下载学习
              platform:"",
              backgroundimgs:true,
            }
          },
          created(){
              this.assemblyId=GetQueryString("assemblyId")
              var u = window.navigator.userAgent.toLowerCase();
                      if (u.indexOf("linux")>-1||u.indexOf("android")>-1){
                          this.platform="android"
                          if(!this.isWeiXin()){
                             window.location.href= "https://www.jinghangapps.com/jingxiaoai/getLatestDevUrl"
                          }
                      }else if(u.indexOf("iphone")>-1){
                          this.platform="ios"
                          if(!this.isWeiXin()){
                            window.location.href= 'https://itunes.apple.com/cn/app/id1411784178'
                          }
                      }
            
            if(this.isWeiXin()){
              this.iswei="weixin"
            }

          },
          mounted(){
             let data = new FormData();
             let shareUrl = window.location.href.split('#')[0]
            
             data.append('url',shareUrl);
                fetch(ServerIP+"v2/wxH5Helper/shareConfig",{
                     method:"post",
                     body:data,
                      headers:{
                        "authorization":"Bearer "+localStorage.getItem("token"),
                      }
                   }).then((res)=>{
                      return res.json()
                   })
                   .then((res)=>{
                     window.wx.config({
                      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                      appId:res.data.appId, // 必填，公众号的唯一标识
                      timestamp:res.data.timestamp, // 必填，生成签名的时间戳
                      nonceStr:res.data.nonceStr, // 必填，生成签名的随机串
                      signature:res.data.signature,// 必填，签名
                      jsApiList: [
                        "updateAppMessageShareData",
                        "updateTimelineShareData",
                        // "onMenuShareAppMessage",
                        // "onMenuShareQQ"
                      ] // 必填，需要使用的JS接口列表
                    });
                    this.handlerwei()
                    this.handlerpengyou()
                   })
                fetch(ServerIP+"v2/curriculums/assemblyInfo/"+GetQueryString("assemblyId"),{
                    method: 'GET',
                    mode: "cors",
               }).then((res)=>{
                 return res.json()
               })
               .then((res)=>{
                    this.startDate=res.data.curriculumInfo.startDate;
                    this.startTime=res.data.startTime;
                    this.promoterUserAvatar=res.data.promoterUserAvatar;//队长头像
                    this.assemblePrice=res.data.curriculumInfo.assemblePrice
                    this.price=res.data.curriculumInfo.price;
                    this.assemblySize=res.data.curriculumInfo.assemblySize;
                    this.assemblyLength=res.data.membersInfo.length
                    let timers=setInterval( ()=> {
                    var startTime = new Date().getTime();
                    var endTime = new Date(Date.parse(res.data.startTime.replace(/-/g,'/'))).getTime();
                    endTime = endTime+res.data.assemblyInvalidTimelong;
                    var rightTime=endTime-startTime;
                   if (rightTime > 0) {
                      var dd = Math.floor(rightTime /1000 / 60 / 60 / 24);
                      var hh = Math.floor((rightTime /1000 / 60 / 60) % 24);
                      var mm = Math.floor((rightTime /1000 / 60) % 60);
                      var ss = Math.floor((rightTime /1000) % 60);
                      this.curriculumAssemblies= hh + ":" + mm + ":" + ss 
                   }else{
                      this.curriculumAssemblies="拼单结束"
                      clearInterval(timers)
                   }
                  }, 1000)
              })
          },
         methods:{
                handlerclick(){
                  this.backgroundimgs=true;
                  this.backgroundstudy=false;
                  this.backgroundimg = !this.backgroundimg;
                  this.backgroundstudys=false
                    if(this.assemblyInvalidTimelong=="拼单结束"){
                      return
                    }else{
                      
                      // location.href="/sharingpictures"
                    }
                    
                 },
                 handlerstudy(){  
                    if(this.platform=="android"){
                      this.backgroundimgs=false;
                      this.backgroundstudys=true
                    this.backgroundstudy=!this.backgroundstudy;
                    }else if(this.platform=="ios"){
                      window.location.href= 'https://itunes.apple.com/cn/app/id1411784178';
                    }
                    this.assemblyId=GetQueryString("assemblyId")
                     var u = window.navigator.userAgent.toLowerCase();
                      if (u.indexOf("linux")>-1||u.indexOf("android")>-1){
                          this.platform="android"
                          if(!this.isWeiXin()){
                             window.location.href= "https://www.jinghangapps.com/jingxiaoai/getLatestDevUrl"
                          }
                      }else if(u.indexOf("iphone")>-1){
                          this.platform="ios"
                          if(!this.isWeiXin()){
                            window.location.href= 'https://itunes.apple.com/cn/app/id1411784178'
                          }
                      }

                 },
                 isWeiXin(){　　//判断是否微信平台
                  　　var ua = window.navigator.userAgent.toLowerCase();
                  　　　　if (ua.match(/MicroMessenger/i) == 'micromessenger'){
                  　　　　return true;
                  　　} else {
                  　　　　return false;
                  　　}
                },
            handlerwei(){
                    window.wx.ready(function(){
                      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                       window.wx.updateAppMessageShareData({
                        title: '就差你了，和我一起来跟雅思分手吧', 
                        desc: '雅思口语机经训练营', 
                        link:"https://www.jinghangapps.com/camp/beshared?assemblyId="+localStorage.getItem("assemblyId")+"&curriculumId="+localStorage.getItem("curriculumId"),
                        imgUrl: 'https://xiaojing-1255803335.cos.ap-beijing.myqcloud.com/campvideo/icon.png',
                        // type:"link",
                        // dataUrl:"",
                        success: function () {
                            // location.href="http://jztest.jinghangapps.com/spell"
                        
                        },
                        trigger:function(){
                            localStorage.setItem("fen","123")
                        },
                        fail: function(err) {
                        }
                      })
                    });
                  },
                  handlerpengyou(){

                    window.wx.ready(function () {
                      //自定义”分享给朋友圈“的分享内容
                    window.wx.updateTimelineShareData({
                        title: '就差你了，和我一起来跟雅思分手吧', // 分享标题
                        link:"https://www.jinghangapps.com/camp/beshared?assemblyId="+localStorage.getItem("assemblyId")+"&curriculumId="+localStorage.getItem("curriculumId"), 
                        imgUrl: 'https://xiaojing-1255803335.cos.ap-beijing.myqcloud.com/campvideo/icon.png', 
                        success: function () {
                          //  location.href="http://jztest.jinghangapps.com/spell"
                        }
                      })
                    });
                  },

          }
        }
    </script>
