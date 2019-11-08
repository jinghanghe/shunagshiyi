    <template>
        <div class="Login" >
            <div class="LoginLOGO"></div>
            <div class="LoginPhone">
              <input type="text" placeholder="请输入手机号" v-model="phoneNumber" >
              <span @click="handlercode" >{{this.codeText}}</span>
            </div>
            <div class="LoginCode">
              <input type="text" placeholder="请输入验证码" v-model="code" >
              <span></span>
            </div>
            <div class="Loginagreement">
              <span>登录即表示您已经同意</span>
              <span @click="handlercodes" >《鲸小爱用户协议》</span>
            </div>
            <div class="Loginregister" @click="handlerlogin" >
                注册
            </div>
            <div class="LoginPhoneTost" v-show="this.phoneInfoFlag" >
                  请输入手机号码
            </div>
            <div class="LogincodeTost" v-show="this.codeInfoFlag" >
                  验证码发送成功
            </div>
            <div class="LogincodeErro" v-show="this.codeErroFlag" >
                  <p>
                    验证码错误，请重新填写正确验证码！
                  </p>
            </div>
            <div class="LoginPhoneErro" v-show="this.phoneErroFlag" >
                  <p>
                    手机号码错误，请重新填写正确手机号码！
                  </p>
            </div>
            <div class="LoginPhoneEmpty" v-show="this.phoneEmptyFlag" >
                  请输入验证码
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
              phoneNumber:"",
              code:"",
              getcodeTime:60,
              codeText:"获取验证码",
              phoneInfoFlag:false,//请输入手机号码
              codeInfoFlag:false,//验证码发送成功
              codeErroFlag:false,//验证码错误
              phoneErroFlag:false,//手机号码格式不对
              phoneEmptyFlag:false,//验证码不能为空
            }
          },
          created(){
            // sensors.quick('autoTrack');
            if(localStorage.getItem("token")){
              // console.log(window.location.search)
               this.$router.push("/payment/"+window.location.search)
            }
          },
          methods:{
              isWeiXin(){　　　　//判断是否微信平台
                  var ua = window.navigator.userAgent.toLowerCase();
                  if (ua.match(/MicroMessenger/i) == 'micromessenger'){
                  　　return true;
                  } else {
                  　　return false;
                  　　}
                },
                handlercodes(){
                  window.location.href="http://www.jinghangapps.com/privacy.html"
                },
            //发送验证码
              handlercode(){
                  let myreg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
                  if(this.phoneNumber.length==0){
                      this.phoneInfoFlag=true;
                      setTimeout(()=>{
                        this.phoneInfoFlag=false;
                      },2000)
                  }else if(!myreg.test(this.phoneNumber)){
                      this.phoneErroFlag=true;
                      setTimeout(()=>{
                        this.phoneErroFlag=false;
                      },2000)
                  }else{
                    this.getcode=setInterval(()=>{
                    this.getcodeTime--;
                    if(this.getcodeTime<0){
                      this.codeText="获取验证码"
                      clearInterval(this.getcode)
                      this.getcodeTime=60
                    }else{
                         this.codeText=this.getcodeTime
                    }
                  },1000)
                      let data = new FormData();
                      data.append('phoneNumber',this.phoneNumber);
                      fetch(ServerIP+"sendSms",{
                        method:"POST",
                        mode:"cors",
                        body:data,
                        }).then((res)=>{
                          return res.json()
                        })
                        .then((res)=>{
                              console.log(res)
                              if(res.code==200){
                                  this.codeInfoFlag=true;
                                  setTimeout(()=>{
                                  this.codeInfoFlag=false;
                                },2000)

                              }
                        })
                  }
              },
              //注册
              handlerlogin(){
                  let data = new FormData();
                    data.append('phoneNumber',this.phoneNumber);
                    data.append('code',this.code);
                    fetch(ServerIP+"userLogin",{
                        method:"POST",
                        mode:"cors",
                        body:data,
                    }).then((res)=>{
                      return res.json()
                    })
                      .then((res)=>{
                        if(res.msg=="验证码错误或已超时！"){
                            this.codeErroFlag=true;
                            setTimeout(()=>{
                              this.codeErroFlag=false
                            },2000)
                          
                        }else if(this.code.length==0){
                            this.phoneEmptyFlag=true;
                            setTimeout(()=>{
                              this.phoneEmptyFlag=false;
                            })
                        }else if(res.code==200){
                            console.log(res)
                           if(this.isWeiXin()){
                             localStorage.setItem("token",res.token)
                            var uurrll = H5IP+"payment/"+window.location.search
                            uurrll = encodeURIComponent(uurrll)
                            location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri="+uurrll+"&response_type=code&scope=snsapi_base&#wechat_redirect");
                             // this.$router.push("/payment")
                           }else{
                              localStorage.setItem("token",res.token)
                              this.$router.push("/payment/"+window.location.search)
                          }
                              //  this.$router.push('/')
                        }
                    })
                 }
              },

       }
       </script>