    <template>
        <div class="Spellsuccess" >
            <div class="SpellsuccessOne" ></div>
            <div class="SpellsuccessTwo" >{{text}}</div>
            <div class="SpellsuccessThree" v-if="this.textFlag" >
              <div  :style="{backgroundImage:'url('+this.promoterUserAvatar+')'}" >
                <p>发起人</p>
              </div>
              <div :style="{backgroundImage:'url('+this.avatars+')'}" >{{this.question}}</div>
            </div>
            <div class="SpellsuccessFive" >请下载鲸小爱APP，在课程中学习</div>
            <div class="SpellsuccessSix" >
              <div @click="ios">
                <div></div>
                <p>IOS下载</p>
              </div>
              <div @click="android">
                <div></div>
                <p>安卓下载</p>
              </div>
            </div>
            <div class="downloads" v-if="this.downFlag"></div>
        </div>
    </template>
    <script>
        import "./index.css"
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from '../../common/common';
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",//平台
              promoterUserAvatar:"",
              text:"支付成功",
              textFlag:true,
              downFlag:"",
              avatars:"",
              question:"?",
            }
          },
          created(){
            if(GetQueryString("spell")!=null){
              this.spell=GetQueryString("spell");
              if(this.spell==3||this.spell==2){
                this.textFlag=true
              }else if(this.spell==4){
                this.text="拼单成功"
                this.textFlag=true
              }else{
                this.textFlag=false
              }
            }
         
            let data = new FormData();
                fetch(ServerIP+"v2/curriculums/assemblyInfo/"+GetQueryString("assemblyId"),{
                  method: 'GET',
                  mode: "cors",
                }).then((res)=>{
                  return res.json();
                })
               .then((res)=>{
                    this.promoterUserAvatar=res.data.promoterUserAvatar;
                    if(res.data.membersInfo.length>0){
                        this.avatars=res.data.membersInfo[1].avatar;
                        this.question="";
                    }
                    function formatSecondsCN() {
                    let seconds = Math.floor(res.assemblyInvalidTimelong / 1000)
                    var d = Math.floor(seconds / 3600 / 24)
                    var h = Math.floor((seconds / 3600)% 24)
                    var m = Math.floor((seconds / 60) % 60)
                    var s = Math.floor(seconds % 60)
                    return d|| h || m || s ? `${d ? d + '天' : ''}${h ? h + '时' : ''}${m ? m + '分' : ''}${s ? s + '秒' : ''}` : '0分'
                      }
                      this.assemblyInvalidTimelong=formatSecondsCN()
              })

          },
          methods:{
              ios(){
                  var u = window.navigator.userAgent.toLowerCase();
                      if (u.indexOf("linux")>-1||u.indexOf("android")>-1){
                          this.platform="android"
                          if(!this.isWeiXin()){
                          }else{

                          }
                      }else if(u.indexOf("iphone")>-1){
                          this.platform="ios"
                           window.location.href= 'https://itunes.apple.com/cn/app/id1411784178'
                      }
              },
              android(){
                  var u = window.navigator.userAgent.toLowerCase();
                      if (u.indexOf("linux")>-1||u.indexOf("android")>-1){
                          this.platform="android"
                          if(!this.isWeiXin()){
                            this.downFlag=false;
                            window.location.href= "https://www.jinghangapps.com/jingxiaoai/getLatestDevUrl"
                          }else{
                            this.downFlag=true;
                            window.location.href= "https://www.jinghangapps.com/jingxiaoai/getLatestDevUrl"
                          }
                      }else if(u.indexOf("iphone")>-1){
                          this.platform="ios"
                      }
              },
          }
        }
    </script>



