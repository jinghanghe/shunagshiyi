    <template>
        <div class="Translate" >
            <div class="IELTSImg">
                <div class="IELTSImgLeft"></div>
                  <div class="IELTSImgRight">
                    <span>雅思口语机经训练营</span>
                    <p>开课时间：{{this.startDate}}</p>
                    <p>
                      <span>￥{{this.assemblePrice}}</span>
                      <span>￥{{this.price}}</span>
                      <span @click="handlerdetail">查看详情</span>
                    </p>
                  </div>
            </div>
            <div class="Countdown" >
                <span>拼单倒计时</span>
                <span>{{this.ss}}</span>
            </div>
            <div class="sendtime" >
                <span>发起时间:</span>
                <span>{{this.startTime}}</span>
            </div>
            <div class="participate " >
              <div>
                    <p :style="{backgroundImage:'url('+this.avatar+')'}" >
                      <span>发起人</span>
                    </p>
                    <p :style="{backgroundImage:'url('+this.avatars+')'}">{{this.question}}</p>
              </div>
              <div>还差<span class="spanred">{{this.assemblySize-this.assemblyLength}}</span>人，帮他完成心愿吧</div>
              <div @click="handlerSpell">{{this.spellHan}}</div>
              <div class="refund" >人不满将自动退款</div>
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
              ss:"",//拼单有效时间
              curriculumId:"2",//课程ID
              type:"",//课程类型
              name:"",//课程名称
              price:"39",//价格
              assemblePrice:"",//拼单价格
              assemblySize:"",//拼团规模
              userId:"",//用户id
              avatar:"",//用户头像
              nickname:"",//用户昵称
              startDate:"",//开始时间
              endDate:"",//结束时间
              avatars:"",//成员头像
              texts:"",
              spellHan:"参与拼单",
              question:"?",
              membersInfo:"",
              assemblyLength:"",
            }
          },
          
          created(){
            debugger;
            this.curriculumId = GetQueryString("curriculumId");
            localStorage.setItem("curriculumId",this.curriculumId);
            if(GetQueryString("token") != null) {      //判断有没有token
              this.token = GetQueryString("token");
              localStorage.setItem("token", this.token);
            } else {
              this.token = "";
            }
            this.assemblyId=GetQueryString("assemblyId");
            let params = {};
                if(localStorage.getItem("token")=="null"){
                }else if(localStorage.getItem("token")!=null){
                  
                  params.authorization="Bearer "+localStorage.getItem("token")
                }else if(localStorage.getItem("token")==null){
                
                }
             fetch(ServerIP+"v2/curriculums/purchaseInfo/"+this.curriculumId,{
                    method:"get",
                    mode:"cors",
                    headers:params
            }).then((res)=>{
                return res.json()
            })
            .then((res)=>{
              if(res.data.buyState==0){
                      //0已购买 1拼团中 2拼团完成 -1未支付
                          window.location.href=H5IP + "spellsuccess?spell=4&assemblyId="+ res.data.assemblyId;
                  }else if(res.data.buyState==1){
                    
                    if(!this.platform){
                          window.location.href=H5IP+"ground?spell=-1&assemblyId="+res.data.assemblyId;
                    }else{
                        window.location.href=H5IP+"ground?spell=-1&assemblyId="+res.data.assemblyId;
                    }
                  }else if(res.data.buyState==2){
                          window.location.href=H5IP+"spellsuccess?spell=4&assemblyId="+ res.data.assemblyId;
                  }
                    
            })
              fetch(ServerIP+"v2/curriculums/assemblyInfo/"+ GetQueryString("assemblyId"),{
                   method: 'GET',
                    mode: "cors",
              }).then((resID)=>{
                return resID.json();
              })
               .then((resID)=>{
                  this.startDate=resID.data.curriculumInfo.startDate;
                  this.startTime=resID.data.startTime;
                  this.startTime=this.startTime.split(" ")[0]
                  this.assemblePrice=resID.data.curriculumInfo.assemblePrice;
                  this.price=resID.data.curriculumInfo.price;
                  this.avatar=resID.data.promoterUserAvatar;
                  this.assemblySize=resID.data.curriculumInfo.assemblySize;
                  this.assemblyLength=resID.data.membersInfo.length;
                  this.endDate = new Date(Date.parse(resID.data.startTime.replace(/-/g,'/'))).getTime();
                  this.endDate = this.endDate+resID.data.assemblyInvalidTimelong
                  if(resID.data.membersInfo.length>1){
                    this.avatars=resID.data.membersInfo[1].avatar;
                    this.question="";
                  } 
                  
                  this.interval = setInterval(() => {
                  let newData = new Date();
                  let T = this.endDate- newData.getTime();
                  if ( T < 0 ) {
                      this.ss="拼单结束"
                      clearInterval(this.interval)
                  }else{
                  let d=Math.floor(T/1000/60/60/24);
                  let h=Math.floor(T/1000/60/60%24);
                  let m=Math.floor(T/1000/60%60);
                  let s=Math.floor(T/1000%60);
                  // this.ss = d+"天:"+h+"时:"+m+"分:"+s+"秒"
                  if(h<0){
                    h="0"+h
                  }
                  if(m<0){
                    m="0"+m
                  }
                  if(s<0){
                    s="0"+s
                  }
                  this.ss = h+":"+m+":"+s+""
                  }
              }, 1000);
                if(this.assemblySize-this.assemblyLength<=0){
                    this.spellHan="拼单结束"
                }
                if(this.ss=="拼单结束"){
                    this.spellHan="拼单结束"
                }
            });
          },
          methods:{ 
            handlerSpell(){
              if(this.ss=="拼单结束" || this.spellHan=="拼单结束") return
              if(localStorage.getItem("token")!=null){
                      if(isWeiXin()){
                       var uurrll = H5IP+"payment?type=3&price="+this.assemblePrice+"&assemblyId="+ GetQueryString("assemblyId")+"&curriculumId="+this.curriculumId
                       uurrll = encodeURIComponent(uurrll)
                       location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri="+uurrll+"&response_type=code&scope=snsapi_base&#wechat_redirect");    
                  }else{
                      window.location.href=H5IP+"payment?type=3&price="+this.assemblePrice+"&assemblyId="+this.assemblyId+"&curriculumId="+this.curriculumId
                   }
                  }else if(localStorage.getItem("token")==null){
                       window.location.href=H5IP+"login?type=3&price="+this.assemblePrice+"&assemblyId="+this.assemblyId+"&curriculumId="+this.curriculumId
                  }
            },
            handlerdetail(){
                 if(this.ss=="拼单结束" || this.spellHan=="拼单结束"){
                       this.$router.push("/?curriculumId="+this.curriculumId)
                 }else{

                    this.$router.push("/course?assemblyId="+GetQueryString("assemblyId"));
                 }
            },
          },
        }
    </script>
