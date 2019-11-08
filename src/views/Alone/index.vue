    <template>
        <div class="alone" >
            <div></div>
            <div>支付成功</div>

            <div>请下载鲸小爱APP，在课程中学习</div>
            <div>
              <div @click="handlerios" >
                <div></div>
                <p>IOS下载</p>
              </div>
              <div @click="Android">
                <div></div>
                <p>安卓下载</p>
              </div>
            </div>
            <div class="downloads" v-if="downFlag"></div>
        </div>
    </template>
    <script>
        import "./index.css";
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from '../../common/common';
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
              downFlag:""
            }
          },
  
          methods:{
            handlerios(){
         
                var u = window.navigator.userAgent.toLowerCase();
                      if (u.indexOf("linux")>-1||u.indexOf("android")>-1){
                          this.platform="android"
                          if(!isWeiXin()){
                             this.downFlag=false
                          }else{
                            window.location.href= 'https://itunes.apple.com/cn/app/id1411784178'
                          }
                      }else if(u.indexOf("iphone")>-1){
                          this.platform="ios"
                           window.location.href= 'https://itunes.apple.com/cn/app/id1411784178'
                      }
            },
            Android(){
                    var u = window.navigator.userAgent.toLowerCase();
                      if (u.indexOf("linux")>-1||u.indexOf("android")>-1){
                          this.platform="android"
                          if(!isWeiXin()){
                             this.downFlag=false
                            window.location.href= "https://www.jinghangapps.com/jingxiaoai/getLatestDevUrl"
                          }else{
                             this.downFlag=true
                          }
                      }else if(u.indexOf("iphone")>-1){
                          this.platform="ios"
                      }
            },
          },
        }
    </script>



